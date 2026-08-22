import { write } from "bun";
import { readFileSync } from "node:fs";
import { exists, mkdir, rm } from "node:fs/promises";
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

export async function generateProject(project: ProjectType, config: ConfigType) {
    const contents = await Promise.all(config.languages.map(async language => {
        if (language === "c") {
            return {
                language,
                definitions: [] as { name: string, content: string }[],
                implementations: [] as { name: string, content: string }[],
                types: "",
                utils: "",
            }
        }
        return {
            language,
            ...generateTypeScriptContent(project),
        }
    }))

    const projectName = normalizeName(project.project.projectName, "kebab");
    const projectFolder = `./${config.folderName}/${projectName}`;

    for (const content of contents) {
        const isC = content.language === "c";

        if (isC) {
            // single-file header-only output: user cukup #include satu file .h
            const cFolder = `${projectFolder}/c`;
            await rm(cFolder, {
                recursive: true,
                force: true
            });
            await mkdir(cFolder, {
                recursive: true
            });
            await write(`${cFolder}/${projectName}.h`, generateCSingleHeader(project, baseCContent));
            await write(`${cFolder}/cJSON.h`, baseCContent["cJSON.h"]);
            await write(`${cFolder}/cJSON.c`, baseCContent["cJSON.c"]);
            console.log("Project generated successfully!");
            continue;
        }

        const definitionsFolder = `${projectFolder}/${content.language}/definitions`;
        const implementationsFolder = `${projectFolder}/${content.language}/implementations`;

        await rm(definitionsFolder, {
            recursive: true,
            force: true
        });
        await mkdir(definitionsFolder, {
            recursive: true
        });

        // write base-types.ts. get from base-types/typescript.ts
        await write(`${definitionsFolder}/base-types.ts`, baseTypesContent.typescript);
        // write types.ts
        await write(`${definitionsFolder}/types.ts`, await prettierContent(content.types, content.language));
        // write utils.ts
        await write(`${definitionsFolder}/utils.ts`, await prettierContent(content.utils, content.language));
        // write base-utils.ts. get from base-types/utils.ts
        await write(`${definitionsFolder}/base-utils.ts`, baseUtilsContent.typescript);

        // write definition files
        await Promise.all(content.definitions.map(async definition => {
            const file = `${normalizeName(definition.name, "kebab")}.ts`;
            await write(`${definitionsFolder}/${file}`, await prettierContent(definition.content, content.language));
        })).then(() => {
            console.log("Project generated successfully!");
        }).catch(err => {
            console.error("Error generating project:", err);
        });

        // write implementation files
        // cek if implementation folder exists, if exists, dont write, if not, write
        if (!await exists(implementationsFolder)) {
            await mkdir(implementationsFolder, {
                recursive: true
            });
            await Promise.all(content.implementations.map(async implementation => {
                const file = `${normalizeName(implementation.name, "kebab")}.ts`;
                await write(`${implementationsFolder}/${file}`, await prettierContent(implementation.content, content.language));
            })).then(() => {
                console.log("Project generated successfully!");
            }).catch(err => {
                console.error("Error generating project:", err);
            });
        } else {
            console.log(`Implementations for ${content.language} already exist, skipping implementation generation.`);
        }
    }
}
