

type StringType = {
    string: {
        value: {
            array: StringType['string']['value'][]
        } | {
            map: {
                key: string,
                value: StringType['string']['value']
            }[]
        } | {
            single: string
        }
    }
}
type NumberType = {
    number: {
        value: {
            array: NumberType['number']['value'][]
        } | {
            map: {
                key: string,
                value: NumberType['number']['value']
            }[]
        } | {
            single: number
        }
    }
}
type BooleanType = {
    boolean: {
        value: {
            array: BooleanType['boolean']['value'][]
        } | {
            map: {
                key: string,
                value: BooleanType['boolean']['value']
            }[]
        } | {
            single: boolean
        }
    }
}
type NullType = {
    null: {
        value: {
            array: NullType['null']['value'][]
        } | {
            map: {
                key: string,
                value: NullType['null']['value']
            }[]
        } | {
            single: null
        }
    }
}
type ObjectType = {
    object: {
        value: {
            array: ObjectType['object']['value'][]
        } | {
            map: {
                key: string,
                value: ObjectType['object']['value']
            }[]
        } | {
            single: {
                [key:string]: StructType['struct']
            }
        }
    }
}

type StructureType = {
    structure: {
        name: string,
        value: {
            array: StructureType['structure']['value'][]
        } | {
            map: {
                key: string,
                value: StructureType['structure']['value']
            }[]
        } | {
            single: ChainType
        }
    }
}

type ArrayType = {
    array: {
        value: StringType[] | NumberType[] | BooleanType[] | NullType[] | ArrayType[] | ObjectType[] | ChainType[]
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
    importString: string,
}

type UnionType = {
    union: {
        values: (StructType['struct'])[]
    }
}

type SchemaType = {
    schema: {
        exportName: string,
        chain: ChainType,
    }
}

type StructType = {
    struct: StringType | NumberType | BooleanType | NullType | UnionType | ObjectType | StructureType
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
    StructureType,
    UnionType,
    StructType,
    ChainType,
}