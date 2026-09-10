import { generateProject } from "../core";
import type { ArgumentType, StructureType } from "../core.types";
import type { StructType } from "../base/typescript/base-types";

const valueStruct: StructType["struct"] = {
    union: {
        types: [
            { string: { type: "string" } },
            { number: { type: "number" } },
            { boolean: { type: "boolean" } },
            { null: { type: "null" } },
        ],
    },
};

const value: StructType = { struct: valueStruct };

const valueOrMap: StructType = {
    struct: {
        union: {
            types: [valueStruct, { array: { type: valueStruct } }, { map: { type: valueStruct } }],
        },
    },
};

const valueOrArrayOrMap: StructType = {
    struct: {
        union: {
            types: [
                valueStruct,
                { array: { type: valueOrMap.struct } },
                { map: { type: valueStruct } },
            ],
        },
    },
};

const callArg: StructType = {
    struct: {
        union: {
            types: [
                ...valueStruct.union.types,
                { array: { type: valueOrMap.struct } },
                { map: { type: { string: { type: "string" } } } },
                { structureCall: { name: "lingua-tungga" } },
            ],
        },
    },
};

const callArgArray: StructType = {
    struct: {
        array: { type: callArg.struct },
    },
};

const statementsStruct: StructType = {
    struct: {
        map: {
            type: { array: { type: { string: { type: "string" } } } },
        },
    },
};

const stringStruct: StructType = { struct: { string: { type: "string" } } };

const arg = (name: string, struct: StructType): ArgumentType => ({
    argument: { name, struct },
});

const argWithDefault = (name: string, struct: StructType, defaultArg: NonNullable<ArgumentType["argument"]["default"]>): ArgumentType => ({
    argument: { name, struct, default: defaultArg },
});

const ltFunction = (name: string, args: ArgumentType[] = []): StructureType["structure"]["functions"][number] => ({
    function: {
        name,
        arguments: args,
        return: { structureCall: { name: "lingua-tungga" } },
        isTemplateLiteral: false,
    },
});

const linguaTunggaStructure: StructureType = {
    structure: {
        name: "lingua-tungga",
        exportName: "schema",
        variables: [],
        functions: [
            ltFunction("set-statements", [arg("statements", statementsStruct)]),
            ltFunction("add-statements", [arg("statements", statementsStruct)]),
            ltFunction("get-statements"),
            ltFunction("get-resolved-statements"),
            ltFunction("structure-function-call", [
                arg("function-name", stringStruct),
                argWithDefault("args", callArgArray, { array: { value: [] } }),
            ]),
            ltFunction("structure-variable-call", [arg("variable-name", stringStruct)]),
            ltFunction("add-structure-function-call", [
                arg("function-name", stringStruct),
                argWithDefault("args", callArgArray, { array: { value: [] } }),
            ]),
            ltFunction("add-structure-variable-call", [arg("variable-name", stringStruct)]),
            ltFunction("add-value", [arg("value", valueOrArrayOrMap)]),
            ltFunction("add-variable", [
                arg("variable-name", stringStruct),
                arg("value", valueOrArrayOrMap),
            ]),
            {
                customFunction: {
                    name: "generate",
                    arguments: [],
                    body: {
                        typescript: 'return import("../../lingua-tungga-implementation").then((m) => m.generate(this.getSchema()));',
                        c: "/* implemented externally */",
                    },
                    return: {
                        typescript: "Promise<Record<LanguageType, string>>",
                        c: "char *",
                    },
                },
            },
        ],
    }
};

generateProject({
    project: {
        projectName: "lingua-tungga",
        importPaths: {
            typescript: "./index.ts",
            c: "./lingua-tungga.h"
        },
        definitions: [linguaTunggaStructure],
        initFunctions: [
            {
                name: "lingua-tungga",
                withVariableName: true,
                return: { structureCall: { name: "lingua-tungga" } },
            },
        ]
    }
},{
    languages: ["typescript", "c"],
    folderName: "core/lingua-tungga"
})
