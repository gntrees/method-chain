import type {
    ArgumentValue,
    CopyType,
    FunctionCallType,
    LanguageType,
    PropertyCallType,
    SchemaType,
} from "./lingua-tungga/typescript/index";
import { normalizeName } from "../utils";

type ExpressionRecord = Record<LanguageType, string>;
type StatementsRecord = Record<LanguageType, string[]>;
type VariablesRecord = Record<LanguageType, Record<string, string>>;

type ChainValue = FunctionCallType | PropertyCallType | CopyType;

type ChainState = {
    statements: StatementsRecord;
    variables: VariablesRecord;
    result?: unknown;
    resultKind?: "expression" | "statements";
};

const LANGUAGE_KEYS: LanguageType[] = ["typescript", "c"];

function escapeCString(value: string): string {
    return value.replace(/"/g, '\\"');
}

function isExpressionRecord(value: unknown): value is ExpressionRecord {
    if (typeof value !== "object" || value === null || Array.isArray(value) || value instanceof Map) {
        return false;
    }
    const entries = Object.entries(value);
    return entries.length > 0 && entries.every(([key, val]) => LANGUAGE_KEYS.includes(key as LanguageType) && typeof val === "string");
}

function isChainArgument(value: unknown): value is { chain: { values: ChainValue[] } } {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return false;
    }
    const chain = (value as { chain?: unknown }).chain;
    return typeof chain === "object" && chain !== null && Array.isArray((chain as { values?: unknown }).values);
}

function unwrapArgumentValue(value: ArgumentValue): unknown {
    if ("string" in value) return value.string.value;
    if ("number" in value) return value.number.value;
    if ("boolean" in value) return value.boolean.value;
    if ("null" in value) return value.null.value;
    if ("array" in value) return value.array.value.map(unwrapArgumentValue);
    if ("chain" in value) return value;
    if ("object" in value) {
        const object: Record<string, unknown> = {};
        for (const [key, val] of Object.entries(value.object.value)) {
            object[key] = unwrapArgumentValue(val);
        }
        return object;
    }
    throw new Error("Unknown argument value type");
}

function renderValue(value: unknown): ExpressionRecord {
    if (typeof value === "string") {
        return {
            typescript: `"${value}"`,
            c: `v_string("${escapeCString(value)}")`,
        };
    }
    if (typeof value === "number") {
        return {
            typescript: `${value}`,
            c: `v_int(${value})`,
        };
    }
    if (typeof value === "boolean") {
        return {
            typescript: `${value}`,
            c: `v_bool(${value ? 1 : 0})`,
        };
    }
    if (value === null) {
        return {
            typescript: "null",
            c: "v_null()",
        };
    }
    if (Array.isArray(value)) {
        const items = value.map((item) => renderValue(item));
        return {
            typescript: `[${items.map((item) => item.typescript).join(", ")}]`,
            c: items.length
                ? `arr(${items.map((item) => item.c).join(", ")})`
                : `arr()`,
        };
    }
    if (value instanceof Map) {
        const entries = Array.from(value.entries()).map(([key, val]) => ({
            key,
            value: renderValue(val),
        }));
        return {
            typescript: `new Map([${entries
                .map(
                    (entry) =>
                        `[${JSON.stringify(entry.key)}, ${entry.value.typescript}]`
                )
                .join(", ")}])`,
            c: entries.length
                ? `map(${entries
                      .map(
                          (entry) =>
                              `entry("${escapeCString(entry.key)}", ${entry.value.c})`
                      )
                      .join(", ")})`
                : `map()`,
        };
    }
    if (typeof value === "object") {
        const entries = Object.entries(value).map(([key, val]) => ({
            key,
            value: renderValue(val),
        }));
        return {
            typescript: `{${entries
                .map(
                    (entry) =>
                        `${JSON.stringify(entry.key)}: ${entry.value.typescript}`
                )
                .join(", ")}}`,
            c: entries.length
                ? `map(${entries
                      .map(
                          (entry) =>
                              `entry("${escapeCString(entry.key)}", ${entry.value.c})`
                      )
                      .join(", ")})`
                : `map()`,
        };
    }
    throw new Error("Unsupported value type");
}

