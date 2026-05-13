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