// import type { StructType } from "./base-types/typescript"

import type { ArrayType, BooleanType, ChainType, NullType, NumberType, ObjectType, StringType, StructType, StructureCallType } from "./base/typescript/base-types"

export type CustomFunctionType = {
    customFunction: {
        name: string,
        arguments: ArgumentType[],
        body: Record<LanguageType, string>,
        return: Record<LanguageType, string>

    }
}

export type FunctionType = {
    function: {
        name: string,
        arguments: ArgumentType[]
        return: StructureCallType ,
        isTemplateLiteral: boolean
    }
}

export type CustomVariableType = {
    customVariable: {
        name: string,
        value: Record<LanguageType, string>
    }
}

export type VariableType = {
    variable: {
        name: string,
        value: StructureCallType
    }
}

export type ArgumentType = {
    argument: {
        name: string,
        struct: StructType,
        default?: StringType | NumberType | BooleanType | NullType | ArrayType | ObjectType | ChainType
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
        projectName: string
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
    | "c"

// export type {
//     StructType,
// }