function pickExpression(expressions: ExpressionRecord, languages: LanguageType[]): string {
    for (const lang of languages) {
        const value = expressions[lang];
        if (value !== undefined) return value;
    }
    throw new Error(`Structure call argument has no expression for language(s): ${languages.join(", ")}`);
}

function renderCallArgument(argument: unknown): ExpressionRecord {
    if (isExpressionRecord(argument)) {
        return argument;
    }
    if (isChainArgument(argument)) {
        const subState: ChainState = { statements: { typescript: [], c: [] }, variables: { typescript: {}, c: {} } };
        return renderCallArgument(runChain(argument.chain.values, subState));
    }
    return renderValue(argument);
}

type OperatorDef = { typescript: string; c: string; arity: 1 | 2 };

const OPERATORS: Record<string, OperatorDef> = {
    add: { typescript: "+", c: "+", arity: 2 },
    subtract: { typescript: "-", c: "-", arity: 2 },
    multiply: { typescript: "*", c: "*", arity: 2 },
    divide: { typescript: "/", c: "/", arity: 2 },
    modulo: { typescript: "%", c: "%", arity: 2 },
    equal: { typescript: "===", c: "==", arity: 2 },
    notEqual: { typescript: "!==", c: "!=", arity: 2 },
    greaterThan: { typescript: ">", c: ">", arity: 2 },
    lessThan: { typescript: "<", c: "<", arity: 2 },
    greaterThanOrEqual: { typescript: ">=", c: ">=", arity: 2 },
    lessThanOrEqual: { typescript: "<=", c: "<=", arity: 2 },
    and: { typescript: "&&", c: "&&", arity: 2 },
    or: { typescript: "||", c: "||", arity: 2 },
    xor: { typescript: "^", c: "^", arity: 2 },
    not: { typescript: "!", c: "!", arity: 1 },
    bitwiseAnd: { typescript: "&", c: "&", arity: 2 },
    bitwiseOr: { typescript: "|", c: "|", arity: 2 },
    leftShift: { typescript: "<<", c: "<<", arity: 2 },
    rightShift: { typescript: ">>", c: ">>", arity: 2 },
};

function renderRawValue(value: unknown): ExpressionRecord {
    if (typeof value === "string") {
        return {
            typescript: `"${value}"`,
            c: `"${escapeCString(value)}"`,
        };
    }
    if (typeof value === "number") {
        return {
            typescript: `${value}`,
            c: `${value}`,
        };
    }
    if (typeof value === "boolean") {
        return {
            typescript: `${value}`,
            c: `${value ? 1 : 0}`,
        };
    }
    if (value === null) {
        return {
            typescript: "null",
            c: "0",
        };
    }
    if (Array.isArray(value)) {
        const items = value.map(renderRawValue);
        return {
            typescript: `[${items.map((item) => item.typescript).join(", ")}]`,
            c: `{${items.map((item) => item.c).join(", ")}}`,
        };
    }
    if (typeof value === "object") {
        const entries = Object.entries(value).map(([key, val]) => ({ key, value: renderRawValue(val) }));
        return {
            typescript: `{${entries
                .map((entry) => `${JSON.stringify(entry.key)}: ${entry.value.typescript}`)
                .join(", ")}}`,
            c: `{${entries
                .map((entry) => `"${escapeCString(entry.key)}", ${entry.value.c}`)
                .join(", ")}}`,
        };
    }
    throw new Error("Unsupported operator operand type");
}

function renderOperatorOperand(value: unknown): ExpressionRecord {
    if (isExpressionRecord(value)) {
        return value;
    }
    if (isChainArgument(value)) {
        const subState: ChainState = { statements: { typescript: [], c: [] }, variables: { typescript: {}, c: {} } };
        return renderOperatorOperand(runChain(value.chain.values, subState));
    }
    return renderRawValue(value);
}

function buildOperatorExpression(name: string, op: OperatorDef, operands: ExpressionRecord[]): ExpressionRecord {
    const typescript = operands.map((operand) => operand.typescript);
    const c = operands.map((operand) => operand.c);
    if (op.arity === 1) {
        return {
            typescript: `${op.typescript}(${typescript[0]})`,
            c: `${op.c}(${c[0]})`,
        };
    }
    return {
        typescript: `(${typescript[0]} ${op.typescript} ${typescript[1]})`,
        c: `(${c[0]} ${op.c} ${c[1]})`,
    };
}

