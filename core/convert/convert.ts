import type { ArgumentType, ArgumentValue, CopyType, InitFunctionType, LanguageType, SchemaType } from "../base/typescript/base-types";
import { normalizeName, prettierContent } from "../utils";
import { convertSchemaToC } from "./convert-c";

export async function convert(schema: SchemaType, target: LanguageType) {
    if (target == "c") {
        return prettierContent(convertSchemaToC(schema), "c");
    }
    if (target == "typescript" || target == "javascript") {
        const mainChain = schema.schema.chain;
        const mainValues = mainChain.chain.values;
        const leadingCopies: CopyType[] = [];
        let valueIndex = 0;
        while (valueIndex < mainValues.length && "copy" in mainValues[valueIndex]) {
            leadingCopies.push(mainValues[valueIndex] as CopyType);
            valueIndex++;
        }
        const restValues = mainValues.slice(valueIndex);
        if (restValues.some(value => "copy" in value)) {
            throw new Error("copy() is only supported at the start of a chain for TypeScript output");
        }
        const restChain: SchemaType["schema"]["chain"] = {
            chain: {
                values: restValues,
                initFunction: mainChain.chain.initFunction,
            }
        };
        const chainContent = normalizeChain(restChain, target, mainChain.chain.initFunction.variableName);
        const findInitFunctionsRecursively = (chain: SchemaType["schema"]["chain"]): InitFunctionType[] => {
            let initFunctions: InitFunctionType[] = [];
            if (chain.chain.initFunction) {
                initFunctions.push(chain.chain.initFunction);
            }
            for (const value of chain.chain.values) {
                if ("functionCall" in value) {
                    for (const arg of value.functionCall.arguments) {
                        if ("chain" in arg.argument) {
                            initFunctions.push(...findInitFunctionsRecursively(arg.argument));
                        }
                    }
                } else if ("copy" in value) {
                    initFunctions.push(...findInitFunctionsRecursively(value.copy.chain));
                }
            }
            return initFunctions;
        }
        const mainInitFunction = mainChain.chain.initFunction;
        const copySourceVarNames = new Set(leadingCopies.map(value => value.copy.chain.chain.initFunction.variableName));
        const copyDeclarations = leadingCopies.map(value => {
            const sourceChain = value.copy.chain;
            const init = sourceChain.chain.initFunction;
            const content = normalizeChain(sourceChain, target, init.variableName);
            return `const ${normalizeName(init.variableName, "camel")} = ${normalizeName(init.name, "camel")}("${normalizeName(init.variableName, "camel")}")${content}`;
        });
        const nestedInitFunctions = [
            ...findInitFunctionsRecursively(restChain),
        ]
            .filter(initFunction => initFunction.variableName !== mainInitFunction.variableName)
            .filter(initFunction => !copySourceVarNames.has(initFunction.variableName))
            .filter((v, i, a) => a.findIndex(initFunction => initFunction.variableName === v.variableName) === i);
        const copyArgs = leadingCopies.length > 0
            ? `, ${leadingCopies.map(value => `copy(${normalizeName(value.copy.chain.chain.initFunction.variableName, "camel")})`).join(", ")}`
            : "";
        const mainDeclaration = `const ${normalizeName(mainInitFunction.variableName, "camel")} = ${normalizeName(mainInitFunction.name, "camel")}("${normalizeName(mainInitFunction.variableName, "camel")}"${copyArgs})`;
        const declarationLines = [
            ...copyDeclarations,
            mainDeclaration,
            ...nestedInitFunctions.map(initFunction => {
                return `const ${normalizeName(initFunction.variableName, "camel")} = ${normalizeName(initFunction.name, "camel")}("${normalizeName(initFunction.variableName, "camel")}")`
            }),
        ].filter(line => line.length > 0).join("\n");
        const importSymbols = [
            ...new Set([
                normalizeName(mainInitFunction.name, "camel"),
                ...nestedInitFunctions.map(initFunction => normalizeName(initFunction.name, "camel")),
                ...leadingCopies.map(value => normalizeName(value.copy.chain.chain.initFunction.name, "camel")),
                ...(leadingCopies.length > 0 ? ["copy"] : []),
            ]),
        ];
        const importPaths = schema.schema.importPaths;
        const importPath = importPaths?.[target] ?? importPaths?.typescript ?? importPaths?.javascript;
        if (importSymbols.length > 0 && !importPath) {
            throw new Error(`No import path available for language "${target}". Set project.project.importPaths in the project config.`);
        }
        const importsContent = importPath ? `import { ${importSymbols.join(", ")} } from "${importPath}"` : "";
        const content = `${importsContent}

        ${declarationLines}
        export const ${normalizeName(schema.schema.exportName, "camel")} = ${chainContent ? normalizeName(mainInitFunction.variableName, "camel") : ""}${chainContent}
    `
        return await prettierContent(content, "typescript");
    }
    throw new Error("Unsupported language");
}

function normalizeChain(chain: SchemaType["schema"]["chain"], target: LanguageType, variableName: string): string {
    const normalizeArgumentValue = (val: ArgumentValue): string => {
        if ("string" in val) {
            return JSON.stringify(val.string.value);
        }
        if ("number" in val) {
            return val.number.value.toString();
        }
        if ("boolean" in val) {
            return val.boolean.value.toString();
        }
        if ("null" in val) {
            return "null";
        }
        if ("chain" in val) {
            const chainContent = normalizeChain(val, target, variableName);
            return chainContent ? `${val.chain.initFunction.variableName}${chainContent}` : "";
        }
        if ("object" in val) {
            const entries = Object.entries(val.object.value).map(([key, value]) => {
                return `${JSON.stringify(key)}: ${normalizeArgumentValue(value)}`;
            });
            return `{ ${entries.join(", ")} }`;
        }
        if ("array" in val) {
            const items = val.array.value.map(item => normalizeArgumentValue(item)).join(", ");
            return `[${items}]`;
        }
        throw new Error("Unsupported argument type");
    }
    const normalizeArgument = (arg: ArgumentType): string | null => {
        if (arg.default !== null && JSON.stringify(arg.argument) === JSON.stringify(arg.default)) {
            return null;
        }
        return normalizeArgumentValue(arg.argument);
    }
    if (target == "typescript" || target == "javascript") {
        return chain.chain.values.map(value => {
            if ("functionCall" in value) {
                let args: string;
                if (value.functionCall.isTemplateLiteral) {
                    args = value.functionCall.arguments.map((arg, index) => {
                        if (index % 2 === 0) {
                            if ("string" in arg.argument) {
                                return arg.argument.string.value;
                            }
                            throw new Error("Template literal string parts must be string");
                        }
                        else return '${' + normalizeArgumentValue(arg.argument) + '}';
                    }).join("")
                } else {
                    args = value.functionCall.arguments.map(arg => normalizeArgument(arg)).filter(s => s !== null).join(", ")
                }
                return `.${normalizeName(value.functionCall.name, "camel")}${value.functionCall.isTemplateLiteral ? `\`${args}\`` : `(${args})`}`;
            }
            if ("propertyCall" in value) {
                return `.${value.propertyCall.name}`;
            }
            throw new Error("Unsupported chain value type");
        }).join("");
    }
    throw new Error("Unsupported language");
}