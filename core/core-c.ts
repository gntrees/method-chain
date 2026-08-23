import { normalizeName } from "./utils";
import type { ArgumentType, ProjectType, StructureType } from "./core.types";
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

function doxygenComment(
    brief: string,
    params: { name: string, type: string, default?: string, description?: string }[],
    returns: string,
    details?: string,
): string {
    const lines = ["/**", ` * @brief ${brief}`];
    if (details) {
        lines.push(" *");
        lines.push(` * ${details}`);
    }
    for (const param of params) {
        const description = param.description ?? `Value of type \`${param.type}\`.`;
        let line = ` * @param ${param.name} ${description}`;
        if (param.default) line += ` Defaults to \`${param.default}\`.`;
        lines.push(line);
    }
    lines.push(` * @return ${returns}`);
    lines.push(" */");
    return lines.join("\n");
}

function functionMacroBlocks(func: ModelFunction): { name: string, content: string }[] {
    const name = func.function.name;
    const macroName = normalizeName(func.function.name, "camel", true);
    const args = func.function.arguments;
    if (func.function.isTemplateLiteral) {
        if (args.length !== 1 || !args[0]) throw new Error("Template literal functions must have one argument");
        const doc = doxygenComment(
            `Appends the \`${name}\` template-literal function call to the builder chain.`,
            [{ name: "...", type: "variadic", description: "Interpolated expression values (string literal parts are passed as literal text)." }],
            `A \`ChainValue\` representing the \`${name}\` template-literal function call.`,
        );
        return [{
            name: macroName,
            content: `${doc}
#ifndef ${macroName}
#define ${macroName}(...) \\
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
                _args[_j++] = (ArgumentType){ .argument = _vals[_i], .hasDefault = 0, .def = {0} }; \\
        (ChainValue){ \\
            .kind = V_FUNCTION_CALL, \\
            .as.functionCall = { \\
                .name = "${name}", \\
                .arguments = _args, \\
                .argumentCount = _cnt, \\
                .isTemplateLiteral = 1, \\
            } \\
        }; \\
    })
#endif`,
        }];
    }
    const params = args.map(arg => normalizeName(arg.argument.name, "camel"));
    const mkargs = args.map((arg, index) => {
        const param = params[index];
        const struct = arg.argument.struct.struct;
        if ("structureCall" in struct) {
            return `mkarg(v_chain(&(${param})->schema.chain))`;
        }
        const argInner = "boolean" in struct ? `v_bool((${param}) ? 1 : 0)` : `v(${param})`;
        if (arg.argument.default === undefined) {
            return `mkarg(${argInner})`;
        }
        return `mkarg_def(${argInner}, ${cDefaultArgExpr(arg.argument.default, struct)})`;
    }).join(", ");
    const blocks: { name: string, content: string }[] = [{
        name: macroName,
        content: `${doxygenComment(
            `Appends the \`${name}\` function call to the builder chain.`,
            args.map(arg => ({
                name: normalizeName(arg.argument.name, "camel"),
                type: cStructTypeName(arg.argument.struct.struct),
                default: arg.argument.default !== undefined ? cDefaultDoc(arg.argument.default) : undefined,
            })),
            `A \`ChainValue\` representing the \`${name}\` function call to be appended to the builder chain.`,
        )}
#ifndef ${macroName}
#define ${macroName}(${params.join(", ")}) \\
    builder_call("${name}", ((ArgumentType[]){ ${mkargs} }), ${args.length}, 0)
#endif`,
    }];
    const singleArgWithDefault = args[0] && args[0].argument.default !== undefined && !("structureCall" in args[0].argument.struct.struct);
    if (args.length === 1 && singleArgWithDefault) {
        blocks.push({
            name: `${macroName}Def`,
            content: `
${doxygenComment(
                `Appends the \`${name}\` function call to the builder chain using its default argument.`,
                [],
                `A \`ChainValue\` representing the \`${name}\` function call with the default argument.`,
            )}
#ifndef ${macroName}Def
#define ${macroName}Def() \\
    builder_call("${name}", ((ArgumentType[]){ mkarg_def(${cDefaultArgExpr(args[0]!.argument.default!, args[0]!.argument.struct.struct)}, ${cDefaultArgExpr(args[0]!.argument.default!, args[0]!.argument.struct.struct)}) }), 1, 0)
#endif`,
        });
    }
    return blocks;
}

function generateRegistry(definition: StructureType): string {
    const snake = normalizeName(definition.structure.name, "snake");
    const declarations: string[] = [];
    const entries: string[] = [];
    definition.structure.functions.forEach(func => {
        if (!("function" in func)) return;
        const f = func.function;
        const base = `${snake}_${normalizeName(f.name, "snake")}`;
        if (f.isTemplateLiteral) {
            const expr = f.arguments[0]?.argument.struct.struct;
            declarations.push(`static const StructType ${base}_expr = ${expr ? stringifyCStruct(expr) : "{ .kind = S_STRING }"};`);
            declarations.push(`static const StructType ${base}_args[] = { { .kind = S_STRING }, ${base}_expr };`);
            entries.push(`    { "${f.name}", 1, ${base}_args, 2 },`);
        } else {
            const argNames: string[] = [];
            f.arguments.forEach((arg, index) => {
                const nm = `${base}_arg${index}`;
                declarations.push(`static const StructType ${nm} = ${stringifyCStruct(arg.argument.struct.struct)};`);
                argNames.push(nm);
            });
            if (argNames.length === 1) {
                entries.push(`    { "${f.name}", 0, &${argNames[0]}, 1 },`);
            } else {
                declarations.push(`static const StructType ${base}_args[] = { ${argNames.join(", ")} };`);
                entries.push(`    { "${f.name}", 0, ${base}_args, ${argNames.length} },`);
            }
        }
    });
    return `${declarations.join("\n")}\n\nstatic const FunctionSignature ${snake}_functions[] = {\n${entries.join("\n")}\n};`;
}