type ManipulationDef = {
    arity: number;
    render: (...args: ExpressionRecord[]) => ExpressionRecord;
};

const MANIPULATIONS: Record<string, ManipulationDef> = {
    stringConcat: {
        arity: 2,
        render: (a, b) => ({ typescript: `(${a.typescript} + ${b.typescript})`, c: `lt_str_concat(${a.c}, ${b.c})` }),
    },
    stringLength: {
        arity: 1,
        render: (a) => ({ typescript: `${a.typescript}.length`, c: `lt_len(${a.c})` }),
    },
    stringUpper: {
        arity: 1,
        render: (a) => ({ typescript: `${a.typescript}.toUpperCase()`, c: `lt_to_upper(${a.c})` }),
    },
    stringLower: {
        arity: 1,
        render: (a) => ({ typescript: `${a.typescript}.toLowerCase()`, c: `lt_to_lower(${a.c})` }),
    },
    stringTrim: {
        arity: 1,
        render: (a) => ({ typescript: `${a.typescript}.trim()`, c: `lt_trim(${a.c})` }),
    },
    stringSlice: {
        arity: 3,
        render: (a, start, end) => ({ typescript: `${a.typescript}.slice(${start.typescript}, ${end.typescript})`, c: `lt_slice(${a.c}, ${start.c}, ${end.c})` }),
    },
    stringReplace: {
        arity: 3,
        render: (a, search, replacement) => ({ typescript: `${a.typescript}.replaceAll(${search.typescript}, ${replacement.typescript})`, c: `lt_replace(${a.c}, ${search.c}, ${replacement.c})` }),
    },
    stringSplit: {
        arity: 2,
        render: (a, separator) => ({ typescript: `${a.typescript}.split(${separator.typescript})`, c: `lt_split(${a.c}, ${separator.c})` }),
    },
    stringIncludes: {
        arity: 2,
        render: (a, search) => ({ typescript: `${a.typescript}.includes(${search.typescript})`, c: `lt_contains(${a.c}, ${search.c})` }),
    },
    stringRepeat: {
        arity: 2,
        render: (a, count) => ({ typescript: `${a.typescript}.repeat(${count.typescript})`, c: `lt_repeat(${a.c}, ${count.c})` }),
    },
    stringCharAt: {
        arity: 2,
        render: (a, index) => ({ typescript: `${a.typescript}.charAt(${index.typescript})`, c: `lt_char_at(${a.c}, ${index.c})` }),
    },
    stringStartsWith: {
        arity: 2,
        render: (a, prefix) => ({ typescript: `${a.typescript}.startsWith(${prefix.typescript})`, c: `lt_starts_with(${a.c}, ${prefix.c})` }),
    },
    stringEndsWith: {
        arity: 2,
        render: (a, suffix) => ({ typescript: `${a.typescript}.endsWith(${suffix.typescript})`, c: `lt_ends_with(${a.c}, ${suffix.c})` }),
    },
    arrayGet: {
        arity: 2,
        render: (a, index) => ({ typescript: `${a.typescript}[${index.typescript}]`, c: `lt_index(${a.c}, ${index.c})` }),
    },
    arrayLength: {
        arity: 1,
        render: (a) => ({ typescript: `${a.typescript}.length`, c: `lt_len(${a.c})` }),
    },
    arrayAppend: {
        arity: 2,
        render: (a, item) => ({ typescript: `[...${a.typescript}, ${item.typescript}]`, c: `lt_append(${a.c}, ${item.c})` }),
    },
    arrayConcat: {
        arity: 2,
        render: (a, b) => ({ typescript: `[...${a.typescript}, ...${b.typescript}]`, c: `lt_arr_concat(${a.c}, ${b.c})` }),
    },
    arrayJoin: {
        arity: 2,
        render: (a, separator) => ({ typescript: `${a.typescript}.join(${separator.typescript})`, c: `lt_join(${a.c}, ${separator.c})` }),
    },
    arraySlice: {
        arity: 3,
        render: (a, start, end) => ({ typescript: `${a.typescript}.slice(${start.typescript}, ${end.typescript})`, c: `lt_slice(${a.c}, ${start.c}, ${end.c})` }),
    },
    arrayIncludes: {
        arity: 2,
        render: (a, item) => ({ typescript: `${a.typescript}.includes(${item.typescript})`, c: `lt_contains(${a.c}, ${item.c})` }),
    },
    arrayIndexOf: {
        arity: 2,
        render: (a, item) => ({ typescript: `${a.typescript}.indexOf(${item.typescript})`, c: `lt_index_of(${a.c}, ${item.c})` }),
    },
    arrayReverse: {
        arity: 1,
        render: (a) => ({ typescript: `[...${a.typescript}].reverse()`, c: `lt_reverse(${a.c})` }),
    },
    arraySort: {
        arity: 1,
        render: (a) => ({ typescript: `[...${a.typescript}].sort((left, right) => (left > right ? 1 : left < right ? -1 : 0))`, c: `lt_sort(${a.c})` }),
    },
    arrayUnique: {
        arity: 1,
        render: (a) => ({ typescript: `[...new Set(${a.typescript})]`, c: `lt_unique(${a.c})` }),
    },
    objectGet: {
        arity: 2,
        render: (a, key) => ({ typescript: `${a.typescript}[${key.typescript}]`, c: `lt_get(${a.c}, ${key.c})` }),
    },
    objectSet: {
        arity: 3,
        render: (a, key, value) => ({ typescript: `{ ...${a.typescript}, [${key.typescript}]: ${value.typescript} }`, c: `lt_set(${a.c}, ${key.c}, ${value.c})` }),
    },
    objectKeys: {
        arity: 1,
        render: (a) => ({ typescript: `Object.keys(${a.typescript})`, c: `lt_keys(${a.c})` }),
    },
    objectValues: {
        arity: 1,
        render: (a) => ({ typescript: `Object.values(${a.typescript})`, c: `lt_values(${a.c})` }),
    },
    objectHas: {
        arity: 2,
        render: (a, key) => ({ typescript: `Object.prototype.hasOwnProperty.call(${a.typescript}, ${key.typescript})`, c: `lt_has(${a.c}, ${key.c})` }),
    },
    objectMerge: {
        arity: 2,
        render: (a, b) => ({ typescript: `{ ...${a.typescript}, ...${b.typescript} }`, c: `lt_merge(${a.c}, ${b.c})` }),
    },
    objectDelete: {
        arity: 2,
        render: (a, key) => ({ typescript: `Object.fromEntries(Object.entries(${a.typescript}).filter(([entryKey]) => entryKey !== ${key.typescript}))`, c: `lt_delete(${a.c}, ${key.c})` }),
    },
    objectEntries: {
        arity: 1,
        render: (a) => ({ typescript: `Object.entries(${a.typescript})`, c: `lt_entries(${a.c})` }),
    },
};

