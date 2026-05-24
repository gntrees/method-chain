export type LanguageType =
    | "typescript"
    | "javascript"

type StringType = {
    string: {
        value: string
    }
}
type NumberType = {
    number: {
        value: number
    }
}
type BooleanType = {
    boolean: {
        value: boolean
    }
}
type NullType = {
    null: {
        value: null
    }
}

type ArrayType = {
    array: {
        value: StringType[] | NumberType[] | BooleanType[] | NullType[] | ArrayType[] | ObjectType[] | ChainType[]
    }
}

type ObjectType = {
    object: {
        value: {
            [key: string]: StringType | NumberType | BooleanType | NullType | ArrayType | ObjectType | ChainType
        }
    }
}

type FunctionCallType = {
    functionCall: {
        name: string,
        arguments: (StringType | NumberType | BooleanType | NullType | ArrayType | ObjectType | ChainType)[]
        isTemplateLiteral: boolean
    }
}

type PropertyCallType = {
    propertyCall: {
        name: string
    }
}

type ChainType = {
    chain: {
        values: (FunctionCallType | PropertyCallType)[]
        initFunction: InitFunctionType,
    }
}

type InitFunctionType = {
    name: string,
    variableName: string,
    importString: Partial<Record<LanguageType, string>>;
}

type SchemaType = {
    schema: {
        exportName: string,
        chain: ChainType,
    }
}

type StructType = {
    struct: {
        string: {
            value: {
                array : string[]
            } | {
                map : {
                    key: string,
                    value: string
                }
            } | {
                single : string
            }
        }
    } | {
        number: {
            value: {
                array : number[]
            } | {
                map : {
                    key: string,
                    value: number
                }
            } | {
                single : number
            }
        }
    } | {
        boolean: {
            value: {
                array : boolean[]
            } | {
                map : {
                    key: string,
                    value: boolean
                }
            } | {
                single : boolean
            }
        }
    } | {
        null: {
            value: {
                array : null[]
            } | {
                map : {
                    key: string,
                    value: null
                }
            } | {
                single : null
            }
        }
    } | {
        union: {
            values: (StructType['struct'])[]
        }
    } | {
        object: {
            value: {
                key: string,
                value: {
                    array : StructType['struct']
                } | {
                    map : {
                        key: string,
                        value: StructType['struct']
                    }
                } | {
                    single : StructType['struct']
                }
            }
        }
    } | {
        structureCall: {
            name: string,
            value: {
                array : SchemaType[]
            } | {
                map : {
                    key: string,
                    value: SchemaType
                }
            } | {
                single : SchemaType
            }
        }
    }
}

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
}