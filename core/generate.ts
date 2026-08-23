import { generateProject } from "./core";
import type { ConfigType } from "./core.types";
import { exampleConfig, exampleProject } from "../tests/example-project";

const config = {
    ...exampleConfig,
} as ConfigType;

await generateProject(exampleProject, config);
