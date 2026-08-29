// Auto-generated index for gntrees-method-chain

export type LanguageType = "typescript" | "javascript" | "c";

type StringType = {
  string: {
    value: string;
  };
};
type NumberType = {
  number: {
    value: number;
  };
};
type BooleanType = {
  boolean: {
    value: boolean;
  };
};
type NullType = {
  null: {
    value: null;
  };
};

type ArrayType = {
  array: {
    value:
      | StringType[]
      | NumberType[]
      | BooleanType[]
      | NullType[]
      | ArrayType[]
      | ObjectType[]
      | ChainType[];
  };
};

type ObjectType = {
  object: {
    value: {
      [key: string]:
        | StringType
        | NumberType
        | BooleanType
        | NullType
        | ArrayType
        | ObjectType
        | ChainType;
    };
  };
};

type ArgumentValue =
  | StringType
  | NumberType
  | BooleanType
  | NullType
  | ArrayType
  | ObjectType
  | ChainType;

type ArgumentType = {
  argument: ArgumentValue;
  default: ArgumentValue | null;
};

type FunctionCallType = {
  functionCall: {
    name: string;
    arguments: ArgumentType[];
    isTemplateLiteral: boolean;
  };
};

type PropertyCallType = {
  propertyCall: {
    name: string;
  };
};

type ChainType = {
  chain: {
    values: (FunctionCallType | PropertyCallType | CopyType)[];
    initFunction: InitFunctionType;
  };
};

type CopyType = {
  copy: {
    structureName: string;
    chain: ChainType;
  };
};

type InitFunctionType = {
  name: string;
  variableName: string;
};

type SchemaType = {
  schema: {
    exportName: string;
    importPaths?: Partial<Record<LanguageType, string>>;
    chain: ChainType;
  };
};

export type StructType = {
  struct:
    | {
        array: {
          type: StructType["struct"];
        };
      }
    | {
        object: {
          [key: string]: StructType["struct"];
        };
      }
    | {
        string: {
          type: "string";
        };
      }
    | {
        number: {
          type: "number";
        };
      }
    | {
        boolean: {
          type: "boolean";
        };
      }
    | {
        null: {
          type: "null";
        };
      }
    | {
        union: {
          types: StructType["struct"][];
        };
      }
    | {
        map: {
          type: StructType["struct"];
        };
      }
    | StructureCallType;
};

export type StructureCallType = {
  structureCall: {
    name: string;
  };
};

export type {
  SchemaType,
  FunctionCallType,
  PropertyCallType,
  CopyType,
  InitFunctionType,
  ArrayType,
  ObjectType,
  StringType,
  NumberType,
  BooleanType,
  NullType,
  ChainType,
  ArgumentType,
  ArgumentValue,
};

// Auto-generated types
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

// Auto-generated utils
export const normalizeArgumentStructureCall = (arg: ArgType): ArgumentValue => {
  if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
    throw new Error(
      "Expected a structure instance for structure calls, but got " +
        (arg === null ? "null" : Array.isArray(arg) ? "array" : typeof arg),
    );
  } else if (arg instanceof TypeConverter) {
    return arg.getSchema().schema.chain;
  } else if (arg instanceof StringFormatter) {
    return arg.getSchema().schema.chain;
  } else if (arg instanceof QueryBuilder) {
    return arg.getSchema().schema.chain;
  } else {
    throw new Error("Unknown structure call argument type");
  }
};
export function copy(source: ArgType): CopyBuilder {
  if (source instanceof TypeConverter) {
    return makeCopy("type-converter", source);
  }
  if (source instanceof StringFormatter) {
    return makeCopy("string-formatter", source);
  }
  if (source instanceof QueryBuilder) {
    return makeCopy("query-builder", source);
  }
  throw new Error(
    "copy() expects a structure instance created by an init function",
  );
}

