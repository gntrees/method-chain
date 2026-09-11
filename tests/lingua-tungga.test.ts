import { afterAll, beforeAll, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { unlinkSync, writeFileSync } from "node:fs";
import { rm } from "node:fs/promises";
import { tmpdir } from "node:os";
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
        c: "int x = 1;\nlt_free_all();",
    });
});

test("setStatements replaces statements for a language and keeps others", async () => {
    const out = await linguaTungga()
        .addStatements({ typescript: ["old;"], c: ["keep;"] })
        .setStatements({ typescript: ["new;"] })
        .generate();
    expect(out).toEqual({ typescript: "new;", c: "keep;\nlt_free_all();" });
});

test("statement order is preserved across mixed calls", async () => {
    const out = await linguaTungga()
        .addStructureFunctionCall("double", [2])
        .addStructureVariableCall("testVar")
        .addStatements({ typescript: ["last;"], c: ["last;"] })
        .generate();
    expect(out).toEqual({
        typescript: "this.double(2);\nthis.testvar;\nlast;",
        c: "double(v_int(2));\ntestvar;\nlast;\nlt_free_all();",
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
    expect(out.c).toEqual('select(v_string("id"));\nlimit(v_int(5));\nflag(v_bool(1));\nunset(v_null());\nlt_free_all();');
});

test("addStructureFunctionCall renders objects, arrays and expression records", async () => {
    const out = await linguaTungga()
        .addStructureFunctionCall("set", [{ name: "bob" }])
        .addStructureFunctionCall("tags", [["a", "b"]])
        .addStructureFunctionCall("raw", [{ typescript: "x()", c: "v_x()" }])
        .generate();
    expect(out.typescript).toEqual('this.set({"name": "bob"});\nthis.tags(["a", "b"]);\nthis.raw(x());');
    expect(out.c).toEqual('set(map(entry("name", v_string("bob"))));\ntags(arr(v_string("a"), v_string("b")));\nraw(v_x());\nlt_free_all();');
});

test("addStructureVariableCall renders this-property per language", async () => {
    const out = await linguaTungga().addStructureVariableCall("testVar").generate();
    expect(out).toEqual({ typescript: "this.testvar;", c: "testvar;\nlt_free_all();" });
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
        "lt_free_all();",
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

test("math operators render infix expressions", async () => {
    expect(await linguaTungga().add(1, 2).generate()).toEqual({ typescript: "(1 + 2)", c: "(1 + 2)" });
    expect(await linguaTungga().subtract(5, 3).generate()).toEqual({ typescript: "(5 - 3)", c: "(5 - 3)" });
    expect(await linguaTungga().multiply(2, 4).generate()).toEqual({ typescript: "(2 * 4)", c: "(2 * 4)" });
    expect(await linguaTungga().divide(10, 2).generate()).toEqual({ typescript: "(10 / 2)", c: "(10 / 2)" });
    expect(await linguaTungga().modulo(7, 3).generate()).toEqual({ typescript: "(7 % 3)", c: "(7 % 3)" });
});

test("comparison operators render infix expressions", async () => {
    expect(await linguaTungga().equal(1, 2).generate()).toEqual({ typescript: "(1 === 2)", c: "(1 == 2)" });
    expect(await linguaTungga().notEqual("a", "b").generate()).toEqual({ typescript: '("a" !== "b")', c: '("a" != "b")' });
    expect(await linguaTungga().greaterThan(5, 3).generate()).toEqual({ typescript: "(5 > 3)", c: "(5 > 3)" });
    expect(await linguaTungga().lessThan(5, 3).generate()).toEqual({ typescript: "(5 < 3)", c: "(5 < 3)" });
    expect(await linguaTungga().greaterThanOrEqual(5, 3).generate()).toEqual({ typescript: "(5 >= 3)", c: "(5 >= 3)" });
    expect(await linguaTungga().lessThanOrEqual(5, 3).generate()).toEqual({ typescript: "(5 <= 3)", c: "(5 <= 3)" });
});

test("logical operators render infix expressions", async () => {
    expect(await linguaTungga().and(true, true).generate()).toEqual({ typescript: "(true && true)", c: "(1 && 1)" });
    expect(await linguaTungga().or(true, false).generate()).toEqual({ typescript: "(true || false)", c: "(1 || 0)" });
    expect(await linguaTungga().xor(true, false).generate()).toEqual({ typescript: "(true ^ false)", c: "(1 ^ 0)" });
    expect(await linguaTungga().not(true).generate()).toEqual({ typescript: "!(true)", c: "!(1)" });
});

test("bitwise operators render infix expressions", async () => {
    expect(await linguaTungga().bitwiseAnd(6, 3).generate()).toEqual({ typescript: "(6 & 3)", c: "(6 & 3)" });
    expect(await linguaTungga().bitwiseOr(6, 3).generate()).toEqual({ typescript: "(6 | 3)", c: "(6 | 3)" });
    expect(await linguaTungga().leftShift(1, 4).generate()).toEqual({ typescript: "(1 << 4)", c: "(1 << 4)" });
    expect(await linguaTungga().rightShift(16, 2).generate()).toEqual({ typescript: "(16 >> 2)", c: "(16 >> 2)" });
});

test("operators nest and compose with structure calls", async () => {
    const out = await linguaTungga()
        .addStructureFunctionCall("where", [linguaTungga().equal(linguaTungga().add(1, 2), 3)])
        .generate();
    expect(out).toEqual({
        typescript: "this.where(((1 + 2) === 3));",
        c: "where(((1 + 2) == 3));\nlt_free_all();",
    });

    const out2 = await linguaTungga()
        .structureFunctionCall("expr", [linguaTungga().and(linguaTungga().greaterThan(5, 3), linguaTungga().equal(linguaTungga().add(1, 2), 3))])
        .generate();
    expect(out2).toEqual({
        typescript: "this.expr(((5 > 3) && ((1 + 2) === 3)))",
        c: "expr(((5 > 3) && ((1 + 2) == 3)))",
    });
});

test("operators accept nested sub-builder as operand", async () => {
    const out = await linguaTungga().add(linguaTungga().structureVariableCall("total"), 1).generate();
    expect(out).toEqual({ typescript: "(this.total + 1)", c: "(total + 1)" });
});

test("if renders a guarded block", async () => {
    const out = await linguaTungga()
        .if(linguaTungga().equal(1, 2), linguaTungga().addStatements({ typescript: ["doThing();"], c: ["do_thing();"] }))
        .generate();
    expect(out).toEqual({
        typescript: "if (1 === 2) {\n  doThing();\n}",
        c: "if (1 == 2) {\n  do_thing();\n}\nlt_free_all();",
    });
});

test("elseIf and else chain after if", async () => {
    const out = await linguaTungga()
        .if(linguaTungga().equal(1, 1), linguaTungga().addStatements({ typescript: ["a();"], c: ["a();"] }))
        .elseIf(linguaTungga().equal(2, 2), linguaTungga().addStatements({ typescript: ["b();"], c: ["b();"] }))
        .else(linguaTungga().addStatements({ typescript: ["c();"], c: ["c();"] }))
        .generate();
    expect(out).toEqual({
        typescript: "if (1 === 1) {\n  a();\n}\nelse if (2 === 2) {\n  b();\n}\nelse {\n  c();\n}",
        c: "if (1 == 1) {\n  a();\n}\nelse if (2 == 2) {\n  b();\n}\nelse {\n  c();\n}\nlt_free_all();",
    });
});

test("while renders a loop block", async () => {
    const out = await linguaTungga()
        .while(linguaTungga().lessThan(linguaTungga().variableForCounter("i"), 3), linguaTungga().addStatements({ typescript: ["tick();"], c: ["tick();"] }))
        .generate();
    expect(out).toEqual({
        typescript: "while (i < 3) {\n  tick();\n}",
        c: "while (i < 3) {\n  tick();\n}\nlt_free_all();",
    });
});

test("forEach renders array loop per language", async () => {
    const out = await linguaTungga()
        .forEach(linguaTungga().addValue(["a", "b"]), "item", linguaTungga().addStatements({ typescript: ["use(item);"], c: ["use(item);"] }))
        .generate();
    expect(out).toEqual({
        typescript: 'for (const item of ["a", "b"]) {\n  use(item);\n}',
        c:
            'ArgumentValue itemArray = arr(v_string("a"), v_string("b"));\n' +
            "for (size_t itemIndex = 0; itemIndex < itemArray.count; itemIndex++) {\n" +
            "  ArgumentValue item = ((const ArgumentValue *)itemArray.as.data)[itemIndex];\n" +
            "  use(item);\n" +
            "}\nlt_free_all();",
    });
});

test("forCounter renders counter loop per language", async () => {
    const out = await linguaTungga()
        .forCounter(
            linguaTungga().declareForCounter("i", 0),
            linguaTungga().lessThan(linguaTungga().variableForCounter("i"), 3),
            linguaTungga().incrementForCounter(linguaTungga().variableForCounter("i")),
            linguaTungga().addStatements({ typescript: ["sum += i;"], c: ["sum += i;"] }),
        )
        .generate();
    expect(out).toEqual({
        typescript: "for (let i = 0; i < 3; (i++)) {\n  sum += i;\n}",
        c: "for (long long i = 0; i < 3; (i++)) {\n  sum += i;\n}\nlt_free_all();",
    });
});

test("counter expression builders render bare identifiers", async () => {
    expect(await linguaTungga().variableForCounter("i").generate()).toEqual({ typescript: "i", c: "i" });
    expect(await linguaTungga().declareForCounter("i", 0).generate()).toEqual({ typescript: "let i = 0", c: "long long i = 0" });
    expect(await linguaTungga().incrementForCounter(linguaTungga().variableForCounter("i")).generate()).toEqual({ typescript: "(i++)", c: "(i++)" });
});

test("nested control flow indents recursively", async () => {
    const out = await linguaTungga()
        .if(linguaTungga().equal(1, 1), linguaTungga()
            .addStatements({ typescript: ["outer();"], c: ["outer();"] })
            .if(linguaTungga().equal(2, 2), linguaTungga().addStatements({ typescript: ["inner();"], c: ["inner();"] })))
        .generate();
    expect(out).toEqual({
        typescript: "if (1 === 1) {\n  outer();\n  if (2 === 2) {\n    inner();\n  }\n}",
        c: "if (1 == 1) {\n  outer();\n  if (2 == 2) {\n    inner();\n  }\n}\nlt_free_all();",
    });
});

test("control flow body requires a builder chain", () => {
    expect(() => linguaTungga().if(true, "not a builder" as never))
        .toThrow(/structure instance for structure calls/);
});

test("string manipulation renders per language", async () => {
    expect(await linguaTungga().stringUpper("bob").generate()).toEqual({ typescript: '"bob".toUpperCase()', c: 'lt_to_upper(v_string("bob"))' });
    expect(await linguaTungga().stringConcat("a", "b").generate()).toEqual({ typescript: '("a" + "b")', c: 'lt_str_concat(v_string("a"), v_string("b"))' });
    expect(await linguaTungga().stringLength("abc").generate()).toEqual({ typescript: '"abc".length', c: 'lt_len(v_string("abc"))' });
    expect(await linguaTungga().stringReplace("a-b-a", "a", "c").generate()).toEqual({
        typescript: '"a-b-a".replaceAll("a", "c")',
        c: 'lt_replace(v_string("a-b-a"), v_string("a"), v_string("c"))',
    });
    expect(await linguaTungga().stringIncludes("abc", "b").generate()).toEqual({ typescript: '"abc".includes("b")', c: 'lt_contains(v_string("abc"), v_string("b"))' });
    expect(await linguaTungga().stringCharAt("abc", 1).generate()).toEqual({ typescript: '"abc".charAt(1)', c: 'lt_char_at(v_string("abc"), v_int(1))' });
});

test("array manipulation renders per language", async () => {
    expect(await linguaTungga().arrayAppend(linguaTungga().addValue([1, 2]), 3).generate()).toEqual({ typescript: "[...[1, 2], 3]", c: "lt_append(arr(v_int(1), v_int(2)), v_int(3))" });
    expect(await linguaTungga().arrayJoin(linguaTungga().addValue(["a", "b"]), ", ").generate()).toEqual({ typescript: '["a", "b"].join(", ")', c: 'lt_join(arr(v_string("a"), v_string("b")), v_string(", "))' });
    expect(await linguaTungga().arrayGet(linguaTungga().addValue([1, 2]), 0).generate()).toEqual({ typescript: "[1, 2][0]", c: "lt_index(arr(v_int(1), v_int(2)), v_int(0))" });
    expect(await linguaTungga().arrayUnique(linguaTungga().addValue([1, 1, 2])).generate()).toEqual({ typescript: "[...new Set([1, 1, 2])]", c: "lt_unique(arr(v_int(1), v_int(1), v_int(2)))" });
    expect(await linguaTungga().arrayReverse(linguaTungga().addValue([1, 2])).generate()).toEqual({ typescript: "[...[1, 2]].reverse()", c: "lt_reverse(arr(v_int(1), v_int(2)))" });
});

test("object manipulation renders per language", async () => {
    expect(await linguaTungga().objectMerge(linguaTungga().addValue({ a: 1 }), linguaTungga().addValue({ b: 2 })).generate()).toEqual({
        typescript: '{ ...{"a": 1}, ...{"b": 2} }',
        c: 'lt_merge(map(entry("a", v_int(1))), map(entry("b", v_int(2))))',
    });
    expect(await linguaTungga().objectSet(linguaTungga().addValue({ a: 1 }), "b", 2).generate()).toEqual({
        typescript: '{ ...{"a": 1}, ["b"]: 2 }',
        c: 'lt_set(map(entry("a", v_int(1))), v_string("b"), v_int(2))',
    });
    expect(await linguaTungga().objectKeys(linguaTungga().addValue({ a: 1 })).generate()).toEqual({ typescript: 'Object.keys({"a": 1})', c: 'lt_keys(map(entry("a", v_int(1))))' });
    expect(await linguaTungga().objectHas(linguaTungga().addValue({ a: 1 }), "a").generate()).toEqual({
        typescript: 'Object.prototype.hasOwnProperty.call({"a": 1}, "a")',
        c: 'lt_has(map(entry("a", v_int(1))), v_string("a"))',
    });
});

test("manipulation results can be used in addVariable and addValue", async () => {
    const out = await linguaTungga()
        .addVariable("name", linguaTungga().stringUpper("bob"))
        .addVariable("sizes", linguaTungga().arrayAppend(linguaTungga().addValue([1, 2]), 3))
        .generate();
    expect(out.typescript).toEqual('const name = "bob".toUpperCase();\nconst sizes = [...[1, 2], 3];');
    expect(out.c).toEqual('ArgumentValue name = lt_to_upper(v_string("bob"));\nArgumentValue sizes = lt_append(arr(v_int(1), v_int(2)), v_int(3));\nlt_free_all();');
});

test("freeCVariables emits a single free for c and nothing for typescript", async () => {
    const out = await linguaTungga().addVariable("x", 1).freeCVariables().generate();
    expect(out).toEqual({ typescript: "const x = 1;", c: "ArgumentValue x = v_int(1);\nlt_free_all();" });
});

test("expression producers are not auto-freed", async () => {
    expect(await linguaTungga().addValue(5).generate()).toEqual({ typescript: "5", c: "v_int(5)" });
    expect(await linguaTungga().stringConcat("a", "b").generate()).toEqual({ typescript: '("a" + "b")', c: 'lt_str_concat(v_string("a"), v_string("b"))' });
});

test("return renders value, void and null per language", async () => {
    expect(await linguaTungga().return(linguaTungga().addValue(5)).generate()).toEqual({ typescript: "return 5;", c: "return lt_detach_copy(v_int(5));\nlt_free_all();" });
    expect(await linguaTungga().return(linguaTungga().stringUpper("bob")).generate()).toEqual({ typescript: 'return "bob".toUpperCase();', c: 'return lt_detach_copy(lt_to_upper(v_string("bob")));\nlt_free_all();' });
    expect(await linguaTungga().return().generate()).toEqual({ typescript: "return;", c: "lt_free_all();\nreturn;" });
    expect(await linguaTungga().return(null).generate()).toEqual({ typescript: "return;", c: "lt_free_all();\nreturn;" });
    expect(await linguaTungga().return(linguaTungga().addValue(null)).generate()).toEqual({ typescript: "return null;", c: "return lt_detach_copy(v_null());\nlt_free_all();" });
});

test("return copies the returned value out of the arena", async () => {
    const guarded = await linguaTungga()
        .if(linguaTungga().equal(1, 1), linguaTungga().return(linguaTungga().addValue(1)))
        .generate();
    expect(guarded).toEqual({
        typescript: "if (1 === 1) {\n  return 1;\n}",
        c: "if (1 == 1) {\n  return lt_detach_copy(v_int(1));\n}\nlt_free_all();",
    });

    const withVar = await linguaTungga()
        .addVariable("x", 1)
        .return(linguaTungga().variableForCounter("x"))
        .generate();
    expect(withVar).toEqual({ typescript: "const x = 1;\nreturn x;", c: "ArgumentValue x = v_int(1);\nreturn lt_detach_copy(x);\nlt_free_all();" });
});


test("getStatements producer joins raw statements into resolved output", async () => {
    const out = await linguaTungga()
        .addStatements({ typescript: ["a;", "b;"], c: ["c;"] })
        .getStatements()
        .generate();
    expect(out).toEqual({ typescript: "a;\nb;", c: "c;\nlt_free_all();" });
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
    expect(out).toEqual({ typescript: "this.onConflictDoNothing(5);", c: "onConflictDoNothing(v_int(5));\nlt_free_all();" });

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
        c: "ArgumentValue x = v_int(1);\nArgumentValue x = v_int(2);\nlt_free_all();",
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
        .addStructureFunctionCall("where", [
            linguaTungga().and(
                linguaTungga().greaterThan(5, 3),
                linguaTungga().equal(linguaTungga().add(1, 2), 3),
            ),
        ])
        .addStatements({
            typescript: ['this.dump();'],
            c: ['dump(builder);'],
        })
        .addVariable("total", 5)
        .addVariable("active", true)
        .addVariable("nothing", null)
        .addVariable("items", ["a", "b"])
            .addVariable("user", { name: "bob" })
            .addVariable("label", linguaTungga().stringUpper("bob"))
            .addVariable("more", linguaTungga().arrayAppend(linguaTungga().addValue(["a", "b"]), "c"))
            .addVariable("merged", linguaTungga().objectMerge(linguaTungga().addValue({ a: 1 }), linguaTungga().addValue({ b: 2 })))
            .if(linguaTungga().lessThan(linguaTungga().variableForCounter("seed"), 0), linguaTungga().addStatements({ typescript: ["this.dump();"], c: ["dump(builder);"] }))
        .elseIf(linguaTungga().greaterThan(linguaTungga().variableForCounter("seed"), 0), linguaTungga().addStatements({ typescript: ["this.dump();"], c: ["dump(builder);"] }))
        .else(linguaTungga().addStatements({ typescript: ["this.dump();"], c: ["dump(builder);"] }))
        .while(linguaTungga().lessThan(linguaTungga().variableForCounter("seed"), 1), linguaTungga().addStatements({ typescript: ["seed++;"], c: ["seed++;"] }))
        .forEach(linguaTungga().addValue(["a", "b"]), "item", linguaTungga().addStatements({ typescript: ["this.dump();"], c: ["dump(builder);"] }))
        .forCounter(
            linguaTungga().declareForCounter("i", 0),
            linguaTungga().lessThan(linguaTungga().variableForCounter("i"), 1),
            linguaTungga().incrementForCounter(linguaTungga().variableForCounter("i")),
            linguaTungga().addStatements({ typescript: ["this.dump();"], c: ["dump(builder);"] }),
        )
        .getResolvedStatements()
        .generate();

    const returned = await linguaTungga().return(linguaTungga().addValue(5)).generate();

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
                                fn("where", [arg("arg0", booleanStruct)]),
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
                                {
                                    customFunction: {
                                        name: "returnValue",
                                        arguments: [],
                                        body: {
                                            typescript: returned.typescript,
                                            c: returned.c,
                                        },
                                        return: {
                                            typescript: "unknown",
                                            c: "ArgumentValue",
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

let asanAvailable: boolean | null = null;

function runWithAsan(source: string, name: string): { status: number | null; stderr: string } | null {
    const cDir = join(projectDir, "c");
    const tag = `${process.pid}-${Date.now()}-${name}`;
    const runner = join(tmpdir(), `lt-asan-${tag}.c`);
    const binary = join(tmpdir(), `lt-asan-${tag}`);
    try {
        if (asanAvailable === null) {
            const probe = spawnSync(
                "gcc",
                ["-fsanitize=address", "-x", "c", "-", "-o", binary, "-I", cDir, join(cDir, "cJSON.c"), "-lm"],
                { input: "int main(void){return 0;}\n", encoding: "utf8" },
            );
            asanAvailable = probe.status === 0;
        }
        if (!asanAvailable) return null;

        writeFileSync(runner, source);
        const compiled = spawnSync("gcc", ["-fsanitize=address", "-g", "-std=c11", "-o", binary, runner, join(cDir, "cJSON.c"), "-I", cDir, "-lm"], { encoding: "utf8" });
        if (compiled.status !== 0) return { status: compiled.status, stderr: compiled.stderr };

        const executed = spawnSync(binary, [], { encoding: "utf8" });
        return { status: executed.status, stderr: executed.stderr };
    } finally {
        try { unlinkSync(runner); } catch { /* ignore */ }
        try { unlinkSync(binary); } catch { /* ignore */ }
    }
}

test("c value helpers and bump arena are leak-free under address sanitizer", () => {
    const result = runWithAsan(`#include "test-lingua-tungga.h"
#include <string.h>
int main(void) {
    ArgumentValue s = lt_str_concat(v_string("hello"), v_string(" world"));
    ArgumentValue upper = lt_to_upper(s);
    ArgumentValue list = lt_append(arr(v_int(1), v_int(2)), v_int(3));
    ArgumentValue joined = lt_join(list, v_string(","));
    (void)upper;
    (void)joined;
    lt_free_all();

    for (int i = 0; i < 10000; i++) {
        ArgumentValue tmp = lt_str_concat(v_string("a"), v_string("b"));
        (void)tmp;
    }
    lt_free_all();

    ArgumentValue arrValue = lt_append(arr(v_string("lit"), v_string("x")), v_int(1));
    ArgumentValue owned = lt_detach_copy(arrValue);
    if (owned.type != D_ARRAY || owned.count != 3) return 3;
    lt_free_value(owned);

    ArgumentValue keep = lt_detach_copy(lt_to_upper(v_string("keep")));
    if (strcmp(keep.as.s, "KEEP") != 0) return 4;
    lt_free_value(keep);

    lt_shutdown();
    return 0;
}
`, "values");
    if (!result) return;
    expect(result.status).toBe(0);
    expect(result.stderr).not.toContain("AddressSanitizer");
    expect(result.stderr).not.toContain("LeakSanitizer");
}, 60000);

test("c builder and schema allocations are leak-free under address sanitizer", () => {
    const result = runWithAsan(`#include "test-lingua-tungga.h"
int main(void) {
    ArgumentValue chainValue = v(select(v_string("id")));
    (void)chainValue;
    lt_free_all();

    Builder combined = chain(select(v_string("id")), limit(v_int(5)));
    (void)combined;
    gn_free_schemas();

    lt_shutdown();
    gn_shutdown();
    return 0;
}
`, "schema");
    if (!result) return;
    expect(result.status).toBe(0);
    expect(result.stderr).not.toContain("AddressSanitizer");
    expect(result.stderr).not.toContain("LeakSanitizer");
}, 60000);

