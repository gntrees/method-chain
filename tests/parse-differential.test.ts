import { expect, test } from "bun:test";
import { queryBuilder } from "./gntrees-method-chain/typescript/index";
import { compileAndRun } from "./compile-helper";
import { cParseProgram, parseC, type ParseOutput } from "./parse-c-result";

type Case = {
    name: string;
    query: (c: any) => any;
    cArgs: string;
    cSetup?: string;
};

const cases: Case[] = [
    {
        name: "postgres select from where limit",
        query: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)).limit(10).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        from(table(v_string("users"))),
        where(chain(col(v_string("active")), eq(v_bool(1)))),
        limit(v_int(10))`,
    },
    {
        name: "mysql multi-column with order desc",
        query: (c) => c.select([c.col("id"), c.col("name")]).from(c.table("users")).where(c.col("age").gte(18)).orderBy(c.col("name").desc()).setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(arr(col(v_string("id")), col(v_string("name")))),
        from(table(v_string("users"))),
        where(chain(col(v_string("age")), gte(v_int(18)))),
        orderBy(chain(col(v_string("name")), desc()))`,
    },
    {
        name: "nested and with gte",
        query: (c) => c.select(c.col("id")).from(c.table("users")).where(c.and([c.col("age").gte(18), c.col("active").eq(true)])).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        from(table(v_string("users"))),
        where(chain(and(arr(
            chain(col(v_string("age")), gte(v_int(18))),
            chain(col(v_string("active")), eq(v_bool(1)))))))`,
    },
    {
        name: "nested or with not",
        query: (c) => c.select(c.col("id")).from(c.table("users")).where(c.or([c.col("a").eq(1), c.not(c.col("b").eq(2))])).setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(col(v_string("id"))),
        from(table(v_string("users"))),
        where(chain(or(arr(
            chain(col(v_string("a")), eq(v_int(1))),
            not(chain(col(v_string("b")), eq(v_int(2))))))))`,
    },
    {
        name: "between",
        query: (c) => c.select(c.col("id")).where(c.col("x").between(1, 2)).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        where(chain(col(v_string("x")), between(v_int(1), v_int(2))))`,
    },
    {
        name: "is null",
        query: (c) => c.select(c.col("id")).where(c.col("x").isNull(true)).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        where(chain(col(v_string("x")), isNull(v_bool(1))))`,
    },
    {
        name: "is not null",
        query: (c) => c.select(c.col("id")).where(c.col("x").isNull(false)).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        where(chain(col(v_string("x")), isNull(v_bool(0))))`,
    },
    {
        name: "in with literal list",
        query: (c) => c.select(c.col("id")).where(c.col("x").in("1,2,3")).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        where(chain(col(v_string("x")), in(v_string("1,2,3"))))`,
    },
    {
        name: "group by",
        query: (c) => c.select(c.col("x")).from(c.table("t")).groupBy(c.col("x")).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("x"))),
        from(table(v_string("t"))),
        groupBy(col(v_string("x")))`,
    },
    {
        name: "order by multiple directions",
        query: (c) => c.select(c.col("x")).from(c.table("t")).orderBy([c.col("name").asc(), c.col("age").desc()]).setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(col(v_string("x"))),
        from(table(v_string("t"))),
        orderBy(arr(chain(col(v_string("name")), asc()), chain(col(v_string("age")), desc())))`,
    },
    {
        name: "limit and offset",
        query: (c) => c.select(c.col("id")).from(c.table("t")).limit(5).offset(10).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        from(table(v_string("t"))),
        limit(v_int(5)),
        offset(v_int(10))`,
    },
    {
        name: "three placeholders in and",
        query: (c) => c.select(c.col("id")).where(c.and([c.col("a").eq(1), c.col("b").eq(2), c.col("c").eq(3)])).setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(col(v_string("id"))),
        where(chain(and(arr(
            chain(col(v_string("a")), eq(v_int(1))),
            chain(col(v_string("b")), eq(v_int(2))),
            chain(col(v_string("c")), eq(v_int(3)))))))`,
    },
    {
        name: "postgres column comparison",
        query: (c) => c.select(c.col("id")).from(c.table("users")).where(c.col("a").eq(c.col("b"))).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        from(table(v_string("users"))),
        where(chain(col(v_string("a")), eq(chain(col(v_string("b"))))))`,
    },
    {
        name: "postgres join on column equality",
        query: (c) => c.select(c.col("id")).from(c.table("users")).join(c.table("posts"), c.col("users.id").eq(c.col("posts.user_id"))).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        from(table(v_string("users"))),
        join(table(v_string("posts")), chain(col(v_string("users.id")), eq(chain(col(v_string("posts.user_id"))))))`,
    },
    {
        name: "mysql left join",
        query: (c) => c.select(c.col("id")).from(c.table("users")).leftJoin(c.table("posts"), c.col("users.id").eq(c.col("posts.user_id"))).setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(col(v_string("id"))),
        from(table(v_string("users"))),
        leftJoin(table(v_string("posts")), chain(col(v_string("users.id")), eq(chain(col(v_string("posts.user_id"))))))`,
    },
    {
        name: "postgres group by having",
        query: (c) => c.select(c.col("x")).from(c.table("t")).groupBy(c.col("x")).having(c.col("count").gt(1)).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("x"))),
        from(table(v_string("t"))),
        groupBy(col(v_string("x"))),
        having(chain(col(v_string("count")), gt(v_int(1))))`,
    },
    {
        name: "postgres between with column bounds",
        query: (c) => c.select(c.col("id")).where(c.col("x").between(c.col("lo"), c.col("hi"))).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        where(chain(col(v_string("x")), between(chain(col(v_string("lo"))), chain(col(v_string("hi"))))))`,
    },
    {
        name: "postgres aliased columns and tables",
        query: (c) =>
            c.select(c.col("x").as("alias"))
                .from(c.table("users").as("u"))
                .join(c.table("posts").as("p"), c.col("u.id").eq(c.col("p.uid")))
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(chain(col(v_string("x")), as(v_string("alias")))),
        from(chain(table(v_string("users")), as(v_string("u")))),
        join(chain(table(v_string("posts")), as(v_string("p"))), chain(col(v_string("u.id")), eq(chain(col(v_string("p.uid"))))))`,
    },
    {
        name: "postgres generic operator",
        query: (c) => c.select(c.col("id")).where(c.col("a").op("~", "x")).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        where(chain(col(v_string("a")), op(v_string("~"), v_string("x"))))`,
    },
    {
        name: "postgres single CTE",
        query: (c) =>
            c.with(c.select(c.col("id")).from(c.table("users")), "cte")
                .select(c.col("id"))
                .from(c.table("cte"))
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        with(chain(select(col(v_string("id"))), from(table(v_string("users")))), v_string("cte")),
        select(col(v_string("id"))),
        from(table(v_string("cte")))`,
    },
    {
        name: "postgres CTE parameters precede outer parameters",
        query: (c) =>
            c.with(c.select(c.col("id")).from(c.table("users")).where(c.col("active").eq(true)), "cte")
                .select(c.col("id"))
                .from(c.table("cte"))
                .where(c.col("id").gt(5))
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        with(chain(select(col(v_string("id"))), from(table(v_string("users"))), where(chain(col(v_string("active")), eq(v_bool(1))))), v_string("cte")),
        select(col(v_string("id"))),
        from(table(v_string("cte"))),
        where(chain(col(v_string("id")), gt(v_int(5))))`,
    },
    {
        name: "postgres returning clause",
        query: (c) => c.select(c.col("id")).from(c.table("t")).returning(c.col("id")).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        from(table(v_string("t"))),
        returning(col(v_string("id")))`,
    },
    {
        name: "postgres update with map",
        query: (c) => c.update(c.table("users"), { name: "bob", age: 3 }).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        update(table(v_string("users")), map(entry("name", "bob"), entry("age", v_int(3))))`,
    },
    {
        name: "postgres insert from map",
        query: (c) => c.insert(c.table("users"), { name: "bob" }).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        insert(table(v_string("users")), map(entry("name", "bob")))`,
    },
    {
        name: "postgres delete",
        query: (c) => c.delete(c.table("users")).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        delete(table(v_string("users")))`,
    },
    {
        name: "postgres values tuples",
        query: (c) => c.values([["a", "b"], ["c", "d"]]).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        values(arr(arr(v_string("a"), v_string("b")), arr(v_string("c"), v_string("d"))))`,
    },
    {
        name: "postgres values tuples with mixed types",
        query: (c) => c.values([["a", 1], ["b", 2]]).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        values(arr(arr(v_string("a"), v_int(1)), arr(v_string("b"), v_int(2))))`,
    },
    {
        name: "postgres on conflict do update",
        query: (c) =>
            c.insert(c.table("t"), { name: "x" })
                .onConflictDoUpdate(c.col("id"), { name: "y" })
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        insert(table(v_string("t")), map(entry("name", v_string("x")))),
        onConflictDoUpdate(col(v_string("id")), map(entry("name", v_string("y"))))`,
    },
    {
        name: "mysql raw template literal",
        query: (c) => c.raw`SELECT ${c.col("id")} FROM ${c.table("t")}`.setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        raw("SELECT ", col(v_string("id")), " FROM ", table(v_string("t")))`,
    },
    {
        name: "postgres exists subquery",
        query: (c) =>
            c.select(c.col("id"))
                .from(c.table("users"))
                .where(c.exists(c.select(c.col("id")).from(c.table("posts")).where(c.col("posts.user_id").eq(c.col("users.id")))))
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        from(table(v_string("users"))),
        where(chain(exists(chain(select(col(v_string("id"))), from(table(v_string("posts"))), where(chain(col(v_string("posts.user_id")), eq(chain(col(v_string("users.id"))))))))))`,
    },
    {
        name: "postgres in subquery",
        query: (c) =>
            c.select(c.col("id"))
                .from(c.table("users"))
                .where(c.col("id").in(c.select(c.col("uid")).from(c.table("members"))))
                .setDialect("postgres"),
        cSetup: `Builder inSub = chain(select(col(v_string("uid"))), from(table(v_string("members"))));`,
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        from(table(v_string("users"))),
        where(chain(col(v_string("id")), in(inSub)))`,
    },
    {
        name: "postgres scalar subquery with alias",
        query: (c) =>
            c.select(c.select(c.col("cnt")).from(c.table("t")).as("c"))
                .from(c.table("u"))
                .setDialect("postgres"),
        cSetup: `Builder scalarSub = chain(select(col(v_string("cnt"))), from(table(v_string("t"))), as(v_string("c")));`,
        cArgs: `setDialect("postgres"),
        select(scalarSub),
        from(table(v_string("u")))`,
    },
    {
        name: "postgres from subquery with alias",
        query: (c) =>
            c.select(c.col("id"))
                .from(c.select(c.col("id")).from(c.table("users")).as("u"))
                .setDialect("postgres"),
        cSetup: `Builder fromSub = chain(select(col(v_string("id"))), from(table(v_string("users"))), as(v_string("u")));`,
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        from(fromSub)`,
    },
    {
        name: "postgres exists subquery parameter order",
        query: (c) =>
            c.select(c.col("id"))
                .from(c.table("users"))
                .where(c.exists(c.select(c.col("id")).from(c.table("orders")).where(c.col("total").gt(100))))
                .where(c.col("active").eq(true))
                .setDialect("postgres"),
        cSetup: `Builder orderSub = chain(select(col(v_string("id"))), from(table(v_string("orders"))), where(chain(col(v_string("total")), gt(v_int(100)))));`,
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        from(table(v_string("users"))),
        where(chain(exists(orderSub))),
        where(chain(col(v_string("active")), eq(v_bool(1))))`,
    },
    {
        name: "mysql nested subquery",
        query: (c) =>
            c.select(c.col("id"))
                .where(c.col("id").in(
                    c.select(c.col("uid")).from(c.table("m")).where(
                        c.col("uid").in(c.select(c.col("id")).from(c.table("b")).where(c.col("ok").eq(true))),
                    ),
                ))
                .setDialect("mysql"),
        cArgs: `setDialect("mysql"),
        select(col(v_string("id"))),
        where(chain(col(v_string("id")), in(chain(select(col(v_string("uid"))), from(table(v_string("m"))), where(chain(col(v_string("uid")), in(chain(select(col(v_string("id"))), from(table(v_string("b"))), where(chain(col(v_string("ok")), eq(v_bool(1))))))))))))`,
    },
    {
        name: "postgres update set subquery",
        query: (c) =>
            c.update(c.table("t"), { x: c.select(c.col("id")).from(c.table("b")) })
                .setDialect("postgres"),
        cSetup: `Builder setSub = chain(select(col(v_string("id"))), from(table(v_string("b"))));`,
        cArgs: `setDialect("postgres"),
        update(table(v_string("t")), map(entry("x", setSub)))`,
    },
    {
        name: "postgres insert subquery value",
        query: (c) =>
            c.insert(c.table("t"), { x: c.select(c.col("id")).from(c.table("b")) })
                .setDialect("postgres"),
        cSetup: `Builder insSub = chain(select(col(v_string("id"))), from(table(v_string("b"))));`,
        cArgs: `setDialect("postgres"),
        insert(table(v_string("t")), map(entry("x", insSub)))`,
    },
    {
        name: "postgres values with subquery element",
        query: (c) =>
            c.values([[c.select(c.col("id")).from(c.table("b")), 1]])
                .setDialect("postgres"),
        cSetup: `Builder valSub = chain(select(col(v_string("id"))), from(table(v_string("b"))));`,
        cArgs: `setDialect("postgres"),
        values(arr(arr(valSub, v_int(1))))`,
    },
    {
        name: "postgres exists without subquery",
        query: (c) => c.select(c.col("id")).where(c.exists(c.col("x"))).setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        select(col(v_string("id"))),
        where(chain(exists(col(v_string("x")))))`,
    },
    {
        name: "postgres transaction block",
        query: (c) =>
            c.transaction([c.insert(c.table("t"), { a: 1 }), c.insert(c.table("u"), { b: 2 })])
                .setDialect("postgres"),
        cArgs: `setDialect("postgres"),
        transaction(arr(insert(table(v_string("t")), map(entry("a", v_int(1)))), insert(table(v_string("u")), map(entry("b", v_int(2))))))`,
    },
];

for (const { name, query, cArgs, cSetup } of cases) {
    test(`differential TS<->C: ${name}`, () => {
        const c = queryBuilder("q") as any;
        const expected: ParseOutput = query(c).parse();
        const setup = cSetup ? `${cSetup}\n    ` : "";
        const runner = cParseProgram(`${setup}Builder qb = queryBuilder(variableName("q"), ${cArgs});`);
        const { status, stderr, stdout } = compileAndRun(runner);
        expect(stderr).not.toContain("validate:");
        expect(status).toBe(0);
        expect(parseC(stdout)).toEqual(expected);
    }, 60000);
}