export function createSchema(
  oldSchema: SchemaType,
  functionName: string,
  functionArgs: {
    arg: any;
    struct: StructType["struct"];
    default?: ArgumentValue;
    provided?: boolean;
  }[],
  isTemplateLiteral: boolean,
): SchemaType {
  validateSchema(oldSchema);
  const newSchema = {
    schema: {
      ...oldSchema.schema,
      chain: {
        chain: {
          values: [...oldSchema.schema.chain.chain.values],
          initFunction: oldSchema.schema.chain.chain.initFunction,
        },
      },
    },
  };
  let args: ArgumentType[] = [];
  if (isTemplateLiteral && functionArgs[0]) {
    const strings = functionArgs[0].arg;
    if (
      !Array.isArray(strings) ||
      !strings.every((str) => typeof str === "string")
    ) {
      throw new Error(`Expected a template strings array for ${functionName}`);
    }
    const expressions = functionArgs.slice(1);
    if (expressions.length !== strings.length - 1) {
      throw new Error(
        `Template literal for ${functionName} expects ${strings.length - 1} expression(s), but got ${expressions.length}`,
      );
    }
    const normalizedTemplateLiteralArgs = strings.reduce((acc, str, index) => {
      if (str) {
        acc.push({ argument: { string: { value: str } }, default: null });
      }
      if (index < expressions.length) {
        const expr = expressions[index];
        if (!expr) {
          throw new Error(
            `Missing expression for template literal at index ${index}`,
          );
        }
        acc.push({
          argument: normalizeArgument(expr.arg, expr.struct),
          default: null,
        });
      }
      return acc;
    }, [] as ArgumentType[]);
    args = normalizedTemplateLiteralArgs;
  } else {
    args = functionArgs.map((fa, index) => {
      if (fa.arg === undefined) {
        if (fa.provided) {
          throw new Error(
            `Parameter "${functionName}" argument #${index + 1} cannot be undefined`,
          );
        }
        if (fa.default !== undefined) {
          validateDefault(fa.default, fa.struct);
          return { argument: fa.default, default: fa.default };
        }
        throw new Error(
          `Parameter "${functionName}" argument #${index + 1} was not provided`,
        );
      }
      const argument = normalizeArgument(fa.arg, fa.struct);
      if (fa.default !== undefined) validateDefault(fa.default, fa.struct);
      return { argument, default: fa.default ?? null };
    });
  }
  newSchema.schema.chain.chain.values.push({
    functionCall: {
      name: functionName,
      arguments: args,
      isTemplateLiteral: isTemplateLiteral,
    },
  });
  return newSchema;
}

export function createPropertyCallSchema(
  oldSchema: SchemaType,
  propertyName: string,
): SchemaType {
  return {
    schema: {
      ...oldSchema.schema,
      chain: {
        chain: {
          values: [
            ...oldSchema.schema.chain.chain.values,
            { propertyCall: { name: propertyName } },
          ],
          initFunction: oldSchema.schema.chain.chain.initFunction,
        },
      },
    },
  };
}

export function validateSchema(schema: SchemaType): void {
  if (
    typeof schema !== "object" ||
    schema === null ||
    !schema.schema ||
    !schema.schema.chain ||
    !schema.schema.chain.chain ||
    !Array.isArray(schema.schema.chain.chain.values) ||
    !schema.schema.chain.chain.initFunction
  ) {
    throw new Error(
      "Invalid schema: expected SchemaType with schema.chain.chain.values and schema.chain.chain.initFunction",
    );
  }
}

function unwrapArgumentValue(val: ArgumentValue): any {
  if ("string" in val) return val.string.value;
  if ("number" in val) return val.number.value;
  if ("boolean" in val) return val.boolean.value;
  if ("null" in val) return val.null.value;
  if ("array" in val) return val.array.value.map(unwrapArgumentValue);
  if ("object" in val) {
    const obj: any = {};
    for (const [key, value] of Object.entries(val.object.value)) {
      obj[key] = unwrapArgumentValue(value);
    }
    return obj;
  }
  if ("chain" in val)
    throw new Error("Cannot validate a chain default value at runtime");
  throw new Error("Unknown argument value type");
}

function validateDefault(
  defaultVal: ArgumentValue,
  struct: StructType["struct"],
): void {
  normalizeArgument(unwrapArgumentValue(defaultVal), struct);
}

