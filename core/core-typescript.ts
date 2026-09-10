import { normalizeName } from "./utils";
import type { LanguageType, ProjectType, StatementSourceType } from "./core.types";
import type { ArgumentValue, StructType, StructureCallType } from "./base/typescript/base-types";

function extractDefaultValue(defaultVal: ArgumentValue): any {
    if ("string" in defaultVal) return defaultVal.string.value;
    if ("number" in defaultVal) return defaultVal.number.value;
    if ("boolean" in defaultVal) return defaultVal.boolean.value;
    if ("null" in defaultVal) return defaultVal.null.value;
    if ("array" in defaultVal) return defaultVal.array.value.map(extractDefaultValue);
    if ("object" in defaultVal) {
        const obj: any = {};
        for (const [key, val] of Object.entries(defaultVal.object.value)) {
            obj[key] = extractDefaultValue(val);
        }
        return obj;
    }
    if ("chain" in defaultVal) throw new Error("Chain default values are not supported in TypeScript signatures");
    throw new Error("Unknown default value type");
}

function stripRelativeImports(content: string): string {
    return content
        .split("\n")
        .filter(line => !/^import .* from ["']\.\.?/.test(line))
        .join("\n");
}

function resolveStatementSource(source: StatementSourceType, fallbackLanguages: LanguageType[] = ["typescript"]): string | undefined {
    for (const lang of fallbackLanguages) {
        const value = source[lang];
        if (value !== undefined) return value;
    }
    return undefined;
}

export function generateTypeScriptContent(project: ProjectType, baseTypes: string, baseUtils: string): string {
    const stringifyStruct = (struct: StructType['struct']): string => {
        if ("string" in struct) {
            return "string"
        } else if ("number" in struct) {
            return "number"
        } else if ("boolean" in struct) {
            return "boolean"
        } else if ("null" in struct) {
            return "null"
        } else if ("object" in struct) {
            const properties = Object.entries(struct.object).map(([key, val]) => `${key}: ${stringifyStruct(val)}`).join('; ');
            return `{ ${properties} }`;
        } else if ("map" in struct) {
            const nested = stringifyStruct(struct.map.type);
            return `{ [key: string]: ${nested} }`;
        } else if ("array" in struct) {
            const nested = stringifyStruct(struct.array.type);
            return `(${nested})[]`;
        } else if ("union" in struct) {
            const types = struct.union.types.map(type => stringifyStruct(type)).join(' | ');
            return `(${types})`;
        } else if ("structureCall" in struct) {
            return normalizeName(findStructureInDefinitions(struct.structureCall.name, project.project.definitions), "pascal");
        } else {
            throw new Error("Unknown struct type");
        }
    }
    const stringifyStructureCall = (structureCall: StructureCallType, targetCase: Parameters<typeof normalizeName>[1]): string => {
        if ("structureCall" in structureCall) {
            return normalizeName(findStructureInDefinitions(structureCall.structureCall.name, project.project.definitions), targetCase);
        } else {
            throw new Error("Unknown structure call type");
        }
    }
    const findStructureInDefinitions = (name: string, definitions: ProjectType["project"]["definitions"]): string => {
        for (const definition of definitions) {
            if (definition.structure.name === name) {
                return name
            }
        }
        throw new Error(`Structure ${name} not found in definitions`);
    }
    // DEFINITION CONTENT
    const definitionsContent = project.project.definitions.map((definition, index) => {
        let definitionContent = "";
        const schemaVariableName = "schema" + normalizeName(definition.structure.name, "pascal")
        definitionContent += `
            export class ${normalizeName(definition.structure.name, "pascal")} {\n 
            private ${schemaVariableName}: SchemaType = {
                schema: {
                    exportName: "${definition.structure.exportName || "schema" + (index + 1)}",
                    importPaths: ${JSON.stringify(project.project.importPaths)},
                    chain: {
                        chain:{
                            values: [],
                            initFunction: {
                                name: "${definition.structure.name}",
                                variableName: "${"s" + (index + 1)}"
                            },
                        }
                    }
                }
            }
            getSchema(
                exportName?: string,
                importPaths?: Partial<Record<LanguageType, string>>
            ): SchemaType {
                if (exportName !== undefined && typeof exportName !== "string") {
                    throw new Error(\`getSchema exportName must be a string, but got \${typeof exportName}\`);
                }
                if (importPaths !== undefined && (typeof importPaths !== "object" || importPaths === null || Array.isArray(importPaths))) {
                    throw new Error(\`getSchema importPaths must be an object, but got \${typeof importPaths}\`);
                }
                if (exportName) { this.${schemaVariableName}.schema.exportName = exportName }
                if (importPaths) { this.${schemaVariableName}.schema.importPaths = { ...this.${schemaVariableName}.schema.importPaths, ...importPaths } }
                return this.${schemaVariableName};
            }
            initFromStructure<T>(schema: SchemaType) {
                validateSchema(schema);
                this.${schemaVariableName} = schema;
                return this;
            }
            initFromInitFunction(initFunction: SchemaType['schema']['chain']['chain']['initFunction'], copies?: CopyBuilder[]) {
                if (typeof initFunction !== "object" || initFunction === null || typeof initFunction.name !== "string" || typeof initFunction.variableName !== "string") {
                    throw new Error("Invalid init function");
                }
                this.${schemaVariableName}.schema.chain.chain.initFunction = initFunction;
                applyCopies(this.${schemaVariableName}, copies, "${normalizeName(definition.structure.name, "kebab")}");
                return this;
            }
        `;
        definition.structure.variables.forEach(variable => {
            if ("customVariable" in variable) {
                const value = resolveStatementSource(variable.customVariable.value);
                if (value === undefined) throw new Error(`Custom variable ${variable.customVariable.name} requires a value string`);
                definitionContent += `${normalizeName(variable.customVariable.name, "camel")} = ${value};\n`;
            } else if ("variable" in variable) {
                if ("structureCall" in variable.variable.value) {
                    const variableName = normalizeName(variable.variable.name, "camel");
                    const targetType = normalizeName(variable.variable.value.structureCall.name, "pascal");
                    definitionContent += `get ${variableName}(): ${targetType} {
                        return new ${targetType}().initFromStructure<${targetType}>(createPropertyCallSchema(this.getSchema(), "${variableName}"));
                    }\n`;
                } else {
                    throw new Error("Unknown variable value type");
                }
            }
        });
        definition.structure.functions.forEach(func => {
            if ("customFunction" in func) {
                const body = func.customFunction.body["typescript"];
                const returnType = func.customFunction.return["typescript"];
                const args = func.customFunction.arguments.map(arg => `${normalizeName(arg.argument.name, "camel")}: ${stringifyStruct(arg.argument.struct.struct)}${arg.argument.default !== undefined ? ` = ${JSON.stringify(extractDefaultValue(arg.argument.default))}` : ""}`);
                definitionContent += `${normalizeName(func.customFunction.name, "camel")}(${args.join(', ')}): ${returnType} {\n${body}\n}\n`;
            } else if ("function" in func) {
                const args = func.function.isTemplateLiteral ? ['strings: TemplateStringsArray', '...args: (' + func.function.arguments.map(arg => `${stringifyStruct(arg.argument.struct.struct)}`).join(', ')
                    + ')[]'] :
                    func.function.arguments.map(arg => `${normalizeName(arg.argument.name, "camel")}${arg.argument.default !== undefined ? "?" : ""}: ${stringifyStruct(arg.argument.struct.struct)}`);
                const argsString = args.join(', ');
                definitionContent += `${normalizeName(func.function.name, "camel", true)}(${argsString}): ${stringifyStructureCall(func.function.return, "pascal")} {
                ${"structureCall" in func.function.return ? `return (new ${stringifyStructureCall(func.function.return, "pascal")}())
                            .initFromStructure<${normalizeName(definition.structure.name, "pascal")}>(createSchema(this.getSchema(),"${normalizeName(func.function.name, "camel")}", [${func.function.isTemplateLiteral && func.function.arguments[0] ? 
                                `{ arg: strings, struct: { string: { type: 'string' } } }, ...args.map(arg => { return { arg: arg, struct: ${JSON.stringify(func.function.arguments[0].argument.struct.struct)} as ${JSON.stringify(func.function.arguments[0].argument.struct.struct)}}})`
                                 : func.function.arguments.map((arg, index) => {
                                if (arg.argument.default !== undefined && "chain" in arg.argument.default) throw new Error("Chain default values are not supported in TypeScript signatures");
                                return `{ arg: ${normalizeName(arg.argument.name, "camel")}, struct: ${JSON.stringify(arg.argument.struct.struct)}, provided: arguments.length >= ${index + 1}${arg.argument.default !== undefined ? `, default: ${JSON.stringify(arg.argument.default)}` : ''} }`
                            }).join(', ')}], ${func.function.isTemplateLiteral}))` : ""}
                }\n`;
            } else {
                throw new Error("Unknown function type");
            }
        });
        definitionContent += `}\n`;

        definitionContent = `// Auto-generated definition for ${definition.structure.name}\n` +
            definitionContent;

        return definitionContent;
    })
    // INIT FUNCTION CONTENT
    let initFunctionsContent = "";
    if (project.project.initFunctions.length > 0) {
        let definitionContent = "";
        project.project.initFunctions.forEach(initFunction => {
            if ("structureCall" in initFunction.return) {
                definitionContent += `export function ${normalizeName(initFunction.name, "camel")}(${initFunction.withVariableName ? "variableName?: string, " : ""}...copies: CopyBuilder[]) {
                    const structure = new ${stringifyStructureCall(initFunction.return, "pascal")}();
                    structure.initFromInitFunction({
                        name: "${initFunction.name}",
                        variableName: ${initFunction.withVariableName ? "variableName || structure.getSchema().schema.chain.chain.initFunction.variableName" : "structure.getSchema().schema.chain.chain.initFunction.variableName"}
                    }, copies)
                    return structure;
                }\n`;
            } else {
                throw new Error("Unknown init function return type");
            }
        });
        initFunctionsContent = `// Auto-generated init functions\n` + definitionContent;
    }
    // TYPES CONTENT
    const structureTypeOrName = project.project.definitions.map(definition => normalizeName(definition.structure.name, "pascal")).join(' | ');
    const typesContent = `
    // Auto-generated types
    type ArgObject = {
        [key: string]: ArgType
    };
    type ArgArray = string[] | number[] | boolean[] | null[] | ArgObject[] | ArgArray[] | ${project.project.definitions.map(definition => normalizeName(definition.structure.name, "pascal")).join('[] | ')}[];
    export type ArgType =
        | string
        | number
        | boolean
        | null
        | undefined
        | ArgObject
        | ArgArray
        | ${structureTypeOrName}
        | TemplateStringsArray;
    `
    // UTILS CONTENT
    const utilsContent = `
    // Auto-generated utils
    export const normalizeArgumentStructureCall = (arg: ArgType): ArgumentValue => {
        if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
            throw new Error("Expected a structure instance for structure calls, but got " + (arg === null ? "null" : Array.isArray(arg) ? "array" : typeof arg));
        ${project.project.definitions.map(definition =>
        `} else if (arg instanceof ${normalizeName(definition.structure.name, "pascal")}) {
                    return arg.getSchema().schema.chain
                 `
    ).join('')
        }} else {
            throw new Error("Unknown structure call argument type");
         }
    }
    export function copy(source: ArgType): CopyBuilder {
        ${project.project.definitions.map(definition =>
        `if (source instanceof ${normalizeName(definition.structure.name, "pascal")}) {
                return makeCopy("${normalizeName(definition.structure.name, "kebab")}", source);
            } `
    ).join('')}
        throw new Error("copy() expects a structure instance created by an init function");
    }
    `;
    const baseUtilsInlined = stripRelativeImports(baseUtils);
    const parts = [
        `// Auto-generated index for ${project.project.projectName}`,
        baseTypes,
        typesContent,
        utilsContent,
        baseUtilsInlined,
        ...definitionsContent,
    ];
    if (initFunctionsContent) parts.push(initFunctionsContent);
    return parts.join("\n\n");
}