function structureFunctionCall(functionName: string, args: unknown[]): ExpressionRecord {
    const method = normalizeName(functionName, "camel", true);
    const renderedArgs = args.map((arg) => renderCallArgument(arg));
    return {
        typescript: `this.${method}(${renderedArgs.map((arg) => pickExpression(arg, ["typescript"])).join(", ")})`,
        c: `${method}(${renderedArgs.map((arg) => pickExpression(arg, ["c"])).join(", ")})`,
    };
}

function structureVariableCall(variableName: string): ExpressionRecord {
    const property = normalizeName(variableName, "camel");
    return {
        typescript: `this.${property}`,
        c: `${property}`,
    };
}

function addStatements(state: ChainState, statements: StatementsRecord): void {
    for (const [lang, newStatements] of Object.entries(statements)) {
        if (!state.statements[lang as LanguageType]) {
            state.statements[lang as LanguageType] = [];
        }
        state.statements[lang as LanguageType]?.push(...newStatements);
    }
}

function addExpressionStatements(state: ChainState, expressions: ExpressionRecord): void {
    addStatements(state, {
        typescript: [`${expressions.typescript};`],
        c: [`${expressions.c};`],
    });
}

function addVariable(state: ChainState, variableName: string, value: unknown): void {
    const valueExpressions = renderCallArgument(value);
    const tsStatement = `const ${variableName} = ${valueExpressions.typescript};`;
    const cStatement = `ArgumentValue ${variableName} = ${valueExpressions.c};`;
    const declarations: StatementsRecord = {
        typescript: [tsStatement],
        c: [cStatement],
    };
    state.variables.typescript = { ...state.variables.typescript, [variableName]: tsStatement };
    state.variables.c = { ...state.variables.c, [variableName]: cStatement };
    addStatements(state, declarations);
}

