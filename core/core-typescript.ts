import { normalizeName } from "./utils";
import type { ProjectType } from "./core.types";
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
    if ("chain" in defaultVal) return defaultVal;
    throw new Error("Unknown default value type");
}

function stripRelativeImports(content: string): string {
    return content
        .split("\n")
        .filter(line => !/^import .* from ["']\.\.?/.test(line))
        .join("\n");
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
                exportName?: string
            ): SchemaType {
                if (exportName) { this.${schemaVariableName}.schema.exportName = exportName }
                return this.${schemaVariableName};
            }
            initFromStructure<T>(schema: SchemaType) {
                this.${schemaVariableName} = schema;
                return this;
            }
            initFromInitFunction(initFunction: SchemaType['schema']['chain']['chain']['initFunction']) {
                this.${schemaVariableName}.schema.chain.chain.initFunction = initFunction;
                return this;
            }
        `;
        definition.structure.variables.forEach(variable => {
            if ("customVariable" in variable) {
                const value = variable.customVariable.value['typescript'] ?? variable.customVariable.value['javascript'];
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
                const body = func.customFunction.body['typescript'] ?? func.customFunction.body['javascript'];
                if (body === undefined) throw new Error(`Custom function ${func.customFunction.name} requires a body string`);
                const returnType = func.customFunction.return['typescript'] ?? func.customFunction.return['javascript'];
                if (returnType === undefined) throw new Error(`Custom function ${func.customFunction.name} requires a return type string`);
                const args = func.customFunction.arguments.map(arg => `${normalizeName(arg.argument.name, "camel")}: ${stringifyStruct(arg.argument.struct.struct)}${arg.argument.default !== undefined ? ` = ${JSON.stringify(extractDefaultValue(arg.argument.default))}` : ""}`);
                definitionContent += `${normalizeName(func.customFunction.name, "camel")}(${args.join(', ')}): ${returnType} {\n${body}\n}\n`;
            } else if ("function" in func) {
                if (func.function.isTemplateLiteral && (func.function.arguments.length !== 1 || !func.function.arguments[0])) throw new Error("Template literal functions must have one argument");
                const args = func.function.isTemplateLiteral ? ['strings: TemplateStringsArray', '...args: (' + func.function.arguments.map(arg => `${stringifyStruct(arg.argument.struct.struct)}`).join(', ')
                    + ')[]'] :
                    func.function.arguments.map(arg => `${normalizeName(arg.argument.name, "camel")}: ${stringifyStruct(arg.argument.struct.struct)}${arg.argument.default !== undefined ? ` = ${JSON.stringify(extractDefaultValue(arg.argument.default))}` : ""}`);
                const argsString = args.join(', ');
                definitionContent += `${normalizeName(func.function.name, "camel", true)}(${argsString}): ${stringifyStructureCall(func.function.return, "pascal")} {
                ${"structureCall" in func.function.return ? `return (new ${stringifyStructureCall(func.function.return, "pascal")}())
                            .initFromStructure<${normalizeName(definition.structure.name, "pascal")}>(createSchema(this.getSchema(),"${normalizeName(func.function.name, "camel")}", [${func.function.isTemplateLiteral && func.function.arguments[0] ? 
                                `{ arg: strings, struct: { string: { type: 'string' } } }, ...args.map(arg => { return { arg: arg, struct: ${JSON.stringify(func.function.arguments[0].argument.struct.struct)} as ${JSON.stringify(func.function.arguments[0].argument.struct.struct)}}})`
                                 : func.function.arguments.map(arg => {
                                return `{ arg: ${normalizeName(arg.argument.name, "camel")}, struct: ${JSON.stringify(arg.argument.struct.struct)}${arg.argument.default !== undefined ? `, default: ${JSON.stringify(arg.argument.default)}` : ''} }`
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
                definitionContent += `export function ${normalizeName(initFunction.name, "camel")}(${initFunction.withVariableName ? "variableName?: string" : ""
                    }) {
                    const structure = new ${stringifyStructureCall(initFunction.return, "pascal")}();
                    structure.initFromInitFunction({
                        name: "${initFunction.name}",
                        variableName: ${initFunction.withVariableName ? "variableName || structure.getSchema().schema.chain.chain.initFunction.variableName" : "structure.getSchema().schema.chain.chain.initFunction.variableName"}
                    })
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
        if (typeof arg !== "object") {
            throw new Error("Expected an object argument for structure calls, but got " + typeof arg);
        ${project.project.definitions.map(definition =>
        `} else if (arg instanceof ${normalizeName(definition.structure.name, "pascal")}) {
                    return arg.getSchema().schema.chain
                 `
    ).join('')
        }} else {
            throw new Error("Unknown structure call argument type");
         }
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