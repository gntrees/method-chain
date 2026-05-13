import type { FunctionCallType, InitFunctionType, LanguageType, SchemaType } from "./base-types/typescript";
import { normalizeName, prettierContent } from "./utils";

export async function convert(schema: SchemaType, target: LanguageType) {
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
                        if ("chain" in arg) {
                            initFunctions.push(...findInitFunctionsRecursively(arg));
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
        const content = `${initFunctions.map(initFunction => initFunction.importString[target] ?? "").filter((v:string, i, a)=>{
            return v && a.indexOf(v) === i;
        }).join("\n")}

        ${initFunctions.filter((v, i, a) => a.findIndex(initFunction => initFunction.variableName === v.variableName) === i)
            .map(initFunction => {
            return `const ${normalizeName(initFunction.variableName, "camel")} = ${normalizeName(initFunction.name, "camel")}()`;
        }).join("\n")}
        export const ${normalizeName(schema.schema.exportName, "camel")} = ${chainContent ? normalizeName(schema.schema.chain.chain.initFunction.variableName, "camel") : ""}${chainContent}
    `
        return await prettierContent(content, "typescript");
    }
    throw new Error("Unsupported language");
}

function normalizeChain(chain: SchemaType["schema"]["chain"], target: LanguageType, variableName: string): string {
    const normalizeArgument = (arg: FunctionCallType['functionCall']['arguments'][number]): string => {
        if ("string" in arg) {
            return JSON.stringify(arg.string.value);
        }
        if ("number" in arg) {
            return arg.number.value.toString();
        }
        if ("boolean" in arg) {
            return arg.boolean.value.toString();
        }
        if ("null" in arg) {
            return "null";
        }
        if ("chain" in arg) {
            const chainContent = normalizeChain(arg, target, variableName);
            return chainContent ? `${arg.chain.initFunction.variableName}${chainContent}` : "";
        }
        if ("object" in arg) {
            const entries = Object.entries(arg.object.value).map(([key, value]) => {
                return `${JSON.stringify(key)}: ${normalizeArgument(value)}`;
            });
            return `{ ${entries.join(", ")} }`;
        }
        if ("array" in arg) {
            const items = arg.array.value.map(item => normalizeArgument(item)).join(", ");
            return `[${items}]`;
        }
        throw new Error("Unsupported argument type");
    }
    if (target == "typescript" || target == "javascript") {
        return chain.chain.values.map(value => {
            if ("functionCall" in value) {
                const args = value.functionCall.arguments.map(arg => {
                    return normalizeArgument(arg);
                }).join(", ");
                return `.${normalizeName(value.functionCall.name, "camel")}(${args})`;
            }
            if ("propertyCall" in value) {
                return `.${normalizeName(value.propertyCall.name, "camel")}`;
            }
            throw new Error("Unsupported chain value type");
        }).join("");
    }
    throw new Error("Unsupported language");
}