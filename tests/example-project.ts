import type { ArgumentType, ConfigType, FunctionType, ProjectType } from "../core/core.types";
import type { StructType } from "../core/base/typescript/base-types";

const stType: StructType["struct"] = {
    union: {
        types: [
            { string: { type: "string" } },
            { number: { type: "number" } },
            { boolean: { type: "boolean" } },
            { structureCall: { name: "query-builder" } },
        ],
    },
};

const st: StructType = { struct: stType };
const stOrArray: StructType = {
    struct: {
        union: {
            types: [stType, { array: { type: stType } }],
        },
    },
};
const stOrMap: StructType = {
    struct: {
        union: {
            types: [stType, { map: { type: stType } }],
        },
    },
};
const stOrArrayOrMap: StructType = {
    struct: {
        union: {
            types: [stType, { array: { type: stType } }, { map: { type: stType } }],
        },
    },
};
const stValues: StructType = {
    struct: {
        union: {
            types: [
                stType,
                { array: { type: stType } },
                { array: { type: { array: { type: stType } } } },
            ],
        },
    },
};

const dialect: StructType = {
    struct: {
        union: {
            types: [
                { literal: { value: "postgres", type: "string" } },
                { literal: { value: "mysql", type: "string" } },
                { literal: { value: "sqlite", type: "string" } },
                { literal: { value: "single-store", type: "string" } },
                { literal: { value: "mssql", type: "string" } },
                { literal: { value: "cockroach", type: "string" } },
            ],
        },
    },
};

const arg = (name: string, struct: StructType): ArgumentType => ({
    argument: { name, struct },
});

const qbFn = (name: string, args: ArgumentType[], isTemplateLiteral = false): FunctionType => ({
    function: {
        name,
        arguments: args,
        return: { structureCall: { name: "query-builder" } },
        isTemplateLiteral,
    },
});

