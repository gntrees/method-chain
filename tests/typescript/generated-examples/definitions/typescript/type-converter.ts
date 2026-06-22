// Auto-generated definition for type-converter
import {} from "./type-converter";
import type { SchemaType } from "./base-types.ts";
import { createSchema } from "./base-utils.ts";

export class TypeConverter {
  private schemaTypeConverter: SchemaType = {
    schema: {
      exportName: "schema",
      chain: {
        chain: {
          values: [],
          initFunction: {
            name: "type-converter",
            variableName: "s1",
            importString: "",
          },
        },
      },
    },
  };
  getSchema(exportName?: string, importString?: string): SchemaType {
    if (exportName) {
      this.schemaTypeConverter.schema.exportName = exportName;
    }
    if (importString) {
      this.schemaTypeConverter.schema.chain.chain.initFunction.importString =
        importString;
    }
    return this.schemaTypeConverter;
  }
  initFromStructure<T>(schema: SchemaType) {
    this.schemaTypeConverter = schema;
    return this;
  }
  initFromInitFunction(
    initFunction: SchemaType["schema"]["chain"]["chain"]["initFunction"],
  ) {
    this.schemaTypeConverter.schema.chain.chain.initFunction = initFunction;
    return this;
  }
  stringify(val: string): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createSchema(
        this.getSchema(),
        "stringify",
        [{ arg: val, struct: { string: { type: "string" } } }],
        false,
      ),
    );
  }
  numerify(val: number): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createSchema(
        this.getSchema(),
        "numerify",
        [{ arg: val, struct: { number: { type: "number" } } }],
        false,
      ),
    );
  }
  boolify(val: boolean): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createSchema(
        this.getSchema(),
        "boolify",
        [{ arg: val, struct: { boolean: { type: "boolean" } } }],
        false,
      ),
    );
  }
  pipe(formatter: StringFormatter): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createSchema(
        this.getSchema(),
        "pipe",
        [
          {
            arg: formatter,
            struct: { structureCall: { name: "string-formatter" } },
          },
        ],
        false,
      ),
    );
  }
}