function normalizeArgument(
  arg: any,
  struct: StructType["struct"],
): ArgumentValue {
  if ("array" in struct) {
    if (!Array.isArray(arg)) {
      throw new Error(`Expected an array argument, but got ${typeof arg}`);
    }
    if (arg.length === 0) {
      return { array: { value: [] } };
    }
    const itemType = struct.array.type;
    const normalizedItems = arg.map((item) =>
      normalizeArgument(item, itemType),
    );
    const first = normalizedItems[0];
    if (first == undefined)
      throw new Error("Unexpected undefined value in array");
    if ("string" in first && normalizedItems.every((it) => "string" in it)) {
      return { array: { value: normalizedItems } };
    } else if (
      "number" in first &&
      normalizedItems.every((it) => "number" in it)
    ) {
      return { array: { value: normalizedItems } };
    } else if (
      "boolean" in first &&
      normalizedItems.every((it) => "boolean" in it)
    ) {
      return { array: { value: normalizedItems } };
    } else if ("null" in first && normalizedItems.every((it) => "null" in it)) {
      return { array: { value: normalizedItems } };
    } else if (
      "array" in first &&
      normalizedItems.every((it) => "array" in it)
    ) {
      return { array: { value: normalizedItems } };
    } else if (
      "object" in first &&
      normalizedItems.every((it) => "object" in it)
    ) {
      return { array: { value: normalizedItems } };
    } else if (
      "chain" in first &&
      normalizedItems.every((it) => "chain" in it)
    ) {
      return { array: { value: normalizedItems } };
    } else {
      throw new Error("Array items must all be of the same argument type");
    }
  } else if ("object" in struct) {
    if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
      throw new Error(`Expected an object argument, but got ${typeof arg}`);
    }
    if (
      Object.keys(arg).length === 0 &&
      Object.getPrototypeOf(arg) !== Object.prototype &&
      Object.getPrototypeOf(arg) !== null
    ) {
      throw new Error(
        `Expected a plain object argument, but got ${Object.prototype.toString.call(arg)}`,
      );
    }
    const missingKeys = Object.keys(struct.object).filter(
      (key) => !Object.prototype.hasOwnProperty.call(arg, key),
    );
    if (missingKeys.length > 0) {
      throw new Error(
        `Missing required key(s) "${missingKeys.join('", "')}" in object argument`,
      );
    }
    const normalizedObject = Object.fromEntries(
      Object.entries(arg).map(([key, value]) => {
        if (!struct.object[key]) {
          throw new Error(`Unexpected key "${key}" in object argument`);
        }
        const valueType = struct.object[key];
        return [key, normalizeArgument(value, valueType)];
      }),
    );
    return { object: { value: normalizedObject } };
  } else if ("string" in struct) {
    if (typeof arg !== "string") {
      throw new Error(`Expected a string argument, but got ${typeof arg}`);
    }
    return { string: { value: arg } };
  } else if ("number" in struct) {
    if (typeof arg !== "number") {
      throw new Error(`Expected a number argument, but got ${typeof arg}`);
    }
    if (!Number.isFinite(arg)) {
      throw new Error(`Expected a finite number argument, but got ${arg}`);
    }
    return { number: { value: arg } };
  } else if ("boolean" in struct) {
    if (typeof arg !== "boolean") {
      throw new Error(`Expected a boolean argument, but got ${typeof arg}`);
    }
    return { boolean: { value: arg } };
  } else if ("null" in struct) {
    if (arg !== null) {
      throw new Error(`Expected a null argument, but got ${typeof arg}`);
    }
    return { null: { value: arg } };
  } else if ("union" in struct) {
    const reasons: string[] = [];
    const normalizedUnionTypes = struct.union.types
      .map((type) => {
        try {
          return normalizeArgument(arg, type);
        } catch (e) {
          reasons.push(e instanceof Error ? e.message : String(e));
          return null;
        }
      })
      .filter((type) => type !== null);
    if (normalizedUnionTypes.length === 0 || !normalizedUnionTypes[0]) {
      throw new Error(
        `Argument does not match any type in the union: ${reasons.join(" | ")}`,
      );
    }
    if (normalizedUnionTypes.length > 1) {
      if (Array.isArray(arg) && arg.length === 0) {
        return normalizedUnionTypes[0];
      }
      throw new Error(
        `Argument matches multiple types in the union, which is ambiguous`,
      );
    }
    return normalizedUnionTypes[0];
  } else if ("map" in struct) {
    if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
      throw new Error(
        `Expected an object argument for map type, but got ${typeof arg}`,
      );
    }
    if (
      Object.keys(arg).length === 0 &&
      Object.getPrototypeOf(arg) !== Object.prototype &&
      Object.getPrototypeOf(arg) !== null
    ) {
      throw new Error(
        `Expected a plain object argument for map type, but got ${Object.prototype.toString.call(arg)}`,
      );
    }
    const normalizedMap = Object.fromEntries(
      Object.entries(arg).map(([key, value]) => [
        key,
        normalizeArgument(value, struct.map.type),
      ]),
    );
    return { object: { value: normalizedMap } };
  } else if ("structureCall" in struct) {
    const normalizedArgumentStructureCall = normalizeArgumentStructureCall(arg);
    return normalizedArgumentStructureCall;
  } else {
    throw new Error("Unsupported struct type in normalizeArgument");
  }
}

