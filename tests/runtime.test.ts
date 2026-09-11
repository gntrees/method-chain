import { expect, test } from "bun:test";
import type {
    ArgumentValue,
    CopyType,
    FunctionCallType,
    PropertyCallType,
    StructType,
} from "./gntrees-method-chain/typescript/index";
import {
    QueryBuilder,
    TypeConverter,
    copy,
    createSchema,
    createStringFormatter,
    createTypeConverter,
    normalizeArgumentStructureCall,
    queryBuilder,
} from "./gntrees-method-chain/typescript/index";

const tc = () => new TypeConverter() as any;
const qb = () => queryBuilder("qb") as any;

const firstArg = (schema: any): { argument: ArgumentValue; default: ArgumentValue | null } => {
    const value = schema.schema.chain.chain.values[0];
    if (!("functionCall" in value)) throw new Error("expected a function call");
    return value.functionCall.arguments[0];
};

const copyValue = (value: FunctionCallType | PropertyCallType | CopyType): CopyType["copy"] => {
    if (!("copy" in value)) throw new Error("expected a copy");
    return value.copy;
};

const callValue = (value: FunctionCallType | PropertyCallType | CopyType): FunctionCallType["functionCall"] => {
    if (!("functionCall" in value)) throw new Error("expected a function call");
    return value.functionCall;
};

test("required param omitted throws", () => {
    expect(() => tc().stringify()).toThrow("was not provided");
});

test("required param explicit undefined throws", () => {
    expect(() => tc().stringify(undefined)).toThrow("cannot be undefined");
});

test("required param in second position omitted throws", () => {
    expect(() => qb().between(1)).toThrow("was not provided");
});

test("required param in second position explicit undefined throws", () => {
    expect(() => qb().between(1, undefined)).toThrow("cannot be undefined");
});

test("optional param explicit undefined throws even with default", () => {
    expect(() => tc().label(undefined)).toThrow("cannot be undefined");
});

test("optional param omitted records the default", () => {
    const arg = firstArg(tc().label().getSchema());
    expect(arg.argument).toEqual({ string: { value: "default" } });
    expect(arg.default).toEqual({ string: { value: "default" } });
});

test("structure call arg null throws", () => {
    expect(() => tc().pipe(null)).toThrow("structure instance");
});

test("structure call arg array throws", () => {
    expect(() => tc().pipe([])).toThrow("structure instance");
});

test("empty array argument is valid", () => {
    const arg = firstArg(tc().tags([]).getSchema());
    expect(arg.argument).toEqual({ array: { value: [] } });
});

test("array of matching items is valid", () => {
    const arg = firstArg(tc().tags(["a", "b"]).getSchema());
    expect(arg.argument).toEqual({
        array: { value: [{ string: { value: "a" } }, { string: { value: "b" } }] },
    });
});

test("heterogeneous array throws", () => {
    expect(() => tc().tags(["a", 1])).toThrow("Expected a string argument");
});

