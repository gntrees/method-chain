import { linguaTungga } from "../core/lingua-tungga/lingua-tungga/typescript/index";

type LT = any;

const lt = (): LT => linguaTungga();
const ref = (name: string): LT => lt().variableForCounter(name);
const member = (value: unknown, path: string): LT => lt().member(value as never, path);
const objGet = (value: unknown, key: unknown): LT => lt().objectGet(value as never, key as never);
const arrGet = (value: unknown, index: unknown): LT => lt().arrayGet(value as never, index as never);
const arrLen = (value: unknown): LT => lt().arrayLength(value as never);
const argAt = (node: unknown, index: number): LT =>
    objGet(arrGet(member(node, "functionCall.arguments"), index), "argument");
const objHas = (value: unknown, key: unknown): LT => lt().truthy(lt().objectHas(value as never, key as never));
const strCat = (a: unknown, b: unknown): LT => lt().stringConcat(a as never, b as never);
const strLower = (a: unknown): LT => lt().stringLower(a as never);
const strUpper = (a: unknown): LT => lt().stringUpper(a as never);
const strReplace = (a: unknown, search: unknown, replacement: unknown): LT =>
    lt().stringReplace(a as never, search as never, replacement as never);
const strOf = (a: unknown): LT => lt().stringOf(a as never);
const valEq = (a: unknown, b: unknown): LT => lt().valueEqual(a as never, b as never);
const valNeq = (a: unknown, b: unknown): LT => lt().valueNotEqual(a as never, b as never);
const truthy = (a: unknown): LT => lt().truthy(a as never);
const callExpr = (name: string, args: unknown[] = []): LT => lt().callFunction(name, args as never);
const callStmt = (chain: LT, name: string, args: unknown[] = []): LT =>
    chain.addCallFunction(name, args as never);
const localFn = (chain: LT, name: string, params: string[], build: () => LT): LT =>
    chain.localFunction(name, params, build());

const NULL_EXPR = () => lt().addValue(null);

