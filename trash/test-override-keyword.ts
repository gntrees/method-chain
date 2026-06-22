import type { StructType } from "../base/typescript/base-types";
import type { ArgumentType, FunctionType } from "../core.types";

const st = {
    string: (): StructType['struct'] => ({
        string: {
            type: "string"
        }
    }),
    number: (): StructType['struct'] => ({
        number: {
            type: "number"
        }
    }),
    boolean: (): StructType['struct'] => ({
        boolean: {
            type: "boolean"
        }
    }),
    null: (): StructType['struct'] => ({
        null: {
            type: "null"
        }
    }),
    array: (type: StructType['struct']): StructType['struct'] => ({
        array: {
            type
        }
    }),
    union: (types: StructType['struct'][]) => ({
        union: {
            types: types
        }
    }),
    object: (values: { [key: string]: StructType['struct'] }): StructType['struct'] => ({
        object: {
            ...Object.entries(values).reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as { [key: string]: StructType['struct'] })
        }
    }),
    map: (type: StructType['struct']): StructType['struct'] => ({
        map: {
            type
        }
    }),
    argument: (name: string, struct: StructType['struct'][]): FunctionType['function']['arguments'][number] => ({
        argument: {
            name,
            struct: {
                struct: {
                    union: {
                        types: [
                            ...struct,
                            st.null()
                        ]
                    }
                }
            },
            default: {
                null: {
                    value: null
                }
            }
        }
    }),
    queryBuilder: (): StructType['struct'] => ({
        structureCall: {
            name: "query-builder",
        }
    }),
    function: (name: string, args: FunctionType['function']['arguments']): FunctionType => ({
        function: {
            name,
            arguments: args,
            return: {
                structureCall: {
                    name: "query-builder"
                }
            },
            isTemplateLiteral: false
        }
    }),
    statement: (): StructType['struct'] => ({
        union: {
            types: [
                {
                    structureCall: {
                        name: "query-builder"
                    }
                },
                {
                    string: {
                        type: "string"
                    }
                },
                {
                    number: {
                        type: "number"
                    }
                },
                {
                    boolean: {
                        type: "boolean"
                    }
                },
                {
                    null: {
                        type: "null"
                    }
                }
            ]
        }
    }),
}

export const keywordOverrides: {
    [key: string]: FunctionType
} = {
    "INSERT": st.function("insert", [
        st.argument("table", [st.statement()]),
        st.argument("values", [
            st.map(st.statement()),
            st.array(st.map(st.statement()))
        ])
    ]),
}
export const newKeywords: {
    [key: string]: FunctionType
} = {
    
}
