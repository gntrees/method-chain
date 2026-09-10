// Auto-generated index for lingua-tungga

export type LanguageType = "typescript" | "c";

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
  | LinguaTungga[];
export type ArgType =
  | string
  | number
  | boolean
  | null
  | undefined
  | ArgObject
  | ArgArray
  | LinguaTungga
  | TemplateStringsArray;

// Auto-generated utils
export const normalizeArgumentStructureCall = (arg: ArgType): ArgumentValue => {
  if (typeof arg !== "object" || arg === null || Array.isArray(arg)) {
    throw new Error(
      "Expected a structure instance for structure calls, but got " +
        (arg === null ? "null" : Array.isArray(arg) ? "array" : typeof arg),
    );
  } else if (arg instanceof LinguaTungga) {
    return arg.getSchema().schema.chain;
  } else {
    throw new Error("Unknown structure call argument type");
  }
};
export function copy(source: ArgType): CopyBuilder {
  if (source instanceof LinguaTungga) {
    return makeCopy("lingua-tungga", source);
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

// Auto-generated definition for lingua-tungga

export class LinguaTungga {
  private schemaLinguaTungga: SchemaType = {
    schema: {
      exportName: "schema",
      importPaths: { typescript: "./index.ts", c: "./lingua-tungga.h" },
      chain: {
        chain: {
          values: [],
          initFunction: {
            name: "lingua-tungga",
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
      this.schemaLinguaTungga.schema.exportName = exportName;
    }
    if (importPaths) {
      this.schemaLinguaTungga.schema.importPaths = {
        ...this.schemaLinguaTungga.schema.importPaths,
        ...importPaths,
      };
    }
    return this.schemaLinguaTungga;
  }
  initFromStructure<T>(schema: SchemaType) {
    validateSchema(schema);
    this.schemaLinguaTungga = schema;
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
    this.schemaLinguaTungga.schema.chain.chain.initFunction = initFunction;
    applyCopies(this.schemaLinguaTungga, copies, "lingua-tungga");
    return this;
  }
  setStatements(statements: { [key: string]: string[] }): LinguaTungga {
    return new LinguaTungga().initFromStructure<LinguaTungga>(
      createSchema(
        this.getSchema(),
        "setStatements",
        [
          {
            arg: statements,
            struct: {
              map: {
                type: { array: { type: { string: { type: "string" } } } },
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  addStatements(statements: { [key: string]: string[] }): LinguaTungga {
    return new LinguaTungga().initFromStructure<LinguaTungga>(
      createSchema(
        this.getSchema(),
        "addStatements",
        [
          {
            arg: statements,
            struct: {
              map: {
                type: { array: { type: { string: { type: "string" } } } },
              },
            },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  getStatements(): LinguaTungga {
    return new LinguaTungga().initFromStructure<LinguaTungga>(
      createSchema(this.getSchema(), "getStatements", [], false),
    );
  }
  getResolvedStatements(): LinguaTungga {
    return new LinguaTungga().initFromStructure<LinguaTungga>(
      createSchema(this.getSchema(), "getResolvedStatements", [], false),
    );
  }
  structureFunctionCall(
    functionName: string,
    args?: (
      | string
      | number
      | boolean
      | null
      | (
          | (string | number | boolean | null)
          | (string | number | boolean | null)[]
          | { [key: string]: string | number | boolean | null }
        )[]
      | { [key: string]: string }
      | LinguaTungga
    )[],
  ): LinguaTungga {
    return new LinguaTungga().initFromStructure<LinguaTungga>(
      createSchema(
        this.getSchema(),
        "structureFunctionCall",
        [
          {
            arg: functionName,
            struct: { string: { type: "string" } },
            provided: arguments.length >= 1,
          },
          {
            arg: args,
            struct: {
              array: {
                type: {
                  union: {
                    types: [
                      { string: { type: "string" } },
                      { number: { type: "number" } },
                      { boolean: { type: "boolean" } },
                      { null: { type: "null" } },
                      {
                        array: {
                          type: {
                            union: {
                              types: [
                                {
                                  union: {
                                    types: [
                                      { string: { type: "string" } },
                                      { number: { type: "number" } },
                                      { boolean: { type: "boolean" } },
                                      { null: { type: "null" } },
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
                                          { null: { type: "null" } },
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
                                          { null: { type: "null" } },
                                        ],
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                      },
                      { map: { type: { string: { type: "string" } } } },
                      { structureCall: { name: "lingua-tungga" } },
                    ],
                  },
                },
              },
            },
            provided: arguments.length >= 2,
            default: { array: { value: [] } },
          },
        ],
        false,
      ),
    );
  }
  structureVariableCall(variableName: string): LinguaTungga {
    return new LinguaTungga().initFromStructure<LinguaTungga>(
      createSchema(
        this.getSchema(),
        "structureVariableCall",
        [
          {
            arg: variableName,
            struct: { string: { type: "string" } },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  addStructureFunctionCall(
    functionName: string,
    args?: (
      | string
      | number
      | boolean
      | null
      | (
          | (string | number | boolean | null)
          | (string | number | boolean | null)[]
          | { [key: string]: string | number | boolean | null }
        )[]
      | { [key: string]: string }
      | LinguaTungga
    )[],
  ): LinguaTungga {
    return new LinguaTungga().initFromStructure<LinguaTungga>(
      createSchema(
        this.getSchema(),
        "addStructureFunctionCall",
        [
          {
            arg: functionName,
            struct: { string: { type: "string" } },
            provided: arguments.length >= 1,
          },
          {
            arg: args,
            struct: {
              array: {
                type: {
                  union: {
                    types: [
                      { string: { type: "string" } },
                      { number: { type: "number" } },
                      { boolean: { type: "boolean" } },
                      { null: { type: "null" } },
                      {
                        array: {
                          type: {
                            union: {
                              types: [
                                {
                                  union: {
                                    types: [
                                      { string: { type: "string" } },
                                      { number: { type: "number" } },
                                      { boolean: { type: "boolean" } },
                                      { null: { type: "null" } },
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
                                          { null: { type: "null" } },
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
                                          { null: { type: "null" } },
                                        ],
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        },
                      },
                      { map: { type: { string: { type: "string" } } } },
                      { structureCall: { name: "lingua-tungga" } },
                    ],
                  },
                },
              },
            },
            provided: arguments.length >= 2,
            default: { array: { value: [] } },
          },
        ],
        false,
      ),
    );
  }
  addStructureVariableCall(variableName: string): LinguaTungga {
    return new LinguaTungga().initFromStructure<LinguaTungga>(
      createSchema(
        this.getSchema(),
        "addStructureVariableCall",
        [
          {
            arg: variableName,
            struct: { string: { type: "string" } },
            provided: arguments.length >= 1,
          },
        ],
        false,
      ),
    );
  }
  addValue(
    value:
      | (string | number | boolean | null)
      | (
          | (string | number | boolean | null)
          | (string | number | boolean | null)[]
          | { [key: string]: string | number | boolean | null }
        )[]
      | { [key: string]: string | number | boolean | null },
  ): LinguaTungga {
    return new LinguaTungga().initFromStructure<LinguaTungga>(
      createSchema(
        this.getSchema(),
        "addValue",
        [
          {
            arg: value,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { null: { type: "null" } },
                      ],
                    },
                  },
                  {
                    array: {
                      type: {
                        union: {
                          types: [
                            {
                              union: {
                                types: [
                                  { string: { type: "string" } },
                                  { number: { type: "number" } },
                                  { boolean: { type: "boolean" } },
                                  { null: { type: "null" } },
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
                                      { null: { type: "null" } },
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
                                      { null: { type: "null" } },
                                    ],
                                  },
                                },
                              },
                            },
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
                            { null: { type: "null" } },
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
  addVariable(
    variableName: string,
    value:
      | (string | number | boolean | null)
      | (
          | (string | number | boolean | null)
          | (string | number | boolean | null)[]
          | { [key: string]: string | number | boolean | null }
        )[]
      | { [key: string]: string | number | boolean | null },
  ): LinguaTungga {
    return new LinguaTungga().initFromStructure<LinguaTungga>(
      createSchema(
        this.getSchema(),
        "addVariable",
        [
          {
            arg: variableName,
            struct: { string: { type: "string" } },
            provided: arguments.length >= 1,
          },
          {
            arg: value,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { null: { type: "null" } },
                      ],
                    },
                  },
                  {
                    array: {
                      type: {
                        union: {
                          types: [
                            {
                              union: {
                                types: [
                                  { string: { type: "string" } },
                                  { number: { type: "number" } },
                                  { boolean: { type: "boolean" } },
                                  { null: { type: "null" } },
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
                                      { null: { type: "null" } },
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
                                      { null: { type: "null" } },
                                    ],
                                  },
                                },
                              },
                            },
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
                            { null: { type: "null" } },
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
  generate(): Promise<Record<LanguageType, string>> {
    return import("../../lingua-tungga-implementation").then((m) =>
      m.generate(this.getSchema()),
    );
  }
}

// Auto-generated init functions
export function linguaTungga(variableName?: string, ...copies: CopyBuilder[]) {
  const structure = new LinguaTungga();
  structure.initFromInitFunction(
    {
      name: "lingua-tungga",
      variableName:
        variableName ||
        structure.getSchema().schema.chain.chain.initFunction.variableName,
    },
    copies,
  );
  return structure;
}
