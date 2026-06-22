import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { convert } from "../../convert";
import { prettierContent } from "../../utils";
import { schema as baseSchema } from "./data/example-base";
import { schema as chainSchema } from "./data/example-chain";
import { schema as nestedSchema } from "./data/example-nested";

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
