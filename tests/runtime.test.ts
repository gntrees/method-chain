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

test("array of union items accepts mixed types", () => {
    const schema = createSchema(
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
    );
    const value = schema.schema.chain.chain.values.at(-1)!;
    expect(value).toEqual({
        functionCall: {
            name: "mixed",
            arguments: [
                { argument: { array: { value: [{ string: { value: "a" } }, { number: { value: 1 } }] } }, default: null },
            ],
            isTemplateLiteral: false,
        },
    });
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
        sql: 'SELECT "id" FROM "users" WHERE "active" = $1 LIMIT $2',
        param: [true, 10],
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
    const result = c.select(c.col("id")).where(c.col("x").isNull()).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" IS NULL',
        param: [],
        sqlWithParam: 'SELECT "id" WHERE "x" IS NULL',
    });
});

test("parse builds is not null for isNotNull", () => {
    const c = qb();
    const result = c.select(c.col("id")).where(c.col("x").isNotNull()).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" WHERE "x" IS NOT NULL',
        param: [],
        sqlWithParam: 'SELECT "id" WHERE "x" IS NOT NULL',
    });
});

test("parse binds limit and offset as params", () => {
    const c = qb();
    const result = c.select(c.col("id")).from(c.table("t")).limit(10).offset(2).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "t" LIMIT $1 OFFSET $2',
        param: [10, 2],
        sqlWithParam: 'SELECT "id" FROM "t" LIMIT 10 OFFSET 2',
    });
});

test("parse handles many parameters", () => {
    const c = qb();
    let chain: any = c.select(c.col("id")).from(c.table("t")).where(c.col("a0").eq(0));
    for (let i = 1; i < 256; i++) {
        chain = chain.where(c.col(`a${i}`).eq(i));
    }
    const result = chain.setDialect("postgres").parse();
    expect(result.param).toHaveLength(256);
    expect(result.param[255]).toBe(255);
    expect(result.sql.endsWith("$256")).toBe(true);
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

test("parse aliases select columns", () => {
    const c = qb();
    const result = c.select(c.col("x").as("alias")).from(c.table("t")).setDialect("postgres").parse();
    expect(result.sql).toBe('SELECT "x" AS "alias" FROM "t"');
});

test("parse aliases from and join tables", () => {
    const c = qb();
    const result = c
        .select(c.col("id"))
        .from(c.table("users").as("u"))
        .join(c.table("posts").as("p"), c.col("u.id").eq(c.col("p.uid")))
        .setDialect("postgres")
        .parse();
    expect(result.sql).toBe('SELECT "id" FROM "users" AS "u" JOIN "posts" AS "p" ON "u.id" = "p.uid"');
});

test("parse renders generic operator with literal and column", () => {
    const literal = qb();
    expect(literal.select(literal.col("id")).where(literal.col("a").op("~", "x")).setDialect("postgres").parse()).toEqual({
        sql: 'SELECT "id" WHERE "a" ~ $1',
        param: ["x"],
        sqlWithParam: `SELECT "id" WHERE "a" ~ 'x'`,
    });

    const column = qb();
    expect(column.select(column.col("id")).where(column.col("a").op("~", column.col("b"))).setDialect("mysql").parse().sql).toBe(
        "SELECT `id` WHERE `a` ~ `b`"
    );
});

test("parse builds a single CTE", () => {
    const c = qb();
    const sub = c.select(c.col("id")).from(c.table("users"));
    const result = c.with(sub, "cte").select(c.col("id")).from(c.table("cte")).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'WITH "cte" AS (SELECT "id" FROM "users") SELECT "id" FROM "cte"',
        param: [],
        sqlWithParam: 'WITH "cte" AS (SELECT "id" FROM "users") SELECT "id" FROM "cte"',
    });
});

