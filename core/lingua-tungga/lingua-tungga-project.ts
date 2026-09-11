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

const valueOrArrayOrMapTypes: StructType["struct"][] = [
    valueStruct,
    { array: { type: valueOrMap.struct } },
    { map: { type: valueStruct } },
];

const operatorOperand: StructType = {
    struct: {
        union: {
            types: [
                ...valueOrArrayOrMapTypes,
                { structureCall: { name: "lingua-tungga" } },
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

const stringArrayStruct: StructType = {
    struct: { array: { type: { string: { type: "string" } } } },
};

const bodyStruct: StructType = { struct: { structureCall: { name: "lingua-tungga" } } };

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
            ltFunction("add-value", [arg("value", operatorOperand)]),
            ltFunction("add-variable", [
                arg("variable-name", stringStruct),
                arg("value", operatorOperand),
            ]),
            ltFunction("set-variable", [
                arg("variable-name", stringStruct),
                arg("value", operatorOperand),
            ]),
            ltFunction("add-global-function", [
                arg("name", stringStruct),
                arg("params", stringArrayStruct),
                arg("body", bodyStruct),
            ]),
            ltFunction("if", [arg("condition", operatorOperand), arg("body", bodyStruct)]),
            ltFunction("else-if", [arg("condition", operatorOperand), arg("body", bodyStruct)]),
            ltFunction("else", [arg("body", bodyStruct)]),
            ltFunction("while", [arg("condition", operatorOperand), arg("body", bodyStruct)]),
            ltFunction("for-each", [
                arg("array", operatorOperand),
                arg("variable-name", stringStruct),
                arg("body", bodyStruct),
            ]),
            ltFunction("for-counter", [
                arg("init", operatorOperand),
                arg("condition", operatorOperand),
                arg("update", operatorOperand),
                arg("body", bodyStruct),
            ]),
            ltFunction("variable-for-counter", [arg("name", stringStruct)]),
            ltFunction("declare-for-counter", [
                arg("variable-name", stringStruct),
                arg("value", operatorOperand),
            ]),
            ltFunction("increment-for-counter", [arg("target", operatorOperand)]),
            ltFunction("free-c-variables"),
            ltFunction("return", [argWithDefault("value", operatorOperand, { null: { value: null } })]),
            ltFunction("string-concat", [arg("left", operatorOperand), arg("right", operatorOperand)]),
            ltFunction("string-length", [arg("value", operatorOperand)]),
            ltFunction("string-upper", [arg("value", operatorOperand)]),
            ltFunction("string-lower", [arg("value", operatorOperand)]),
            ltFunction("string-trim", [arg("value", operatorOperand)]),
            ltFunction("string-slice", [
                arg("value", operatorOperand),
                arg("start", operatorOperand),
                arg("end", operatorOperand),
            ]),
            ltFunction("string-replace", [
                arg("value", operatorOperand),
                arg("search", operatorOperand),
                arg("replacement", operatorOperand),
            ]),
            ltFunction("string-split", [arg("value", operatorOperand), arg("separator", operatorOperand)]),
            ltFunction("string-includes", [arg("value", operatorOperand), arg("search", operatorOperand)]),
            ltFunction("string-repeat", [arg("value", operatorOperand), arg("count", operatorOperand)]),
            ltFunction("string-char-at", [arg("value", operatorOperand), arg("index", operatorOperand)]),
            ltFunction("string-starts-with", [arg("value", operatorOperand), arg("prefix", operatorOperand)]),
            ltFunction("string-ends-with", [arg("value", operatorOperand), arg("suffix", operatorOperand)]),
            ltFunction("array-get", [arg("value", operatorOperand), arg("index", operatorOperand)]),
            ltFunction("array-length", [arg("value", operatorOperand)]),
            ltFunction("array-append", [arg("value", operatorOperand), arg("item", operatorOperand)]),
            ltFunction("array-concat", [arg("left", operatorOperand), arg("right", operatorOperand)]),
            ltFunction("array-join", [arg("value", operatorOperand), arg("separator", operatorOperand)]),
            ltFunction("array-slice", [
                arg("value", operatorOperand),
                arg("start", operatorOperand),
                arg("end", operatorOperand),
            ]),
            ltFunction("array-includes", [arg("value", operatorOperand), arg("item", operatorOperand)]),
            ltFunction("array-index-of", [arg("value", operatorOperand), arg("item", operatorOperand)]),
            ltFunction("array-reverse", [arg("value", operatorOperand)]),
            ltFunction("array-sort", [arg("value", operatorOperand)]),
            ltFunction("array-unique", [arg("value", operatorOperand)]),
            ltFunction("object-get", [arg("value", operatorOperand), arg("key", operatorOperand)]),
            ltFunction("object-set", [
                arg("value", operatorOperand),
                arg("key", operatorOperand),
                arg("new-value", operatorOperand),
            ]),
            ltFunction("object-keys", [arg("value", operatorOperand)]),
            ltFunction("object-values", [arg("value", operatorOperand)]),
            ltFunction("object-has", [arg("value", operatorOperand), arg("key", operatorOperand)]),
            ltFunction("object-merge", [arg("left", operatorOperand), arg("right", operatorOperand)]),
            ltFunction("object-delete", [arg("value", operatorOperand), arg("key", operatorOperand)]),
            ltFunction("object-entries", [arg("value", operatorOperand)]),
            ...([
                ["add", 2],
                ["subtract", 2],
                ["multiply", 2],
                ["divide", 2],
                ["modulo", 2],
                ["equal", 2],
                ["not-equal", 2],
                ["greater-than", 2],
                ["less-than", 2],
                ["greater-than-or-equal", 2],
                ["less-than-or-equal", 2],
                ["and", 2],
                ["or", 2],
                ["xor", 2],
                ["not", 1],
                ["bitwise-and", 2],
                ["bitwise-or", 2],
                ["left-shift", 2],
                ["right-shift", 2],
            ] as [string, number][]).map(
                ([name, arity]) =>
                    ltFunction(name, [
                        arg(arity === 1 ? "operand" : "left", operatorOperand),
                        ...(arity === 2 ? [arg("right", operatorOperand)] : []),
                    ]),
            ),
            ltFunction("value-equal", [arg("left", operatorOperand), arg("right", operatorOperand)]),
            ltFunction("value-not-equal", [arg("left", operatorOperand), arg("right", operatorOperand)]),
            ltFunction("truthy", [arg("value", operatorOperand)]),
            ltFunction("string-of", [arg("value", operatorOperand)]),
            ltFunction("member", [arg("value", operatorOperand), arg("path", stringStruct)]),
            ltFunction("loop-break"),
            ltFunction("loop-continue"),
            ltFunction("throw-error", [arg("message", operatorOperand)]),
            ltFunction("return-raw", [argWithDefault("value", operatorOperand, { null: { value: null } })]),
            ltFunction("call-function", [
                arg("name", stringStruct),
                argWithDefault("args", callArgArray, { array: { value: [] } }),
            ]),
            ltFunction("add-call-function", [
                arg("name", stringStruct),
                argWithDefault("args", callArgArray, { array: { value: [] } }),
            ]),
            ltFunction("local-function", [
                arg("name", stringStruct),
                arg("params", stringArrayStruct),
                arg("body", bodyStruct),
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
