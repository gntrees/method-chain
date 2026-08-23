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
    values: (FunctionCallType | PropertyCallType)[];
    initFunction: InitFunctionType;
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
  if (typeof arg !== "object") {
    throw new Error(
      "Expected an object argument for structure calls, but got " + typeof arg,
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

export function createSchema(
  oldSchema: SchemaType,
  functionName: string,
  functionArgs: {
    arg: any;
    struct: StructType["struct"];
    default?: ArgumentValue;
  }[],
  isTemplateLiteral: boolean,
): SchemaType {
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
    const strings = functionArgs[0].arg as unknown as TemplateStringsArray;
    const expressions = functionArgs.slice(1);
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
    args = functionArgs
      .map((fa) =>
        fa.arg === undefined
          ? undefined
          : {
              argument: normalizeArgument(fa.arg, fa.struct),
              default: fa.default ?? null,
            },
      )
      .filter((a) => a !== undefined);
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

function normalizeArgument(
  arg: any,
  struct: StructType["struct"],
): ArgumentValue {
  if ("array" in struct) {
    if (!Array.isArray(arg)) {
      throw new Error(`Expected an array argument, but got ${typeof arg}`);
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
    const normalizedUnionTypes = struct.union.types
      .map((type) => {
        try {
          return normalizeArgument(arg, type);
        } catch (e) {
          return null;
        }
      })
      .filter((type) => type !== null);
    if (normalizedUnionTypes.length === 0 || !normalizedUnionTypes[0]) {
      throw new Error(`Argument does not match any type in the union`);
    }
    if (normalizedUnionTypes.length > 1) {
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
  getSchema(exportName?: string): SchemaType {
    if (exportName) {
      this.schemaTypeConverter.schema.exportName = exportName;
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
  label(value: string = "default"): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
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
  tags(tags: string[] = ["default"]): TypeConverter {
    return new TypeConverter().initFromStructure<TypeConverter>(
      createSchema(
        this.getSchema(),
        "tags",
        [
          {
            arg: tags,
            struct: { array: { type: { string: { type: "string" } } } },
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
  getSchema(exportName?: string): SchemaType {
    if (exportName) {
      this.schemaStringFormatter.schema.exportName = exportName;
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
  getSchema(exportName?: string): SchemaType {
    if (exportName) {
      this.schemaQueryBuilder.schema.exportName = exportName;
    }
    return this.schemaQueryBuilder;
  }
  initFromStructure<T>(schema: SchemaType) {
    this.schemaQueryBuilder = schema;
    return this;
  }
  initFromInitFunction(
    initFunction: SchemaType["schema"]["chain"]["chain"]["initFunction"],
  ) {
    this.schemaQueryBuilder.schema.chain.chain.initFunction = initFunction;
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
          },
        ],
        false,
      ),
    );
  }
}

// Auto-generated init functions
export function createTypeConverter(variableName?: string) {
  const structure = new TypeConverter();
  structure.initFromInitFunction({
    name: "create-type-converter",
    variableName:
      variableName ||
      structure.getSchema().schema.chain.chain.initFunction.variableName,
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
  });
  return structure;
}