export type CopyBuilder = {
  copy: {
    structureName: string;
    chain: SchemaType["schema"]["chain"];
  };
};

export function makeCopy(
  structureName: string,
  source: { getSchema(): SchemaType },
): CopyBuilder {
  const schema = source.getSchema();
  validateSchema(schema);
  return {
    copy: {
      structureName,
      chain: schema.schema.chain,
    },
  };
}

export function applyCopies(
  schema: SchemaType,
  copies: CopyBuilder[] | undefined,
  targetStructureName: string,
): void {
  if (!copies || copies.length === 0) return;
  for (const cp of copies) {
    if (
      typeof cp !== "object" ||
      cp === null ||
      !("copy" in cp) ||
      typeof (cp as CopyBuilder).copy?.structureName !== "string" ||
      typeof (cp as CopyBuilder).copy?.chain !== "object" ||
      (cp as CopyBuilder).copy?.chain === null
    ) {
      throw new Error(
        "Invalid builder argument in init function: wrap the structure with copy(...)",
      );
    }
    if (cp.copy.structureName !== targetStructureName) {
      throw new Error(
        `Cannot copy builder of structure '${cp.copy.structureName}' into '${targetStructureName}'`,
      );
    }
    const value: CopyType = {
      copy: {
        structureName: cp.copy.structureName,
        chain: cp.copy.chain,
      },
    };
    schema.schema.chain.chain.values.push(value);
  }
}

// Auto-generated definition for type-converter

