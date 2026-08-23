import { normalizeName } from "./utils";
import type { ProjectType } from "./core.types";
import type { ArgumentValue, StructType, StructureCallType } from "./base/typescript/base-types";

export function extractDefaultValue(defaultVal: ArgumentValue): any {
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

export function generateTypeScriptContent(project: ProjectType): {
    definitions: { name: string, content: string }[],
    implementations: { name: string, content: string }[],
    types: string,
    utils: string,
} {
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
    const findStructureCallsInStruct = (struct: StructType['struct'], acc: string[] = []): string[] => {
        if ("structureCall" in struct) {
            acc.push(struct.structureCall.name);
        } else if ("union" in struct) {
            struct.union.types.forEach(type => findStructureCallsInStruct(type, acc));
        } else if ("array" in struct) {
            findStructureCallsInStruct(struct.array.type, acc);
        } else if ("map" in struct) {
            findStructureCallsInStruct(struct.map.type, acc);
        } else if ("object" in struct) {
            Object.values(struct.object).forEach(type => findStructureCallsInStruct(type, acc));
        }
        return acc;
    }
    // DEFINITION CONTENT
    const definitionsContent = project.project.definitions.map((definition, index) => {
        let definitionContent = "";
        const importedInplementations: {
            file: string,
            entity: string[],
        }[] = []
        importedInplementations.push({
            file: normalizeName(definition.structure.name, "kebab"),
            entity: [
                ...definition.structure.functions.map(
                    func => {
                        if ("customFunction" in func) {
                            return normalizeName(func.customFunction.name, "camel")
                        }
                        if ("function" in func) {
                            if ("structureCall" in func.function.return) {
                                const structureName = func.function.return.structureCall.name;
                                const structure = findStructureInDefinitions(structureName, project.project.definitions);
                                if (
                                    !importedInplementations.some(imp => imp.file === normalizeName(structure, "kebab")) &&
                                    structureName !== definition.structure.name
                                ) {
                                    importedInplementations.push({
                                        file: normalizeName(structure, "kebab"),
                                        entity: [normalizeName(structure, "pascal")],
                                    })
                                }
                            }
                            return false
                        }
                        return false
                    }
                ).filter((i) => i !== false),
                ...definition.structure.variables.map(
                    variable => {
                        if ("customVariable" in variable) {
                            return normalizeName(variable.customVariable.name, "camel")
                        }
                        if ("variable" in variable) {
                            if ("structureCall" in variable.variable.value) {
                                const structureName = variable.variable.value.structureCall.name;
                                const structure = findStructureInDefinitions(structureName, project.project.definitions);
                                if (!importedInplementations.some(imp => imp.file === normalizeName(structure, "kebab"))) {
                                    importedInplementations.push({
                                        file: normalizeName(structure, "kebab"),
                                        entity: [normalizeName(structure, "pascal")],
                                    })
                                }
                            }
                            return false
                        }
                        return false
                    }
                ).filter((i) => i !== false),
            ]
        })
        definition.structure.functions.forEach(func => {
            if ("function" in func) {
                func.function.arguments.forEach(arg => {
                    findStructureCallsInStruct(arg.argument.struct.struct).forEach(structureName => {
                        const structure = findStructureInDefinitions(structureName, project.project.definitions);
                        if (
                            !importedInplementations.some(imp => imp.file === normalizeName(structure, "kebab")) &&
                            structureName !== definition.structure.name
                        ) {
                            importedInplementations.push({
                                file: normalizeName(structure, "kebab"),
                                entity: [normalizeName(structure, "pascal")],
                            })
                        }
                    })
                });
            }
        });
        const schemaVariableName = "schema" + normalizeName(definition.structure.name, "pascal")
        definitionContent += `
            import type { SchemaType } from "./base-types.ts";
            import { createSchema } from "./base-utils.ts";\n
            export class ${normalizeName(definition.structure.name, "pascal")} {\n 
            private ${schemaVariableName}: SchemaType = {
                schema: {
                    exportName: "${definition.structure.exportName || "schema" + (index + 1)}",
                    chain: {
                        chain:{
                            values: [],
                            initFunction: {
                                name: "${definition.structure.name}",
                                variableName: "${"s" + (index + 1)}",
                                importString: ""
                            },
                        }
                    }
                }
            }
            getSchema(
                exportName?: string,
                importString?: string
            ): SchemaType {
                if (exportName) { this.${schemaVariableName}.schema.exportName = exportName }
                if (importString) { this.${schemaVariableName}.schema.chain.chain.initFunction.importString = importString }
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
                definitionContent += `${normalizeName(variable.customVariable.name, "camel")}: typeof ${normalizeName(variable.customVariable.name, "camel")};\n`;
            } else if ("variable" in variable) {
                if ("structureCall" in variable.variable.value) {
                    definitionContent += `${normalizeName(variable.variable.name, "camel")}: ${normalizeName(variable.variable.value.structureCall.name, "pascal")} = new ${normalizeName(variable.variable.value.structureCall.name, "pascal")}().initFromStructure<${normalizeName(definition.structure.name, "pascal")}>(createSchema(this.getSchema(),"${normalizeName(variable.variable.name, "camel")}", [], false));\n`;
                } else {
                    throw new Error("Unknown variable value type");
                }
            }
        });
        definition.structure.functions.forEach(func => {
            if ("customFunction" in func) {
                definitionContent += `${normalizeName(func.customFunction.name, "camel")}(...args: Parameters<typeof ${normalizeName(func.customFunction.name, "camel")}>): ReturnType<typeof ${normalizeName(func.customFunction.name, "camel")}> {\nreturn ${normalizeName(func.customFunction.name, "camel")}.apply(this, args);\n}\n`;
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
            importedInplementations.map(imp => `import { ${imp.entity.join(', ')} } from './${imp.file}';`).join('') +
            definitionContent;

        return {
            name: definition.structure.name,
            content: definitionContent,
        }
    })
    // INIT FUNCTION CONTENT
    if (project.project.initFunctions.length > 0) {
        const importedStructures: {
            file: string,
            entity: string[],
        }[] = []
        let definitionContent = "";
        project.project.initFunctions.forEach(initFunction => {
            if ("structureCall" in initFunction.return) {
                const structureFile = stringifyStructureCall(initFunction.return, "kebab");
                const structureEntity = stringifyStructureCall(initFunction.return, "pascal");
                if (!importedStructures.some(imp => imp.file === structureFile)) {
                    importedStructures.push({
                        file: structureFile,
                        entity: [structureEntity],
                    })
                }
                definitionContent += `export function ${normalizeName(initFunction.name, "camel")}(${initFunction.withVariableName ? "variableName?: string" : ""
                    }) {
                    const structure = new ${stringifyStructureCall(initFunction.return, "pascal")}();
                    structure.initFromInitFunction({
                        name: "${initFunction.name}",
                        variableName: ${initFunction.withVariableName ? "variableName || structure.getSchema().schema.chain.chain.initFunction.variableName" : "structure.getSchema().schema.chain.chain.initFunction.variableName"},
                        importString: ${"\`" + (initFunction.importString['typescript'] ?? initFunction.importString['javascript']) + "\`"}
                        
                    })
                    return structure;
                }\n`;
            } else {
                throw new Error("Unknown init function return type");
            }
        });
        definitionContent = `// Auto-generated init functions\n` +
            importedStructures.map(imp => `import { ${imp.entity.join(', ')} } from './${imp.file}';\n\n`).join('') +
            definitionContent;
        definitionsContent.push({
            name: "index",
            content: definitionContent,
        })
    }
    // IMPLEMENTATION CONTENT
    const implementationContent = project.project.definitions.map(definition => {
        let implementationContent = "";
        definition.structure.variables.forEach(variable => {
            if ("customVariable" in variable) {
                implementationContent += `export const ${normalizeName(variable.customVariable.name, "camel")}:any;\n`;
            }
        });
        definition.structure.functions.forEach(func => {
            if ("customFunction" in func) {
                implementationContent += `export function ${normalizeName(func.customFunction.name, "camel")}:any;\n`;
            }
        });
        return {
            name: definition.structure.name,
            content: implementationContent,
        }
    });
    // TYPES CONTENT
    const structureTypeOrName = project.project.definitions.map(definition => normalizeName(definition.structure.name, "pascal")).join(' | ');
    const structureImports = project.project.definitions.map(definition => `import { ${normalizeName(definition.structure.name, "pascal")} } from "./${normalizeName(definition.structure.name, "kebab")}.ts";`).join('\n');
    const typesContent = `
    // Auto-generated types file
    import type { SchemaType, FunctionCallType } from './base-types.ts'
    ${structureImports}\n

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
    // Auto-generated utils file
    import type { ArgType } from "./types.ts";
    import type { ArgumentValue } from "./base-types.ts";
    ${structureImports}\n
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
    return {
        definitions: definitionsContent,
        implementations: implementationContent,
        utils: utilsContent,
        types: typesContent,
    }
}
