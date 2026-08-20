import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { convert } from "../../convert";
import { prettierContent } from "../../utils";
import { generateProject } from "../../core";
import { exampleProject, exampleConfig } from "./data/example-project";

await generateProject(exampleProject, exampleConfig);

const definitionFiles = [
    "base-types.ts",
    "base-utils.ts",
    "types.ts",
    "utils.ts",
    "type-converter.ts",
    "string-formatter.ts",
    "create-type-converter.ts",
    "create-string-formatter.ts",
];

const waitForStableDefinitions = async () => {
    const snapshot = () =>
        definitionFiles.map((file) => {
            try {
                return `${file}:${readFileSync(`./tests/typescript/generated-examples/definitions/typescript/${file}`, "utf8").length}`;
            } catch {
                return `${file}:missing`;
            }
        });
    let prev = snapshot();
    for (let i = 0; i < 200; i++) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        const cur = snapshot();
        const allPresent = cur.every((s) => !s.endsWith(":missing"));
        const stable = allPresent && cur.every((s, index) => s === prev[index]);
        if (stable) return;
        prev = cur;
    }
    throw new Error("generateProject tidak selesai menulis definitions");
};

await waitForStableDefinitions();

const { schema: baseSchema } = await import("./data/example-base");
const { schema: chainSchema } = await import("./data/example-chain");
const { schema: nestedSchema } = await import("./data/example-nested");
const { schema: unionSchema } = await import("./data/example-union");
const { schema: templateLiteralSchema } = await import("./data/example-template-literal");
const { schema: optionalSchema } = await import("./data/example-optional");

const getFile = async (path: string) =>
    prettierContent(readFileSync(path, "utf8"), "typescript");

const convertSchema = async (schema: any) =>
    convert(
        schema.getSchema(undefined, 'import { createTypeConverter } from "../generated-examples/definitions/typescript/create-type-converter"'),
        "typescript"
    );

test("example-base", async () => {
    expect(await convertSchema(baseSchema)).toBe(
        await getFile("./tests/typescript/data/example-base.ts")
    );
});

test("example-chain", async () => {
    expect(await convertSchema(chainSchema)).toBe(
        await getFile("./tests/typescript/data/example-chain.ts")
    );
});

test("example-nested", async () => {
    expect(await convertSchema(nestedSchema)).toBe(
        await getFile("./tests/typescript/data/example-nested.ts")
    );
});

test("example-union", async () => {
    expect(await convertSchema(unionSchema)).toBe(
        await getFile("./tests/typescript/data/example-union.ts")
    );
});

test("example-template-literal", async () => {
    expect(await convertSchema(templateLiteralSchema)).toBe(
        await getFile("./tests/typescript/data/example-template-literal.ts")
    );
});

test("example-optional", async () => {
    expect(await convertSchema(optionalSchema)).toBe(
        await getFile("./tests/typescript/data/example-optional.ts")
    );
});
