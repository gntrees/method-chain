import { expect, test } from "bun:test";
import { queryBuilder } from "./gntrees-method-chain/typescript/index";
import { compileAndRun } from "./compile-helper";
import { cParseProgram, parseC, type ParseOutput } from "./parse-c-result";

type Case = {
    name: string;
    query: (c: any) => any;
    cArgs: string;
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
];

for (const { name, query, cArgs } of cases) {
    test(`differential TS<->C: ${name}`, () => {
        const c = queryBuilder("q") as any;
        const expected: ParseOutput = query(c).parse();
        const runner = cParseProgram(`Builder qb = queryBuilder(variableName("q"), ${cArgs});`);
        const { status, stderr, stdout } = compileAndRun(runner);
        expect(stderr).not.toContain("validate:");
        expect(status).toBe(0);
        expect(parseC(stdout)).toEqual(expected);
    }, 60000);
}
