import { write } from "bun";
import { readFileSync } from "node:fs";
import { exists, mkdir, rm } from "node:fs/promises";
import type { ConfigType, ProjectType, StructType, StructureCallType, ThisType } from "./core.types";
import { normalizeName, prettierContent } from "./utils";
import type { StringType, NumberType, BooleanType, NullType, ObjectType, StructureType } from "./base-types/typescript";

const baseTypesContent = {
    typescript: readFileSync("./base-types/typescript.ts", { encoding: "utf-8" }),
}

export async function generateProject(project: ProjectType, config: ConfigType) {
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
    const stringifyStructureCall = (structureCall: StructureCallType | ThisType, targetCase: Parameters<typeof normalizeName>[1]): string => {
        if ("structureCall" in structureCall) {
            return normalizeName(findStructureInDefinitions(structureCall.structureCall.name, project.project.definitions), targetCase);
        } else if ("this" in structureCall) {
            return "this";
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
    const contents = await Promise.all(config.languages.map(async language => {
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
            const schemaVariableName = "schema" + normalizeName(definition.structure.name, "pascal")
            definitionContent += `
                import type { SchemaType } from "./types.ts";
                import { cloneSchema } from "./utils.ts";\n
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
                    definitionContent += `${normalizeName(variable.customVariable.name, "camel")}: typeof ${normalizeName(variable.customVariable.name, "camel")};\n`;
                } else if ("variable" in variable) {
                    if ("this" in variable.variable.value) {
                        definitionContent += `${normalizeName(variable.variable.name, "camel")}: this;\n`;
                    } else if ("structureCall" in variable.variable.value) {
                        definitionContent += `${normalizeName(variable.variable.name, "camel")}: ${normalizeName(variable.variable.value.structureCall.name, "pascal")};\n`;
                    } else {
                        throw new Error("Unknown variable value type");
                    }
                }
            });
            definition.structure.functions.forEach(func => {
                if ("customFunction" in func) {
                    definitionContent += `${normalizeName(func.customFunction.name, "camel")}(...args: Parameters<typeof ${normalizeName(func.customFunction.name, "camel")}>): ReturnType<typeof ${normalizeName(func.customFunction.name, "camel")}> {\nreturn ${normalizeName(func.customFunction.name, "camel")}.apply(this, args);\n}\n`;
                } else if ("function" in func) {
                    if (func.function.isTemplateLiteral && func.function.arguments.length !== 1) throw new Error("Template literal functions must have one argument");
                    const args = func.function.isTemplateLiteral ? ['strings: TemplateStringsArray', '...args: (' + func.function.arguments.map(arg => `${stringifyStruct(arg.argument.struct.struct)}`).join(', ')
                        + ')[]'] :
                        func.function.arguments.map(arg => `${normalizeName(arg.argument.name, "camel")}${arg.argument.optional ? "?" : ""}: ${stringifyStruct(arg.argument.struct.struct)}`)
                    const argsString = args.join(', ');
                    definitionContent += `${normalizeName(func.function.name, "camel")}(${argsString}): ${stringifyStructureCall(func.function.return, "pascal")} {
                    ${"this" in func.function.return ? `
                        this.${schemaVariableName} = cloneSchema(this.${schemaVariableName}, "${normalizeName(func.function.name, "camel")}", [${func.function.arguments.map(arg => normalizeName(arg.argument.name, "camel")).join(', ')}], ${func.function.isTemplateLiteral});
                        return this;` :
                            "structureCall" in func.function.return ? `return (new ${stringifyStructureCall(func.function.return, "pascal")}())
                                .initFromStructure<${normalizeName(definition.structure.name, "pascal")}>(cloneSchema(this.getSchema(),"${normalizeName(func.function.name, "camel")}", [${func.function.isTemplateLiteral ? 'strings, ...args' : func.function.arguments.map(arg => normalizeName(arg.argument.name, "camel")).join(', ')}], ${func.function.isTemplateLiteral}))` : ""}
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
        definitionsContent.push(...project.project.initFunctions.map(initFunction => {
            const importedStructures: {
                file: string,
                entity: string[],
            }[] = []
            let definitionContent = "";
            if ("structureCall" in initFunction.return) {
                importedStructures.push({
                    file: stringifyStructureCall(initFunction.return, "kebab"),
                    entity: [stringifyStructureCall(initFunction.return, "pascal")],
                })
                definitionContent += `export function ${normalizeName(initFunction.name, "camel")}(${initFunction.withVariableName ? "variableName?: string" : ""
                    }) {
                    const structure = new ${stringifyStructureCall(initFunction.return, "pascal")}();
                    structure.initFromInitFunction({
                        name: "${initFunction.name}",
                        variableName: ${initFunction.withVariableName ? "variableName || structure.getSchema().schema.chain.chain.initFunction.variableName" : "structure.getSchema().schema.initFunction.variableName"},
                        importString: ${"\`" + (initFunction.importString['typescript'] ?? initFunction.importString['javascript']) + "\`"}
                        
                    })
                    return structure;
                }\n`;
            } else {
                throw new Error("Unknown init function return type");
            }
            definitionContent = `// Auto-generated definition for ${initFunction.name}\n` +
                importedStructures.map(imp => `import { ${imp.entity.join(', ')} } from './${imp.file}';\n\n`).join('') +
                definitionContent;
            return {
                name: initFunction.name,
                content: definitionContent,
            }
        }))
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
        // UTILS CONTENT
        const structureTypeOrName = project.project.definitions.map(definition => normalizeName(definition.structure.name, "pascal")).join(' | ');
        const structureImports = project.project.definitions.map(definition => `import { ${normalizeName(definition.structure.name, "pascal")} } from "./${normalizeName(definition.structure.name, "kebab")}.ts";`).join('\n');
        const utilsContent = `
        // Auto-generated utils file
        import type { SchemaType, FunctionCallType } from './types.ts'
        ${structureImports}\n

        type ArgObject = {
            [key: string]: ArgType
        };
        type ArgArray = string[] | number[] | boolean[] | null[] | ArgObject[] | ArgArray[] | ${project.project.definitions.map(definition => normalizeName(definition.structure.name, "pascal")).join('[] | ')}[];
        type ArgType =
            | string
            | number
            | boolean
            | null
            | undefined
            | ArgObject
            | ArgArray
            | ${structureTypeOrName}
            | TemplateStringsArray;

        function normalizeArgument(arg: ArgType): FunctionCallType['functionCall']['arguments'][number] {
            if (typeof arg === "string") {
                return { string: { value: arg } };
            } else if (typeof arg === "number") {
                return { number: { value: arg } };
            } else if (typeof arg === "boolean") {
                return { boolean: { value: arg } };
            } else if (arg === null) {
                return { null: { value: arg } };${project.project.definitions.map(definition =>
            `} else if (arg instanceof ${normalizeName(definition.structure.name, "pascal")}) {
                        return arg.getSchema().schema.chain
                     `
        ).join('')
            }} else if (Array.isArray(arg)) {
                const normalizedItems = arg.map((item) => normalizeArgument(item));
                if (normalizedItems.length === 0) {
                  return { array: { value: [] } };
                } 
                const first = normalizedItems[0];
                if (first == undefined) throw new Error("Unexpected undefined value in array");
                if ("string" in first && normalizedItems.every((it) => "string" in it)) {
                  return { array: { value: normalizedItems } };
                } else if ("number" in first && normalizedItems.every((it) => "number" in it)) {
                  return { array: { value: normalizedItems } };
                } else if ("boolean" in first && normalizedItems.every((it) => "boolean" in it)) {
                  return { array: { value: normalizedItems } };
                } else if ("null" in first && normalizedItems.every((it) => "null" in it)) {
                  return { array: { value: normalizedItems } };
                } else if ("array" in first && normalizedItems.every((it) => "array" in it)) {
                  return { array: { value: normalizedItems } };
                } else if ("object" in first && normalizedItems.every((it) => "object" in it)) {
                  return { array: { value: normalizedItems } };
                } else if ("chain" in first && normalizedItems.every((it) => "chain" in it)) {
                  return { array: { value: normalizedItems } };
                } else {
                  throw new Error("Array items must all be of the same argument type");
                }
            } else if (typeof arg === "object" && arg.constructor === Object) {
                return { object: { value: Object.fromEntries(Object.entries(arg).map(([key, value]) => [key, normalizeArgument(value)])) } };
            } else if (arg === undefined) {
                throw new Error("Undefined is not a valid argument value");
            } else {
                throw new Error("Invalid argument type");
            }
        }

        export function cloneSchema(
            oldSchema: SchemaType,
            functionName:string,
            functionArgs: ArgType[],
            isTemplateLiteral: boolean
        ):SchemaType {
            const newSchema = {
                schema: {
                    ...oldSchema.schema,
                    chain: {
                        chain: {
                            values: [...oldSchema.schema.chain.chain.values],
                            initFunction: oldSchema.schema.chain.chain.initFunction,
                        }
                    }
                }
            };
            const normalizedArgs = functionArgs.map(arg => arg === undefined ? arg : normalizeArgument(arg)).filter(arg => arg !== undefined);
            let args = normalizedArgs
            if (isTemplateLiteral) {
                const strings = functionArgs[0] as unknown as TemplateStringsArray;
                const expressions = functionArgs.slice(1);
                const normalizedTemplateLiteralArgs: FunctionCallType['functionCall']['arguments'] = strings.reduce((acc, str, index) => {
                    if (str) {
                        acc.push({ string: { value: str } });
                    }
                    if (index < expressions.length) {
                        const expr = expressions[index];
                        acc.push(normalizeArgument(expr));
                    }
                    return acc;
                }, [] as FunctionCallType['functionCall']['arguments']);
                args = normalizedTemplateLiteralArgs;
            }
            newSchema.schema.chain.chain.values.push({
                functionCall: {
                    name: functionName ,
                    arguments: args,
                    isTemplateLiteral: isTemplateLiteral,
                }
            })
            return newSchema;
        }
        `;
        return {
            language,
            definitions: definitionsContent,
            implementations: implementationContent,
            utils: utilsContent,
        }
    }))

    contents.forEach(async content => {
        await rm(`./${config.folderName}/definitions/${content.language}`, {
            recursive: true,
            force: true
        });
        await mkdir(`./${config.folderName}/definitions/${content.language}`, {
            recursive: true
        });

        // write types.ts. get from base-types/typescript.ts
        await write(`./${config.folderName}/definitions/${content.language}/types.ts`, baseTypesContent.typescript);

        // write utils.ts
        await write(`./${config.folderName}/definitions/${content.language}/utils.ts`, await prettierContent(content.utils, content.language));

        // write definition files
        await Promise.all(content.definitions.map(async (definition, index) => {
            await write(`./${config.folderName}/definitions/${content.language}/${normalizeName(definition.name, "kebab")}.ts`, await prettierContent(definition.content, content.language));
        })).then(() => {
            console.log("Project generated successfully!");
        }).catch(err => {
            console.error("Error generating project:", err);
        });

        // write implementation files
        // cek if implementation folder exists, if exists, dont write, if not, write
        if (!await exists(`./${config.folderName}/implementations/${content.language}`)) {
            await mkdir(`./${config.folderName}/implementations/${content.language}`, {
                recursive: true
            });
            await Promise.all(content.implementations.map(async (implementation, index) => {
                await write(`./${config.folderName}/implementations/${content.language}/${normalizeName(implementation.name, "kebab")}.ts`, await prettierContent(implementation.content, content.language));
            })).then(() => {
                console.log("Project generated successfully!");
            }).catch(err => {
                console.error("Error generating project:", err);
            });
        } else {
            console.log(`Implementations for ${content.language} already exist, skipping implementation generation.`);
        }

    })
}