export type Param = string | number | boolean | null;
export type ParseOutput = { sql: string; sqlWithParam: string; param: Param[] };

const printer = `
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
`;

/**
 * Bangun program C yang mendeklarasikan `Builder qb` lewat `body`, memanggil
 * `parse(qb)`, lalu mencetak hasilnya dalam format yang bisa dibaca `parseC`.
 */
export function cParseProgram(body: string, prefix = ""): string {
    return `#include "gntrees-method-chain.h"
${prefix}${printer}
int main(void) {
    ${body}
    ParseResult r = parse(qb);
    print_parse(r);
    lt_free_value((ArgumentValue){0});
    lt_shutdown();
    return 0;
}
`;
}

export function parseC(stdout: string): ParseOutput {
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
