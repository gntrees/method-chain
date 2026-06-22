import { generateProject } from "../core";
import type { FunctionType } from "../core.types";
import keywordsJSON from '../query-builder/keywords.json' with { type: 'json' };
import { keywordOverrides, newKeywords } from "./test-override-keyword";

const keyword = keywordsJSON['keywords'].map((keyword: { KEY_WORD: string }) => keyword.KEY_WORD);

function filterKeywords(keywords: string[]): string[] {
    const specialKeyword = ["CONSTRUCTOR"]
    return keywords.map(kw => {
        if (specialKeyword.includes(kw)) {
            return kw + " KEYWORD";
        } else return kw;
    })
}

function overrideKeyword(keywords: string[]): FunctionType[] {
    const additionalKeywords: FunctionType[]= []
    const keywordsFinal =  keywords.map(kw => {
        if (keywordOverrides[kw]) {
            additionalKeywords.push({
            function: {
                name: kw+"_",
                arguments: [],
                return: {
                    structureCall: {
                        name: "query-builder"
                    }
                },
                isTemplateLiteral: false
            }
        })
            return keywordOverrides[kw];
        } else return {
            function: {
                name: kw,
                arguments: [],
                return: {
                    structureCall: {
                        name: "query-builder"
                    }
                },
                isTemplateLiteral: false
            }
        }
    })
    return [...keywordsFinal, ...additionalKeywords];
}

const functions: FunctionType[] = [
    ...overrideKeyword(filterKeywords(keyword)),
    ...Object.entries(newKeywords).map(([kw, func]) => func),
    {
        function: {
            name: "raw",
            arguments: [
                {
                    argument: {
                        name: "arg1",
                        struct: {
                            struct: {
                                union: {
                                    types: [
                                        {
                                            string: {
                                                type: "string"
                                            }
                                        },
                                        {
                                            number: {
                                                type: "number"
                                            }
                                        },
                                    ]
                                }
                            }
                        }
                    }
                }
            ],
            isTemplateLiteral: true,
            return: {
                structureCall: {
                    name: "query-builder"
                }
            }
        }
    }
]

generateProject(
    {
        project: {
            definitions: [
                {
                    structure: {
                        name: "query-builder",
                        exportName: "schema",
                        variables: [],
                        functions: functions,
                    }
                },
                // {
                //     structure: {
                //         name: "query-instance",
                //         exportName: "schema",
                //         variables: [],
                //         functions: [
                //             ...filterKeywords(keyword).map((kw: string):FunctionType => {
                //                 return {
                //                     function:{
                //                         name: kw,
                //                         arguments:[
                //                             {
                //                                 argument: {
                //                                     name: "arg1",
                //                                     optional: true,
                //                                     struct: {
                //                                         struct:{
                //                                             structureCall: {
                //                                                 name: "query-builder"
                //                                             }
                //                                         }
                //                                     }
                //                                 }
                //                             }
                //                         ],
                //                         return:{
                //                             structureCall: {
                //                                 name: "query-builder"
                //                             }
                //                         },
                //                     }
                //                 }
                //             })
                //         ],
                //     }
                // },
            ],
            initFunctions: [{
                name: "sql-builder",
                withVariableName: true,
                importString: {
                    typescript: `import { sqlBuilder } from "./query-builder/definitions/typescript/sql-builder.ts";`
                },
                return: {
                    structureCall: {
                        name: "query-builder",
                    }
                }
            }]
        }
    }, {
    languages: ["typescript"],
    folderName: "query-builder",
})