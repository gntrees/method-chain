import { afterAll, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import { generateProject } from "../core/core";
import type { ProjectType } from "../core/core.types";

const generatedDir = join(import.meta.dir, ".generated-scripts");

const makeProject = (scripts?: Pick<ProjectType["project"], "beforeScript" | "afterScript">): ProjectType => ({
    project: {
        projectName: "script-test",
        importPaths: {},
        definitions: [{
            structure: {
                name: "script-test",
                exportName: "schema",
                variables: [],
                functions: [],
            },
        }],
        initFunctions: [],
        ...scripts,
    },
});

const generate = async (project: ProjectType) => {
    await generateProject(project, { languages: ["typescript", "c"], folderName: "tests/.generated-scripts" });
    const ts = readFileSync(join(generatedDir, "script-test", "typescript", "index.ts"), "utf8");
    const c = readFileSync(join(generatedDir, "script-test", "c", "script-test.h"), "utf8");
    return { ts, c };
};

afterAll(async () => {
    await rm(generatedDir, { recursive: true, force: true });
});

test("beforeScript and afterScript are injected raw into the typescript file", async () => {
    const { ts } = await generate(makeProject({
        beforeScript: { typescript: "// BEFORE_TS_MARKER\nconst beforeTsValue = 1;", c: "#define BEFORE_C_MARKER 1" },
        afterScript: { typescript: "// AFTER_TS_MARKER\nexport const afterTsValue = 2;", c: "#define AFTER_C_MARKER 1" },
    }));

    expect(ts).toContain("// BEFORE_TS_MARKER");
    expect(ts).toContain("const beforeTsValue = 1;");
    expect(ts).toContain("// AFTER_TS_MARKER");
    expect(ts).toContain("export const afterTsValue = 2;");
    expect(ts.indexOf("BEFORE_TS_MARKER")).toBeLessThan(ts.indexOf("Auto-generated index"));
    expect(ts.indexOf("AFTER_TS_MARKER")).toBeGreaterThan(ts.indexOf("Auto-generated index"));
});

test("beforeScript and afterScript are injected inside the c include guard", async () => {
    const { c } = await generate(makeProject({
        beforeScript: { typescript: "// BEFORE_TS_MARKER\nconst beforeTsValue = 1;", c: "#define BEFORE_C_MARKER 1" },
        afterScript: { typescript: "// AFTER_TS_MARKER\nexport const afterTsValue = 2;", c: "#define AFTER_C_MARKER 1" },
    }));

    expect(c).toContain("#define BEFORE_C_MARKER 1");
    expect(c).toContain("#define AFTER_C_MARKER 1");
    expect(c.indexOf("#include \"cJSON.h\"")).toBeLessThan(c.indexOf("BEFORE_C_MARKER"));
    expect(c.indexOf("BEFORE_C_MARKER")).toBeLessThan(c.indexOf("/* ---- definitions ---- */"));
    expect(c.indexOf("AFTER_C_MARKER")).toBeLessThan(c.indexOf("#endif /* GN_TREES_SCRIPT_TEST_H */"));
});

test("omitting scripts does not add markers", async () => {
    const { ts, c } = await generate(makeProject());

    expect(ts).not.toContain("BEFORE_TS_MARKER");
    expect(ts).not.toContain("AFTER_TS_MARKER");
    expect(c).not.toContain("BEFORE_C_MARKER");
    expect(c).not.toContain("AFTER_C_MARKER");
});