function createMacro(definition: StructureType, init: InitFunctionType, index: number): string {
    const kebab = normalizeName(definition.structure.name, "kebab");
    const snake = normalizeName(definition.structure.name, "snake");
    const exportName = definition.structure.exportName || "schema" + (index + 1);
    const initName = init.name;
    const initMacroName = normalizeName(initName, "camel");
    const importString = escapeCString(init.importString['c'] ?? init.importString['typescript'] ?? "");
    return `${doxygenComment(
        `Creates a new \`${exportName}\` builder (structure \`${kebab}\`).`,
        [
            { name: "meta", type: "SchemaMetaBuilder", description: "Metadata containing the variableName." },
            { name: "...", type: "variadic ChainValue", description: "Chain values (function/property calls) forming the schema." },
        ],
        `A \`Builder\` holding the validated schema for the \`${kebab}\` structure.`,
    )}
#define ${initMacroName}(meta, ...) \\
    ((Builder){ \\
        .schema = validate_and_return( \\
            (SchemaType){ \\
                .exportName = "${exportName}", \\
                .chain = { \\
                    .typeName = "${kebab}", \\
                    .initFunction = { \\
                        .name = "${initName}", \\
                        .variableName = (meta).variableName, \\
                        .importString = "${importString}", \\
                    }, \\
                    .values = (ChainValue[]){ __VA_ARGS__ }, \\
                    .valueCount = BUILDER_COUNT(__VA_ARGS__), \\
                }, \\
            }, \\
            ${snake}_functions, COUNT_OF(${snake}_functions)) \\
    })`;
}

function generateCDefinitionSection(
    definition: StructureType,
    project: ProjectType,
    usedMacros: Set<string>,
    index: number,
): string {
    const structureName = definition.structure.name;
    const kebab = normalizeName(structureName, "kebab");
    const snake = normalizeName(structureName, "snake");

    const macroSections: string[] = [];
    definition.structure.functions.forEach(func => {
        if (!("function" in func)) return;
        functionMacroBlocks(func).forEach(block => {
            if (usedMacros.has(block.name)) return;
            usedMacros.add(block.name);
            macroSections.push(block.content);
        });
    });

    const registry = generateRegistry(definition);

    const initFunctions = project.project.initFunctions.filter(init =>
        "structureCall" in init.return && init.return.structureCall.name === structureName
    );
    const creates = (initFunctions.length > 0 ? initFunctions : [{
        name: `create-${kebab}`,
        withVariableName: false,
        return: { structureCall: { name: structureName } },
        importString: {},
    } as InitFunctionType])
        .map(init => createMacro(definition, init, index))
        .join("\n\n");

    const customVariables = definition.structure.variables
        .filter(variable => "customVariable" in variable)
        .map(variable => `extern ArgumentValue ${normalizeName(variable.customVariable.name, "snake")};`);
    const customFunctions = definition.structure.functions
        .filter(func => "customFunction" in func)
        .map(func => `/**
 * @brief External implementation of the \`${func.customFunction.name}\` custom function.
 *
 * @param arg The argument value passed to the custom function.
 * @return The result of the custom function as an \`ArgumentValue\`.
 */
extern ArgumentValue ${normalizeName(func.customFunction.name, "snake")}(const ArgumentValue *arg);`);

    const parts: string[] = [];
    if (macroSections.length) parts.push(macroSections.join("\n\n"));
    parts.push(registry);
    if (creates) parts.push(creates);
    const custom = [...customVariables, ...customFunctions].join("\n");
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

    const usedMacros = new Set<string>();
    const definitionSections = project.project.definitions
        .map((definition, index) => generateCDefinitionSection(definition, project, usedMacros, index))
        .join("\n\n");

    const baseTypes = stripLocalIncludes(base["base-types.h"]);
    const baseUtilsH = stripLocalIncludes(base["base-utils.h"]);
    const baseUtilsC = stripPosixDefine(stripLocalIncludes(base["base-utils.c"]));

    const implPragmaOn = `#ifdef __GNUC__
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wunused-function"
#endif`;

    const implPragmaOff = `#ifdef __GNUC__
#pragma GCC diagnostic pop
#endif`;

    return `// Auto-generated single-header for ${projectName}
#ifndef ${guard}
#define ${guard}

/* open_memstream memerlukan _POSIX_C_SOURCE sebelum header sistem apa pun. */
#ifndef _POSIX_C_SOURCE
#define _POSIX_C_SOURCE 200809L
#endif

/* cJSON disediakan terpisah (cJSON.h + cJSON.c) di folder yang sama. */
#include "cJSON.h"

${baseTypes}

/* ---- base utilities (di-inline sebagai header-only) ---- */
${implPragmaOn}
${baseUtilsH}
${baseUtilsC}
${implPragmaOff}

/* ---- definitions ---- */
${definitionSections}

#endif /* ${guard} */
`;
}