function stripOuterParens(expression: string): string {
    if (!expression.startsWith("(") || !expression.endsWith(")")) return expression;
    let depth = 0;
    for (let index = 0; index < expression.length; index++) {
        const char = expression[index];
        if (char === "(") depth++;
        else if (char === ")") {
            depth--;
            if (depth === 0 && index !== expression.length - 1) return expression;
        }
    }
    return expression.slice(1, -1).trim();
}

function indentLines(lines: string[]): string[] {
    return lines
        .flatMap((line) => line.split("\n"))
        .map((line) => (line.length ? `  ${line}` : line));
}

function renderBlock(header: ExpressionRecord, body: StatementsRecord): StatementsRecord {
    const typescriptBody = indentLines(body.typescript).join("\n");
    const cBody = indentLines(body.c).join("\n");
    return {
        typescript: [`${header.typescript} {${typescriptBody ? `\n${typescriptBody}\n` : ""}}`],
        c: [`${header.c} {${cBody ? `\n${cBody}\n` : ""}}`],
    };
}

function renderCondition(value: unknown): ExpressionRecord {
    const expression = renderCallArgument(value);
    return {
        typescript: stripOuterParens(expression.typescript),
        c: stripOuterParens(expression.c),
    };
}

function renderBody(value: unknown): StatementsRecord {
    if (!isChainArgument(value)) {
        throw new Error(
            "Expected a body builder built from statements, e.g. addStatements(...)",
        );
    }
    const subState: ChainState = {
        statements: { typescript: [], c: [] },
        variables: { typescript: {}, c: {} },
    };
    runChain(value.chain.values, subState);
    return subState.statements;
}

function getResolvedStatements(state: ChainState): Record<LanguageType, string> {
    return {
        typescript: state.statements.typescript.join("\n"),
        c: state.statements.c.join("\n"),
    };
}