export class TypeConverter {
  private schemaTypeConverter: SchemaType = {
    schema: {
      exportName: "schema",
      importPaths: {
        typescript: "../../../gntrees-method-chain/typescript/index",
      },
      chain: {
        chain: {
          values: [],
          initFunction: {
            name: "type-converter",
            variableName: "s1",
          },
        },
      },
    },
  };
  getSchema(
    exportName?: string,
    importPaths?: Partial<Record<LanguageType, string>>,
  ): SchemaType {
    if (exportName !== undefined && typeof exportName !== "string") {
      throw new Error(
        `getSchema exportName must be a string, but got ${typeof exportName}`,
      );
    }
    if (
      importPaths !== undefined &&
      (typeof importPaths !== "object" ||
        importPaths === null ||
        Array.isArray(importPaths))
    ) {
      throw new Error(
        `getSchema importPaths must be an object, but got ${typeof importPaths}`,
      );
    }
    if (exportName) {
      this.schemaTypeConverter.schema.exportName = exportName;
    }
    if (importPaths) {
      this.schemaTypeConverter.schema.importPaths = {
        ...this.schemaTypeConverter.schema.importPaths,
        ...importPaths,
      };
    }
    return this.schemaTypeConverter;
  }
  initFromStructure<T>(schema: SchemaType) {
    validateSchema(schema);
    this.schemaTypeConverter = schema;
    return this;
  }
  initFromInitFunction(
    initFunction: SchemaType["schema"]["chain"]["chain"]["initFunction"],
    copies?: CopyBuilder[],
  ) {
    if (
      typeof initFunction !== "object" ||
      initFunction === null ||
      typeof initFunction.name !== "string" ||
      typeof initFunction.variableName !== "string"
    ) {
      throw new Error("Invalid init function");
    }
    this.schemaTypeConverter.schema.chain.chain.initFunction = initFunction;
    applyCopies(this.schemaTypeConverter, copies, "type-converter");
    return this;
  }
  get testvar(): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createPropertyCallSchema(this.getSchema(), "testvar"),
    );
  }
  stringify(val: string): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createSchema(
        this.getSchema(),
        "stringify",
        [
          {
            arg: val,
            struct: { string: { type: "string" } },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  numerify(val: number): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createSchema(
        this.getSchema(),
        "numerify",
        [
          {
            arg: val,
            struct: { number: { type: "number" } },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  boolify(val: boolean): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createSchema(
        this.getSchema(),
        "boolify",
        [
          {
            arg: val,
            struct: { boolean: { type: "boolean" } },
            provided: arguments.length >= 1,
          },
        ],
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
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  unify(value: string | number): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
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
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  interpolate(
    strings: TemplateStringsArray,
    ...args: (string | number)[]
  ): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
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
  label(value?: string): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createSchema(
        this.getSchema(),
        "label",
        [
          {
            arg: value,
            struct: { string: { type: "string" } },
            provided: arguments.length >= 1,
            default: { string: { value: "default" } },
          },
        ],
        false,
      ),
    );
  }
  tags(tags?: string[]): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createSchema(
        this.getSchema(),
        "tags",
        [
          {
            arg: tags,
            struct: { array: { type: { string: { type: "string" } } } },
            provided: arguments.length >= 1,
            default: { array: { value: [{ string: { value: "default" } }] } },
          },
        ],
        false,
      ),
    );
  }
}

// Auto-generated definition for string-formatter

export class StringFormatter {
  private schemaStringFormatter: SchemaType = {
    schema: {
      exportName: "schema",
      importPaths: {
        typescript: "../../../gntrees-method-chain/typescript/index",
      },
      chain: {
        chain: {
          values: [],
          initFunction: {
            name: "string-formatter",
            variableName: "s2",
          },
        },
      },
    },
  };
  getSchema(
    exportName?: string,
    importPaths?: Partial<Record<LanguageType, string>>,
  ): SchemaType {
    if (exportName !== undefined && typeof exportName !== "string") {
      throw new Error(
        `getSchema exportName must be a string, but got ${typeof exportName}`,
      );
    }
    if (
      importPaths !== undefined &&
      (typeof importPaths !== "object" ||
        importPaths === null ||
        Array.isArray(importPaths))
    ) {
      throw new Error(
        `getSchema importPaths must be an object, but got ${typeof importPaths}`,
      );
    }
    if (exportName) {
      this.schemaStringFormatter.schema.exportName = exportName;
    }
    if (importPaths) {
      this.schemaStringFormatter.schema.importPaths = {
        ...this.schemaStringFormatter.schema.importPaths,
        ...importPaths,
      };
    }
    return this.schemaStringFormatter;
  }
  initFromStructure<T>(schema: SchemaType) {
    validateSchema(schema);
    this.schemaStringFormatter = schema;
    return this;
  }
  initFromInitFunction(
    initFunction: SchemaType["schema"]["chain"]["chain"]["initFunction"],
    copies?: CopyBuilder[],
  ) {
    if (
      typeof initFunction !== "object" ||
      initFunction === null ||
      typeof initFunction.name !== "string" ||
      typeof initFunction.variableName !== "string"
    ) {
      throw new Error("Invalid init function");
    }
    this.schemaStringFormatter.schema.chain.chain.initFunction = initFunction;
    applyCopies(this.schemaStringFormatter, copies, "string-formatter");
    return this;
  }
  format(val: string): StringFormatter {
    return new StringFormatter().initFromStructure<StringFormatter>(
      createSchema(
        this.getSchema(),
        "format",
        [
          {
            arg: val,
            struct: { string: { type: "string" } },
            provided: arguments.length >= 1,
          },
        ],
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
            provided: arguments.length >= 1,
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
  label(value?: string): StringFormatter {
    return new StringFormatter().initFromStructure<StringFormatter>(
      createSchema(
        this.getSchema(),
        "label",
        [
          {
            arg: value,
            struct: { string: { type: "string" } },
            provided: arguments.length >= 1,
            default: { string: { value: "default" } },
          },
        ],
        false,
      ),
    );
  }
}

// Auto-generated definition for query-builder

export class QueryBuilder {
  private schemaQueryBuilder: SchemaType = {
    schema: {
      exportName: "schema",
      importPaths: {
        typescript: "../../../gntrees-method-chain/typescript/index",
      },
      chain: {
        chain: {
          values: [],
          initFunction: {
            name: "query-builder",
            variableName: "s3",
          },
        },
      },
    },
  };
  getSchema(
    exportName?: string,
    importPaths?: Partial<Record<LanguageType, string>>,
  ): SchemaType {
    if (exportName !== undefined && typeof exportName !== "string") {
      throw new Error(
        `getSchema exportName must be a string, but got ${typeof exportName}`,
      );
    }
    if (
      importPaths !== undefined &&
      (typeof importPaths !== "object" ||
        importPaths === null ||
        Array.isArray(importPaths))
    ) {
      throw new Error(
        `getSchema importPaths must be an object, but got ${typeof importPaths}`,
      );
    }
    if (exportName) {
      this.schemaQueryBuilder.schema.exportName = exportName;
    }
    if (importPaths) {
      this.schemaQueryBuilder.schema.importPaths = {
        ...this.schemaQueryBuilder.schema.importPaths,
        ...importPaths,
      };
    }
    return this.schemaQueryBuilder;
  }
  initFromStructure<T>(schema: SchemaType) {
    validateSchema(schema);
    this.schemaQueryBuilder = schema;
    return this;
  }
  initFromInitFunction(
    initFunction: SchemaType["schema"]["chain"]["chain"]["initFunction"],
    copies?: CopyBuilder[],
  ) {
    if (
      typeof initFunction !== "object" ||
      initFunction === null ||
      typeof initFunction.name !== "string" ||
      typeof initFunction.variableName !== "string"
    ) {
      throw new Error("Invalid init function");
    }
    this.schemaQueryBuilder.schema.chain.chain.initFunction = initFunction;
    applyCopies(this.schemaQueryBuilder, copies, "query-builder");
    return this;
  }
  select(
    columns:
      | (string | number | boolean | QueryBuilder)
      | (string | number | boolean | QueryBuilder)[]
      | { [key: string]: string | number | boolean | QueryBuilder },
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "select",
        [
          {
            arg: columns,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    array: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                  {
                    map: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  from(table: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "from",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  transaction(
    transaction:
      | (string | number | boolean | QueryBuilder)
      | (string | number | boolean | QueryBuilder)[],
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "transaction",
        [
          {
            arg: transaction,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    array: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  orderBy(
    columns:
      | (string | number | boolean | QueryBuilder)
      | (string | number | boolean | QueryBuilder)[],
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "orderBy",
        [
          {
            arg: columns,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    array: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  limit(count: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "limit",
        [
          {
            arg: count,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  offset(count: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "offset",
        [
          {
            arg: count,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  with(
    statement: string | number | boolean | QueryBuilder,
    as: string | number | boolean | QueryBuilder,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "with",
        [
          {
            arg: statement,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: as,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  groupBy(
    columns:
      | (string | number | boolean | QueryBuilder)
      | (string | number | boolean | QueryBuilder)[],
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "groupBy",
        [
          {
            arg: columns,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    array: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  having(statement: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "having",
        [
          {
            arg: statement,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  where(statement: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "where",
        [
          {
            arg: statement,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  update(
    table: string | number | boolean | QueryBuilder,
    set:
      | (string | number | boolean | QueryBuilder)
      | { [key: string]: string | number | boolean | QueryBuilder },
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "update",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: set,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    map: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  set(
    statement:
      | (string | number | boolean | QueryBuilder)
      | { [key: string]: string | number | boolean | QueryBuilder },
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "set",
        [
          {
            arg: statement,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    map: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  insert(
    table: string | number | boolean | QueryBuilder,
    set:
      | (string | number | boolean | QueryBuilder)
      | { [key: string]: string | number | boolean | QueryBuilder },
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "insert",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: set,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    map: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  values(
    values:
      | (string | number | boolean | QueryBuilder)
      | (string | number | boolean | QueryBuilder)[]
      | (string | number | boolean | QueryBuilder)[][],
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "values",
        [
          {
            arg: values,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    array: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                  {
                    array: {
                      type: {
                        array: {
                          type: {
                            union: {
                              types: [
                                { string: { type: "string" } },
                                { number: { type: "number" } },
                                { boolean: { type: "boolean" } },
                                { structureCall: { name: "query-builder" } },
                              ],
                            },
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  returning(
    columns:
      | (string | number | boolean | QueryBuilder)
      | (string | number | boolean | QueryBuilder)[]
      | { [key: string]: string | number | boolean | QueryBuilder },
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "returning",
        [
          {
            arg: columns,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    array: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                  {
                    map: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  onConflictDoNothing(
    target: string | number | boolean | QueryBuilder,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "onConflictDoNothing",
        [
          {
            arg: target,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  onConflictDoUpdate(
    target: string | number | boolean | QueryBuilder,
    set:
      | (string | number | boolean | QueryBuilder)
      | { [key: string]: string | number | boolean | QueryBuilder },
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "onConflictDoUpdate",
        [
          {
            arg: target,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: set,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    map: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  delete(table: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "delete",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  join(
    table: string | number | boolean | QueryBuilder,
    on: string | number | boolean | QueryBuilder,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "join",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: on,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  leftJoin(
    table: string | number | boolean | QueryBuilder,
    on: string | number | boolean | QueryBuilder,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "leftJoin",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: on,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  rightJoin(
    table: string | number | boolean | QueryBuilder,
    on: string | number | boolean | QueryBuilder,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "rightJoin",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: on,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  innerJoin(
    table: string | number | boolean | QueryBuilder,
    on: string | number | boolean | QueryBuilder,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "innerJoin",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: on,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  fullJoin(
    table: string | number | boolean | QueryBuilder,
    on: string | number | boolean | QueryBuilder,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "fullJoin",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: on,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  crossJoin(
    table: string | number | boolean | QueryBuilder,
    on: string | number | boolean | QueryBuilder,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "crossJoin",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: on,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  eq(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "eq",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  gt(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "gt",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  gte(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "gte",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  lt(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "lt",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  lte(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "lte",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  exists(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "exists",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  isNull(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "isNull",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  in(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "in",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  between(
    first: string | number | boolean | QueryBuilder,
    second: string | number | boolean | QueryBuilder,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "between",
        [
          {
            arg: first,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: second,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  like(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "like",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  ilike(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "ilike",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  not(value: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "not",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  and(
    values:
      | (string | number | boolean | QueryBuilder)
      | (string | number | boolean | QueryBuilder)[],
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "and",
        [
          {
            arg: values,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    array: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  or(
    values:
      | (string | number | boolean | QueryBuilder)
      | (string | number | boolean | QueryBuilder)[],
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "or",
        [
          {
            arg: values,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { structureCall: { name: "query-builder" } },
                      ],
                    },
                  },
                  {
                    array: {
                      type: {
                        union: {
                          types: [
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { structureCall: { name: "query-builder" } },
                          ],
                        },
                      },
                    },
                  },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  op(
    operation: string | number | boolean | QueryBuilder,
    value: string | number | boolean | QueryBuilder,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "op",
        [
          {
            arg: operation,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
          {
            arg: value,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 2,
          },
        ],
        false,
      ),
    );
  }
  raw(
    strings: TemplateStringsArray,
    ...args: (string | number | boolean | QueryBuilder)[]
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "raw",
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
                    { boolean: { type: "boolean" } },
                    { structureCall: { name: "query-builder" } },
                  ],
                },
              } as {
                union: {
                  types: [
                    { string: { type: "string" } },
                    { number: { type: "number" } },
                    { boolean: { type: "boolean" } },
                    { structureCall: { name: "query-builder" } },
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
  asc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "asc", [], false),
    );
  }
  desc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "desc", [], false),
    );
  }
  as(alias: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "as",
        [
          {
            arg: alias,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  col(column: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "col",
        [
          {
            arg: column,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  table(table: string | number | boolean | QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "table",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  { string: { type: "string" } },
                  { number: { type: "number" } },
                  { boolean: { type: "boolean" } },
                  { structureCall: { name: "query-builder" } },
                ],
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
}

// Auto-generated init functions
export function createTypeConverter(
  variableName?: string,
  ...copies: CopyBuilder[]
) {
  const structure = new TypeConverter();
  structure.initFromInitFunction(
    {
      name: "create-type-converter",
      variableName:
        variableName ||
        structure.getSchema().schema.chain.chain.initFunction.variableName,
    },
    copies,
  );
  return structure;
}
export function createStringFormatter(
  variableName?: string,
  ...copies: CopyBuilder[]
) {
  const structure = new StringFormatter();
  structure.initFromInitFunction(
    {
      name: "create-string-formatter",
      variableName:
        variableName ||
        structure.getSchema().schema.chain.chain.initFunction.variableName,
    },
    copies,
  );
  return structure;
}
export function queryBuilder(variableName?: string, ...copies: CopyBuilder[]) {
  const structure = new QueryBuilder();
  structure.initFromInitFunction(
    {
      name: "query-builder",
      variableName:
        variableName ||
        structure.getSchema().schema.chain.chain.initFunction.variableName,
    },
    copies,
  );
  return structure;
}
