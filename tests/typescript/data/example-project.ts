import type { ProjectType, ConfigType } from "../../../core.types";

export const exampleProject: ProjectType = {
    project: {
        definitions: [
            {
                structure: {
                    name: "type-converter",
                    exportName: "schema",
                    variables: [],
                    functions: [
                        {
                            function: {
                                name: "stringify",
                                arguments: [{
                                    argument: {
                                        name: "val",
                                        struct: { struct: { string: { type: "string" } } },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "numerify",
                                arguments: [{
                                    argument: {
                                        name: "val",
                                        struct: { struct: { number: { type: "number" } } },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "boolify",
                                arguments: [{
                                    argument: {
                                        name: "val",
                                        struct: { struct: { boolean: { type: "boolean" } } },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                        {
                            function: {
                                name: "pipe",
                                arguments: [{
                                    argument: {
                                        name: "formatter",
                                        struct: { struct: { structureCall: { name: "string-formatter" } } },
                                    }
                                }],
                                return: { structureCall: { name: "type-converter" } },
                                isTemplateLiteral: false,
                            }
                        },
                    ],
                }
            },
            {
                structure: {
                    name: "string-formatter",
                    exportName: "schema",
                    variables: [],
                    functions: [
                        {
                            function: {
                                name: "format",
                                arguments: [{
                                    argument: {
                                        name: "val",
                                        struct: { struct: { string: { type: "string" } } },
                                    }
                                }],
                                return: { structureCall: { name: "string-formatter" } },
                                isTemplateLiteral: false,
                            }
                        },
                    ],
                }
            },
        ],
        initFunctions: [
            {
                name: "create-type-converter",
                withVariableName: true,
                return: { structureCall: { name: "type-converter" } },
                importString: {
                    typescript: `import { createTypeConverter } from "../generated-examples/definitions/typescript/create-type-converter"`,
                },
            },
            {
                name: "create-string-formatter",
                withVariableName: true,
                return: { structureCall: { name: "string-formatter" } },
                importString: {
                    typescript: `import { createStringFormatter } from "../generated-examples/definitions/typescript/create-string-formatter"`,
                },
            },
        ],
    }
};

export const exampleConfig: ConfigType = {
    languages: ["typescript"],
    folderName: "tests/typescript/generated-examples",
};
