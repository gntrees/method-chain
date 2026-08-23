// Auto-generated definition for query-builder
import {} from "./query-builder";
import type { SchemaType } from "./base-types.ts";
import { createSchema } from "./base-utils.ts";

export class QueryBuilder {
  private schemaQueryBuilder: SchemaType = {
    schema: {
      exportName: "schema",
      chain: {
        chain: {
          values: [],
          initFunction: {
            name: "query-builder",
            variableName: "s3",
            importString: "",
          },
        },
      },
    },
  };
  getSchema(exportName?: string, importString?: string): SchemaType {
    if (exportName) {
      this.schemaQueryBuilder.schema.exportName = exportName;
    }
    if (importString) {
      this.schemaQueryBuilder.schema.chain.chain.initFunction.importString =
        importString;
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