test("parse numbers CTE parameters before outer parameters", () => {
    const c = qb();
    const sub = c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true));
    const result = c
        .with(sub, "cte")
        .select(c.col("id"))
        .from(c.table("cte"))
        .where(c.col("id").gt(5))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'WITH "cte" AS (SELECT "id" FROM "users" WHERE "active" = $1) SELECT "id" FROM "cte" WHERE "id" > $2',
        param: [true, 5],
        sqlWithParam: 'WITH "cte" AS (SELECT "id" FROM "users" WHERE "active" = TRUE) SELECT "id" FROM "cte" WHERE "id" > 5',
    });
});

test("parse joins multiple CTEs with commas", () => {
    const c = qb();
    const first = c.select(c.col("id")).from(c.table("users"));
    const second = c.select(c.col("x")).from(c.table("b"));
    const result = c.with(first, "a").with(second, "b").select(c.col("x")).from(c.table("a")).setDialect("mysql").parse();
    expect(result.sql).toBe("WITH `a` AS (SELECT `id` FROM `users`), `b` AS (SELECT `x` FROM `b`) SELECT `x` FROM `a`");
});

test("parse appends returning clause", () => {
    const c = qb();
    const result = c.select(c.col("id")).from(c.table("t")).returning(c.col("id")).setDialect("postgres").parse();
    expect(result.sql).toBe('SELECT "id" FROM "t" RETURNING "id"');
});

test("parse builds update with map assignments", () => {
    const c = qb();
    const result = c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'UPDATE "users" SET "name" = $1, "age" = $2',
        param: ["bob", 3],
        sqlWithParam: `UPDATE "users" SET "name" = 'bob', "age" = 3`,
    });
});

test("parse builds insert from a map", () => {
    const c = qb();
    const result = c.insert(c.table("users"), { name: "bob" }).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'INSERT INTO "users" ( "name" ) VALUES ( $1 )',
        param: ["bob"],
        sqlWithParam: `INSERT INTO "users" ( "name" ) VALUES ( 'bob' )`,
    });
});

test("parse builds delete", () => {
    const c = qb();
    expect(c.delete(c.table("users")).setDialect("postgres").parse().sql).toBe('DELETE FROM "users"');
});

test("parse builds standalone set", () => {
    const c = qb();
    expect(c.set({ name: "bob" }).setDialect("postgres").parse().sql).toBe('SET "name" = $1');
});

test("parse builds values tuples", () => {
    const c = qb();
    const result = c.values([["a", "b"], ["c", "d"]]).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: "VALUES ( $1, $2 ), ( $3, $4 )",
        param: ["a", "b", "c", "d"],
        sqlWithParam: "VALUES ( 'a', 'b' ), ( 'c', 'd' )",
    });
});

test("parse builds values tuples with mixed row types", () => {
    const c = qb();
    const result = c.values([["a", 1], ["b", 2]]).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: "VALUES ( $1, $2 ), ( $3, $4 )",
        param: ["a", 1, "b", 2],
        sqlWithParam: "VALUES ( 'a', 1 ), ( 'b', 2 )",
    });
});

test("parse builds conflict clauses", () => {
    const nothing = qb();
    expect(
        nothing.insert(nothing.table("t"), { name: "x" }).onConflictDoNothing(nothing.col("id")).setDialect("postgres").parse().sql
    ).toBe('INSERT INTO "t" ( "name" ) VALUES ( $1 ) ON CONFLICT ("id") DO NOTHING');

    const update = qb();
    expect(
        update
            .insert(update.table("t"), { name: "x" })
            .onConflictDoUpdate(update.col("id"), { name: "y" })
            .setDialect("postgres")
            .parse()
            .sql
    ).toBe('INSERT INTO "t" ( "name" ) VALUES ( $1 ) ON CONFLICT ("id") DO UPDATE SET "name" = $2');
});

test("parse builds update with subquery assignment", () => {
    const c = qb();
    const result = c.update(c.table("t"), { x: c.select(c.col("id")).from(c.table("b")) }).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'UPDATE "t" SET "x" = (SELECT "id" FROM "b")',
        param: [],
        sqlWithParam: 'UPDATE "t" SET "x" = (SELECT "id" FROM "b")',
    });
});

