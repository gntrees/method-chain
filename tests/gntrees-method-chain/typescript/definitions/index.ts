// Auto-generated init functions
import { TypeConverter } from "./type-converter";

import { StringFormatter } from "./string-formatter";

import { QueryBuilder } from "./query-builder";

export function createTypeConverter(variableName?: string) {
  const structure = new TypeConverter();
  structure.initFromInitFunction({
    name: "create-type-converter",
    variableName:
      variableName ||
      structure.getSchema().schema.chain.chain.initFunction.variableName,
    importString: `import { createTypeConverter } from "../../../gntrees-method-chain/typescript/definitions/index"`,
  });
  return structure;
}
export function createStringFormatter(variableName?: string) {
  const structure = new StringFormatter();
  structure.initFromInitFunction({
    name: "create-string-formatter",
    variableName:
      variableName ||
      structure.getSchema().schema.chain.chain.initFunction.variableName,
    importString: `import { createStringFormatter } from "../../../gntrees-method-chain/typescript/definitions/index"`,
  });
  return structure;
}
export function queryBuilder(variableName?: string) {
  const structure = new QueryBuilder();
  structure.initFromInitFunction({
    name: "query-builder",
    variableName:
      variableName ||
      structure.getSchema().schema.chain.chain.initFunction.variableName,
    importString: `import { queryBuilder } from "../../../gntrees-method-chain/typescript/definitions/index"`,
  });
  return structure;
}
