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
    const valueExpressions = renderValue(value);
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
        } else if (functionName === "getResolvedStatements") {
            state.result = getResolvedStatements(state);
        } else if (functionName === "structureFunctionCall") {
            state.result = structureFunctionCall(args[0] as string, (args[1] as unknown[]) ?? []);
        } else if (functionName === "structureVariableCall") {
            state.result = structureVariableCall(args[0] as string);
        } else if (functionName === "addStructureFunctionCall") {
            addExpressionStatements(state, structureFunctionCall(args[0] as string, (args[1] as unknown[]) ?? []));
        } else if (functionName === "addStructureVariableCall") {
            addExpressionStatements(state, structureVariableCall(args[0] as string));
        } else if (functionName === "addValue") {
            state.result = renderValue(args[0]);
        } else if (functionName === "addVariable") {
            addVariable(state, args[0] as string, args[1]);
        } else {
            throw new Error(`Unknown lingua-tungga function call: ${functionName}`);
        }
    }
    return state.result ?? getResolvedStatements(state);
}

export function generate(schema: SchemaType): Record<LanguageType, string> {
    const statements: StatementsRecord = { typescript: [], c: [] };
    const variables: VariablesRecord = { typescript: {}, c: {} };

    const result = runChain(schema.schema.chain.chain.values, { statements, variables }) as Record<LanguageType, unknown>;

    const resolved: Record<LanguageType, string> = { typescript: "", c: "" };
    for (const lang of LANGUAGE_KEYS) {
        const value = result[lang];
        if (Array.isArray(value)) {
            resolved[lang] = value.join("\n");
        } else if (typeof value === "string") {
            resolved[lang] = value;
        }
    }
    return resolved;
}
