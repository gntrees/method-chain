// Auto-generated definition for create-type-converter
import { TypeConverter } from "./type-converter";

export function createTypeConverter(variableName?: string) {
  const structure = new TypeConverter();
  structure.initFromInitFunction({
    name: "create-type-converter",
    variableName:
      variableName ||
      structure.getSchema().schema.chain.chain.initFunction.variableName,
    importString: `import { createTypeConverter } from "../../../gntrees-method-chain/typescript/definitions/create-type-converter"`,
  });
  return structure;
}
