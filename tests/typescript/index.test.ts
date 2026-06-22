import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { convert } from "../../convert";
import { prettierContent } from "../../utils";
import { schema as schemaBase } from "./data/base";

const getFile = async (path: string) => {
    return await prettierContent(readFileSync(path, "utf8"), "typescript");
}

const convertSchema = async (schema: any) => {
    return await convert(
        schema.getSchema(undefined, 'import { sqlBuilder } from "../../../query-builder/definitions/typescript/sql-builder"'),
        "typescript"
    );
}

test("base", async () => {
    expect(await convertSchema(schemaBase)).toBe(await getFile("./tests/typescript/data/base.ts"));
});
