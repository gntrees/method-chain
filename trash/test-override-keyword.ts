import type { FunctionType, StructType } from "../core.types";

const structAlias = {
    "number": {
        number: {
            value: null
        }
    } as StructType['struct'],
    "string": {
        string: {
            value: null
        }
    } as StructType['struct'],
    "boolean": {
        boolean: {
            value: null
        }
    } as StructType['struct'],
    "null": {
        null: {
            value: null
        }
    } as StructType['struct'],
    "query-builder": {
        structureCall: {
            name: "query-builder"
        }
    } as StructType['struct'],
    "object": (
        values: {
            key: string,
            value: StructType['struct'],
            optional: boolean,
        }[]
    ): Extract<StructType['struct'], { object: any }> => {
        return {
            object: {
                values: values.map(({ key, value, optional }) => ({
                    key,
                    value,
                    optional,
                    prdefined: true
                }))
            }
        }
    },
    "map": (value: StructType['struct']): Extract<StructType['struct'], { object: any }> => ({
        object: {
            values: [
                {
                    key: null,
                    value: value,
                    optional: true,
                    prdefined: false
                }
            ]
        }
    }),
    "array": (value: StructType['struct']): StructType['struct'] => ({
        array: {
            values: [value]
        }
    }),
    "union": (values: StructType['struct'][]): StructType['struct'] => ({
        union: {
            values
        }
    }),
    "arguments": (name: string, optional: boolean, struct: StructType): FunctionType['function']['arguments'][number] => ({
        argument: {
            name,
            optional,
            struct
        }
    }),
    "struct": (struct: StructType['struct']): StructType => ({
        struct
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
        structAlias["arguments"]("table", true, structAlias['struct'](structAlias["query-builder"])),
        structAlias["arguments"]("values", true, structAlias['struct'](structAlias["union"]([
            structAlias["map"](structAlias["query-builder"]),
            structAlias["array"](structAlias["map"](structAlias["query-builder"]))
        ]))),
    ]),
}
export const newKeywords: {
    [key: string]: FunctionType
} = {
    "INSERT_INTO": buildFunctionType("insertInto", [
        structAlias["arguments"]("table", true, structAlias['struct'](structAlias["query-builder"])),
        structAlias["arguments"]("values", true, structAlias['struct'](structAlias["union"]([
            structAlias["map"](structAlias["query-builder"]),
            structAlias["array"](structAlias["map"](structAlias["query-builder"]))
        ]))),
    ])
}