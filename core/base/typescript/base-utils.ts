import { normalizeArgumentStructureCall } from './utils';
import type { ArgumentType, ArgumentValue, StructType } from "./base-types";
import type { SchemaType } from "./base-types";

export function createSchema(
    oldSchema: SchemaType,
    functionName: string,
    functionArgs: {
        arg: any,
        struct: StructType['struct'],
        default?: ArgumentValue,
    }[],
    isTemplateLiteral: boolean
): SchemaType {
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
    let args: ArgumentType[] = [];
    if (isTemplateLiteral && functionArgs[0]) {
        const strings = functionArgs[0].arg as unknown as TemplateStringsArray;
        const expressions = functionArgs.slice(1);
        const normalizedTemplateLiteralArgs = strings.reduce((acc, str, index) => {
            if (str) {
                acc.push({ argument: { string: { value: str } }, default: null });
            }
            if (index < expressions.length) {
                const expr = expressions[index];
                if (!expr) {
                    throw new Error(`Missing expression for template literal at index ${index}`);
                }
                acc.push({ argument: normalizeArgument(expr.arg, expr.struct), default: null });
            }
            return acc;
        }, [] as ArgumentType[]);
        args = normalizedTemplateLiteralArgs;
    } else {
        args = functionArgs.map(fa => fa.arg === undefined ? undefined : { argument: normalizeArgument(fa.arg, fa.struct), default: fa.default ?? null }).filter(a => a !== undefined);
    }
    newSchema.schema.chain.chain.values.push({
        functionCall: {
            name: functionName,
            arguments: args,
            isTemplateLiteral: isTemplateLiteral,
        }
    })
    return newSchema;
}

function normalizeArgument(arg: any, struct: StructType['struct']): ArgumentValue {
    if ("array" in struct) {
        if (!Array.isArray(arg)) {
            throw new Error(`Expected an array argument, but got ${typeof arg}`);
        }
        const itemType = struct.array.type;
        const normalizedItems = arg.map(item => normalizeArgument(item, itemType));
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
    } else if ("object" in struct) {
        if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
            throw new Error(`Expected an object argument, but got ${typeof arg}`);
        }
        const normalizedObject = Object.fromEntries(
            Object.entries(arg).map(([key, value]) => {
                if (!struct.object[key]) {
                    throw new Error(`Unexpected key "${key}" in object argument`);
                }
                const valueType = struct.object[key];
                return [key, normalizeArgument(value, valueType)];
            })
        );
        return { object: { value: normalizedObject } };
    } else if ("string" in struct) {
        if (typeof arg !== "string") {
            throw new Error(`Expected a string argument, but got ${typeof arg}`);
        }
        return { string: { value: arg } };
    } else if ("number" in struct) {
        if (typeof arg !== "number") {
            throw new Error(`Expected a number argument, but got ${typeof arg}`);
        }
        return { number: { value: arg } };
    } else if ("boolean" in struct) {
        if (typeof arg !== "boolean") {
            throw new Error(`Expected a boolean argument, but got ${typeof arg}`);
        }
        return { boolean: { value: arg } };
    } else if ("null" in struct) {
        if (arg !== null) {
            throw new Error(`Expected a null argument, but got ${typeof arg}`);
        }
        return { null: { value: arg } };
    } else if ("union" in struct) {
        const normalizedUnionTypes = struct.union.types.map(type => {
            try {
                return normalizeArgument(arg, type);
            } catch (e) {
                return null;
            }
        }).filter(type => type !== null);        
        if (normalizedUnionTypes.length === 0 || !(normalizedUnionTypes[0])) {
            throw new Error(`Argument does not match any type in the union`);
        }
        if (normalizedUnionTypes.length > 1) {
            throw new Error(`Argument matches multiple types in the union, which is ambiguous`);
        }
        return normalizedUnionTypes[0];
    } else if ("map" in struct) {
        if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
            throw new Error(`Expected an object argument for map type, but got ${typeof arg}`);
        }
        const normalizedMap = Object.fromEntries(
            Object.entries(arg).map(([key, value]) => [key, normalizeArgument(value, struct.map.type)])
        );
        return { object: { value: normalizedMap } };
    } else if ("structureCall" in struct) {
        const normalizedArgumentStructureCall = normalizeArgumentStructureCall(arg);
        return normalizedArgumentStructureCall;
    } else {
        throw new Error("Unsupported struct type in normalizeArgument");
    }
}