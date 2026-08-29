import type { LanguageType } from "../core.types";
import { normalizeName } from "../utils";

export type ValueType = string | number | boolean | null | Array<ValueType> | { [key: string]: ValueType } | Map<string, ValueType>;

export type StructureCallArgumentType = ValueType | Partial<Record<LanguageType, string>>;

const LANGUAGE_KEYS: LanguageType[] = ["typescript", "javascript", "c"];

function isExpressionRecord(value: StructureCallArgumentType): value is Partial<Record<LanguageType, string>> {
    if (typeof value !== "object" || value === null || Array.isArray(value) || value instanceof Map) {
        return false;
    }
    const entries = Object.entries(value);
    return entries.length > 0 && entries.every(([key, val]) => LANGUAGE_KEYS.includes(key as LanguageType) && typeof val === "string");
}

function escapeCString(value: string): string {
    return value.replace(/"/g, '\\"');
}

export class LinguaTungga {
    private statements: Partial<Record<LanguageType, string[]>> = {}
    private variables: Partial<Record<LanguageType, Record<string,string>>> = {}
    getStatements(): Partial<Record<LanguageType, string[]>> {
        return this.statements;
    }

    setStatements(statements: Partial<Record<LanguageType, string[]>>): this {
        this.statements = { ...this.statements, ...statements };
        return this;
    }

    addStatements(statements: Partial<Record<LanguageType, string[]>>): this {
        for (const [lang, newStatements] of Object.entries(statements)) {
            if (!this.statements[lang as LanguageType]) {
                this.statements[lang as LanguageType] = [];
            }
            this.statements[lang as LanguageType]?.push(...newStatements);
        }
        return this;
    }

    getResolvedStatements(): Partial<Record<LanguageType, string>> {
        const resolved: Partial<Record<LanguageType, string>> = {};
        for (const [lang, statements] of Object.entries(this.statements)) {
            if (statements?.length) {
                resolved[lang as LanguageType] = statements.join("\n");
            }
        }
        return resolved;
    }

    structureFunctionCall(functionName: string, args: StructureCallArgumentType[] = []): Partial<Record<LanguageType, string>> {
        const method = normalizeName(functionName, "camel", true);
        const renderedArgs = args.map(arg => this.renderCallArgument(arg));
        return {
            typescript: `this.${method}(${renderedArgs.map(arg => this.pickExpression(arg, ["typescript", "javascript"])).join(", ")})`,
            c: `${method}(${renderedArgs.map(arg => this.pickExpression(arg, ["c"])).join(", ")})`,
        };
    }

    structureVariableCall(variableName: string): Partial<Record<LanguageType, string>> {
        const property = normalizeName(variableName, "camel");
        return {
            typescript: `this.${property}`,
            c: `${property}`,
        };
    }

    addStructureFunctionCall(functionName: string, args?: StructureCallArgumentType[]): this {
        return this.addExpressionStatements(this.structureFunctionCall(functionName, args));
    }

    addStructureVariableCall(variableName: string): this {
        return this.addExpressionStatements(this.structureVariableCall(variableName));
    }

    private addExpressionStatements(expressions: Partial<Record<LanguageType, string>>): this {
        const statements: Partial<Record<LanguageType, string[]>> = {};
        for (const [lang, expression] of Object.entries(expressions)) {
            if (expression !== undefined) {
                statements[lang as LanguageType] = [expression];
            }
        }
        return this.addStatements(statements);
    }

    private renderCallArgument(argument: StructureCallArgumentType): Partial<Record<LanguageType, string>> {
        if (isExpressionRecord(argument)) {
            return argument;
        }
        return this.addValue(argument as ValueType);
    }

    private pickExpression(expressions: Partial<Record<LanguageType, string>>, languages: LanguageType[]): string {
        for (const lang of languages) {
            const value = expressions[lang];
            if (value !== undefined) return value;
        }
        throw new Error(`Structure call argument has no expression for language(s): ${languages.join(", ")}`);
    }

    addValue(value: ValueType): Partial<Record<LanguageType, string>> {
        if (typeof value === "string") {
            return {
                typescript: `"${value}"`,
                c: `v_string("${escapeCString(value)}")`,
            };
        } else if (typeof value === "number") {
            return {
                typescript: `${value}`,
                c: `v_int(${value})`,
            };
        } else if (typeof value === "boolean") {
            return {
                typescript: `${value}`,
                c: `v_bool(${value ? 1 : 0})`,
            };
        } else if (value === null) {
            return {
                typescript: `null`,
                c: `v_null()`,
            };
        } else if (Array.isArray(value)) {
            const items = value.map((item) => this.addValue(item));
            return {
                typescript: `[${items.map((item) => item.typescript).join(", ")}]`,
                c: items.length
                    ? `arr(${items.map((item) => item.c).join(", ")})`
                    : `arr()`,
            };
        } else if (value instanceof Map) {
            const entries = Array.from(value.entries()).map(([key, val]) => ({
                key,
                value: this.addValue(val),
            }));
            return {
                typescript: `new Map([${entries
                    .map(
                        (entry) =>
                            `[${JSON.stringify(entry.key)}, ${entry.value.typescript}]`
                    )
                    .join(", ")}])`,
                c: entries.length
                    ? `map(${entries
                          .map(
                              (entry) =>
                                  `entry("${escapeCString(entry.key)}", ${entry.value.c})`
                          )
                          .join(", ")})`
                    : `map()`,
            };
        } else if (typeof value === "object") {
            const entries = Object.entries(value).map(([key, val]) => ({
                key,
                value: this.addValue(val),
            }));
            return {
                typescript: `{${entries
                    .map(
                        (entry) =>
                            `${JSON.stringify(entry.key)}: ${entry.value.typescript}`
                    )
                    .join(", ")}}`,
                c: entries.length
                    ? `map(${entries
                          .map(
                              (entry) =>
                                  `entry("${escapeCString(entry.key)}", ${entry.value.c})`
                          )
                          .join(", ")})`
                    : `map()`,
            };
        } else {
            throw new Error("Unsupported value type");
        }
    }

    addVariable(variableName: string, value: ValueType): this {
        const valueExpressions = this.addValue(value);
        const declarations: Partial<Record<LanguageType, string[]>> = {};
        for (const [lang, expression] of Object.entries(valueExpressions)) {
            const statement = lang === "c"
                ? `ArgumentValue ${variableName} = ${expression};`
                : `const ${variableName} = ${expression};`;
            declarations[lang as LanguageType] = [statement];
        }

        this.variables = {
            ...this.variables,
            ...Object.entries(declarations).reduce((acc, [lang, statements]) => {
                if (!statements?.length) {
                    return acc;
                }

                const statement = statements[0];
                if (statement === undefined) {
                    return acc;
                }

                acc[lang as LanguageType] = {
                    ...(this.variables[lang as LanguageType] ?? {}),
                    [variableName]: statement
                };  
                return acc;
            }, {} as Partial<Record<LanguageType, Record<string, string>>>)
        };

        this.addStatements(declarations);

        return this;
    }

}

class StructureVariableCall {

}
class StructureFunctionCall {
}
