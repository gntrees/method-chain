// Auto-generated utils file
import type { ArgType } from "./types.ts";
import type { ArgumentValue } from "./base-types.ts";
import { TypeConverter } from "./type-converter.ts";
import { StringFormatter } from "./string-formatter.ts";

export const normalizeArgumentStructureCall = (arg: ArgType): ArgumentValue => {
  if (typeof arg !== "object") {
    throw new Error(
      "Expected an object argument for structure calls, but got " + typeof arg,
    );
  } else if (arg instanceof TypeConverter) {
    return arg.getSchema().schema.chain;
  } else if (arg instanceof StringFormatter) {
    return arg.getSchema().schema.chain;
  } else {
    throw new Error("Unknown structure call argument type");
  }
};
