export type LanguageType =
    | "typescript"
    | "c"

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

type ArgumentValue = StringType | NumberType | BooleanType | NullType | ArrayType | ObjectType | ChainType

type ArgumentType = {
    argument: ArgumentValue
    default: ArgumentValue | null
}

type FunctionCallType = {
    functionCall: {
        name: string,
        arguments: ArgumentType[]
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
        values: (FunctionCallType | PropertyCallType | CopyType)[]
        initFunction: InitFunctionType,
    }
}

type CopyType = {
    copy: {
        structureName: string,
        chain: ChainType,
    }
}

type InitFunctionType = {
    name: string,
    variableName: string,
}

type SchemaType = {
    schema: {
        exportName: string,
        importPaths?: Partial<Record<LanguageType, string>>,
        chain: ChainType,
    }
}

export type StructType = {
    struct: {
        array: {
            type: StructType['struct']
        }
    } | {
        object: {
            [key: string]: StructType['struct']
        }
    } | {
        string: {
            type: "string"
        }
    } | {
        number: {
            type: "number"
        }
    } | {
        boolean: {
            type: "boolean"
        }
    } | {
        null: {
            type: "null"
        }
    } | {
        union: {
            types: StructType['struct'][]
        }
    } | {
        map: {
            type: StructType['struct']
        }
    } | StructureCallType
}

export type StructureCallType = {
    structureCall: {
        name: string,
    }
}

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
}