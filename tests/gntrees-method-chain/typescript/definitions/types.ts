// Auto-generated types file
import type { SchemaType, FunctionCallType } from "./base-types.ts";
import { TypeConverter } from "./type-converter.ts";
import { StringFormatter } from "./string-formatter.ts";
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
  | TypeConverter[]
  | StringFormatter[]
  | QueryBuilder[];
export type ArgType =
  | string
  | number
  | boolean
  | null
  | undefined
  | ArgObject
  | ArgArray
  | TypeConverter
  | StringFormatter
  | QueryBuilder
  | TemplateStringsArray;
