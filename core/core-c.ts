import { normalizeName } from "./utils";
import type { ArgumentType, CustomFunctionType, ProjectType, StructureType } from "./core.types";
import type { StructType } from "./base/typescript/base-types";

type InitFunctionType = ProjectType["project"]["initFunctions"][number];
type ModelFunction = Extract<StructureType["structure"]["functions"][number], { function: any }>;

export type BaseCFiles = {
    "base-types.h": string;
    "base-utils.h": string;
    "base-utils.c": string;
    "cJSON.h": string;
    "cJSON.c": string;
};

function escapeCString(value: string): string {
    return value.replace(/"/g, '\\"');
}

const C_RESERVED_WORDS = new Set([
    "auto", "break", "case", "char", "const", "continue", "default", "do",
    "double", "else", "enum", "extern", "float", "for", "goto", "if", "inline",
    "int", "long", "register", "restrict", "return", "short", "signed",
    "sizeof", "static", "struct", "switch", "typedef", "union", "unsigned",
    "void", "volatile", "while", "_Bool", "_Complex", "_Imaginary",
]);

function safeCMacroName(name: string): string {
    return C_RESERVED_WORDS.has(name) ? `${name}_` : name;
}

export function stringifyCStruct(struct: StructType['struct']): string {
    if ("string" in struct) {
        return "{ .kind = S_STRING }";
    } else if ("number" in struct) {
        return "{ .kind = S_NUMBER }";
    } else if ("boolean" in struct) {
        return "{ .kind = S_BOOL }";
    } else if ("null" in struct) {
        return "{ .kind = S_NULL }";
    } else if ("union" in struct) {
        const types = struct.union.types.map(type => stringifyCStruct(type));
        return `{ .kind = S_UNION, .as.unionType = { .count = ${types.length}, .types = (StructType[]){ ${types.join(', ')} } } }`;
    } else if ("array" in struct) {
        return `{ .kind = S_ARRAY, .as.array = { .elem = &(StructType)${stringifyCStruct(struct.array.type)} } }`;
    } else if ("map" in struct) {
        return `{ .kind = S_MAP, .as.map = { .value = &(StructType)${stringifyCStruct(struct.map.type)} } }`;
    } else if ("object" in struct) {
        const keys = Object.entries(struct.object).map(([key, val]) => `{ "${key}", ${stringifyCStruct(val)} }`);
        return `{ .kind = S_OBJECT, .as.object = { .count = ${keys.length}, .keys = (StructKey[]){ ${keys.join(', ')} } } }`;
    } else if ("structureCall" in struct) {
        return `{ .kind = S_STRUCT_CALL, .as.structureCall = { .name = "${normalizeName(struct.structureCall.name, "kebab")}" } }`;
    } else if ("literal" in struct) {
        const { value, type } = struct.literal;
        if (type === "string") {
            return `{ .kind = S_LITERAL, .as.literal = { .type = D_STRING, .value.s = "${escapeCString(value)}" } }`;
        }
        if (type === "boolean") {
            return `{ .kind = S_LITERAL, .as.literal = { .type = D_BOOL, .value.i = ${value ? 1 : 0} } }`;
        }
        return Number.isInteger(value)
            ? `{ .kind = S_LITERAL, .as.literal = { .type = D_INT, .value.i = ${value} } }`
            : `{ .kind = S_LITERAL, .as.literal = { .type = D_FLOAT, .value.f = ${value} } }`;
    } else {
        throw new Error("Unknown struct type for C");
    }
}

function cDefaultLiteral(def: NonNullable<ArgumentType["argument"]["default"]>): string {
    if ("string" in def) return `"${escapeCString(def.string.value)}"`;
    if ("number" in def) return def.number.value.toString();
    if ("boolean" in def) return def.boolean.value ? "1" : "0";
    if ("null" in def) return "NULL";
    if ("array" in def) {
        const items = def.array.value.map(cDefaultContainerItem);
        return items.length
            ? `arr(${items.join(", ")})`
            : `((ArgumentValue){ .type = D_ARRAY, .count = 0, .as.data = 0 })`;
    }
    if ("object" in def) {
        const entries = Object.entries(def.object.value)
            .map(([key, value]) => `entry("${escapeCString(key)}", ${cDefaultContainerItem(value)})`);
        return entries.length
            ? `map(${entries.join(", ")})`
            : `((ArgumentValue){ .type = D_MAP, .count = 0, .as.data = 0 })`;
    }
    if ("chain" in def) throw new Error("Chain defaults are not supported in C");
    throw new Error("Unsupported default value type for C");
}

function cDefaultContainerItem(def: NonNullable<ArgumentType["argument"]["default"]>): string {
    if ("boolean" in def) return `v_bool(${def.boolean.value ? "1" : "0"})`;
    return cDefaultLiteral(def);
}

function cDefaultArgExpr(def: NonNullable<ArgumentType["argument"]["default"]>, struct: StructType['struct']): string {
    const literal = cDefaultLiteral(def);
    return "boolean" in struct ? `v_bool(${literal})` : `v(${literal})`;
}

function cStructTypeName(struct: StructType['struct']): string {
    if ("string" in struct) return "string";
    if ("number" in struct) return "number";
    if ("boolean" in struct) return "boolean";
    if ("null" in struct) return "null";
    if ("array" in struct) return `array<${cStructTypeName(struct.array.type)}>`;
    if ("map" in struct) return `map<${cStructTypeName(struct.map.type)}>`;
    if ("object" in struct) {
        const entries = Object.entries(struct.object).map(([key, val]) => `${key}: ${cStructTypeName(val)}`).join(", ");
        return `{ ${entries} }`;
    }
    if ("union" in struct) return struct.union.types.map(cStructTypeName).join(" | ");
    if ("literal" in struct) {
        return struct.literal.type === "string"
            ? `"${escapeCString(struct.literal.value)}"`
            : String(struct.literal.value);
    }
    if ("structureCall" in struct) return `chain<${normalizeName(struct.structureCall.name, "kebab")}>`;
    throw new Error("Unknown struct type for C");
}

function cDefaultDoc(def: NonNullable<ArgumentType["argument"]["default"]>): string {
    if ("string" in def) return `"${escapeCString(def.string.value)}"`;
    if ("number" in def) return def.number.value.toString();
    if ("boolean" in def) return def.boolean.value ? "true" : "false";
    if ("null" in def) return "null";
    if ("array" in def) {
        const items = def.array.value.map(cDefaultDoc).join(", ");
        return items ? `[ ${items} ]` : "[]";
    }
    if ("object" in def) {
        const entries = Object.entries(def.object.value)
            .map(([key, value]) => `"${escapeCString(key)}": ${cDefaultDoc(value)}`);
        return entries.length ? `{ ${entries.join(", ")} }` : "{}";
    }
    if ("chain" in def) throw new Error("Chain defaults are not supported in C");
    throw new Error("Unsupported default value type for C");
}

function compactComment(
    params: { name: string, type?: string, default?: string }[],
    returns: string,
): string {
    const lines = ["/**"];
    for (const param of params) {
        let line = ` * @param ${param.name}`;
        if (param.type) line += ` ${param.type}`;
        if (param.default) line += ` (default: ${param.default})`;
        lines.push(line);
    }
    lines.push(` * @return ${returns}`);
    lines.push(" */");
    return lines.join("\n");
}

function plainDocLines(doc: string): string[] {
    return doc.split("\n").slice(1, -1).map(line => {
        const t = line.replace(/^ \* ?/, "");
        const pm = t.match(/^@param (\S+) (.*)$/);
        if (pm) return ` *   param => ${pm[1]} : ${pm[2]}`;
        const rm = t.match(/^@return (.*)$/);
        if (rm) return ` *   return => ${rm[1]}`;
        return ` * ${t}`;
    });
}

function mergeDocs(docs: { structure: string, doc: string }[]): string {
    if (docs.length === 1) return docs[0]!.doc;
    const lines = ["/*"];
    docs.forEach((entry, i) => {
        if (i > 0) lines.push(" * ");
        lines.push(` * ${entry.structure}`);
        lines.push(...plainDocLines(entry.doc));
    });
    lines.push(" */");
    return lines.join("\n");
}

function functionMacroBlocks(func: ModelFunction): { name: string, doc: string, body: string }[] {
    const name = func.function.name;
    const macroName = safeCMacroName(normalizeName(func.function.name, "camel", true));
    const args = func.function.arguments;
    const returnName = normalizeName(func.function.return.structureCall.name, "kebab");
    const returns = `Builder (function-call) : ${returnName}`;
    if (func.function.isTemplateLiteral) {
        const doc = compactComment(
            [{ name: "...", type: "variadic" }],
            returns,
        );
        return [{
            name: macroName,
            doc,
            body: `#define ${macroName}(...) \\
    ({ \\
        const ArgumentValue _vals[] = { VA_MAP(v, __VA_ARGS__) }; \\
        size_t _n = sizeof(_vals) / sizeof(_vals[0]); \\
        size_t _cnt = 0; \\
        for (size_t _i = 0; _i < _n; _i++) \\
            _cnt += !(_vals[_i].type == D_STRING && _vals[_i].as.s[0] == '\\0'); \\
        ArgumentType *_args = alloca((_cnt ? _cnt : 1) * sizeof(ArgumentType)); \\
        size_t _j = 0; \\
        for (size_t _i = 0; _i < _n; _i++) \\
            if (!(_vals[_i].type == D_STRING && _vals[_i].as.s[0] == '\\0')) \\
                _args[_j++] = (ArgumentType){ .argument = _vals[_i], .hasDefault = 0, .def = {0}, .provided = 1 }; \\
        builder_single(0, &(ChainValue){ \\
            .kind = V_FUNCTION_CALL, \\
            .as.functionCall = { \\
                .name = "${name}", \\
                .arguments = _args, \\
                .argumentCount = _cnt, \\
                .isTemplateLiteral = 1, \\
            } \\
        }); \\
    })`,
        }];
    }
    const params = args.map(arg => normalizeName(arg.argument.name, "camel"));
    const mkargs = args.map((arg, index) => {
        const param = params[index];
        const struct = arg.argument.struct.struct;
        if ("structureCall" in struct) {
            return `mkarg(v(${param}))`;
        }
        const argInner = "boolean" in struct
            ? `_Generic((${param}), ArgumentValue: v_pass, default: v_bool)(${param})`
            : `v(${param})`;
        if (arg.argument.default === undefined) {
            return `mkarg(${argInner})`;
        }
        return `mkarg_def(${argInner}, ${cDefaultArgExpr(arg.argument.default, struct)})`;
    }).join(", ");
    const callExpr = `builder_call("${name}", ((ArgumentType[]){ ${mkargs} }), ${args.length}, 0)`;
    const singleArgWithDefault = args[0] && args[0].argument.default !== undefined && !("structureCall" in args[0].argument.struct.struct);
    if (args.length === 1 && singleArgWithDefault) {
        const arg0 = args[0]!;
        const param = params[0]!;
        const struct = arg0.argument.struct.struct;
        const argInner = "boolean" in struct
            ? `_Generic((${param}), ArgumentValue: v_pass, default: v_bool)(${param})`
            : `v(${param})`;
        const doc = compactComment(
            [{ name: param, type: cStructTypeName(struct), default: cDefaultDoc(arg0.argument.default!) }],
            returns,
        );
        return [{
            name: macroName,
            doc,
            body: `#define ${macroName}(...) \\
    CAT(${macroName}_, __VA_OPT__(1))(__VA_ARGS__)
#define ${macroName}_1(${param}) \\
    ${callExpr}
#define ${macroName}_() \\
    ${macroName}_1(${cDefaultLiteral(arg0.argument.default!)})`,
        }];
    }
    const doc = compactComment(
        args.map(arg => ({
            name: normalizeName(arg.argument.name, "camel"),
            type: cStructTypeName(arg.argument.struct.struct),
            default: arg.argument.default !== undefined ? cDefaultDoc(arg.argument.default) : undefined,
        })),
        returns,
    );
    return [{
        name: macroName,
        doc,
        body: `#define ${macroName}(${params.join(", ")}) \\
    ${callExpr}`,
    }];
}

function generateRegistry(definition: StructureType): string {
    const snake = normalizeName(definition.structure.name, "snake");
    const declarations: string[] = [];
    const entries: string[] = [];
    definition.structure.functions.forEach(func => {
        if (!("function" in func)) return;
        const f = func.function;
        const base = `${snake}_${normalizeName(f.name, "snake")}`;
        const returnName = normalizeName(f.return.structureCall.name, "kebab");
        if (f.isTemplateLiteral) {
            const expr = f.arguments[0]?.argument.struct.struct;
            declarations.push(`static const StructType ${base}_expr = ${expr ? stringifyCStruct(expr) : "{ .kind = S_STRING }"};`);
            declarations.push(`static const StructType ${base}_args[] = { { .kind = S_STRING }, ${base}_expr };`);
            entries.push(`    { "${f.name}", 1, ${base}_args, 2, "${returnName}" },`);
        } else {
            const argNames: string[] = [];
            f.arguments.forEach((arg, index) => {
                const nm = `${base}_arg${index}`;
                declarations.push(`static const StructType ${nm} = ${stringifyCStruct(arg.argument.struct.struct)};`);
                argNames.push(nm);
            });
            if (argNames.length === 1) {
                entries.push(`    { "${f.name}", 0, &${argNames[0]}, 1, "${returnName}" },`);
            } else {
                declarations.push(`static const StructType ${base}_args[] = { ${argNames.join(", ")} };`);
                entries.push(`    { "${f.name}", 0, ${base}_args, ${argNames.length}, "${returnName}" },`);
            }
        }
    });
    return `${declarations.join("\n")}\n\nstatic const FunctionSignature ${snake}_functions[] = {\n${entries.join("\n")}\n};`;
}

function generatePropertiesRegistry(definition: StructureType): string {
    const snake = normalizeName(definition.structure.name, "snake");
    const entries: string[] = [];
    definition.structure.variables.forEach(variable => {
        if (!("variable" in variable)) return;
        const name = normalizeName(variable.variable.name, "camel");
        const returnName = normalizeName(variable.variable.value.structureCall.name, "kebab");
        entries.push(`    { "${name}", "${returnName}" },`);
    });
    if (entries.length === 0) return "";
    return `static const PropertySignature ${snake}_properties[] = {\n${entries.join("\n")}\n};`;
}

function createMacro(definition: StructureType, init: InitFunctionType, index: number, importPaths: ProjectType["project"]["importPaths"]): string {
    const kebab = normalizeName(definition.structure.name, "kebab");
    const exportName = definition.structure.exportName || "schema" + (index + 1);
    const initName = init.name;
    const initMacroName = normalizeName(initName, "camel");
    const importString = escapeCString(`import { ${normalizeName(initName, "camel")} } from "${importPaths['c'] ?? importPaths['typescript'] ?? ""}"`);
    return `${compactComment(
        [
            { name: "variableName", type: "variableName( var : string )" },
            { name: "...", type: "chain ( function-call | copy( builder ) )" },
        ],
        `Builder (schema) : ${kebab}`,
    )}
#define ${initMacroName}(meta, ...) \\
    ((Builder){ \\
        .type = "init-function", \\
        .schema = validate_and_return( \\
            (SchemaType){ \\
                .exportName = "${exportName}", \\
                .chain = ({ \\
                    Builder __lt_chain_args[] = { __VA_ARGS__ }; \\
                    builder_chain( \\
                        "${kebab}", \\
                        __lt_chain_args, \\
                        sizeof(__lt_chain_args) / sizeof(__lt_chain_args[0]), \\
                        (InitFunctionType){ \\
                            .name = "${initName}", \\
                            .variableName = (meta).schema.chain.initFunction.variableName, \\
                            .importString = "${importString}", \\
                        }); }), \\
            }, \\
            gntrees_structures, COUNT_OF(gntrees_structures)) \\
    })`;
}

type CustomFunctionOccurrence = {
    structureName: string;
    kebab: string;
    snake: string;
    customFunction: CustomFunctionType["customFunction"];
};

function customFunctionBlocks(occurrences: CustomFunctionOccurrence[]): { name: string, docs: { structure: string, doc: string }[], body: string } {
    const first = occurrences[0]!.customFunction;
    const name = first.name;
    const macroName = safeCMacroName(normalizeName(name, "camel"));
    const nameSnake = normalizeName(name, "snake");
    const argCount = first.arguments.length;
    const params = first.arguments.map(arg => normalizeName(arg.argument.name, "camel"));

    const unionArgStructs: string[] = [];
    for (let i = 0; i < argCount; i++) {
        const structs = occurrences.map(o => stringifyCStruct(o.customFunction.arguments[i]!.argument.struct.struct));
        const unique = [...new Set(structs)];
        unionArgStructs.push(unique.length === 1 ? unique[0]! : `{ .kind = S_UNION, .as.unionType = { .count = ${unique.length}, .types = (StructType[]){ ${unique.join(', ')} } } }`);
    }

    const impls = occurrences.map(o => {
        const fnName = `${o.snake}_${nameSnake}_impl`;
        const returnType = o.customFunction.return["c"];
        const body = o.customFunction.body["c"];
        const unusedParams = ["builder", "args", "count"].map(param => `(void)${param};`).join(" ");
        const needsReturn = returnType.trim() !== "void" && !/\breturn\b/.test(body);
        const fallback = needsReturn ? "\nreturn 0;" : "";
        return `static ${returnType} ${fnName}(Builder builder, ArgumentType *args, size_t count) {\n${unusedParams}\n${body}${fallback}\n}`;
    }).join("\n\n");

    const base = `${occurrences[0]!.snake}_${nameSnake}`;
    let sigArgs = "0";
    if (argCount === 1) {
        sigArgs = `&${base}_arg0`;
    } else if (argCount > 1) {
        sigArgs = `${base}_args`;
    }
    const argStructs = argCount > 0
        ? (argCount === 1
            ? `static const StructType ${base}_arg0 = ${unionArgStructs[0]};\n`
            : unionArgStructs.map((s, i) => `static const StructType ${base}_arg${i} = ${s};`).join("\n") + `\nstatic const StructType ${base}_args[] = { ${unionArgStructs.map((_, i) => `${base}_arg${i}`).join(", ")} };\n`)
        : "";
    const sigLine = `${argStructs}static const FunctionSignature ${base}_sig = { "${name}", 0, ${sigArgs}, ${argCount}, "${occurrences[0]!.kebab}" };`;

    const mkargs = first.arguments.map((arg, index) => {
        const param = params[index]!;
        const struct = arg.argument.struct.struct;
        const argInner = "boolean" in struct
            ? `_Generic((${param}), ArgumentValue: v_pass, default: v_bool)(${param})`
            : `v(${param})`;
        if (arg.argument.default === undefined) return `mkarg(${argInner})`;
        return `mkarg_def(${argInner}, ${cDefaultArgExpr(arg.argument.default, struct)})`;
    }).join(", ");

    const structureCheck = occurrences.map(o => `strcmp((builder).schema.chain.typeName, "${o.kebab}") == 0`).join(" || ");

    const lines: string[] = [];
    if (argCount > 0) lines.push(`ArgumentType _args[] = { ${mkargs} };`);
    lines.push(`if (!(builder).schema.chain.typeName || !(${structureCheck}))`);
    lines.push(`    fail("custom function '${name}' is not a member of structure '%s'", (builder).schema.chain.typeName ? (builder).schema.chain.typeName : "(none)");`);
    if (argCount > 0) {
        lines.push(`validate_function_args(&(FunctionCallType){ .name = "${name}", .arguments = _args, .argumentCount = ${argCount}, .isTemplateLiteral = 0 }, &${base}_sig, gntrees_structures, COUNT_OF(gntrees_structures));`);
    }

    const implArg = argCount > 0 ? `_args, ${argCount}` : "0, 0";
    const dispatch = occurrences.length === 1
        ? `${occurrences[0]!.snake}_${nameSnake}_impl((builder), ${implArg});`
        : occurrences.map((o, i) => {
            const call = `${o.snake}_${nameSnake}_impl((builder), ${implArg})`;
            if (i === 0) return `strcmp((builder).schema.chain.typeName, "${o.kebab}") == 0 ? ${call}`;
            if (i === occurrences.length - 1) return `: ${call};`;
            return `: strcmp((builder).schema.chain.typeName, "${o.kebab}") == 0 ? ${call}`;
        }).join(" ");
    lines.push(dispatch);

    const macro = `#define ${macroName}(${["builder", ...params].join(", ")}) \\\n    ({ \\\n        ${lines.join(" \\\n        ")} \\\n    })`;

    const docs = occurrences.map(o => ({
        structure: o.structureName,
        doc: compactComment(
            o.customFunction.arguments.map(arg => ({
                name: normalizeName(arg.argument.name, "camel"),
                type: cStructTypeName(arg.argument.struct.struct),
                default: arg.argument.default !== undefined ? cDefaultDoc(arg.argument.default) : undefined,
            })),
            o.customFunction.return["c"],
        ),
    }));

    return {
        name: macroName,
        docs,
        body: `${impls}\n\n${sigLine}\n\n${macro}`,
    };
}

function generateCDefinitionSection(
    definition: StructureType,
    project: ProjectType,
    index: number,
    macroMap: Map<string, { docs: { structure: string, doc: string }[], body: string }>,
    macroOrder: { name: string, index: number }[],
): string {
    const structureName = definition.structure.name;
    const kebab = normalizeName(structureName, "kebab");
    const snake = normalizeName(structureName, "snake");

    const macroSections: string[] = [];
    macroOrder.forEach(({ name, index: firstIndex }) => {
        if (firstIndex !== index) return;
        const entry = macroMap.get(name)!;
        macroSections.push(`${mergeDocs(entry.docs)}\n${entry.body}`);
    });

    const registry = generateRegistry(definition);

    const initFunctions = project.project.initFunctions.filter(init =>
        "structureCall" in init.return && init.return.structureCall.name === structureName
    );
    const creates = (initFunctions.length > 0 ? initFunctions : [{
        name: `create-${kebab}`,
        withVariableName: false,
        return: { structureCall: { name: structureName } },
    } as InitFunctionType])
        .map(init => createMacro(definition, init, index, project.project.importPaths))
        .join("\n\n");

    const customVariables = definition.structure.variables
        .filter(variable => "customVariable" in variable)
        .map(variable => `extern ArgumentValue ${normalizeName(variable.customVariable.name, "snake")};`);
    const variables = definition.structure.variables
        .filter(variable => "variable" in variable)
        .map(variable => {
            const varName = normalizeName(variable.variable.name, "camel");
            const typeName = normalizeName(variable.variable.value.structureCall.name, "kebab");
            return `/**
 * @return Builder property-call
 */
static Builder ${varName} = {
    .type = "property-call",
    .schema = { .exportName = 0, .chain = {
        .typeName = "${typeName}",
        .values = (ChainValue[]){ { .kind = V_PROPERTY_CALL, .as.propertyCall = { .name = "${varName}" } } },
        .valueCount = 1,
        .initFunction = {0},
    } }
};`;
        });
    const parts: string[] = [];
    if (macroSections.length) parts.push(macroSections.join("\n\n"));
    parts.push(registry);
    const propertyRegistry = generatePropertiesRegistry(definition);
    if (propertyRegistry) parts.push(propertyRegistry);
    if (creates) parts.push(creates);
    const custom = [...customVariables, ...variables].join("\n");
    if (custom) parts.push(custom);

    return `// ==== ${structureName} ====\n\n` + parts.join("\n\n");
}

function stripLocalIncludes(content: string): string {
    return content
        .split("\n")
        .filter(line => !/^\s*#\s*include\s+"(?:base-types|base-utils|cJSON)\.h"/.test(line))
        .join("\n");
}

function stripPosixDefine(content: string): string {
    return content
        .split("\n")
        .filter(line => !/^\s*#\s*define\s+_POSIX_C_SOURCE/.test(line))
        .join("\n");
}

export function generateCSingleHeader(project: ProjectType, base: BaseCFiles): string {
    const projectName = project.project.projectName;
    const guard = `GN_TREES_${normalizeName(projectName, "snake").toUpperCase()}_H`;

    const macroMap = new Map<string, { docs: { structure: string, doc: string }[], body: string }>();
    const macroOrder: { name: string, index: number }[] = [];
    project.project.definitions.forEach((definition, index) => {
        const structureName = definition.structure.name;
        definition.structure.functions.forEach(func => {
            if (!("function" in func)) return;
            functionMacroBlocks(func).forEach(block => {
                const entry = macroMap.get(block.name);
                if (entry) {
                    entry.docs.push({ structure: structureName, doc: block.doc });
                } else {
                    macroMap.set(block.name, { docs: [{ structure: structureName, doc: block.doc }], body: block.body });
                    macroOrder.push({ name: block.name, index });
                }
            });
        });
    });

    const customFnGroups = new Map<string, CustomFunctionOccurrence[]>();
    project.project.definitions.forEach((definition, index) => {
        const structureName = definition.structure.name;
        definition.structure.functions.forEach(func => {
            if (!("customFunction" in func)) return;
            const macroName = normalizeName(func.customFunction.name, "camel");
            const entry = customFnGroups.get(macroName) ?? [];
            entry.push({
                structureName,
                kebab: normalizeName(structureName, "kebab"),
                snake: normalizeName(structureName, "snake"),
                customFunction: func.customFunction,
            });
            customFnGroups.set(macroName, entry);
        });
    });
    customFnGroups.forEach((occurrences, macroName) => {
        const block = customFunctionBlocks(occurrences);
        const entry = macroMap.get(block.name);
        if (entry) {
            entry.docs.push(...block.docs);
        } else {
            macroMap.set(block.name, { docs: block.docs, body: block.body });
            macroOrder.push({ name: block.name, index: project.project.definitions.findIndex(d => d.structure.functions.some(f => "customFunction" in f && normalizeName(f.customFunction.name, "camel") === macroName)) });
        }
    });

    const definitionSections = project.project.definitions
        .map((definition, index) => generateCDefinitionSection(definition, project, index, macroMap, macroOrder))
        .join("\n\n");

    const structureRegistry = `static const StructureRegistry gntrees_structures[] = {\n${project.project.definitions.map(definition => {
        const kebab = normalizeName(definition.structure.name, "kebab");
        const snake = normalizeName(definition.structure.name, "snake");
        const hasProperties = definition.structure.variables.some(variable => "variable" in variable);
        const propertiesExpr = hasProperties ? `${snake}_properties` : "NULL";
        const propertyCount = hasProperties ? `COUNT_OF(${snake}_properties)` : "0";
        return `    { "${kebab}", ${snake}_functions, COUNT_OF(${snake}_functions), ${propertiesExpr}, ${propertyCount} },`;
    }).join("\n")}\n};`;

    const baseTypes = stripLocalIncludes(base["base-types.h"]);
    const baseUtilsH = stripLocalIncludes(base["base-utils.h"]);
    const baseUtilsC = stripPosixDefine(stripLocalIncludes(base["base-utils.c"]));

    const beforeScript = project.project.beforeScript?.c;
    const afterScript = project.project.afterScript?.c;

    const implPragmaOn = `#ifdef __GNUC__
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wunused-function"
#endif`;

    const implPragmaOff = `#ifdef __GNUC__
#pragma GCC diagnostic pop
#endif`;

    const defPragmaOn = `#ifdef __GNUC__
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wunused-variable"
#endif`;

    return `// Auto-generated single-header for ${projectName}
#ifndef ${guard}
#define ${guard}

#ifndef _POSIX_C_SOURCE
#define _POSIX_C_SOURCE 200809L
#endif

#include "cJSON.h"
${beforeScript !== undefined ? `\n${beforeScript}\n` : ""}
${baseTypes}

/* ---- base utilities (di-inline sebagai header-only) ---- */
${implPragmaOn}
${baseUtilsH}
${baseUtilsC}
${implPragmaOff}

/* ---- definitions ---- */
${defPragmaOn}
${definitionSections}
${implPragmaOff}

/* ---- structure registry ---- */
${structureRegistry}
${afterScript !== undefined ? `\n${afterScript}\n` : ""}
#endif /* ${guard} */
`;
}