function runChain(values: ChainValue[], state: ChainState): unknown {
    for (const value of values) {
        if (!("functionCall" in value)) {
            throw new Error(`Unsupported chain value in lingua-tungga: ${JSON.stringify(Object.keys(value))}`);
        }

        const functionName = value.functionCall.name;
        const args = value.functionCall.arguments.map((argument) => unwrapArgumentValue(argument.argument));

        if (functionName === "setStatements") {
            state.statements = { ...state.statements, ...(args[0] as StatementsRecord) };
        } else if (functionName === "addStatements") {
            addStatements(state, args[0] as StatementsRecord);
        } else if (functionName === "getStatements") {
            state.result = state.statements;
            state.resultKind = "statements";
        } else if (functionName === "getResolvedStatements") {
            state.result = getResolvedStatements(state);
            state.resultKind = "statements";
        } else if (functionName === "structureFunctionCall") {
            state.result = structureFunctionCall(args[0] as string, (args[1] as unknown[]) ?? []);
            state.resultKind = "expression";
        } else if (functionName === "structureVariableCall") {
            state.result = structureVariableCall(args[0] as string);
            state.resultKind = "expression";
        } else if (functionName === "addStructureFunctionCall") {
            addExpressionStatements(state, structureFunctionCall(args[0] as string, (args[1] as unknown[]) ?? []));
        } else if (functionName === "addStructureVariableCall") {
            addExpressionStatements(state, structureVariableCall(args[0] as string));
        } else if (functionName === "addValue") {
            state.result = renderCallArgument(args[0]);
            state.resultKind = "expression";
        } else if (functionName === "addVariable") {
            addVariable(state, args[0] as string, args[1]);
        } else if (functionName === "freeCVariables") {
            addStatements(state, { typescript: [], c: ["lt_free_all();"] });
        } else if (functionName === "if") {
            const condition = renderCondition(args[0]);
            addStatements(state, renderBlock(
                { typescript: `if (${condition.typescript})`, c: `if (${condition.c})` },
                renderBody(args[1]),
            ));
        } else if (functionName === "elseIf") {
            const condition = renderCondition(args[0]);
            addStatements(state, renderBlock(
                { typescript: `else if (${condition.typescript})`, c: `else if (${condition.c})` },
                renderBody(args[1]),
            ));
        } else if (functionName === "else") {
            addStatements(state, renderBlock({ typescript: "else", c: "else" }, renderBody(args[0])));
        } else if (functionName === "while") {
            const condition = renderCondition(args[0]);
            addStatements(state, renderBlock(
                { typescript: `while (${condition.typescript})`, c: `while (${condition.c})` },
                renderBody(args[1]),
            ));
        } else if (functionName === "forEach") {
            const array = renderCallArgument(args[0]);
            const variableName = args[1] as string;
            const body = renderBody(args[2]);
            const indexName = `${variableName}Index`;
            const arrayName = `${variableName}Array`;
            const cBodyLines = [
                `ArgumentValue ${variableName} = ((const ArgumentValue *)${arrayName}.as.data)[${indexName}];`,
                ...body.c,
            ];
            addStatements(state, {
                typescript: [
                    `for (const ${variableName} of ${array.typescript}) {\n${indentLines(body.typescript).join("\n")}\n}`,
                ],
                c: [
                    `ArgumentValue ${arrayName} = ${array.c};`,
                    `for (size_t ${indexName} = 0; ${indexName} < ${arrayName}.count; ${indexName}++) {\n${indentLines(cBodyLines).join("\n")}\n}`,
                ],
            });
        } else if (functionName === "forCounter") {
            const init = renderCallArgument(args[0]);
            const condition = renderCondition(args[1]);
            const update = renderCallArgument(args[2]);
            addStatements(state, renderBlock(
                {
                    typescript: `for (${init.typescript}; ${condition.typescript}; ${update.typescript})`,
                    c: `for (${init.c}; ${condition.c}; ${update.c})`,
                },
                renderBody(args[3]),
            ));
        } else if (functionName === "variableForCounter") {
            const name = args[0] as string;
            state.result = { typescript: name, c: name };
            state.resultKind = "expression";
        } else if (functionName === "declareForCounter") {
            const name = args[0] as string;
            const value = renderOperatorOperand(args[1]);
            state.result = {
                typescript: `let ${name} = ${value.typescript}`,
                c: `long long ${name} = ${value.c}`,
            };
            state.resultKind = "expression";
        } else if (functionName === "incrementForCounter") {
            const target = renderOperatorOperand(args[0]);
            state.result = {
                typescript: `(${target.typescript}++)`,
                c: `(${target.c}++)`,
            };
            state.resultKind = "expression";
        } else {
            const manipulation = MANIPULATIONS[functionName];
            const op = OPERATORS[functionName];
            if (manipulation !== undefined) {
                const operands = args.slice(0, manipulation.arity).map(renderCallArgument);
                state.result = manipulation.render(...operands);
                state.resultKind = "expression";
            } else if (op !== undefined) {
                const operands = args.slice(0, op.arity).map(renderOperatorOperand);
                state.result = buildOperatorExpression(functionName, op, operands);
                state.resultKind = "expression";
            } else {
                throw new Error(`Unknown lingua-tungga function call: ${functionName}`);
            }
        }
    }
    return state.result ?? getResolvedStatements(state);
}

export function generate(schema: SchemaType): Record<LanguageType, string> {
    const statements: StatementsRecord = { typescript: [], c: [] };
    const variables: VariablesRecord = { typescript: {}, c: {} };

    const state: ChainState = { statements, variables };
    const result = runChain(schema.schema.chain.chain.values, state) as Record<LanguageType, unknown>;

    if ((state.resultKind ?? "statements") !== "expression" && statements.c.length > 0 && statements.c[statements.c.length - 1] !== "lt_free_all();") {
        statements.c.push("lt_free_all();");
    }

    const resolved: Record<LanguageType, string> = { typescript: "", c: "" };
    for (const lang of LANGUAGE_KEYS) {
        const value = result[lang];
        if (Array.isArray(value)) {
            resolved[lang] = value.join("\n");
        } else if (typeof value === "string") {
            resolved[lang] = value;
            if (lang === "c" && (state.resultKind ?? "statements") !== "expression" && value.length > 0 && !value.endsWith("lt_free_all();")) {
                resolved[lang] = `${value}\nlt_free_all();`;
            }
        }
    }
    return resolved;
}
