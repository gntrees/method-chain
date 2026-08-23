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

export async function generateProject(project: ProjectType, config: ConfigType) {
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