export const exampleProject: ProjectType = {
    project: {
        projectName: "gntrees-method-chain",
        importPaths: {
            typescript: "../../../gntrees-method-chain/typescript/index",
        },
        definitions: [
            {
                structure: {
                    name: "type-converter",
                    exportName: "schema",
                    variables: [
                        {
                            variable: {
                                name: "testVar",
                                value: { structureCall: { name: "type-converter" } },
                            }
                        }
                    ],
                    functions: [
                        {
                            function: {
                                name: "stringify",
                                arguments: [{
                                    argument: {
                                        name: "val",
                                        struct: { struct: { string: { type: "string" } } },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "numerify",
                                arguments: [{
                                    argument: {
                                        name: "val",
                                        struct: { struct: { number: { type: "number" } } },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "boolify",
                                arguments: [{
                                    argument: {
                                        name: "val",
                                        struct: { struct: { boolean: { type: "boolean" } } },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "pipe",
                                arguments: [{
                                    argument: {
                                        name: "formatter",
                                        struct: { struct: { structureCall: { name: "string-formatter" } } },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "unify",
                                arguments: [{
                                    argument: {
                                        name: "value",
                                        struct: {
                                            struct: {
                                                union: {
                                                    types: [
                                                        { string: { type: "string" } },
                                                        { number: { type: "number" } },
                                                    ],
                                                },
                                            },
                                        },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "interpolate",
                                arguments: [{
                                    argument: {
                                        name: "value",
                                        struct: {
                                            struct: {
                                                union: {
                                                    types: [
                                                        { string: { type: "string" } },
                                                        { number: { type: "number" } },
                                                    ],
                                                },
                                            },
                                        },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: true,
                            }
                        },
                        {
                            function: {
                                name: "label",
                                arguments: [{
                                    argument: {
                                        name: "value",
                                        struct: { struct: { string: { type: "string" } } },
                                        default: { string: { value: "default" } },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "tags",
                                arguments: [{
                                    argument: {
                                        name: "tags",
                                        struct: { struct: { array: { type: { string: { type: "string" } } } } },
                                        default: { array: { value: [{ string: { value: "default" } }] } },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            customFunction: {
                                name: "render",
                                arguments: [{ argument: { name: "value", struct: { struct: { string: { type: "string" } } } } }],
                                body: {
                                    typescript: 'return "type-converter:" + value;',
                                    c: 'return "type-converter";',
                                },
                                return: {
                                    typescript: "string",
                                    c: "char *",
                                },
                            },
                        },
                    ],
                }
            },
            {
                structure: {
                    name: "string-formatter",
                    exportName: "schema",
                    variables: [],
                    functions: [
                        {
                            function: {
                                name: "format",
                                arguments: [{
                                    argument: {
                                        name: "val",
                                        struct: { struct: { string: { type: "string" } } },
                                    }
                                }],
                                return: { structureCall: { name: "string-formatter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "unify",
                                arguments: [{
                                    argument: {
                                        name: "value",
                                        struct: {
                                            struct: {
                                                union: {
                                                    types: [
                                                        { string: { type: "string" } },
                                                        { number: { type: "number" } },
                                                    ],
                                                },
                                            },
                                        },
                                    }
                                }],
                                return: { structureCall: { name: "string-formatter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "interpolate",
                                arguments: [{
                                    argument: {
                                        name: "value",
                                        struct: {
                                            struct: {
                                                union: {
                                                    types: [
                                                        { string: { type: "string" } },
                                                        { number: { type: "number" } },
                                                    ],
                                                },
                                            },
                                        },
                                    }
                                }],
                                return: { structureCall: { name: "string-formatter" } },
                                isTemplateLiteral: true,
                            }
                        },
                        {
                            function: {
                                name: "label",
                                arguments: [{
                                    argument: {
                                        name: "value",
                                        struct: { struct: { string: { type: "string" } } },
                                        default: { string: { value: "default" } },
                                    }
                                }],
                                return: { structureCall: { name: "string-formatter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            customFunction: {
                                name: "render",
                                arguments: [{ argument: { name: "value", struct: { struct: { string: { type: "string" } } } } }],
                                body: {
                                    typescript: 'return "string-formatter:" + value;',
                                    c: 'return "string-formatter";',
                                },
                                return: {
                                    typescript: "string",
                                    c: "char *",
                                },
                            },
                        },
                    ],
                }
            },
            {
                structure: {
                    name: "query-builder",
                    exportName: "schema",
                    variables: [],
                    functions: [
                        qbFn("select", [arg("columns", stOrArrayOrMap)]),
                        qbFn("from", [arg("table", st)]),
                        qbFn("transaction", [arg("transaction", stOrArray)]),
                        qbFn("order-by", [arg("columns", stOrArray)]),
                        qbFn("limit", [arg("count", st)]),
                        qbFn("offset", [arg("count", st)]),
                        qbFn("with", [arg("statement", st), arg("as", st)]),
                        qbFn("group-by", [arg("columns", stOrArray)]),
                        qbFn("having", [arg("statement", st)]),
                        qbFn("where", [arg("statement", st)]),
                        qbFn("update", [arg("table", st), arg("set", stOrMap)]),
                        qbFn("set", [arg("statement", stOrMap)]),
                        qbFn("insert", [arg("table", st), arg("set", stOrMap)]),
                        qbFn("values", [arg("values", stValues)]),
                        qbFn("returning", [arg("columns", stOrArrayOrMap)]),
                        qbFn("on-conflict-do-nothing", [arg("target", st)]),
                        qbFn("on-conflict-do-update", [arg("target", st), arg("set", stOrMap)]),
                        qbFn("delete", [arg("table", st)]),
                        qbFn("join", [arg("table", st), arg("on", st)]),
                        qbFn("left-join", [arg("table", st), arg("on", st)]),
                        qbFn("right-join", [arg("table", st), arg("on", st)]),
                        qbFn("inner-join", [arg("table", st), arg("on", st)]),
                        qbFn("full-join", [arg("table", st), arg("on", st)]),
                        qbFn("cross-join", [arg("table", st), arg("on", st)]),
                        qbFn("eq", [arg("value", st)]),
                        qbFn("gt", [arg("value", st)]),
                        qbFn("gte", [arg("value", st)]),
                        qbFn("lt", [arg("value", st)]),
                        qbFn("lte", [arg("value", st)]),
                        qbFn("exists", [arg("value", st)]),
                        qbFn("is-null", [arg("value", st)]),
                        qbFn("in", [arg("value", st)]),
                        qbFn("between", [arg("first", st), arg("second", st)]),
                        qbFn("like", [arg("value", st)]),
                        qbFn("ilike", [arg("value", st)]),
                        qbFn("not", [arg("value", st)]),
                        qbFn("and", [arg("values", stOrArray)]),
                        qbFn("or", [arg("values", stOrArray)]),
                        qbFn("op", [arg("operation", st), arg("value", st)]),
                        qbFn("raw", [arg("r", st)], true),
                        qbFn("asc", []),
                        qbFn("desc", []),
                        qbFn("as", [arg("alias", st)]),
                        qbFn("col", [arg("column", st)]),
                        qbFn("table", [arg("table", st)]),
                        qbFn("set-dialect", [arg("db", dialect)]),
                        {
                            customFunction: {
                                name: "sign",
                                arguments: [],
                                body: {
                                    typescript: 'return "query-builder-sign";',
                                    c: 'return "query-builder-sign";',
                                },
                                return: {
                                    typescript: "string",
                                    c: "char *",
                                },
                            },
                        },
                    ],
                }
            },
        ],
        initFunctions: [
            {
                name: "create-type-converter",
                withVariableName: true,
                return: { structureCall: { name: "type-converter" } },
            },
            {
                name: "create-string-formatter",
                withVariableName: true,
                return: { structureCall: { name: "string-formatter" } },
            },
            {
                name: "query-builder",
                withVariableName: true,
                return: { structureCall: { name: "query-builder" } },
            },
        ],
    }
};

export const exampleConfig: ConfigType = {
    languages: ["typescript", "c"],
    folderName: "tests",
};