test("array of union items of different types throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "mixed",
            [
                {
                    arg: ["a", 1],
                    struct: {
                        array: {
                            type: {
                                union: {
                                    types: [
                                        { string: { type: "string" } },
                                        { number: { type: "number" } },
                                    ],
                                },
                            },
                        },
                    },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("same argument type");
});

test("non-finite number throws", () => {
    expect(() => tc().numerify(NaN)).toThrow("finite number");
});

test("object missing required key throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "objTest",
            [
                {
                    arg: { a: "x" },
                    struct: {
                        object: {
                            a: { string: { type: "string" } },
                            b: { number: { type: "number" } },
                        },
                    },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("Missing required key");
});

test("object with unexpected key throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "objTest",
            [
                {
                    arg: { a: "x", b: 1, c: 2 },
                    struct: {
                        object: {
                            a: { string: { type: "string" } },
                            b: { number: { type: "number" } },
                        },
                    },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("Unexpected key");
});

test("default value mismatching struct throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "badDefault",
            [
                {
                    arg: "x",
                    struct: { string: { type: "string" } },
                    default: { number: { value: 5 } },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("Expected a string argument");
});

test("getSchema with non-string exportName throws", () => {
    expect(() => tc().getSchema(123)).toThrow("getSchema exportName");
});

test("getSchema with importPaths sets importPaths", () => {
    const schema = tc().getSchema(undefined, { c: "./c", typescript: "./ts" });
    expect(schema.schema.importPaths).toEqual({ c: "./c", typescript: "./ts" });
});

test("getSchema merges importPaths with existing defaults", () => {
    const schema = tc().getSchema(undefined, { c: "./c" });
    expect(schema.schema.importPaths).toEqual({
        typescript: "../../../gntrees-method-chain/typescript/index",
        c: "./c",
    });
});

test("getSchema with non-object importPaths throws", () => {
    expect(() => tc().getSchema(undefined, 123)).toThrow("getSchema importPaths");
    expect(() => tc().getSchema(undefined, [])).toThrow("getSchema importPaths");
    expect(() => tc().getSchema(undefined, null)).toThrow("getSchema importPaths");
});

test("initFromStructure with invalid schema throws", () => {
    expect(() => tc().initFromStructure({})).toThrow("Invalid schema");
});

test("initFromInitFunction with invalid init function throws", () => {
    expect(() => tc().initFromInitFunction({})).toThrow("Invalid init function");
});

test("normalizeArgumentStructureCall rejects null", () => {
    expect(() => (normalizeArgumentStructureCall as any)(null)).toThrow("structure instance");
});

test("template literal with undefined expression throws", () => {
    expect(() => qb().raw`a ${undefined}`).toThrow("union");
});

test("template literal with too many expressions throws", () => {
    expect(() => (qb().raw as any)(["a"], "x", "y")).toThrow("expression");
});

test("template literal with too few expressions throws", () => {
    expect(() => (qb().raw as any)(["a", "b", "c"], "x")).toThrow("expression");
});

test("createSchema with invalid base schema throws", () => {
    expect(() => createSchema({} as any, "x", [], false)).toThrow("Invalid schema");
});

test("object struct key colliding with inherited property is detected as missing", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "objInherited",
            [
                {
                    arg: { x: "1" },
                    struct: {
                        object: {
                            toString: { string: { type: "string" } },
                        },
                    } as StructType["struct"],
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("Missing required key");
});

test("union error includes underlying reasons", () => {
    try {
        (tc().unify as any)({ a: 1 });
        throw new Error("expected unify to throw");
    } catch (e: any) {
        expect(e.message).toContain("does not match any type in the union");
        expect(e.message).toContain("Expected a string argument");
    }
});

test("template literal records string parts and normalized expressions", () => {
    const schema = qb().raw`SELECT ${"x"} FROM ${18}`.getSchema();
    const args = (schema.schema.chain.chain.values[0] as any).functionCall.arguments;
    expect(args[0].argument).toEqual({ string: { value: "SELECT " } });
    expect(args[1].argument).toEqual({ string: { value: "x" } });
    expect(args[2].argument).toEqual({ string: { value: " FROM " } });
    expect(args[3].argument).toEqual({ number: { value: 18 } });
});

test("empty array in union of multiple array types is accepted", () => {
    const schema = createSchema(
        tc().getSchema(),
        "emptyUnion",
        [
            {
                arg: [],
                struct: {
                    union: {
                        types: [
                            { array: { type: { string: { type: "string" } } } },
                            { array: { type: { number: { type: "number" } } } },
                        ],
                    },
                },
                provided: true,
            },
        ],
        false,
    );
    const arg = (schema.schema.chain.chain.values[0] as any).functionCall.arguments[0];
    expect(arg.argument).toEqual({ array: { value: [] } });
});

test("non-empty ambiguous union still throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "ambigUnion",
            [
                {
                    arg: ["a"],
                    struct: {
                        union: {
                            types: [
                                { array: { type: { string: { type: "string" } } } },
                                { array: { type: { string: { type: "string" } } } },
                            ],
                        },
                    },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("ambiguous");
});

test("non-plain empty object in map struct throws", () => {
    expect(() => qb().set(new Map([["a", 1]]) as any)).toThrow("plain object");
});

test("non-plain empty object in object struct throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "objExotic",
            [
                {
                    arg: new Date(),
                    struct: {
                        object: {
                            a: { string: { type: "string" } },
                        },
                    },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("plain object");
});

test("QueryBuilder import is usable", () => {
    expect(QueryBuilder).toBeDefined();
});
test("copy() records the source structure as a copy value", () => {
    const f = createTypeConverter("f").label();
    const b = createTypeConverter("c", copy(f)).label("hello");
    const values = b.getSchema().schema.chain.chain.values;
    expect(values).toHaveLength(2);
    expect(copyValue(values[0]!).structureName).toBe("type-converter");
    expect(copyValue(values[0]!).chain.chain.initFunction.variableName).toBe("f");
    expect(callValue(copyValue(values[0]!).chain.chain.values[0]!).name).toBe("label");
    expect(callValue(values[1]!).name).toBe("label");
    expect(b.getSchema().schema.chain.chain.initFunction.variableName).toBe("c");
});

test("copy of empty structure is valid", () => {
    const e = createTypeConverter("e");
    const b = createTypeConverter("c", copy(e));
    const values = b.getSchema().schema.chain.chain.values;
    expect(values).toHaveLength(1);
    expect(copyValue(values[0]!).chain.chain.values).toHaveLength(0);
});

test("copy rest args keep their order", () => {
    const f = createTypeConverter("f").label();
    const g = createTypeConverter("g").stringify("x");
    const b = createTypeConverter("c", copy(f), copy(g));
    const values = b.getSchema().schema.chain.chain.values;
    expect(values.map((v: any) => ("copy" in v ? v.copy.chain.chain.initFunction.variableName : v.functionCall.name))).toEqual(["f", "g"]);
});

test("raw structure in init function throws", () => {
    const f = createTypeConverter("f");
    expect(() => createTypeConverter("c", f as any)).toThrow("wrap the structure with copy(...)");
});

test("cross-type copy throws", () => {
    const s = createStringFormatter("s").format("x");
    expect(() => createTypeConverter("c", copy(s))).toThrow("Cannot copy builder of structure 'string-formatter' into 'type-converter'");
});

test("copy source chain survives chaining on the target", () => {
    const f = createTypeConverter("f").label("custom");
    const b = createTypeConverter("c", copy(f)).numerify(42);
    const values = b.getSchema().schema.chain.chain.values;
    expect(callValue(copyValue(values[0]!).chain.chain.values[0]!).arguments[0]!.argument).toEqual({ string: { value: "custom" } });
    expect(callValue(values[1]!).name).toBe("numerify");
});

test("custom function returns its typescript body result", () => {
    expect((tc() as any).render("hello")).toBe("type-converter:hello");
});

test("custom function collision: each structure uses its own body", () => {
    expect((tc() as any).render("a")).toBe("type-converter:a");
    expect((createStringFormatter("s") as any).render("b")).toBe("string-formatter:b");
});

test("parse builds postgres sql with placeholders and params", () => {
    const c = qb();
    const result = c
        .select(c.col("id"))
        .from(c.table("users"))
        .where(c.col("active").eq(true))
        .limit(10)
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" WHERE "active" = $1 LIMIT 10',
        param: [true],
        sqlWithParam: 'SELECT "id" FROM "users" WHERE "active" = TRUE LIMIT 10',
    });
});

test("parse builds mysql sql with question-mark placeholders", () => {
    const c = qb();
    const result = c
        .select([c.col("id"), c.col("name")])
        .from(c.table("users"))
        .where(c.col("age").gte(18))
        .orderBy(c.col("name").desc())
        .setDialect("mysql")
        .parse();
    expect(result).toEqual({
        sql: "SELECT `id`, `name` FROM `users` WHERE `age` >= ? ORDER BY `name` DESC",
        param: [18],
        sqlWithParam: "SELECT `id`, `name` FROM `users` WHERE `age` >= 18 ORDER BY `name` DESC",
    });
});

test("parse requires setDialect before parse", () => {
    const c = qb();
    expect(() => c.select(c.col("id")).parse()).toThrow(/setDialect/);
});

test("parse rejects unsupported dialect", () => {
    const c = qb();
    expect(() => c.select(c.col("id")).setDialect("sqlite").parse()).toThrow(/unsupported dialect/);
});

test("parse builds nested and predicate", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2)])).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE ( "a" = $1 AND "b" = $2 )',
        param: [1, 2],
        sqlWithParam: 'SELECT "id" WHERE ( "a" = 1 AND "b" = 2 )',
    });
});

