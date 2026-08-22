// Auto-generated types file
import type { SchemaType, FunctionCallType } from "./base-types.ts";
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
export type ArgType =
  | string
  | number
  | boolean
  | null
  | undefined
  | ArgObject
  | ArgArray
  | QueryBuilder
  | TemplateStringsArray;
