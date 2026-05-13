import { generateProject } from "../core";
import type { FunctionType } from "../core.types";
import keywordsJSON from '../query-builder/keywords.json' assert { type: 'json' };
import { normalizeName } from "../utils";

const keyword  = keywordsJSON['keywords'].map((keyword: { KEY_WORD: string }) => keyword.KEY_WORD);

function filterKeywords(keywords: string[]):string[] {
    const specialKeyword = ["CONSTRUCTOR"]
    return keywords.map(kw => {
        if(specialKeyword.includes(kw)){
            return kw+" KEYWORD";
        } else return kw;
    })
}

generateProject(
    {
        project: {
            definitions: [
                {
                    structure: {
                        name: "query-builder",
                        exportName: "schema",
                        variables: [],
                        functions: [
                            ...filterKeywords(keyword).map((kw: string):FunctionType => {
                                return {
                                    function:{
                                        name: kw,
                                        arguments:[
                                            {
                                                argument: {
                                                    name: "arg1",
                                                    optional: true,
                                                    struct: {
                                                        struct:{
                                                            structureCall: {
                                                                name: "query-builder"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        ],
                                        return:{
                                            structureCall: {
                                                name: "query-builder"
                                            }
                                        },
                                    }
                                }
                            })
                        ],
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
    },{
        languages: ["typescript"],
        folderName: "query-builder",
    })