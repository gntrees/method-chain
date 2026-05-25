// Auto-generated definition for sql-builder
import { QueryBuilder } from "./query-builder";

export function sqlBuilder(variableName?: string) {
  const structure = new QueryBuilder();
  structure.initFromInitFunction({
    name: "sql-builder",
    variableName:
      variableName ||
      structure.getSchema().schema.chain.chain.initFunction.variableName,
    importString: `import { sqlBuilder } from "./query-builder/definitions/typescript/sql-builder.ts";`,
  });
  return structure;
}
