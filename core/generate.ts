import { generateProject } from "./core";
import type { ConfigType } from "./core.types";
import { exampleConfig, exampleProject } from "../tests/data/cases/typescript/example-project";

const target = process.argv[2] ?? process.env.TARGET ?? "typescript";

if (target !== "typescript" && target !== "c") {
    console.error(`Unknown language: ${target}. Use "typescript" or "c".`);
    process.exit(1);
}

const config = {
    ...exampleConfig,
    languages: [target],
} as ConfigType;

await generateProject(exampleProject, config);