test("parse builds insert with subquery value", () => {
    const c = qb();
    const result = c.insert(c.table("t"), { x: c.select(c.col("id")).from(c.table("b")) }).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'INSERT INTO "t" ( "x" ) VALUES ( (SELECT "id" FROM "b") )',
        param: [],
        sqlWithParam: 'INSERT INTO "t" ( "x" ) VALUES ( (SELECT "id" FROM "b") )',
    });
});

test("parse builds values with subquery element", () => {
    const c = qb();
    const result = c.values([[c.select(c.col("id")).from(c.table("b")), 1]]).setDialect("postgres").parse();
    expect(result).toEqual({
        sql: 'VALUES ( (SELECT "id" FROM "b"), $1 )',
        param: [1],
        sqlWithParam: 'VALUES ( (SELECT "id" FROM "b"), 1 )',
    });
});

test("parse builds on conflict update with subquery assignment", () => {
    const c = qb();
    const result = c.insert(c.table("t"), { name: "x" })
        .onConflictDoUpdate(c.col("id"), { name: c.select(c.col("n")).from(c.table("b")) })
        .setDialect("mysql")
        .parse();
    expect(result).toEqual({
        sql: "INSERT INTO `t` ( `name` ) VALUES ( ? ) ON CONFLICT (`id`) DO UPDATE SET `name` = (SELECT `n` FROM `b`)",
        param: ["x"],
        sqlWithParam: "INSERT INTO `t` ( `name` ) VALUES ( 'x' ) ON CONFLICT (`id`) DO UPDATE SET `name` = (SELECT `n` FROM `b`)",
    });
});

test("parse renders raw template literals", () => {
    const c = qb();
    const identifiers = c.raw`SELECT ${c.col("id")} FROM ${c.table("t")}`.setDialect("mysql").parse();
    expect(identifiers).toEqual({
        sql: "SELECT `id` FROM `t`",
        param: [],
        sqlWithParam: "SELECT `id` FROM `t`",
    });

    const literal = qb();
    expect(literal.where(literal.raw`x = ${5}`).setDialect("postgres").parse()).toEqual({
        sql: "WHERE x = $1",
        param: [5],
        sqlWithParam: "WHERE x = 5",
    });
});

test("parse builds exists subquery", () => {
    const c = qb();
    const result = c.select(c.col("id"))
        .from(c.table("users"))
        .where(c.exists(c.select(c.col("id")).from(c.table("posts")).where(c.col("posts.user_id").eq(c.col("users.id")))))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" WHERE EXISTS (SELECT "id" FROM "posts" WHERE "posts.user_id" = "users.id")',
        param: [],
        sqlWithParam: 'SELECT "id" FROM "users" WHERE EXISTS (SELECT "id" FROM "posts" WHERE "posts.user_id" = "users.id")',
    });
});

test("parse allows exists without a subquery", () => {
    const c = qb();
    expect(c.select(c.col("id")).where(c.exists(c.col("x"))).setDialect("postgres").parse()).toEqual({
        sql: 'SELECT "id" WHERE EXISTS "x"',
        param: [],
        sqlWithParam: 'SELECT "id" WHERE EXISTS "x"',
    });
});

test("parse builds transaction block", () => {
    const c = qb();
    const chained = c.transaction(c.insert(c.table("t"), { a: 1 })).setDialect("postgres").parse();
    expect(chained).toEqual({
        sql: 'BEGIN INSERT INTO "t" ( "a" ) VALUES ( $1 ) COMMIT',
        param: [1],
        sqlWithParam: 'BEGIN INSERT INTO "t" ( "a" ) VALUES ( 1 ) COMMIT',
    });

    const batch = qb();
    const array = batch.transaction([batch.insert(batch.table("t"), { a: 1 }), batch.insert(batch.table("u"), { b: 2 })]).setDialect("postgres").parse();
    expect(array).toEqual({
        sql: 'BEGIN INSERT INTO "t" ( "a" ) VALUES ( $1 ); INSERT INTO "u" ( "b" ) VALUES ( $2 ) COMMIT',
        param: [1, 2],
        sqlWithParam: 'BEGIN INSERT INTO "t" ( "a" ) VALUES ( 1 ); INSERT INTO "u" ( "b" ) VALUES ( 2 ) COMMIT',
    });

    const raw = qb();
    expect(raw.transaction("UPDATE t SET a=1").setDialect("postgres").parse().sql).toBe("BEGIN UPDATE t SET a=1 COMMIT");
});

