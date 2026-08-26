import { write } from "bun";
import { readFileSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import type { ConfigType, ProjectType } from "./core.types";
import { normalizeName, prettierContent } from "./utils";
import { generateCSingleHeader } from "./core-c";
import { generateTypeScriptContent } from "./core-typescript";

const baseTypesContent = {
    typescript: readFileSync("./core/base/typescript/base-types.ts", { encoding: "utf-8" }),
}
const baseUtilsContent = {
    typescript: readFileSync("./core/base/typescript/base-utils.ts", { encoding: "utf-8" }),
}
const baseCContent = {
    "base-types.h": readFileSync("./core/base/c/base-types.h", { encoding: "utf-8" }),
    "base-utils.h": readFileSync("./core/base/c/base-utils.h", { encoding: "utf-8" }),
    "base-utils.c": readFileSync("./core/base/c/base-utils.c", { encoding: "utf-8" }),
    "cJSON.h": readFileSync("./core/base/c/cJSON.h", { encoding: "utf-8" }),
    "cJSON.c": readFileSync("./core/base/c/cJSON.c", { encoding: "utf-8" }),
}

export function validateProject(project: ProjectType): void {
    const definitions = project.project.definitions;
    const structureNames = new Set(definitions.map(d => d.structure.name));

    definitions.forEach(definition => {
        const structureName = definition.structure.name;
        const functionNames = new Set<string>();
        const propertyNames = new Set<string>();

        const addUnique = (set: Set<string>, name: string, kind: string) => {
            const key = normalizeName(name, "camel");
            if (set.has(key)) {
                throw new Error(`Duplicate ${kind} "${name}" in structure "${structureName}"`);
            }
            set.add(key);
        };

        definition.structure.functions.forEach(func => {
            if ("function" in func) {
                addUnique(functionNames, func.function.name, "function");
                const returnName = func.function.return.structureCall.name;
                if (!structureNames.has(returnName)) {
                    throw new Error(`Function "${func.function.name}" in structure "${structureName}" returns undefined structure "${returnName}"`);
                }
                if (func.function.isTemplateLiteral && (func.function.arguments.length !== 1 || !func.function.arguments[0])) {
                    throw new Error(`Template literal function "${func.function.name}" must have exactly one argument`);
                }
            } else if ("customFunction" in func) {
                addUnique(functionNames, func.customFunction.name, "function");
            }
        });

        definition.structure.variables.forEach(variable => {
            if ("variable" in variable) {
                addUnique(propertyNames, variable.variable.name, "property");
                const target = variable.variable.value.structureCall.name;
                if (!structureNames.has(target)) {
                    throw new Error(`Property "${variable.variable.name}" in structure "${structureName}" references undefined structure "${target}"`);
                }
            } else if ("customVariable" in variable) {
                addUnique(propertyNames, variable.customVariable.name, "property");
            }
        });

        for (const prop of propertyNames) {
            if (functionNames.has(prop)) {
                throw new Error(`Name collision between function and property "${prop}" in structure "${structureName}"`);
            }
        }
    });

    project.project.initFunctions.forEach(init => {
        if ("structureCall" in init.return) {
            const target = init.return.structureCall.name;
            if (!structureNames.has(target)) {
                throw new Error(`Init function "${init.name}" returns undefined structure "${target}"`);
            }
        }
    });
}

export async function generateProject(project: ProjectType, config: ConfigType) {
    validateProject(project);
    const contents = await Promise.all(config.languages.map(async language => {
        if (language === "c") {
            return {
                language,
                fileName: `${normalizeName(project.project.projectName, "kebab")}.h`,
                content: generateCSingleHeader(project, baseCContent),
            }
        }
        return {
            language,
            fileName: "index.ts",
            content: generateTypeScriptContent(project, baseTypesContent.typescript, baseUtilsContent.typescript),
        }
    }))

    const projectName = normalizeName(project.project.projectName, "kebab");
    const projectFolder = `./${config.folderName}/${projectName}`;

    for (const content of contents) {
        const languageFolder = `${projectFolder}/${content.language}`;

        await rm(languageFolder, {
            recursive: true,
            force: true
        });
        await mkdir(languageFolder, {
            recursive: true
        });

        await write(`${languageFolder}/${content.fileName}`, await prettierContent(content.content, content.language));

        if (content.language === "c") {
            await write(`${languageFolder}/cJSON.h`, baseCContent["cJSON.h"]);
            await write(`${languageFolder}/cJSON.c`, baseCContent["cJSON.c"]);
        }

        console.log("Project generated successfully!");
    }
}