const cPreamble = String.raw`
  ArgumentValue qb_wrap(const char *tag, ArgumentValue inner) {
    MapEntry *m = lt_alloc(sizeof(MapEntry));
    m[0].key = tag;
    m[0].value = inner;
    return (ArgumentValue){ .type = D_MAP, .count = 1, .as.data = m };
  }
  ArgumentValue qb_node(int isChain, const void *p) {
    if (isChain) {
      const ChainType *c = (const ChainType *)p;
      ArgumentValue *values = 0;
      if (c->valueCount) {
        values = lt_alloc(c->valueCount * sizeof(ArgumentValue));
        for (size_t i = 0; i < c->valueCount; i++) {
          const ChainValue *cv = &c->values[i];
          if (cv->kind == V_FUNCTION_CALL) {
            const FunctionCallType *fc = &cv->as.functionCall;
            MapEntry *fcEntries = lt_alloc(2 * sizeof(MapEntry));
            fcEntries[0].key = "name";
            fcEntries[0].value = v_string(fc->name ? fc->name : "");
            ArgumentValue *args = 0;
            if (fc->argumentCount) {
              args = lt_alloc(fc->argumentCount * sizeof(ArgumentValue));
              for (size_t j = 0; j < fc->argumentCount; j++) {
                const ArgumentType *at = &fc->arguments[j];
                MapEntry *aEntries = lt_alloc(2 * sizeof(MapEntry));
                aEntries[0].key = "argument";
                aEntries[0].value = qb_node(0, &at->argument);
                aEntries[1].key = "default";
                aEntries[1].value = at->hasDefault ? qb_node(0, &at->def) : qb_wrap("null", qb_wrap("value", v_null()));
                args[j] = (ArgumentValue){ .type = D_MAP, .count = 2, .as.data = aEntries };
              }
            }
            fcEntries[1].key = "arguments";
            fcEntries[1].value = (ArgumentValue){ .type = D_ARRAY, .count = fc->argumentCount, .as.data = args };
            values[i] = qb_wrap("functionCall", (ArgumentValue){ .type = D_MAP, .count = 2, .as.data = fcEntries });
          } else if (cv->kind == V_PROPERTY_CALL) {
            values[i] = qb_wrap("propertyCall", qb_wrap("name", v_string(cv->as.propertyCall.name ? cv->as.propertyCall.name : "")));
          } else {
            MapEntry *cp = lt_alloc(sizeof(MapEntry));
            cp[0].key = "chain";
            cp[0].value = qb_node(1, &cv->as.copy.source);
            values[i] = qb_wrap("copy", (ArgumentValue){ .type = D_MAP, .count = 1, .as.data = cp });
          }
        }
      }
      MapEntry *inner = lt_alloc(2 * sizeof(MapEntry));
      inner[0].key = "values";
      inner[0].value = (ArgumentValue){ .type = D_ARRAY, .count = c->valueCount, .as.data = values };
      MapEntry *init = lt_alloc(2 * sizeof(MapEntry));
      init[0].key = "name";
      init[0].value = v_string(c->initFunction.name ? c->initFunction.name : "");
      init[1].key = "variableName";
      init[1].value = v_string(c->initFunction.variableName ? c->initFunction.variableName : "");
      inner[1].key = "initFunction";
      inner[1].value = (ArgumentValue){ .type = D_MAP, .count = 2, .as.data = init };
      return qb_wrap("chain", (ArgumentValue){ .type = D_MAP, .count = 2, .as.data = inner });
    }
    const ArgumentValue *v = (const ArgumentValue *)p;
    if (v->type == D_STRING || v->type == D_INT || v->type == D_FLOAT || v->type == D_BOOL) {
      const char *tag = v->type == D_STRING ? "string" : (v->type == D_BOOL ? "boolean" : "number");
      return qb_wrap(tag, qb_wrap("value", *v));
    }
    if (v->type == D_NULL) {
      return qb_wrap("null", qb_wrap("value", v_null()));
    }
    if (v->type == D_ARRAY) {
      const ArgumentValue *src = v->as.data;
      ArgumentValue *items = 0;
      if (v->count) {
        items = lt_alloc(v->count * sizeof(ArgumentValue));
        for (size_t i = 0; i < v->count; i++) items[i] = qb_node(0, &src[i]);
      }
      return qb_wrap("array", qb_wrap("value", (ArgumentValue){ .type = D_ARRAY, .count = v->count, .as.data = items }));
    }
    if (v->type == D_MAP) {
      const MapEntry *src = v->as.data;
      MapEntry *entries = 0;
      if (v->count) {
        entries = lt_alloc(v->count * sizeof(MapEntry));
        for (size_t i = 0; i < v->count; i++) {
          entries[i].key = src[i].key;
          entries[i].value = qb_node(0, &src[i].value);
        }
      }
      return qb_wrap("object", qb_wrap("value", (ArgumentValue){ .type = D_MAP, .count = v->count, .as.data = entries }));
    }
    if (v->type == D_CHAIN) {
      return qb_node(1, v->as.chain);
    }
    return qb_wrap("null", qb_wrap("value", v_null()));
  }
  MapEntry *qbSchema = lt_alloc(2 * sizeof(MapEntry));
  qbSchema[0].key = "exportName";
  qbSchema[0].value = v_string(builder.schema.exportName ? builder.schema.exportName : "");
  qbSchema[1].key = "chain";
  qbSchema[1].value = qb_node(1, &builder.schema.chain);
  ArgumentValue root = qb_wrap("schema", (ArgumentValue){ .type = D_MAP, .count = 2, .as.data = qbSchema });
`;

const cBridge = String.raw`
  ArgumentValue qbSql = lt_trim(sql);
  ArgumentValue qbWsql = lt_trim(wsql);
  ParseResult qbResult;
  qbResult.sql = lt_own_strdup(qbSql.as.s ? qbSql.as.s : "");
  qbResult.sqlWithParam = lt_own_strdup(qbWsql.as.s ? qbWsql.as.s : "");
  qbResult.paramCount = params.count;
  qbResult.param = 0;
  if (params.count) {
    qbResult.param = region_alloc(&lt_own_region, params.count * sizeof(ParseParam));
    for (size_t k = 0; k < params.count; k++) {
      ArgumentValue pv = ((const ArgumentValue *)params.as.data)[k];
      ParseParam pp;
      pp.type = PARSE_NULL;
      pp.value.s = 0;
      if (pv.type == D_MAP && pv.count == 1) {
        MapEntry *e = (MapEntry *)pv.as.data;
        if (strcmp(e[0].key, "string") == 0) {
          ArgumentValue iv = ((MapEntry *)e[0].value.as.data)[0].value;
          pp.type = PARSE_STRING;
          pp.value.s = lt_own_strdup(iv.as.s ? iv.as.s : "");
        } else if (strcmp(e[0].key, "number") == 0) {
          ArgumentValue iv = ((MapEntry *)e[0].value.as.data)[0].value;
          pp.type = PARSE_NUMBER;
          pp.value.n = iv.type == D_INT ? (double)iv.as.i : iv.as.f;
        } else if (strcmp(e[0].key, "boolean") == 0) {
          ArgumentValue iv = ((MapEntry *)e[0].value.as.data)[0].value;
          pp.type = PARSE_BOOL;
          pp.value.b = iv.as.i ? 1 : 0;
        }
      }
      qbResult.param[k] = pp;
    }
  }
  lt_free_all();
  return qbResult;
`;

