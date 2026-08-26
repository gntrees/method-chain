import { expect, test } from "bun:test";
import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execSync, spawnSync } from "node:child_process";
import { convert } from "../core/convert/convert";
import { normalizeName, prettierContent } from "../core/utils";
import type { LanguageType } from "../core/base/typescript/base-types";

const { schema: baseSchema } = await import("./data/cases/typescript/example-base");
const { schema: chainSchema } = await import("./data/cases/typescript/example-chain");
const { schema: nestedSchema } = await import("./data/cases/typescript/example-nested");
const { schema: unionSchema } = await import("./data/cases/typescript/example-union");
const { schema: templateLiteralSchema } = await import("./data/cases/typescript/example-template-literal");
const { schema: optionalSchema } = await import("./data/cases/typescript/example-optional");
const { schema: queryBuilderSchema } = await import("./data/cases/typescript/example-query-builder");
const { schema: defaultValueSchema } = await import("./data/cases/typescript/example-default-value");
const { schema: propertyCallSchema } = await import("./data/cases/typescript/example-property-call");
const { schema: paramCasesSchema } = await import("./data/cases/typescript/example-param-cases");

const getFile = async (path: string, language: LanguageType = "typescript") =>
    prettierContent(readFileSync(path, "utf8"), language);

const convertSchema = async (schema: any) =>
    convert(
        schema.getSchema(),
        "typescript"
    );

const casesDir = join(import.meta.dir, "data/cases/c");
const cGenDir = join(import.meta.dir, "gntrees-method-chain/c");

let tempCounter = 0;

function getSchemaFromCFile(caseName: string): string {
    const tag = `${process.pid}-${tempCounter++}`;
    const tempC = join(tmpdir(), `gntrees-temp-${tag}.c`);
    const binary = join(tmpdir(), `gntrees-roundtrip-${tag}`);
    try {
        const fn = `${normalizeName(caseName, "snake")}_schema`;
        const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>

extern Builder ${fn}(void);

int main(void) {
    Builder b = ${fn}();
    b.schema.exportName = "${caseName}";
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
        writeFileSync(tempC, runner);
        execSync(
            `gcc -Wall -Wextra -o ${binary} ${tempC} ${join(casesDir, `example-${caseName}.c`)} ${join(cGenDir, "cJSON.c")} -I${cGenDir} -lm`,
            { stdio: "pipe" }
        );
        const res = spawnSync(binary, [], { encoding: "utf8" });
        if (res.status !== 0) throw new Error(`roundtrip binary failed:\n${res.stderr}`);
        expect(res.stderr).not.toContain("validate:");
        return res.stdout.trim();
    } finally {
        try { unlinkSync(tempC); } catch { /* ignore */ }
        try { unlinkSync(binary); } catch { /* ignore */ }
    }
}

const convertCSchema = async (json: string) => convert(JSON.parse(json), "c");

const CASES = [
    { name: "base", schema: baseSchema },
    { name: "chain", schema: chainSchema },
    { name: "nested", schema: nestedSchema },
    { name: "union", schema: unionSchema },
    { name: "template-literal", schema: templateLiteralSchema },
    { name: "optional", schema: optionalSchema },
    { name: "query-builder", schema: queryBuilderSchema },
    { name: "default-value", schema: defaultValueSchema },
    { name: "property-call", schema: propertyCallSchema },
    { name: "param-cases", schema: paramCasesSchema }
];

for (const { name, schema } of CASES) {
    test(`example-${name}`, async () => {
        expect(await convertSchema(schema)).toBe(
            await getFile(`./tests/data/cases/typescript/example-${name}.ts`)
        );
        expect(await convertCSchema(getSchemaFromCFile(name))).toBe(
            await getFile(`./tests/data/cases/c/example-${name}.c`, "c")
        );
    });
}
