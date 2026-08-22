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
  unify(value: string | number): StringFormatter {
    return new StringFormatter().initFromStructure<StringFormatter>(
      createSchema(
        this.getSchema(),
        "unify",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                ],
              },
            },
          },
        ],
        false,
      ),
    );
  }
  interpolate(
    strings: TemplateStringsArray,
    ...args: (string | number)[]
  ): StringFormatter {
    return new StringFormatter().initFromStructure<StringFormatter>(
      createSchema(
        this.getSchema(),
        "interpolate",
        [
          { arg: strings, struct: { string: { type: "string" } } },
          ...args.map((arg) => {
            return {
              arg: arg,
              struct: {
                union: {
                  types: [
                    { string: { type: "string" } },
                    { number: { type: "number" } },
                  ],
                },
              } as {
                union: {
                  types: [
                    { string: { type: "string" } },
                    { number: { type: "number" } },
                  ];
                };
              },
            };
          }),
        ],
        true,
      ),
    );
  }
  label(value: string = "default"): StringFormatter {
    return new StringFormatter().initFromStructure<StringFormatter>(
      createSchema(
        this.getSchema(),
        "label",
        [
          {
            arg: value,
            struct: { string: { type: "string" } },
            default: { string: { value: "default" } },
          },
        ],
        false,
      ),
    );
  }
}
