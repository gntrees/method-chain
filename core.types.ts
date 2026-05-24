import type { LanguageType } from "./base-types/typescript"

export type CustomFunctionType = {
    customFunction: {
        name: string,
        arguments: ArgumentType[]
    }
}

export type FunctionType = {
    function: {
        name: string,
        arguments: ArgumentType[]
        return: StructureCallType | ThisType,
        isTemplateLiteral: boolean
    }
}

export type ThisType = {
    this: {
        value: "this"
    }
}

export type CustomVariableType = {
    customVariable: {
        name: string,
    }
}

export type VariableType = {
    variable: {
        name: string,
        value: StructureCallType | ThisType
    }
}

export type StructureCallType = {
    structureCall: {
        name: string,
    }
}

export type StructType = {
    struct: {
        string: {
            value: string | null
        }
    } | {
        number: {
            value: number | null
        }
    } | {
        boolean: {
            value: boolean | null
        }
    } | {
        object: {
            values: {
                key: string | null,
                value: StructType['struct']
                prdefined: boolean
                optional: boolean
            }[]
        }
    } | {
        array: {
            values: (StructType['struct'])[]
        }
    } | {
        null: {
            value: null
        }
    } | {
        union: {
            values: (StructType['struct'])[]
        }
    } | StructureCallType
}

export type ArgumentType = {
    argument: {
        name: string,
        struct: StructType,
        optional: boolean
    }
}

export type StructureType = {
    structure: {
        name: string,
        exportName: string,
        variables: (VariableType | CustomVariableType)[]
        functions: (FunctionType | CustomFunctionType)[]
    }
}

type InitFunctionType = {
    name: string,
    withVariableName: boolean,
    return: StructureCallType,
    importString: Partial<Record<LanguageType, string>>;
}

export type ProjectType = {
    project: {
        definitions: StructureType[]
        initFunctions: InitFunctionType[]
    }
}

export type ConfigType = {
    languages: LanguageType[]
    folderName: string
}