// Auto-generated definition for string-formatter
import {} from "./string-formatter";
import type { SchemaType } from "./base-types.ts";
import { createSchema } from "./base-utils.ts";

export class StringFormatter {
  private schemaStringFormatter: SchemaType = {
    schema: {
      exportName: "schema",
      chain: {
        chain: {
          values: [],
          initFunction: {
            name: "string-formatter",
            variableName: "s2",
            importString: "",
          },
        },
      },
    },
  };
  getSchema(exportName?: string, importString?: string): SchemaType {
    if (exportName) {
      this.schemaStringFormatter.schema.exportName = exportName;
    }
    if (importString) {
      this.schemaStringFormatter.schema.chain.chain.initFunction.importString =
        importString;
    }
    return this.schemaStringFormatter;
  }
  initFromStructure<T>(schema: SchemaType) {
    this.schemaStringFormatter = schema;
    return this;
  }
  initFromInitFunction(
    initFunction: SchemaType["schema"]["chain"]["chain"]["initFunction"],
  ) {
    this.schemaStringFormatter.schema.chain.chain.initFunction = initFunction;
    return this;
  }
  format(val: string): StringFormatter {
    return new StringFormatter().initFromStructure<StringFormatter>(
      createSchema(
        this.getSchema(),
        "format",
        [{ arg: val, struct: { string: { type: "string" } } }],
        false,
      ),
    );
  }
}