const tsBridge =
    "return { sql: sql.trim(), sqlWithParam: wsql.trim(), param: params.map((p) => p.string ? p.string.value : p.number ? p.number.value : p.boolean ? p.boolean.value : null) };";

function buildParser(): LT {
    let c = lt().addStatements({
        typescript: ["const root: any = this.getSchema();"],
        c: [cPreamble],
    });

    c = c
        .addVariable("dialect", "")
        .addVariable("quote", "")
        .addVariable("sql", "")
        .addVariable("wsql", "")
        .addVariable("params", { typescript: "([] as any[])", c: "arr()" })
        .addVariable("orderSql", "")
        .addVariable("orderW", "")
        .addVariable("hasOrder", false)
        .addVariable("tmp", "")
        .addVariable("tmp2", "")
        .addVariable("tmpRef", "");

    // local functions
    c = localFn(c, "normName", ["n"], () =>
        lt().returnRaw(strLower(strReplace(ref("n"), "-", ""))));

    c = localFn(c, "pushSql", ["text"], () =>
        lt().setVariable("sql", strCat(ref("sql"), strCat(" ", ref("text"))))
            .returnRaw(NULL_EXPR()));
    c = localFn(c, "pushW", ["text"], () =>
        lt().setVariable("wsql", strCat(ref("wsql"), strCat(" ", ref("text"))))
            .returnRaw(NULL_EXPR()));

    c = localFn(c, "asString", ["arg"], () =>
        lt().returnRaw(objGet(objGet(ref("arg"), "string"), "value")));

    c = localFn(c, "identStr", ["name"], () =>
        lt().returnRaw(strCat(ref("quote"), strCat(strReplace(ref("name"), ref("quote"), strCat(ref("quote"), ref("quote"))), ref("quote")))));

    c = localFn(c, "literalOf", ["arg"], () =>
        lt().addVariable("outLiteral", "")
            .if(objHas(ref("arg"), "string"),
                lt().setVariable("outLiteral", strCat("'", strCat(strReplace(callExpr("asString", [ref("arg")]), "'", "''"), "'"))))
            .elseIf(objHas(ref("arg"), "number"),
                lt().setVariable("outLiteral", strOf(objGet(objGet(ref("arg"), "number"), "value"))))
            .elseIf(objHas(ref("arg"), "boolean"),
                lt().if(truthy(objGet(objGet(ref("arg"), "boolean"), "value")),
                        lt().setVariable("outLiteral", "TRUE"))
                    .else(lt().setVariable("outLiteral", "FALSE")))
            .else(lt().setVariable("outLiteral", "NULL"))
            .returnRaw(ref("outLiteral")));

    c = localFn(c, "opOf", ["n"], () => {
        const entries: [string, string][] = [
            ["eq", "="], ["gt", ">"], ["gte", ">="], ["lt", "<"], ["lte", "<="], ["like", "LIKE"], ["ilike", "ILIKE"],
        ];
        let b = lt().addVariable("o", "");
        entries.forEach(([name, op], index) => {
            const cond = valEq(ref("n"), name);
            const body = lt().setVariable("o", op);
            b = index === 0 ? b.if(cond, body) : b.elseIf(cond, body);
        });
        return b.returnRaw(ref("o"));
    });

    c = localFn(c, "itemsOf", ["arg"], () =>
        lt().if(objHas(ref("arg"), "array"), lt().returnRaw(objGet(objGet(ref("arg"), "array"), "value")))
            .returnRaw(lt().arrayAppend(lt().addValue([]), ref("arg"))));

    c = localFn(c, "isRef", ["chainValues"], () =>
        lt().setVariable("tmpRef", "")
            .if(lt().and(valEq(arrLen(ref("chainValues")), 1), objHas(arrGet(ref("chainValues"), 0), "functionCall")),
                lt().addVariable("firstName", member(arrGet(ref("chainValues"), 0), "functionCall.name"))
                    .if(lt().or(valEq(ref("firstName"), "col"), valEq(ref("firstName"), "table")),
                        lt().setVariable("tmpRef", callExpr("asString", [argAt(arrGet(ref("chainValues"), 0), 0)]))))
            .returnRaw(ref("tmpRef")));

    c = localFn(c, "emitParam", ["arg"], () =>
        lt().setVariable("params", lt().arrayAppend(ref("params"), ref("arg")))
            .if(valEq(ref("dialect"), "postgres"),
                lt().setVariable("tmp", strCat("$", strOf(arrLen(ref("params"))))))
            .else(lt().setVariable("tmp", "?"))
            .addCallFunction("pushSql", [ref("tmp")])
            .setVariable("tmp2", callExpr("literalOf", [ref("arg")]))
            .addCallFunction("pushW", [ref("tmp2")])
            .returnRaw(NULL_EXPR()));

    c = localFn(c, "emitIdent", ["name"], () =>
        lt().setVariable("tmp", callExpr("identStr", [ref("name")]))
            .addCallFunction("pushSql", [ref("tmp")])
            .addCallFunction("pushW", [ref("tmp")])
            .returnRaw(NULL_EXPR()));

    c = localFn(c, "emitRhs", ["arg"], () =>
        lt().if(objHas(ref("arg"), "chain"),
            lt().setVariable("tmpRef", callExpr("isRef", [member(ref("arg"), "chain.values")]))
                .if(valNeq(ref("tmpRef"), ""), lt().addCallFunction("emitIdent", [ref("tmpRef")]))
                .else(lt().addCallFunction("emitParam", [ref("arg")])))
            .else(lt().addCallFunction("emitParam", [ref("arg")]))
            .returnRaw(NULL_EXPR()));

    const separator = (chain: LT) =>
        chain.if(valEq(ref("first"), false), lt().addCallFunction("pushSql", ["AND"]).addCallFunction("pushW", ["AND"]))
            .setVariable("first", false);

    const emitBase = (chain: LT) =>
        chain.if(truthy(ref("hasLeft")), lt().setVariable("base", ref("left")))
            .else(lt().setVariable("base", "?"))
            .addCallFunction("pushSql", [ref("base")])
            .addCallFunction("pushW", [ref("base")]);

    c = localFn(c, "emitPredicate", ["chainValues"], () =>
        lt().addVariable("first", true)
            .addVariable("left", "")
            .addVariable("hasLeft", false)
            .addVariable("base", "")
            .forEach(ref("chainValues"), "node",
                lt().addVariable("pn", callExpr("normName", [member(ref("node"), "functionCall.name")]))
                    .addVariable("op", callExpr("opOf", [ref("pn")]))
                    .if(objHas(ref("node"), "functionCall"),
                        lt().if(lt().or(valEq(ref("pn"), "col"), valEq(ref("pn"), "table")),
                            lt().setVariable("left", callExpr("identStr", [callExpr("asString", [argAt(ref("node"), 0)])]))
                                .setVariable("hasLeft", true))
                        .elseIf(truthy(ref("op")),
                            emitBase(separator(lt()))
                                .addCallFunction("pushSql", [ref("op")])
                                .addCallFunction("pushW", [ref("op")])
                                .addCallFunction("emitRhs", [argAt(ref("node"), 0)])
                                .setVariable("hasLeft", false))
                        .elseIf(valEq(ref("pn"), "in"),
                            emitBase(separator(lt()))
                                .addCallFunction("pushSql", ["IN ("])
                                .addCallFunction("pushW", ["IN ("])
                                .addVariable("inFirst", true)
                                .forEach(callExpr("itemsOf", [argAt(ref("node"), 0)]), "iv",
                                    lt().if(valEq(ref("inFirst"), false),
                                            lt().setVariable("sql", strCat(ref("sql"), ",")).setVariable("wsql", strCat(ref("wsql"), ",")))
                                        .setVariable("inFirst", false)
                                        .addCallFunction("emitRhs", [ref("iv")]))
                                .addCallFunction("pushSql", [")"])
                                .addCallFunction("pushW", [")"])
                                .setVariable("hasLeft", false))
                        .elseIf(valEq(ref("pn"), "between"),
                            emitBase(separator(lt()))
                                .addCallFunction("pushSql", ["BETWEEN"])
                                .addCallFunction("pushW", ["BETWEEN"])
                                .addCallFunction("emitRhs", [argAt(ref("node"), 0)])
                                .addCallFunction("pushSql", ["AND"])
                                .addCallFunction("pushW", ["AND"])
                                .addCallFunction("emitRhs", [argAt(ref("node"), 1)])
                                .setVariable("hasLeft", false))
                        .elseIf(valEq(ref("pn"), "isnull"),
                            emitBase(separator(lt()))
                                .addCallFunction("pushSql", ["IS NULL"])
                                .addCallFunction("pushW", ["IS NULL"])
                                .setVariable("hasLeft", false))
                        .elseIf(valEq(ref("pn"), "not"),
                            separator(lt())
                                .addCallFunction("pushSql", ["NOT ("])
                                .addCallFunction("pushW", ["NOT ("])
                                .addCallFunction("emitPredicate", [member(argAt(ref("node"), 0), "chain.values")])
                                .addCallFunction("pushSql", [")"])
                                .addCallFunction("pushW", [")"])
                                .setVariable("hasLeft", false))
                        .elseIf(lt().or(valEq(ref("pn"), "and"), valEq(ref("pn"), "or")),
                            separator(lt())
                                .addCallFunction("pushSql", ["("])
                                .addCallFunction("pushW", ["("])
                                .addVariable("boolFirst", true)
                                .forEach(callExpr("itemsOf", [argAt(ref("node"), 0)]), "bv",
                                    lt().if(valEq(ref("boolFirst"), false),
                                            lt().setVariable("tmp", strUpper(ref("pn")))
                                                .addCallFunction("pushSql", [ref("tmp")])
                                                .addCallFunction("pushW", [ref("tmp")]))
                                        .setVariable("boolFirst", false)
                                        .if(objHas(ref("bv"), "chain"),
                                            lt().addCallFunction("emitPredicate", [member(ref("bv"), "chain.values")]))
                                        .else(lt().addCallFunction("emitParam", [ref("bv")])))
                                .addCallFunction("pushSql", [")"])
                                .addCallFunction("pushW", [")"])
                                .setVariable("hasLeft", false))
                        .elseIf(valEq(ref("pn"), "as"),
                            emitBase(lt())
                                .addCallFunction("pushSql", ["AS"])
                                .addCallFunction("pushW", ["AS"])
                                .addCallFunction("emitIdent", [callExpr("asString", [argAt(ref("node"), 0)])])
                                .setVariable("hasLeft", false))
                        .elseIf(valEq(ref("pn"), "op"),
                            emitBase(separator(lt()))
                                .addCallFunction("pushSql", [callExpr("asString", [argAt(ref("node"), 0)])])
                                .addCallFunction("pushW", [callExpr("asString", [argAt(ref("node"), 0)])])
                                .addCallFunction("emitRhs", [argAt(ref("node"), 1)])
                                .setVariable("hasLeft", false))
                        .else(lt().throwError("query-builder parse: unsupported predicate"))))
            .returnRaw(NULL_EXPR()));

    c = localFn(c, "emitOperand", ["arg"], () =>
        lt().if(objHas(ref("arg"), "chain"),
            lt().setVariable("tmpRef", callExpr("isRef", [member(ref("arg"), "chain.values")]))
                .if(valNeq(ref("tmpRef"), ""), lt().addCallFunction("emitIdent", [ref("tmpRef")]))
                .else(lt().addCallFunction("emitPredicate", [member(ref("arg"), "chain.values")])))
            .else(lt().addCallFunction("emitParam", [ref("arg")]))
            .returnRaw(NULL_EXPR()));

    c = localFn(c, "emitColumnList", ["arg"], () =>
        lt().addVariable("firstItem", true)
            .forEach(callExpr("itemsOf", [ref("arg")]), "item",
                lt().if(valEq(ref("firstItem"), false),
                        lt().setVariable("sql", strCat(ref("sql"), ",")).setVariable("wsql", strCat(ref("wsql"), ",")))
                    .setVariable("firstItem", false)
                    .addCallFunction("emitOperand", [ref("item")]))
            .returnRaw(NULL_EXPR()));

    c = localFn(c, "emitOrderItem", ["item"], () =>
        lt().addVariable("dir", "")
            .addVariable("ordName", "")
            .if(objHas(ref("item"), "chain"),
                lt().forEach(member(ref("item"), "chain.values"), "on",
                    lt().addVariable("onn", callExpr("normName", [member(ref("on"), "functionCall.name")]))
                        .if(valEq(ref("onn"), "asc"), lt().setVariable("dir", " ASC"))
                        .elseIf(valEq(ref("onn"), "desc"), lt().setVariable("dir", " DESC"))
                        .elseIf(lt().or(valEq(ref("onn"), "col"), valEq(ref("onn"), "table")),
                            lt().setVariable("ordName", callExpr("asString", [argAt(ref("on"), 0)])))))
            .if(valNeq(ref("ordName"), ""),
                lt().setVariable("tmp", callExpr("identStr", [ref("ordName")]))
                    .setVariable("orderSql", strCat(ref("orderSql"), strCat(ref("tmp"), ref("dir"))))
                    .setVariable("orderW", strCat(ref("orderW"), strCat(ref("tmp"), ref("dir")))))
            .returnRaw(NULL_EXPR()));

    c = localFn(c, "emitOrderList", ["arg"], () =>
        lt().addVariable("firstOrder", true)
            .forEach(callExpr("itemsOf", [ref("arg")]), "item",
                lt().if(valEq(ref("firstOrder"), false),
                        lt().setVariable("orderSql", strCat(ref("orderSql"), ", ")).setVariable("orderW", strCat(ref("orderW"), ", ")))
                    .setVariable("firstOrder", false)
                    .addCallFunction("emitOrderItem", [ref("item")]))
            .returnRaw(NULL_EXPR()));

    c = localFn(c, "flushOrder", [], () =>
        lt().if(truthy(ref("hasOrder")),
            lt().addCallFunction("pushSql", ["ORDER"])
                .addCallFunction("pushSql", ["BY"])
                .addCallFunction("pushW", ["ORDER"])
                .addCallFunction("pushW", ["BY"])
                .setVariable("tmp", ref("orderSql"))
                .if(valNeq(ref("tmp"), ""), lt().addCallFunction("pushSql", [ref("tmp")]))
                .setVariable("tmp2", ref("orderW"))
                .if(valNeq(ref("tmp2"), ""), lt().addCallFunction("pushW", [ref("tmp2")]))
                .setVariable("hasOrder", false))
            .returnRaw(NULL_EXPR()));

    // dialect pass
    c = c.forEach(member(ref("root"), "schema.chain.chain.values"), "dialectNode",
        lt().if(
            valEq(callExpr("normName", [member(ref("dialectNode"), "functionCall.name")]), "setdialect"),
            lt().setVariable("dialect", objGet(objGet(objGet(arrGet(member(ref("dialectNode"), "functionCall.arguments"), 0), "argument"), "string"), "value"))
        )
    );

    c = c
        .if(valEq(ref("dialect"), ""),
            lt().throwError("query-builder parse: setDialect(...) must be called before parse()"))
        .elseIf(lt().and(valNeq(ref("dialect"), "postgres"), valNeq(ref("dialect"), "mysql")),
            lt().throwError(strCat("query-builder parse: unsupported dialect ", ref("dialect"))));

    c = c
        .if(valEq(ref("dialect"), "mysql"), lt().setVariable("quote", "\x60"))
        .else(lt().setVariable("quote", '"'));

    const keywordClause = (chain: LT, node: LT, keyword: string, emitFn: string, argTransform: (arg: LT) => LT) =>
        chain.addCallFunction("flushOrder", [])
            .addCallFunction("pushSql", [keyword])
            .addCallFunction("pushW", [keyword])
            .addCallFunction(emitFn, [argTransform(argAt(node, 0))]);

    const joinClause = (node: LT, keyword: string): LT =>
        lt().addCallFunction("flushOrder", [])
            .addCallFunction("pushSql", [keyword])
            .addCallFunction("pushW", [keyword])
            .addCallFunction("emitOperand", [argAt(node, 0)])
            .addCallFunction("pushSql", ["ON"])
            .addCallFunction("pushW", ["ON"])
            .addCallFunction("emitPredicate", [member(argAt(node, 1), "chain.values")]);

    const clauseBody = (node: LT): LT => {
        const specs: { names: string[]; build: (node: LT) => LT }[] = [
            { names: ["select"], build: (n) => keywordClause(lt(), n, "SELECT", "emitColumnList", (a) => a) },
            { names: ["from"], build: (n) => keywordClause(lt(), n, "FROM", "emitOperand", (a) => a) },
            { names: ["join"], build: (n) => joinClause(n, "JOIN") },
            { names: ["leftjoin"], build: (n) => joinClause(n, "LEFT JOIN") },
            { names: ["rightjoin"], build: (n) => joinClause(n, "RIGHT JOIN") },
            { names: ["innerjoin"], build: (n) => joinClause(n, "INNER JOIN") },
            { names: ["fulljoin"], build: (n) => joinClause(n, "FULL JOIN") },
            { names: ["crossjoin"], build: (n) => joinClause(n, "CROSS JOIN") },
            { names: ["where"], build: (n) => keywordClause(lt(), n, "WHERE", "emitPredicate", (a) => member(a, "chain.values")) },
            { names: ["groupby"], build: (n) => keywordClause(lt(), n, "GROUP BY", "emitColumnList", (a) => a) },
            { names: ["having"], build: (n) => keywordClause(lt(), n, "HAVING", "emitPredicate", (a) => member(a, "chain.values")) },
            {
                names: ["orderby"],
                build: (n) => lt().setVariable("hasOrder", true)
                    .setVariable("orderSql", "")
                    .setVariable("orderW", "")
                    .addCallFunction("emitOrderList", [argAt(n, 0)]),
            },
            { names: ["limit"], build: (n) => keywordClause(lt(), n, "LIMIT", "emitLiteralPlaceholder", (a) => a) },
            { names: ["offset"], build: (n) => keywordClause(lt(), n, "OFFSET", "emitLiteralPlaceholder", (a) => a) },
        ];
        let b = lt();
        specs.forEach((spec, index) => {
            const cond = spec.names
                .slice(1)
                .reduce((acc, name) => lt().or(acc, valEq(ref("nameNorm"), name)), valEq(ref("nameNorm"), spec.names[0]!));
            const body = spec.build(ref("node"));
            b = index === 0 ? b.if(cond, body) : b.elseIf(cond, body);
        });
        return b.else(lt().throwError(strCat("query-builder parse: unsupported clause ", ref("name"))));
    };

    // literal clause needs a tiny local helper; define once before the loop
    c = localFn(c, "emitLiteralPlaceholder", ["arg"], () =>
        lt().setVariable("tmp", callExpr("literalOf", [ref("arg")]))
            .addCallFunction("pushSql", [ref("tmp")])
            .addCallFunction("pushW", [ref("tmp")])
            .returnRaw(NULL_EXPR()));

    c = c.forEach(member(ref("root"), "schema.chain.chain.values"), "node",
        lt().if(objHas(ref("node"), "functionCall"),
            lt().addVariable("name", member(ref("node"), "functionCall.name"))
                .addVariable("nameNorm", callExpr("normName", [ref("name")]))
                .if(valEq(ref("nameNorm"), "setdialect"), lt().loopContinue())
                .elseIf(lt().or(valEq(ref("nameNorm"), "asc"), valEq(ref("nameNorm"), "desc")),
                    lt().if(truthy(ref("hasOrder")),
                        lt().setVariable("tmp", strUpper(ref("nameNorm")))
                            .setVariable("orderSql", strCat(ref("orderSql"), strCat(" ", ref("tmp"))))
                            .setVariable("orderW", strCat(ref("orderW"), strCat(" ", ref("tmp"))))))
                .else(clauseBody(ref("node"))))
    );

    c = callStmt(c, "flushOrder", []);
    return c;
}

const parserChain = buildParser();

export const queryBuilderParseBody = await parserChain
    .addStatements({ typescript: [tsBridge], c: [cBridge] })
    .generate();
