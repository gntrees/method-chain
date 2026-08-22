// Auto-generated utils file
import type { ArgType } from "./types.ts";
import type { ArgumentValue } from "./base-types.ts";
import { QueryBuilder } from "./query-builder.ts";

export const normalizeArgumentStructureCall = (arg: ArgType): ArgumentValue => {
  if (typeof arg !== "object") {
    throw new Error(
      "Expected an object argument for structure calls, but got " + typeof arg,
    );
  } else if (arg instanceof QueryBuilder) {
    return arg.getSchema().schema.chain;
  } else {
    throw new Error("Unknown structure call argument type");
  }
};
