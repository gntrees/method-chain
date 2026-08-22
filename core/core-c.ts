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
    throw new Error("Unsupported default value type for C: only scalar defaults are supported");
}

function cDefaultArgExpr(def: NonNullable<ArgumentType["argument"]["default"]>, struct: StructType['struct']): string {
    const literal = cDefaultLiteral(def);
    return "boolean" in struct ? `v_bool(${literal})` : `v(${literal})`;
}

function functionMacroBlocks(func: ModelFunction): { name: string, content: string }[] {
    const name = func.function.name;
    const args = func.function.arguments;
    if (func.function.isTemplateLiteral) {
        return [{
            name,
            content: `#ifndef ${name}
#define ${name}(...) \\
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
        name,
        content: `#ifndef ${name}
#define ${name}(${params.join(", ")}) \\
    builder_call("${name}", (ArgumentType[]){ ${mkargs} }, ${args.length}, 0)
#endif`,
    }];
    const singleArgWithDefault = args[0] && args[0].argument.default !== undefined && !("structureCall" in args[0].argument.struct.struct);
    if (args.length === 1 && singleArgWithDefault) {
        blocks.push({
            name: `${name}_def`,
            content: `
#ifndef ${name}_def
#define ${name}_def() \\
    builder_call("${name}", (ArgumentType[]){ mkarg_def(${cDefaultArgExpr(args[0]!.argument.default!, args[0]!.argument.struct.struct)}, ${cDefaultArgExpr(args[0]!.argument.default!, args[0]!.argument.struct.struct)}) }, 1, 0)
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

function createMacro(definition: StructureType, init: InitFunctionType): string {
    const kebab = normalizeName(definition.structure.name, "kebab");
    const snake = normalizeName(definition.structure.name, "snake");
    const pascal = normalizeName(definition.structure.name, "pascal");
    const exportName = definition.structure.exportName || "schema";
    const initName = init.name;
    const importString = escapeCString(init.importString['c'] ?? init.importString['typescript'] ?? "");
    return `#define create${pascal}(meta, ...) \\
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
        .map(init => createMacro(definition, init))
        .join("\n\n");

    const customVariables = definition.structure.variables
        .filter(variable => "customVariable" in variable)
        .map(variable => `extern ArgumentValue ${normalizeName(variable.customVariable.name, "snake")};`);
    const customFunctions = definition.structure.functions
        .filter(func => "customFunction" in func)
        .map(func => `extern ArgumentValue ${normalizeName(func.customFunction.name, "snake")}(const ArgumentValue *arg);`);

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
        .map(definition => generateCDefinitionSection(definition, project, usedMacros))
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
