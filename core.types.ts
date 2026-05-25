// import type { StructType } from "./base-types/typescript"

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

export type LanguageType =
    | "typescript"
    | "javascript"

// export type {
//     StructType,
// }