// Auto-generated utils file
import type { SchemaType, FunctionCallType } from "./types.ts";
import { QueryBuilder } from "./query-builder.ts";

type ArgObject = {
  [key: string]: ArgType;
};
type ArgArray =
  | string[]
  | number[]
  | boolean[]
  | null[]
  | ArgObject[]
  | ArgArray[]
  | QueryBuilder[];
type ArgType =
  | string
  | number
  | boolean
  | null
  | undefined
  | ArgObject
  | ArgArray
  | QueryBuilder
  | TemplateStringsArray;

function normalizeArgument(
  arg: ArgType,
): FunctionCallType["functionCall"]["arguments"][number] {
  if (typeof arg === "string") {
    return { string: { value: arg } };
  } else if (typeof arg === "number") {
    return { number: { value: arg } };
  } else if (typeof arg === "boolean") {
    return { boolean: { value: arg } };
  } else if (arg === null) {
    return { null: { value: arg } };
  } else if (arg instanceof QueryBuilder) {
    return arg.getSchema().schema.chain;
  } else if (Array.isArray(arg)) {
    const normalizedItems = arg.map((item) => normalizeArgument(item));
    if (normalizedItems.length === 0) {
      return { array: { value: [] } };
    }
    const first = normalizedItems[0];
    if (first == undefined)
      throw new Error("Unexpected undefined value in array");
    if ("string" in first && normalizedItems.every((it) => "string" in it)) {
      return { array: { value: normalizedItems } };
    } else if (
      "number" in first &&
      normalizedItems.every((it) => "number" in it)
    ) {
      return { array: { value: normalizedItems } };
    } else if (
      "boolean" in first &&
      normalizedItems.every((it) => "boolean" in it)
    ) {
      return { array: { value: normalizedItems } };
    } else if ("null" in first && normalizedItems.every((it) => "null" in it)) {
      return { array: { value: normalizedItems } };
    } else if (
      "array" in first &&
      normalizedItems.every((it) => "array" in it)
    ) {
      return { array: { value: normalizedItems } };
    } else if (
      "object" in first &&
      normalizedItems.every((it) => "object" in it)
    ) {
      return { array: { value: normalizedItems } };
    } else if (
      "chain" in first &&
      normalizedItems.every((it) => "chain" in it)
    ) {
      return { array: { value: normalizedItems } };
    } else {
      throw new Error("Array items must all be of the same argument type");
    }
  } else if (typeof arg === "object" && arg.constructor === Object) {
    return {
      object: {
        value: Object.fromEntries(
          Object.entries(arg).map(([key, value]) => [
            key,
            normalizeArgument(value),
          ]),
        ),
      },
    };
  } else if (arg === undefined) {
    throw new Error("Undefined is not a valid argument value");
  } else {
    throw new Error("Invalid argument type");
  }
}

export function cloneSchema(
  oldSchema: SchemaType,
  functionName: string,
  functionArgs: ArgType[],
  isTemplateLiteral: boolean,
): SchemaType {
  const newSchema = {
    schema: {
      ...oldSchema.schema,
      chain: {
        chain: {
          values: [...oldSchema.schema.chain.chain.values],
          initFunction: oldSchema.schema.chain.chain.initFunction,
        },
      },
    },
  };
  const normalizedArgs = functionArgs
    .map((arg) => (arg === undefined ? arg : normalizeArgument(arg)))
    .filter((arg) => arg !== undefined);
  let args = normalizedArgs;
  if (isTemplateLiteral) {
    const strings = functionArgs[0] as unknown as TemplateStringsArray;
    const expressions = functionArgs.slice(1);
    const normalizedTemplateLiteralArgs: FunctionCallType["functionCall"]["arguments"] =
      strings.reduce(
        (acc, str, index) => {
          if (str) {
            acc.push({ string: { value: str } });
          }
          if (index < expressions.length) {
            const expr = expressions[index];
            acc.push(normalizeArgument(expr));
          }
          return acc;
        },
        [] as FunctionCallType["functionCall"]["arguments"],
      );
    args = normalizedTemplateLiteralArgs;
  }
  newSchema.schema.chain.chain.values.push({
    functionCall: {
      name: functionName,
      arguments: args,
      isTemplateLiteral: isTemplateLiteral,
    },
  });
  return newSchema;
}
