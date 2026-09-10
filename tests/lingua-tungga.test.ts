import { afterAll, beforeAll, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import { generateProject } from "../core/core";
import type { ArgumentType, FunctionType } from "../core/core.types";
import type { StructType } from "../core/base/typescript/base-types";
import type { ArgumentValue, FunctionCallType, SchemaType } from "../core/lingua-tungga/lingua-tungga/typescript/index";
import { linguaTungga } from "../core/lingua-tungga/lingua-tungga/typescript/index";
import { generate } from "../core/lingua-tungga/lingua-tungga-implementation";


test("addStatements appends per language and resolves joined by default", async () => {
    const out = await linguaTungga()
        .addStatements({ typescript: ["const x = 1;", "const y = 2;"], c: ["int x = 1;"] })
        .addStatements({ typescript: ["const z = 3;"] })
        .generate();
    expect(out).toEqual({
        typescript: "const x = 1;\nconst y = 2;\nconst z = 3;",
        c: "int x = 1;",
    });
});

test("setStatements replaces statements for a language and keeps others", async () => {
    const out = await linguaTungga()
        .addStatements({ typescript: ["old;"], c: ["keep;"] })
        .setStatements({ typescript: ["new;"] })
        .generate();
    expect(out).toEqual({ typescript: "new;", c: "keep;" });
});

test("statement order is preserved across mixed calls", async () => {
    const out = await linguaTungga()
        .addStructureFunctionCall("double", [2])
        .addStructureVariableCall("testVar")
        .addStatements({ typescript: ["last;"], c: ["last;"] })
        .generate();
    expect(out).toEqual({
        typescript: "this.double(2);\nthis.testvar;\nlast;",
        c: "double(v_int(2));\ntestvar;\nlast;",
    });
});

test("addStructureFunctionCall renders literals per language", async () => {
    const out = await linguaTungga()
        .addStructureFunctionCall("select", ["id"])
        .addStructureFunctionCall("limit", [5])
        .addStructureFunctionCall("flag", [true])
        .addStructureFunctionCall("unset", [null])
        .generate();
    expect(out.typescript).toEqual('this.select("id");\nthis.limit(5);\nthis.flag(true);\nthis.unset(null);');
    expect(out.c).toEqual('select(v_string("id"));\nlimit(v_int(5));\nflag(v_bool(1));\nunset(v_null());');
});

test("addStructureFunctionCall renders objects, arrays and expression records", async () => {
    const out = await linguaTungga()
        .addStructureFunctionCall("set", [{ name: "bob" }])
        .addStructureFunctionCall("tags", [["a", "b"]])
        .addStructureFunctionCall("raw", [{ typescript: "x()", c: "v_x()" }])
        .generate();
    expect(out.typescript).toEqual('this.set({"name": "bob"});\nthis.tags(["a", "b"]);\nthis.raw(x());');
    expect(out.c).toEqual('set(map(entry("name", v_string("bob"))));\ntags(arr(v_string("a"), v_string("b")));\nraw(v_x());');
});

test("addStructureVariableCall renders this-property per language", async () => {
    const out = await linguaTungga().addStructureVariableCall("testVar").generate();
    expect(out).toEqual({ typescript: "this.testvar;", c: "testvar;" });
});

test("structureFunctionCall producer renders call expressions", async () => {
    const out = await linguaTungga().structureFunctionCall("select", ["id"]).generate();
    expect(out).toEqual({ typescript: 'this.select("id")', c: 'select(v_string("id"))' });
});

test("structureVariableCall producer renders property expressions", async () => {
    const out = await linguaTungga().structureVariableCall("testVar").generate();
    expect(out).toEqual({ typescript: "this.testvar", c: "testvar" });
});

test("sub-chain argument evaluates nested builder", async () => {
    const out = await linguaTungga()
        .structureFunctionCall("pipe", [linguaTungga().structureVariableCall("testVar")])
        .generate();
    expect(out).toEqual({ typescript: "this.pipe(this.testvar)", c: "pipe(testvar)" });
});

test("addVariable emits declarations per language", async () => {
    const out = await linguaTungga()
        .addVariable("count", 5)
        .addVariable("flag", true)
        .addVariable("nothing", null)
        .addVariable("items", ["a", "b"])
        .addVariable("user", { name: "bob" })
        .generate();
    expect(out.typescript).toEqual([
        "const count = 5;",
        "const flag = true;",
        "const nothing = null;",
        'const items = ["a", "b"];',
        'const user = {"name": "bob"};',
    ].join("\n"));
    expect(out.c).toEqual([
        "ArgumentValue count = v_int(5);",
        "ArgumentValue flag = v_bool(1);",
        "ArgumentValue nothing = v_null();",
        'ArgumentValue items = arr(v_string("a"), v_string("b"));',
        'ArgumentValue user = map(entry("name", v_string("bob")));',
    ].join("\n"));
});

test("addValue producer renders values per language", async () => {
    expect(await linguaTungga().addValue("hi").generate()).toEqual({ typescript: '"hi"', c: 'v_string("hi")' });
    expect(await linguaTungga().addValue(5).generate()).toEqual({ typescript: "5", c: "v_int(5)" });
    expect(await linguaTungga().addValue(true).generate()).toEqual({ typescript: "true", c: "v_bool(1)" });
    expect(await linguaTungga().addValue(null).generate()).toEqual({ typescript: "null", c: "v_null()" });
    expect(await linguaTungga().addValue([1, 2]).generate()).toEqual({ typescript: "[1, 2]", c: "arr(v_int(1), v_int(2))" });
    expect(await linguaTungga().addValue([["a"], ["b"]]).generate()).toEqual({
        typescript: '[["a"], ["b"]]',
        c: 'arr(arr(v_string("a")), arr(v_string("b")))',
    });
    expect(await linguaTungga().addValue({ k: "v" }).generate()).toEqual({ typescript: '{"k": "v"}', c: 'map(entry("k", v_string("v")))' });
});

test("addValue escapes quotes only for c strings", async () => {
    const out = await linguaTungga().addValue('a"b').generate();
    expect(out.typescript).toEqual('"a"b"');
    expect(out.c).toEqual('v_string("a\\"b")');
});

test("getStatements producer joins raw statements into resolved output", async () => {
    const out = await linguaTungga()
        .addStatements({ typescript: ["a;", "b;"], c: ["c;"] })
        .getStatements()
        .generate();
    expect(out).toEqual({ typescript: "a;\nb;", c: "c;" });
});

test("getResolvedStatements producer equals default output", async () => {
    const base = () => linguaTungga().addStatements({ typescript: ["a;"], c: ["b;"] });
    expect(await base().getResolvedStatements().generate()).toEqual(await base().generate());
});

test("expression record missing a language throws", async () => {
    await expect(linguaTungga().addStructureFunctionCall("raw", [{ typescript: "x()" }]).generate())
        .rejects.toThrow(/no expression for language\(s\): c/);
});

test("multi-word names are camelCase normalized", async () => {
    const out = await linguaTungga()
        .addStructureFunctionCall("on-conflict-do-nothing", [5])
        .generate();
    expect(out).toEqual({ typescript: "this.onConflictDoNothing(5);", c: "onConflictDoNothing(v_int(5));" });

    const out2 = await linguaTungga().structureVariableCall("test-var").generate();
    expect(out2).toEqual({ typescript: "this.testVar", c: "testVar" });
});

test("empty containers render empty constructors", async () => {
    expect(await linguaTungga().addValue([]).generate()).toEqual({ typescript: "[]", c: "arr()" });
    expect(await linguaTungga().addValue({}).generate()).toEqual({ typescript: "{}", c: "map()" });
});

test("omitted args fall back to empty array", async () => {
    const out = await linguaTungga().structureFunctionCall("asc").generate();
    expect(out).toEqual({ typescript: "this.asc()", c: "asc()" });
});

test("language with empty statement array resolves to empty string", async () => {
    const out = await linguaTungga()
        .addStatements({ typescript: ["a;"], c: [] })
        .generate();
    expect(out).toEqual({ typescript: "a;", c: "" });
});

test("duplicate addVariable appends both declarations", async () => {
    const out = await linguaTungga()
        .addVariable("x", 1)
        .addVariable("x", 2)
        .generate();
    expect(out).toEqual({
        typescript: "const x = 1;\nconst x = 2;",
        c: "ArgumentValue x = v_int(1);\nArgumentValue x = v_int(2);",
    });
});

test("addValue escapes quotes in object keys", async () => {
    const out = await linguaTungga().addValue({ 'a"b': "v" }).generate();
    expect(out).toEqual({ typescript: '{"a\\"b": "v"}', c: 'map(entry("a\\"b", v_string("v")))' });
});

const makeSchema = (values: SchemaType["schema"]["chain"]["chain"]["values"]): SchemaType => ({
    schema: {
        exportName: "schema",
        chain: {
            chain: {
                values,
                initFunction: { name: "lingua-tungga", variableName: "s1" },
            },
        },
    },
});

const fnCall = (name: string, args: ArgumentValue[] = []): FunctionCallType => ({
    functionCall: {
        name,
        arguments: args.map((argument) => ({ argument, default: null })),
        isTemplateLiteral: false,
    },
});

test("unknown function call throws", () => {
    expect(() => generate(makeSchema([fnCall("nope", [{ string: { value: "x" } }])])))
        .toThrow(/Unknown lingua-tungga function call: nope/);
});

test("non-functionCall chain value throws", () => {
    expect(() => generate(makeSchema([{ propertyCall: { name: "x" } }])))
        .toThrow(/Unsupported chain value/);
});

test("empty chain resolves to empty object", () => {
    expect(generate(makeSchema([]))).toEqual({ typescript: "", c: "" });
});

const stringStruct: StructType = { struct: { string: { type: "string" } } };
const numberStruct: StructType = { struct: { number: { type: "number" } } };
const booleanStruct: StructType = { struct: { boolean: { type: "boolean" } } };
const nullStruct: StructType = { struct: { null: { type: "null" } } };
const objectStruct: StructType = { struct: { object: { name: stringStruct.struct } } };
const arrayStringStruct: StructType = { struct: { array: { type: stringStruct.struct } } };
const structureCallStruct: StructType = { struct: { structureCall: { name: "test-lingua-tungga" } } };

const arg = (name: string, struct: StructType): ArgumentType => ({
    argument: { name, struct },
});

const argWithDefault = (name: string, struct: StructType, defaultArg: NonNullable<ArgumentType["argument"]["default"]>): ArgumentType => ({
    argument: { name, struct, default: defaultArg },
});

const fn = (name: string, args: ArgumentType[] = []): FunctionType => ({
    function: {
        name,
        arguments: args,
        return: { structureCall: { name: "test-lingua-tungga" } },
        isTemplateLiteral: false,
    },
});

const generatedDir = join(import.meta.dir, ".generated");
const projectDir = join(generatedDir, "test-lingua-tungga");
const tsFile = join(projectDir, "typescript/index.ts");
const cHeader = join(projectDir, "c/test-lingua-tungga.h");

beforeAll(async () => {
    const generated = await linguaTungga()
            .setStatements({ typescript: ["let seed = 0;"], c: ["int seed = 0;"] })
            .addStatements({ typescript: ["const base = 1;"], c: ["int base = 1;"] })
            .addStructureFunctionCall("select", ["id"])
            .addStructureFunctionCall("limit", [5])
            .addStructureFunctionCall("flag", [true])
            .addStructureFunctionCall("unset", [null])
            .addStructureFunctionCall("set", [{ name: "bob" }])
            .addStructureFunctionCall("tags", [["a", "b"]])
            .addStructureFunctionCall("raw", [{ typescript: 'this.select("id")', c: 'select(v_string("id"))' }])
            .addStructureFunctionCall("pipe", [linguaTungga().structureFunctionCall("select", ["id"])])
            .addStructureFunctionCall("on-conflict-do-nothing", [5])
            .addStructureFunctionCall("asc")
            .addStatements({
                typescript: ['this.dump();'],
                c: ['dump(builder);'],
            })
            .addVariable("total", 5)
            .addVariable("active", true)
            .addVariable("nothing", null)
            .addVariable("items", ["a", "b"])
            .addVariable("user", { name: "bob" })
            .getResolvedStatements()
            .generate();

    await generateProject(
        {
            project: {
                projectName: "test-lingua-tungga",
                importPaths: {},
                definitions: [
                    {
                        structure: {
                            name: "test-lingua-tungga",
                            exportName: "schema",
                            variables: [],
                            functions: [
                                fn("select", [arg("arg0", stringStruct)]),
                                fn("limit", [arg("arg0", numberStruct)]),
                                fn("flag", [arg("arg0", booleanStruct)]),
                                fn("unset", [arg("arg0", nullStruct)]),
                                fn("set", [arg("arg0", objectStruct)]),
                                fn("tags", [arg("arg0", arrayStringStruct)]),
                                fn("raw", [arg("arg0", structureCallStruct)]),
                                fn("pipe", [arg("arg0", structureCallStruct)]),
                                fn("on-conflict-do-nothing", [arg("arg0", numberStruct)]),
                                fn("asc", [argWithDefault("arg0", stringStruct, { string: { value: "" } })]),
                                {
                                    customFunction: {
                                        name: "dump",
                                        arguments: [],
                                        body: {
                                            typescript: "console.log('dummy custom function');",
                                            c: "/* dummy custom function */",
                                        },
                                        return: {
                                            typescript: "void",
                                            c: "void",
                                        },
                                    },
                                },
                                {
                                    customFunction: {
                                        name: "generate",
                                        arguments: [],
                                        body: {
typescript: generated.typescript,
                                        c: generated.c,
                                        },
                                        return: {
                                            typescript: "void",
                                            c: "void",
                                        },
                                    },
                                },
                            ],
                        },
                    },
                ],
                initFunctions: [],
            },
        },
        {
            languages: ["typescript", "c"],
            folderName: "tests/.generated",
        },
    );
});

afterAll(async () => {
    await rm(generatedDir, { recursive: true, force: true });
});

test("generated project typechecks in typescript", () => {
    const tscPath = join(import.meta.dir, "../node_modules/typescript/bin/tsc");
    const res = spawnSync(
        process.execPath,
        [tscPath, "--noEmit", "--strict", "--target", "ESNext", "--module", "preserve", "--moduleResolution", "bundler", "--types", "bun", tsFile],
        { encoding: "utf8" },
    );
    expect(res.status).toBe(0);
    expect(res.stderr).not.toContain("error TS");
}, 30000);

test("generated project typechecks in c", () => {
    const cDir = join(projectDir, "c");
    const res = spawnSync("gcc", ["-fsyntax-only", "-std=c11", "-I", cDir, cHeader], { encoding: "utf8" });
    expect(res.status).toBe(0);
    expect(res.stderr).not.toContain("error:");
}, 30000);