test("parse leaves SQL responsibility to the caller", () => {
    const dup = qb();
    expect(dup.select(dup.col("id")).where(dup.col("x").eq(1)).where(dup.col("y").eq(2)).setDialect("postgres").parse().sql).toBe(
        'SELECT "id" WHERE "x" = $1 WHERE "y" = $2'
    );

    const empty = qb();
    expect(empty.select(empty.col("id")).where(empty.and([])).setDialect("postgres").parse().sql).toBe('SELECT "id" WHERE ( )');

    const emptyValues = qb();
    expect(emptyValues.values([]).setDialect("postgres").parse().sql).toBe("VALUES ( )");
});

test("parse builds in subquery", () => {
    const c = qb();
    const result = c.select(c.col("id"))
        .from(c.table("users"))
        .where(c.col("id").in(c.select(c.col("uid")).from(c.table("members"))))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" WHERE "id" IN (SELECT "uid" FROM "members")',
        param: [],
        sqlWithParam: 'SELECT "id" FROM "users" WHERE "id" IN (SELECT "uid" FROM "members")',
    });
});

test("parse builds scalar subquery with alias", () => {
    const c = qb();
    const result = c.select(c.select(c.col("cnt")).from(c.table("t")).as("c"))
        .from(c.table("u"))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT (SELECT "cnt" FROM "t") AS "c" FROM "u"',
        param: [],
        sqlWithParam: 'SELECT (SELECT "cnt" FROM "t") AS "c" FROM "u"',
    });
});

test("parse builds from subquery with alias", () => {
    const c = qb();
    const result = c.select(c.col("id"))
        .from(c.select(c.col("id")).from(c.table("users")).as("u"))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM (SELECT "id" FROM "users") AS "u"',
        param: [],
        sqlWithParam: 'SELECT "id" FROM (SELECT "id" FROM "users") AS "u"',
    });
});

test("parse numbers subquery parameters before outer parameters", () => {
    const c = qb();
    const result = c.select(c.col("id"))
        .from(c.table("users"))
        .where(c.exists(c.select(c.col("id")).from(c.table("orders")).where(c.col("total").gt(100))))
        .where(c.col("active").eq(true))
        .setDialect("postgres")
        .parse();
    expect(result).toEqual({
        sql: 'SELECT "id" FROM "users" WHERE EXISTS (SELECT "id" FROM "orders" WHERE "total" > $1) WHERE "active" = $2',
        param: [100, true],
        sqlWithParam: 'SELECT "id" FROM "users" WHERE EXISTS (SELECT "id" FROM "orders" WHERE "total" > 100) WHERE "active" = TRUE',
    });
});

test("parse builds nested subquery with mysql quoting", () => {
    const c = qb();
    const result = c.select(c.col("id"))
        .where(c.col("id").in(
            c.select(c.col("uid")).from(c.table("m")).where(
                c.col("uid").in(c.select(c.col("id")).from(c.table("b")).where(c.col("ok").eq(true))),
            ),
        ))
        .setDialect("mysql")
        .parse();
    expect(result).toEqual({
        sql: "SELECT `id` WHERE `id` IN (SELECT `uid` FROM `m` WHERE `uid` IN (SELECT `id` FROM `b` WHERE `ok` = ?))",
        param: [true],
        sqlWithParam: "SELECT `id` WHERE `id` IN (SELECT `uid` FROM `m` WHERE `uid` IN (SELECT `id` FROM `b` WHERE `ok` = TRUE))",
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