test("parse builds or with not predicate", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql").parse();
    expect(result).toEqual({
        sql: "SELECT `id` WHERE ( `a` = ? OR NOT ( `b` = ? ) )",
        param: [1, 2],
        sqlWithParam: "SELECT `id` WHERE ( `a` = 1 OR NOT ( `b` = 2 ) )",
    });
});

test("parse builds is null predicate without params", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.col("x").isNull(true)).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" IS NULL',
        param: [],
        sqlWithParam: 'SELECT "id" WHERE "x" IS NULL',
    });
});

test("parse builds in predicate", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" IN ( $1 )',
        param: ["1,2,3"],
        sqlWithParam: `SELECT "id" WHERE "x" IN ( '1,2,3' )`,
    });
});

test("parse builds between predicate", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" BETWEEN $1 AND $2',
        param: [1, 2],
        sqlWithParam: 'SELECT "id" WHERE "x" BETWEEN 1 AND 2',
    });
});

test("parse builds group by and multi-order", () => {
    const c = qb();
    const grouped = c.select(c.col("x")).from(c.table("t")).groupBy(c.col("x")).setDialect("postgres").parse();
    expect(grouped.sql).toBe('SELECT "x" FROM "t" GROUP BY "x"');

    const o = qb();
    const ordered = o
        .select(o.col("x"))
        .from(o.table("t"))
        .orderBy([o.col("name").asc(), o.col("age").desc()])
        .setDialect("mysql")
        .parse();
    expect(ordered.sql).toBe("SELECT `x` FROM `t` ORDER BY `name` ASC, `age` DESC");
});

