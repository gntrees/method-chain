import { expect, test } from "bun:test";
import { queryBuilder } from "./gntrees-method-chain/typescript/index";
import { compileAndRun } from "./compile-helper";

type Param = string | number | boolean | null;
type ParseOutput = { sql: string; sqlWithParam: string; param: Param[] };

const printer = `
#include "gntrees-method-chain.h"
#include <stdio.h>
static void print_parse(ParseResult r) {
    printf("SQL:%s\\n", r.sql);
    printf("WSQL:%s\\n", r.sqlWithParam);
    for (size_t i = 0; i < r.paramCount; i++) {
        ParseParam *p = &r.param[i];
        switch (p->type) {
            case PARSE_STRING: printf("PARAM:S:%s\\n", p->value.s); break;
            case PARSE_NUMBER: printf("PARAM:N:%g\\n", p->value.n); break;
            case PARSE_BOOL: printf("PARAM:B:%d\\n", p->value.b); break;
            case PARSE_NULL: printf("PARAM:Z:\\n"); break;
        }
    }
}
int main(void) {
    Builder qb = queryBuilder(variableName("q"), %C_ARGS%);
    ParseResult r = parse(qb);
    print_parse(r);
    lt_free_value((ArgumentValue){0});
    lt_shutdown();
    return 0;
}
`;

function parseC(stdout: string): ParseOutput {
    const out: ParseOutput = { sql: "", sqlWithParam: "", param: [] };
    for (const line of stdout.split("\n")) {
        if (line.startsWith("SQL:")) {
            out.sql = line.slice("SQL:".length);
        } else if (line.startsWith("WSQL:")) {
            out.sqlWithParam = line.slice("WSQL:".length);
        } else if (line.startsWith("PARAM:")) {
            const body = line.slice("PARAM:".length);
            const type = body.slice(0, 1);
            const value = body.slice(2);
            if (type === "S") out.param.push(value);
            else if (type === "N") out.param.push(Number(value));
            else if (type === "B") out.param.push(value === "1");
            else out.param.push(null);
        }
    }
    return out;
}

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
];

for (const { name, query, cArgs } of cases) {
    test(`differential TS<->C: ${name}`, () => {
        const c = queryBuilder("q") as any;
        const expected: ParseOutput = query(c).parse();
        const runner = printer.replace("%C_ARGS%", cArgs);
        const { status, stderr, stdout } = compileAndRun(runner);
        expect(stderr).not.toContain("validate:");
        expect(status).toBe(0);
        expect(parseC(stdout)).toEqual(expected);
    }, 60000);
}
