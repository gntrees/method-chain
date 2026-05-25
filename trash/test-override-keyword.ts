import type { FunctionType, StructType } from "../core.types";

const structTypes = {
    string : (): StructType['struct'] => ({
        string : {
            type: "string"
        }
    }),
    number : (): StructType['struct'] => ({
        number: {
            type: "number"
        }
    }),
    boolean : (): StructType['struct'] => ({
        boolean: {
            type: "boolean"
        }
    }),
    null : (): StructType['struct'] => ({
        null: {
            type: "null"
        }
    }),
    array : (type: StructType['struct']): StructType['struct'] => ({
        array: {
            type
        }
    }),
    union : (types: StructType['struct'][]) => ({
        union: {
            types: types
        }
    }),
    object : (values: { [key: string]: StructType['struct'] }): StructType['struct'] => ({
        object: {
            ...Object.entries(values).reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as { [key: string]: StructType['struct'] })
        }
    }),
    map : (type: StructType['struct']): StructType['struct'] => ({
        map: {
            type
        }
    }),
    arguments : (name: string, optional: boolean, struct: StructType): FunctionType['function']['arguments'][number] => ({
        argument: {
            name,
            optional,
            struct
        }
    }),
    struct: (struct: StructType['struct']): StructType => ({
        struct
    }),
    queryBuilder: (): StructType['struct'] => ({
        structureCall: {
            name: "query-builder",
        }
    })
}

function buildFunctionType(name: string, args: FunctionType['function']['arguments']): FunctionType {
    return {
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
    }
}
export const keywordOverrides: {
    [key: string]: FunctionType
} = {
    "INSERT": buildFunctionType("insert", [
        structTypes.arguments("table", true, structTypes.struct(structTypes.queryBuilder())),
        structTypes.arguments("values", true, structTypes.struct(structTypes.union([
            structTypes.queryBuilder(),
            structTypes.array(structTypes.queryBuilder())
        ]))),
    ]),
}
export const newKeywords: {
    [key: string]: FunctionType
} = {
    "INSERT_INTO": buildFunctionType("insert-into", [
        structTypes.arguments("table", true, structTypes.struct(structTypes.queryBuilder())),
        structTypes.arguments("cols", true, structTypes.struct(structTypes.array(structTypes.queryBuilder()))), 
    ])
}