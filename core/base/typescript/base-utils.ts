import { normalizeArgumentStructureCall } from './utils';
import type { ArgumentType, ArgumentValue, CopyType, StructType } from "./base-types";
import type { SchemaType } from "./base-types";

export function createSchema(
    oldSchema: SchemaType,
    functionName: string,
    functionArgs: {
        arg: any,
        struct: StructType['struct'],
        default?: ArgumentValue,
        provided?: boolean,
    }[],
    isTemplateLiteral: boolean
): SchemaType {
    validateSchema(oldSchema);
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
        const strings = functionArgs[0].arg;
        if (!Array.isArray(strings) || !strings.every(str => typeof str === "string")) {
            throw new Error(`Expected a template strings array for ${functionName}`);
        }
        const expressions = functionArgs.slice(1);
        if (expressions.length !== strings.length - 1) {
            throw new Error(`Template literal for ${functionName} expects ${strings.length - 1} expression(s), but got ${expressions.length}`);
        }
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
        args = functionArgs.map((fa, index) => {
            if (fa.arg === undefined) {
                if (fa.provided) {
                    throw new Error(`Parameter "${functionName}" argument #${index + 1} cannot be undefined`);
                }
                if (fa.default !== undefined) {
                    validateDefault(fa.default, fa.struct);
                    return { argument: fa.default, default: fa.default };
                }
                throw new Error(`Parameter "${functionName}" argument #${index + 1} was not provided`);
            }
            const argument = normalizeArgument(fa.arg, fa.struct);
            if (fa.default !== undefined) validateDefault(fa.default, fa.struct);
            return { argument, default: fa.default ?? null };
        });
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

export function createPropertyCallSchema(
    oldSchema: SchemaType,
    propertyName: string,
): SchemaType {
    return {
        schema: {
            ...oldSchema.schema,
            chain: {
                chain: {
                    values: [
                        ...oldSchema.schema.chain.chain.values,
                        { propertyCall: { name: propertyName } },
                    ],
                    initFunction: oldSchema.schema.chain.chain.initFunction,
                },
            },
        },
    };
}

export function validateSchema(schema: SchemaType): void {
    if (
        typeof schema !== "object" ||
        schema === null ||
        !schema.schema ||
        !schema.schema.chain ||
        !schema.schema.chain.chain ||
        !Array.isArray(schema.schema.chain.chain.values) ||
        !schema.schema.chain.chain.initFunction
    ) {
        throw new Error("Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction");
    }
}

function unwrapArgumentValue(val: ArgumentValue): any {
    if ("string" in val) return val.string.value;
    if ("number" in val) return val.number.value;
    if ("boolean" in val) return val.boolean.value;
    if ("null" in val) return val.null.value;
    if ("array" in val) return val.array.value.map(unwrapArgumentValue);
    if ("object" in val) {
        const obj: any = {};
        for (const [key, value] of Object.entries(val.object.value)) {
            obj[key] = unwrapArgumentValue(value);
        }
        return obj;
    }
    if ("chain" in val) throw new Error("Cannot validate a chain default value at runtime");
    throw new Error("Unknown argument value type");
}

function validateDefault(defaultVal: ArgumentValue, struct: StructType['struct']): void {
    normalizeArgument(unwrapArgumentValue(defaultVal), struct);
}

function normalizeArgument(arg: any, struct: StructType['struct']): ArgumentValue {
    if ("array" in struct) {
        if (!Array.isArray(arg)) {
            throw new Error(`Expected an array argument, but got ${typeof arg}`);
        }
        if (arg.length === 0) {
            return { array: { value: [] } };
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
        if (Object.keys(arg).length === 0 && Object.getPrototypeOf(arg) !== Object.prototype && Object.getPrototypeOf(arg) !== null) {
            throw new Error(`Expected a plain object argument, but got ${Object.prototype.toString.call(arg)}`);
        }
        const missingKeys = Object.keys(struct.object).filter(key => !Object.prototype.hasOwnProperty.call(arg, key));
        if (missingKeys.length > 0) {
            throw new Error(`Missing required key(s) "${missingKeys.join('", "')}" in object argument`);
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
        if (!Number.isFinite(arg)) {
            throw new Error(`Expected a finite number argument, but got ${arg}`);
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
        const reasons: string[] = [];
        const normalizedUnionTypes = struct.union.types.map(type => {
            try {
                return normalizeArgument(arg, type);
            } catch (e) {
                reasons.push(e instanceof Error ? e.message : String(e));
                return null;
            }
        }).filter(type => type !== null);        
        if (normalizedUnionTypes.length === 0 || !(normalizedUnionTypes[0])) {
            throw new Error(`Argument does not match any type in the union: ${reasons.join(" | ")}`);
        }
        if (normalizedUnionTypes.length > 1) {
            if (Array.isArray(arg) && arg.length === 0) {
                return normalizedUnionTypes[0];
            }
            throw new Error(`Argument matches multiple types in the union, which is ambiguous`);
        }
        return normalizedUnionTypes[0];
    } else if ("map" in struct) {
        if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
            throw new Error(`Expected an object argument for map type, but got ${typeof arg}`);
        }
        if (Object.keys(arg).length === 0 && Object.getPrototypeOf(arg) !== Object.prototype && Object.getPrototypeOf(arg) !== null) {
            throw new Error(`Expected a plain object argument for map type, but got ${Object.prototype.toString.call(arg)}`);
        }
        const normalizedMap = Object.fromEntries(
            Object.entries(arg).map(([key, value]) => [key, normalizeArgument(value, struct.map.type)])
        );
        return { object: { value: normalizedMap } };
    } else if ("structureCall" in struct) {
        const normalizedArgumentStructureCall = normalizeArgumentStructureCall(arg);
        return normalizedArgumentStructureCall;
    } else if ("literal" in struct) {
        const expected = struct.literal.value;
        if (struct.literal.type === "string") {
            if (typeof arg !== "string") {
                throw new Error(`Expected a string literal argument, but got ${typeof arg}`);
            }
            if (arg !== expected) {
                throw new Error(`Expected string literal ${JSON.stringify(expected)}, but got ${JSON.stringify(arg)}`);
            }
            return { string: { value: arg } };
        } else if (struct.literal.type === "number") {
            if (typeof arg !== "number") {
                throw new Error(`Expected a number literal argument, but got ${typeof arg}`);
            }
            if (!Number.isFinite(arg)) {
                throw new Error(`Expected a finite number argument, but got ${arg}`);
            }
            if (arg !== expected) {
                throw new Error(`Expected number literal ${expected}, but got ${arg}`);
            }
            return { number: { value: arg } };
        } else {
            if (typeof arg !== "boolean") {
                throw new Error(`Expected a boolean literal argument, but got ${typeof arg}`);
            }
            if (arg !== expected) {
                throw new Error(`Expected boolean literal ${expected}, but got ${arg}`);
            }
            return { boolean: { value: arg } };
        }
    } else {
        throw new Error("Unsupported struct type in normalizeArgument");
    }
}

export type CopyBuilder = {
    copy: {
        structureName: string,
        chain: SchemaType["schema"]["chain"],
    }
};

export function makeCopy(structureName: string, source: { getSchema(): SchemaType }): CopyBuilder {
    const schema = source.getSchema();
    validateSchema(schema);
    return {
        copy: {
            structureName,
            chain: schema.schema.chain,
        },
    };
}

export function applyCopies(schema: SchemaType, copies: CopyBuilder[] | undefined, targetStructureName: string): void {
    if (!copies || copies.length === 0) return;
    for (const cp of copies) {
        if (
            typeof cp !== "object" ||
            cp === null ||
            !("copy" in cp) ||
            typeof (cp as CopyBuilder).copy?.structureName !== "string" ||
            typeof (cp as CopyBuilder).copy?.chain !== "object" ||
            (cp as CopyBuilder).copy?.chain === null
        ) {
            throw new Error("Invalid builder argument in init function: wrap the structure with copy(...)");
        }
        if (cp.copy.structureName !== targetStructureName) {
            throw new Error(`Cannot copy builder of structure '${cp.copy.structureName}' into '${targetStructureName}'`);
        }
        const value: CopyType = {
            copy: {
                structureName: cp.copy.structureName,
                chain: cp.copy.chain,
            },
        };
        schema.schema.chain.chain.values.push(value);
    }
}