test("parse numbers every placeholder in order", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2), c.col("c").eq(3)])).setDialect("mysql").parse();
    expect(result).toEqual({
        sql: "SELECT `id` WHERE ( `a` = ? AND `b` = ? AND `c` = ? )",
        param: [1, 2, 3],
        sqlWithParam: "SELECT `id` WHERE ( `a` = 1 AND `b` = 2 AND `c` = 3 )",
    });
});

test("parse with only a dialect yields empty sql", () => {
    const c = qb();
    expect(c.setDialect("postgres").parse()).toEqual({ sql: "", param: [], sqlWithParam: "" });
});

test("parse compares two columns without parameters", () => {
    const c = qb();
    const result = c.select(c.col("id")).from(c.table("users")).where(c.col("a").eq(c.col("b"))).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" WHERE "a" = "b"',
        param: [],
        sqlWithParam: 'SELECT "id" FROM "users" WHERE "a" = "b"',
    });
});

test("parse builds join on column equality", () => {
    const c = qb();
    const result = c
        .select(c.col("id"))
        .from(c.table("users"))
        .join(c.table("posts"), c.col("users.id").eq(c.col("posts.user_id")))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" JOIN "posts" ON "users.id" = "posts.user_id"',
        param: [],
        sqlWithParam: 'SELECT "id" FROM "users" JOIN "posts" ON "users.id" = "posts.user_id"',
    });
});

test("parse builds left join with mysql quoting", () => {
    const c = qb();
    const result = c
        .select(c.col("id"))
        .from(c.table("users"))
        .leftJoin(c.table("posts"), c.col("users.id").eq(c.col("posts.user_id")))
        .setDialect("mysql")
        .parse();
    expect(result.sql).toBe("SELECT `id` FROM `users` LEFT JOIN `posts` ON `users.id` = `posts.user_id`");
});

test("parse builds group by with having", () => {
    const c = qb();
    const result = c
        .select(c.col("x"))
        .from(c.table("t"))
        .groupBy(c.col("x"))
        .having(c.col("count").gt(1))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "x" FROM "t" GROUP BY "x" HAVING "count" > $1',
        param: [1],
        sqlWithParam: 'SELECT "x" FROM "t" GROUP BY "x" HAVING "count" > 1',
    });
});

test("parse supports column bounds in between", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.col("x").between(c.col("lo"), c.col("hi"))).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" BETWEEN "lo" AND "hi"',
        param: [],
        sqlWithParam: 'SELECT "id" WHERE "x" BETWEEN "lo" AND "hi"',
    });
});

test("literal string argument accepts matching value", () => {
    const arg = firstArg(qb().setDialect("postgres").getSchema());
    expect(arg.argument).toEqual({ string: { value: "postgres" } });
});

test("literal string argument rejects mismatched value", () => {
    expect(() => qb().setDialect("oracle")).toThrow("does not match any type in the union");
});

test("literal string struct rejects non-string", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "stringLiteral",
            [
                {
                    arg: 1,
                    struct: { literal: { value: "postgres", type: "string" } },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("string literal");
});

test("literal number argument accepts matching value", () => {
    const arg = firstArg(
        createSchema(
            tc().getSchema(),
            "numberLiteral",
            [
                {
                    arg: 5,
                    struct: { literal: { value: 5, type: "number" } },
                    provided: true,
                },
            ],
            false,
        ),
    );
    expect(arg.argument).toEqual({ number: { value: 5 } });
});

test("literal number argument rejects mismatched value", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "numberLiteral",
            [
                {
                    arg: 6,
                    struct: { literal: { value: 5, type: "number" } },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("number literal");
});

test("literal boolean argument accepts matching value", () => {
    const arg = firstArg(
        createSchema(
            tc().getSchema(),
            "booleanLiteral",
            [
                {
                    arg: true,
                    struct: { literal: { value: true, type: "boolean" } },
                    provided: true,
                },
            ],
            false,
        ),
    );
    expect(arg.argument).toEqual({ boolean: { value: true } });
});

test("literal boolean argument rejects mismatched value", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "booleanLiteral",
            [
                {
                    arg: false,
                    struct: { literal: { value: true, type: "boolean" } },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("boolean literal");
});
