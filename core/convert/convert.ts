import type { ArgumentType, ArgumentValue, InitFunctionType, LanguageType, SchemaType } from "../base/typescript/base-types";
import { normalizeName, prettierContent } from "../utils";
import { convertSchemaToC } from "./convert-c";

export async function convert(schema: SchemaType, target: LanguageType) {
    if (target == "c") {
        return prettierContent(convertSchemaToC(schema), "c");
    }
    if (target == "typescript" || target == "javascript") {
        const chainContent = normalizeChain(schema.schema.chain, target, schema.schema.chain.chain.initFunction.variableName);
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
                }
            }
            return initFunctions;
        }
        const initFunctions = [
            schema.schema.chain.chain.initFunction,
            ...findInitFunctionsRecursively(schema.schema.chain)
        ]        
        const content = `${initFunctions.map(initFunction => initFunction.importString ?? "").filter((v:string, i, a)=>{
            return v && a.indexOf(v) === i;
        }).join("\n")}

        ${initFunctions.filter((v, i, a) => a.findIndex(initFunction => initFunction.variableName === v.variableName) === i)
            .map(initFunction => {
            return `const ${normalizeName(initFunction.variableName, "camel")} = ${normalizeName(initFunction.name, "camel")}("${normalizeName(initFunction.variableName, "camel")}")`
        }).join("\n")}
        export const ${normalizeName(schema.schema.exportName, "camel")} = ${chainContent ? normalizeName(schema.schema.chain.chain.initFunction.variableName, "camel") : ""}${chainContent}
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