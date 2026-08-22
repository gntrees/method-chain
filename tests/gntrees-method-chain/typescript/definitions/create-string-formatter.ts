// Auto-generated definition for create-string-formatter
import { StringFormatter } from "./string-formatter";

export function createStringFormatter(variableName?: string) {
  const structure = new StringFormatter();
  structure.initFromInitFunction({
    name: "create-string-formatter",
    variableName:
      variableName ||
      structure.getSchema().schema.chain.chain.initFunction.variableName,
    importString: `import { createStringFormatter } from "../../../gntrees-method-chain/typescript/definitions/create-string-formatter"`,
  });
  return structure;
}
