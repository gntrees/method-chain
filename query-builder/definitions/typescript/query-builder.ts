// Auto-generated definition for query-builder
import {} from "./query-builder";
import type { SchemaType } from "./types.ts";
import { cloneSchema } from "./utils.ts";

export class QueryBuilder {
  private schemaQueryBuilder: SchemaType = {
    schema: {
      exportName: "schema",
      chain: {
        chain: {
          values: [],
          initFunction: {
            name: "query-builder",
            variableName: "s1",
            importString: {},
          },
        },
      },
    },
  };
  getSchema(exportName?: string): SchemaType {
    if (exportName) {
      this.schemaQueryBuilder.schema.exportName = exportName;
    }
    return this.schemaQueryBuilder;
  }
  initFromStructure<T>(schema: SchemaType) {
    this.schemaQueryBuilder = schema;
    return this;
  }
  initFromInitFunction(
    initFunction: SchemaType["schema"]["chain"]["chain"]["initFunction"],
  ) {
    this.schemaQueryBuilder.schema.chain.chain.initFunction = initFunction;
    return this;
  }
  a(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "a", [arg1]),
    );
  }
  abort(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "abort", [arg1]),
    );
  }
  abs(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "abs", [arg1]),
    );
  }
  absent(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "absent", [arg1]),
    );
  }
  absolute(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "absolute", [arg1]),
    );
  }
  access(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "access", [arg1]),
    );
  }
  according(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "according", [arg1]),
    );
  }
  acos(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "acos", [arg1]),
    );
  }
  action(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "action", [arg1]),
    );
  }
  ada(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ada", [arg1]),
    );
  }
  add(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "add", [arg1]),
    );
  }
  admin(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "admin", [arg1]),
    );
  }
  after(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "after", [arg1]),
    );
  }
  aggregate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "aggregate", [arg1]),
    );
  }
  all(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "all", [arg1]),
    );
  }
  allocate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "allocate", [arg1]),
    );
  }
  also(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "also", [arg1]),
    );
  }
  alter(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "alter", [arg1]),
    );
  }
  always(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "always", [arg1]),
    );
  }
  analyse(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "analyse", [arg1]),
    );
  }
  analyze(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "analyze", [arg1]),
    );
  }
  and(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "and", [arg1]),
    );
  }
  any(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "any", [arg1]),
    );
  }
  anyValue(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "anyValue", [arg1]),
    );
  }
  are(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "are", [arg1]),
    );
  }
  array(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "array", [arg1]),
    );
  }
  arrayAgg(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "arrayAgg", [arg1]),
    );
  }
  arrayMaxCardinality(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "arrayMaxCardinality", [arg1]),
    );
  }
  as(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "as", [arg1]),
    );
  }
  asc(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "asc", [arg1]),
    );
  }
  asensitive(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "asensitive", [arg1]),
    );
  }
  asin(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "asin", [arg1]),
    );
  }
  assertion(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "assertion", [arg1]),
    );
  }
  assignment(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "assignment", [arg1]),
    );
  }
  asymmetric(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "asymmetric", [arg1]),
    );
  }
  at(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "at", [arg1]),
    );
  }
  atan(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "atan", [arg1]),
    );
  }
  atomic(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "atomic", [arg1]),
    );
  }
  attach(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "attach", [arg1]),
    );
  }
  attribute(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "attribute", [arg1]),
    );
  }
  attributes(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "attributes", [arg1]),
    );
  }
  authorization(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "authorization", [arg1]),
    );
  }
  avg(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "avg", [arg1]),
    );
  }
  backward(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "backward", [arg1]),
    );
  }
  base64(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "base64", [arg1]),
    );
  }
  before(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "before", [arg1]),
    );
  }
  begin(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "begin", [arg1]),
    );
  }
  beginFrame(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "beginFrame", [arg1]),
    );
  }
  beginPartition(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "beginPartition", [arg1]),
    );
  }
  bernoulli(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "bernoulli", [arg1]),
    );
  }
  between(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "between", [arg1]),
    );
  }
  bigint(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "bigint", [arg1]),
    );
  }
  binary(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "binary", [arg1]),
    );
  }
  bit(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "bit", [arg1]),
    );
  }
  bitLength(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "bitLength", [arg1]),
    );
  }
  blob(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "blob", [arg1]),
    );
  }
  blocked(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "blocked", [arg1]),
    );
  }
  bom(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "bom", [arg1]),
    );
  }
  boolean(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "boolean", [arg1]),
    );
  }
  both(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "both", [arg1]),
    );
  }
  breadth(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "breadth", [arg1]),
    );
  }
  btrim(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "btrim", [arg1]),
    );
  }
  by(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "by", [arg1]),
    );
  }
  c(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "c", [arg1]),
    );
  }
  cache(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cache", [arg1]),
    );
  }
  call(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "call", [arg1]),
    );
  }
  called(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "called", [arg1]),
    );
  }
  cardinality(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cardinality", [arg1]),
    );
  }
  cascade(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cascade", [arg1]),
    );
  }
  cascaded(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cascaded", [arg1]),
    );
  }
  case(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "case", [arg1]),
    );
  }
  cast(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cast", [arg1]),
    );
  }
  catalog(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "catalog", [arg1]),
    );
  }
  catalogName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "catalogName", [arg1]),
    );
  }
  ceil(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ceil", [arg1]),
    );
  }
  ceiling(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ceiling", [arg1]),
    );
  }
  chain(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "chain", [arg1]),
    );
  }
  chaining(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "chaining", [arg1]),
    );
  }
  char(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "char", [arg1]),
    );
  }
  character(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "character", [arg1]),
    );
  }
  characteristics(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characteristics", [arg1]),
    );
  }
  characters(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characters", [arg1]),
    );
  }
  characterLength(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characterLength", [arg1]),
    );
  }
  characterSetCatalog(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characterSetCatalog", [arg1]),
    );
  }
  characterSetName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characterSetName", [arg1]),
    );
  }
  characterSetSchema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characterSetSchema", [arg1]),
    );
  }
  charLength(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "charLength", [arg1]),
    );
  }
  check(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "check", [arg1]),
    );
  }
  checkpoint(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "checkpoint", [arg1]),
    );
  }
  class(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "class", [arg1]),
    );
  }
  classifier(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "classifier", [arg1]),
    );
  }
  classOrigin(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "classOrigin", [arg1]),
    );
  }
  clob(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "clob", [arg1]),
    );
  }
  close(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "close", [arg1]),
    );
  }
  cluster(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cluster", [arg1]),
    );
  }
  coalesce(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "coalesce", [arg1]),
    );
  }
  cobol(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cobol", [arg1]),
    );
  }
  collate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collate", [arg1]),
    );
  }
  collation(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collation", [arg1]),
    );
  }
  collationCatalog(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collationCatalog", [arg1]),
    );
  }
  collationName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collationName", [arg1]),
    );
  }
  collationSchema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collationSchema", [arg1]),
    );
  }
  collect(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collect", [arg1]),
    );
  }
  column(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "column", [arg1]),
    );
  }
  columns(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "columns", [arg1]),
    );
  }
  columnName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "columnName", [arg1]),
    );
  }
  commandFunction(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "commandFunction", [arg1]),
    );
  }
  commandFunctionCode(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "commandFunctionCode", [arg1]),
    );
  }
  comment(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "comment", [arg1]),
    );
  }
  comments(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "comments", [arg1]),
    );
  }
  commit(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "commit", [arg1]),
    );
  }
  committed(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "committed", [arg1]),
    );
  }
  compression(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "compression", [arg1]),
    );
  }
  concurrently(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "concurrently", [arg1]),
    );
  }
  condition(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "condition", [arg1]),
    );
  }
  conditional(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "conditional", [arg1]),
    );
  }
  conditionNumber(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "conditionNumber", [arg1]),
    );
  }
  configuration(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "configuration", [arg1]),
    );
  }
  conflict(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "conflict", [arg1]),
    );
  }
  connect(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "connect", [arg1]),
    );
  }
  connection(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "connection", [arg1]),
    );
  }
  connectionName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "connectionName", [arg1]),
    );
  }
  constraint(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constraint", [arg1]),
    );
  }
  constraints(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constraints", [arg1]),
    );
  }
  constraintCatalog(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constraintCatalog", [arg1]),
    );
  }
  constraintName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constraintName", [arg1]),
    );
  }
  constraintSchema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constraintSchema", [arg1]),
    );
  }
  constructorKeyword(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constructorKeyword", [arg1]),
    );
  }
  contains(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "contains", [arg1]),
    );
  }
  content(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "content", [arg1]),
    );
  }
  continue(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "continue", [arg1]),
    );
  }
  control(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "control", [arg1]),
    );
  }
  conversion(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "conversion", [arg1]),
    );
  }
  convert(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "convert", [arg1]),
    );
  }
  copartition(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "copartition", [arg1]),
    );
  }
  copy(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "copy", [arg1]),
    );
  }
  corr(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "corr", [arg1]),
    );
  }
  corresponding(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "corresponding", [arg1]),
    );
  }
  cos(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cos", [arg1]),
    );
  }
  cosh(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cosh", [arg1]),
    );
  }
  cost(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cost", [arg1]),
    );
  }
  count(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "count", [arg1]),
    );
  }
  covarPop(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "covarPop", [arg1]),
    );
  }
  covarSamp(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "covarSamp", [arg1]),
    );
  }
  create(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "create", [arg1]),
    );
  }
  cross(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cross", [arg1]),
    );
  }
  csv(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "csv", [arg1]),
    );
  }
  cube(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cube", [arg1]),
    );
  }
  cumeDist(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cumeDist", [arg1]),
    );
  }
  current(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "current", [arg1]),
    );
  }
  currentCatalog(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentCatalog", [arg1]),
    );
  }
  currentDate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentDate", [arg1]),
    );
  }
  currentDefaultTransformGroup(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentDefaultTransformGroup", [arg1]),
    );
  }
  currentPath(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentPath", [arg1]),
    );
  }
  currentRole(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentRole", [arg1]),
    );
  }
  currentRow(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentRow", [arg1]),
    );
  }
  currentSchema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentSchema", [arg1]),
    );
  }
  currentTime(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentTime", [arg1]),
    );
  }
  currentTimestamp(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentTimestamp", [arg1]),
    );
  }
  currentTransformGroupForType(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentTransformGroupForType", [arg1]),
    );
  }
  currentUser(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentUser", [arg1]),
    );
  }
  cursor(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cursor", [arg1]),
    );
  }
  cursorName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cursorName", [arg1]),
    );
  }
  cycle(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cycle", [arg1]),
    );
  }
  data(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "data", [arg1]),
    );
  }
  database(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "database", [arg1]),
    );
  }
  datalink(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "datalink", [arg1]),
    );
  }
  date(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "date", [arg1]),
    );
  }
  datetimeIntervalCode(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "datetimeIntervalCode", [arg1]),
    );
  }
  datetimeIntervalPrecision(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "datetimeIntervalPrecision", [arg1]),
    );
  }
  day(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "day", [arg1]),
    );
  }
  db(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "db", [arg1]),
    );
  }
  deallocate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "deallocate", [arg1]),
    );
  }
  dec(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dec", [arg1]),
    );
  }
  decfloat(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "decfloat", [arg1]),
    );
  }
  decimal(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "decimal", [arg1]),
    );
  }
  declare(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "declare", [arg1]),
    );
  }
  default(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "default", [arg1]),
    );
  }
  defaults(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "defaults", [arg1]),
    );
  }
  deferrable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "deferrable", [arg1]),
    );
  }
  deferred(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "deferred", [arg1]),
    );
  }
  define(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "define", [arg1]),
    );
  }
  defined(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "defined", [arg1]),
    );
  }
  definer(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "definer", [arg1]),
    );
  }
  degree(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "degree", [arg1]),
    );
  }
  delete(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "delete", [arg1]),
    );
  }
  delimiter(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "delimiter", [arg1]),
    );
  }
  delimiters(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "delimiters", [arg1]),
    );
  }
  denseRank(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "denseRank", [arg1]),
    );
  }
  depends(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "depends", [arg1]),
    );
  }
  depth(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "depth", [arg1]),
    );
  }
  deref(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "deref", [arg1]),
    );
  }
  derived(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "derived", [arg1]),
    );
  }
  desc(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "desc", [arg1]),
    );
  }
  describe(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "describe", [arg1]),
    );
  }
  descriptor(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "descriptor", [arg1]),
    );
  }
  detach(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "detach", [arg1]),
    );
  }
  deterministic(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "deterministic", [arg1]),
    );
  }
  diagnostics(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "diagnostics", [arg1]),
    );
  }
  dictionary(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dictionary", [arg1]),
    );
  }
  disable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "disable", [arg1]),
    );
  }
  discard(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "discard", [arg1]),
    );
  }
  disconnect(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "disconnect", [arg1]),
    );
  }
  dispatch(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dispatch", [arg1]),
    );
  }
  distinct(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "distinct", [arg1]),
    );
  }
  dlnewcopy(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlnewcopy", [arg1]),
    );
  }
  dlpreviouscopy(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlpreviouscopy", [arg1]),
    );
  }
  dlurlcomplete(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlcomplete", [arg1]),
    );
  }
  dlurlcompleteonly(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlcompleteonly", [arg1]),
    );
  }
  dlurlcompletewrite(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlcompletewrite", [arg1]),
    );
  }
  dlurlpath(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlpath", [arg1]),
    );
  }
  dlurlpathonly(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlpathonly", [arg1]),
    );
  }
  dlurlpathwrite(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlpathwrite", [arg1]),
    );
  }
  dlurlscheme(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlscheme", [arg1]),
    );
  }
  dlurlserver(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlserver", [arg1]),
    );
  }
  dlvalue(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlvalue", [arg1]),
    );
  }
  do(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "do", [arg1]),
    );
  }
  document(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "document", [arg1]),
    );
  }
  domain(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "domain", [arg1]),
    );
  }
  double(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "double", [arg1]),
    );
  }
  drop(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "drop", [arg1]),
    );
  }
  dynamic(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dynamic", [arg1]),
    );
  }
  dynamicFunction(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dynamicFunction", [arg1]),
    );
  }
  dynamicFunctionCode(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dynamicFunctionCode", [arg1]),
    );
  }
  each(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "each", [arg1]),
    );
  }
  element(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "element", [arg1]),
    );
  }
  else(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "else", [arg1]),
    );
  }
  empty(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "empty", [arg1]),
    );
  }
  enable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "enable", [arg1]),
    );
  }
  encoding(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "encoding", [arg1]),
    );
  }
  encrypted(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "encrypted", [arg1]),
    );
  }
  end(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "end", [arg1]),
    );
  }
  endExec(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "endExec", [arg1]),
    );
  }
  endFrame(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "endFrame", [arg1]),
    );
  }
  endPartition(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "endPartition", [arg1]),
    );
  }
  enforced(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "enforced", [arg1]),
    );
  }
  enum(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "enum", [arg1]),
    );
  }
  equals(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "equals", [arg1]),
    );
  }
  error(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "error", [arg1]),
    );
  }
  escape(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "escape", [arg1]),
    );
  }
  event(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "event", [arg1]),
    );
  }
  every(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "every", [arg1]),
    );
  }
  except(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "except", [arg1]),
    );
  }
  exception(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exception", [arg1]),
    );
  }
  exclude(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exclude", [arg1]),
    );
  }
  excluding(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "excluding", [arg1]),
    );
  }
  exclusive(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exclusive", [arg1]),
    );
  }
  exec(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exec", [arg1]),
    );
  }
  execute(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "execute", [arg1]),
    );
  }
  exists(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exists", [arg1]),
    );
  }
  exp(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exp", [arg1]),
    );
  }
  explain(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "explain", [arg1]),
    );
  }
  expression(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "expression", [arg1]),
    );
  }
  extension(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "extension", [arg1]),
    );
  }
  external(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "external", [arg1]),
    );
  }
  extract(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "extract", [arg1]),
    );
  }
  false(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "false", [arg1]),
    );
  }
  family(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "family", [arg1]),
    );
  }
  fetch(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "fetch", [arg1]),
    );
  }
  file(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "file", [arg1]),
    );
  }
  filter(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "filter", [arg1]),
    );
  }
  final(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "final", [arg1]),
    );
  }
  finalize(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "finalize", [arg1]),
    );
  }
  finish(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "finish", [arg1]),
    );
  }
  first(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "first", [arg1]),
    );
  }
  firstValue(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "firstValue", [arg1]),
    );
  }
  flag(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "flag", [arg1]),
    );
  }
  float(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "float", [arg1]),
    );
  }
  floor(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "floor", [arg1]),
    );
  }
  following(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "following", [arg1]),
    );
  }
  for(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "for", [arg1]),
    );
  }
  force(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "force", [arg1]),
    );
  }
  foreign(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "foreign", [arg1]),
    );
  }
  format(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "format", [arg1]),
    );
  }
  fortran(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "fortran", [arg1]),
    );
  }
  forward(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "forward", [arg1]),
    );
  }
  found(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "found", [arg1]),
    );
  }
  frameRow(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "frameRow", [arg1]),
    );
  }
  free(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "free", [arg1]),
    );
  }
  freeze(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "freeze", [arg1]),
    );
  }
  from(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "from", [arg1]),
    );
  }
  fs(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "fs", [arg1]),
    );
  }
  fulfill(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "fulfill", [arg1]),
    );
  }
  full(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "full", [arg1]),
    );
  }
  function(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "function", [arg1]),
    );
  }
  functions(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "functions", [arg1]),
    );
  }
  fusion(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "fusion", [arg1]),
    );
  }
  g(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "g", [arg1]),
    );
  }
  general(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "general", [arg1]),
    );
  }
  generated(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "generated", [arg1]),
    );
  }
  get(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "get", [arg1]),
    );
  }
  global(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "global", [arg1]),
    );
  }
  go(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "go", [arg1]),
    );
  }
  goto(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "goto", [arg1]),
    );
  }
  grant(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "grant", [arg1]),
    );
  }
  granted(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "granted", [arg1]),
    );
  }
  greatest(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "greatest", [arg1]),
    );
  }
  group(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "group", [arg1]),
    );
  }
  grouping(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "grouping", [arg1]),
    );
  }
  groups(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "groups", [arg1]),
    );
  }
  handler(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "handler", [arg1]),
    );
  }
  having(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "having", [arg1]),
    );
  }
  header(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "header", [arg1]),
    );
  }
  hex(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "hex", [arg1]),
    );
  }
  hierarchy(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "hierarchy", [arg1]),
    );
  }
  hold(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "hold", [arg1]),
    );
  }
  hour(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "hour", [arg1]),
    );
  }
  id(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "id", [arg1]),
    );
  }
  identity(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "identity", [arg1]),
    );
  }
  if(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "if", [arg1]),
    );
  }
  ignore(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ignore", [arg1]),
    );
  }
  ilike(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ilike", [arg1]),
    );
  }
  immediate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "immediate", [arg1]),
    );
  }
  immediately(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "immediately", [arg1]),
    );
  }
  immutable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "immutable", [arg1]),
    );
  }
  implementation(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "implementation", [arg1]),
    );
  }
  implicit(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "implicit", [arg1]),
    );
  }
  import(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "import", [arg1]),
    );
  }
  in(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "in", [arg1]),
    );
  }
  include(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "include", [arg1]),
    );
  }
  including(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "including", [arg1]),
    );
  }
  increment(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "increment", [arg1]),
    );
  }
  indent(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "indent", [arg1]),
    );
  }
  index(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "index", [arg1]),
    );
  }
  indexes(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "indexes", [arg1]),
    );
  }
  indicator(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "indicator", [arg1]),
    );
  }
  inherit(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "inherit", [arg1]),
    );
  }
  inherits(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "inherits", [arg1]),
    );
  }
  initial(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "initial", [arg1]),
    );
  }
  initially(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "initially", [arg1]),
    );
  }
  inline(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "inline", [arg1]),
    );
  }
  inner(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "inner", [arg1]),
    );
  }
  inout(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "inout", [arg1]),
    );
  }
  input(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "input", [arg1]),
    );
  }
  insensitive(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "insensitive", [arg1]),
    );
  }
  insert(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "insert", [arg1]),
    );
  }
  instance(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "instance", [arg1]),
    );
  }
  instantiable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "instantiable", [arg1]),
    );
  }
  instead(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "instead", [arg1]),
    );
  }
  int(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "int", [arg1]),
    );
  }
  integer(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "integer", [arg1]),
    );
  }
  integrity(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "integrity", [arg1]),
    );
  }
  intersect(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "intersect", [arg1]),
    );
  }
  intersection(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "intersection", [arg1]),
    );
  }
  interval(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "interval", [arg1]),
    );
  }
  into(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "into", [arg1]),
    );
  }
  invoker(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "invoker", [arg1]),
    );
  }
  is(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "is", [arg1]),
    );
  }
  isnull(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "isnull", [arg1]),
    );
  }
  isolation(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "isolation", [arg1]),
    );
  }
  join(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "join", [arg1]),
    );
  }
  json(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "json", [arg1]),
    );
  }
  jsonArray(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonArray", [arg1]),
    );
  }
  jsonArrayagg(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonArrayagg", [arg1]),
    );
  }
  jsonExists(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonExists", [arg1]),
    );
  }
  jsonObject(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonObject", [arg1]),
    );
  }
  jsonObjectagg(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonObjectagg", [arg1]),
    );
  }
  jsonQuery(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonQuery", [arg1]),
    );
  }
  jsonScalar(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonScalar", [arg1]),
    );
  }
  jsonSerialize(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonSerialize", [arg1]),
    );
  }
  jsonTable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonTable", [arg1]),
    );
  }
  jsonTablePrimitive(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonTablePrimitive", [arg1]),
    );
  }
  jsonValue(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonValue", [arg1]),
    );
  }
  k(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "k", [arg1]),
    );
  }
  keep(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "keep", [arg1]),
    );
  }
  key(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "key", [arg1]),
    );
  }
  keys(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "keys", [arg1]),
    );
  }
  keyMember(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "keyMember", [arg1]),
    );
  }
  keyType(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "keyType", [arg1]),
    );
  }
  label(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "label", [arg1]),
    );
  }
  lag(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lag", [arg1]),
    );
  }
  language(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "language", [arg1]),
    );
  }
  large(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "large", [arg1]),
    );
  }
  last(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "last", [arg1]),
    );
  }
  lastValue(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lastValue", [arg1]),
    );
  }
  lateral(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lateral", [arg1]),
    );
  }
  lead(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lead", [arg1]),
    );
  }
  leading(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "leading", [arg1]),
    );
  }
  leakproof(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "leakproof", [arg1]),
    );
  }
  least(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "least", [arg1]),
    );
  }
  left(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "left", [arg1]),
    );
  }
  length(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "length", [arg1]),
    );
  }
  level(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "level", [arg1]),
    );
  }
  library(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "library", [arg1]),
    );
  }
  like(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "like", [arg1]),
    );
  }
  likeRegex(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "likeRegex", [arg1]),
    );
  }
  limit(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "limit", [arg1]),
    );
  }
  link(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "link", [arg1]),
    );
  }
  listagg(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "listagg", [arg1]),
    );
  }
  listen(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "listen", [arg1]),
    );
  }
  ln(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ln", [arg1]),
    );
  }
  load(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "load", [arg1]),
    );
  }
  local(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "local", [arg1]),
    );
  }
  localtime(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "localtime", [arg1]),
    );
  }
  localtimestamp(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "localtimestamp", [arg1]),
    );
  }
  location(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "location", [arg1]),
    );
  }
  locator(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "locator", [arg1]),
    );
  }
  lock(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lock", [arg1]),
    );
  }
  locked(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "locked", [arg1]),
    );
  }
  log(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "log", [arg1]),
    );
  }
  log10(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "log10", [arg1]),
    );
  }
  logged(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "logged", [arg1]),
    );
  }
  lower(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lower", [arg1]),
    );
  }
  lpad(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lpad", [arg1]),
    );
  }
  ltrim(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ltrim", [arg1]),
    );
  }
  m(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "m", [arg1]),
    );
  }
  map(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "map", [arg1]),
    );
  }
  mapping(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "mapping", [arg1]),
    );
  }
  match(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "match", [arg1]),
    );
  }
  matched(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "matched", [arg1]),
    );
  }
  matches(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "matches", [arg1]),
    );
  }
  matchNumber(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "matchNumber", [arg1]),
    );
  }
  matchRecognize(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "matchRecognize", [arg1]),
    );
  }
  materialized(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "materialized", [arg1]),
    );
  }
  max(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "max", [arg1]),
    );
  }
  maxvalue(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "maxvalue", [arg1]),
    );
  }
  measures(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "measures", [arg1]),
    );
  }
  member(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "member", [arg1]),
    );
  }
  merge(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "merge", [arg1]),
    );
  }
  mergeAction(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "mergeAction", [arg1]),
    );
  }
  messageLength(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "messageLength", [arg1]),
    );
  }
  messageOctetLength(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "messageOctetLength", [arg1]),
    );
  }
  messageText(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "messageText", [arg1]),
    );
  }
  method(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "method", [arg1]),
    );
  }
  min(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "min", [arg1]),
    );
  }
  minute(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "minute", [arg1]),
    );
  }
  minvalue(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "minvalue", [arg1]),
    );
  }
  mod(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "mod", [arg1]),
    );
  }
  mode(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "mode", [arg1]),
    );
  }
  modifies(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "modifies", [arg1]),
    );
  }
  module(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "module", [arg1]),
    );
  }
  month(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "month", [arg1]),
    );
  }
  more(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "more", [arg1]),
    );
  }
  move(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "move", [arg1]),
    );
  }
  multiset(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "multiset", [arg1]),
    );
  }
  mumps(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "mumps", [arg1]),
    );
  }
  name(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "name", [arg1]),
    );
  }
  names(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "names", [arg1]),
    );
  }
  namespace(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "namespace", [arg1]),
    );
  }
  national(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "national", [arg1]),
    );
  }
  natural(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "natural", [arg1]),
    );
  }
  nchar(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nchar", [arg1]),
    );
  }
  nclob(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nclob", [arg1]),
    );
  }
  nested(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nested", [arg1]),
    );
  }
  nesting(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nesting", [arg1]),
    );
  }
  new(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "new", [arg1]),
    );
  }
  next(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "next", [arg1]),
    );
  }
  nfc(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nfc", [arg1]),
    );
  }
  nfd(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nfd", [arg1]),
    );
  }
  nfkc(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nfkc", [arg1]),
    );
  }
  nfkd(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nfkd", [arg1]),
    );
  }
  nil(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nil", [arg1]),
    );
  }
  no(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "no", [arg1]),
    );
  }
  none(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "none", [arg1]),
    );
  }
  normalize(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "normalize", [arg1]),
    );
  }
  normalized(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "normalized", [arg1]),
    );
  }
  not(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "not", [arg1]),
    );
  }
  nothing(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nothing", [arg1]),
    );
  }
  notify(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "notify", [arg1]),
    );
  }
  notnull(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "notnull", [arg1]),
    );
  }
  nowait(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nowait", [arg1]),
    );
  }
  nthValue(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nthValue", [arg1]),
    );
  }
  ntile(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ntile", [arg1]),
    );
  }
  null(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "null", [arg1]),
    );
  }
  nullable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nullable", [arg1]),
    );
  }
  nullif(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nullif", [arg1]),
    );
  }
  nulls(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nulls", [arg1]),
    );
  }
  nullOrdering(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nullOrdering", [arg1]),
    );
  }
  number(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "number", [arg1]),
    );
  }
  numeric(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "numeric", [arg1]),
    );
  }
  object(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "object", [arg1]),
    );
  }
  objects(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "objects", [arg1]),
    );
  }
  occurrence(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "occurrence", [arg1]),
    );
  }
  occurrencesRegex(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "occurrencesRegex", [arg1]),
    );
  }
  octets(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "octets", [arg1]),
    );
  }
  octetLength(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "octetLength", [arg1]),
    );
  }
  of(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "of", [arg1]),
    );
  }
  off(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "off", [arg1]),
    );
  }
  offset(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "offset", [arg1]),
    );
  }
  oids(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "oids", [arg1]),
    );
  }
  old(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "old", [arg1]),
    );
  }
  omit(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "omit", [arg1]),
    );
  }
  on(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "on", [arg1]),
    );
  }
  one(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "one", [arg1]),
    );
  }
  only(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "only", [arg1]),
    );
  }
  open(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "open", [arg1]),
    );
  }
  operator(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "operator", [arg1]),
    );
  }
  option(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "option", [arg1]),
    );
  }
  options(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "options", [arg1]),
    );
  }
  or(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "or", [arg1]),
    );
  }
  order(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "order", [arg1]),
    );
  }
  ordering(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ordering", [arg1]),
    );
  }
  ordinality(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ordinality", [arg1]),
    );
  }
  others(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "others", [arg1]),
    );
  }
  out(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "out", [arg1]),
    );
  }
  outer(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "outer", [arg1]),
    );
  }
  output(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "output", [arg1]),
    );
  }
  over(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "over", [arg1]),
    );
  }
  overflow(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "overflow", [arg1]),
    );
  }
  overlaps(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "overlaps", [arg1]),
    );
  }
  overlay(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "overlay", [arg1]),
    );
  }
  overriding(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "overriding", [arg1]),
    );
  }
  owned(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "owned", [arg1]),
    );
  }
  owner(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "owner", [arg1]),
    );
  }
  p(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "p", [arg1]),
    );
  }
  pad(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pad", [arg1]),
    );
  }
  parallel(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parallel", [arg1]),
    );
  }
  parameter(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameter", [arg1]),
    );
  }
  parameterMode(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterMode", [arg1]),
    );
  }
  parameterName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterName", [arg1]),
    );
  }
  parameterOrdinalPosition(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterOrdinalPosition", [arg1]),
    );
  }
  parameterSpecificCatalog(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterSpecificCatalog", [arg1]),
    );
  }
  parameterSpecificName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterSpecificName", [arg1]),
    );
  }
  parameterSpecificSchema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterSpecificSchema", [arg1]),
    );
  }
  parser(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parser", [arg1]),
    );
  }
  partial(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "partial", [arg1]),
    );
  }
  partition(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "partition", [arg1]),
    );
  }
  pascal(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pascal", [arg1]),
    );
  }
  pass(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pass", [arg1]),
    );
  }
  passing(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "passing", [arg1]),
    );
  }
  passthrough(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "passthrough", [arg1]),
    );
  }
  password(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "password", [arg1]),
    );
  }
  past(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "past", [arg1]),
    );
  }
  path(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "path", [arg1]),
    );
  }
  pattern(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pattern", [arg1]),
    );
  }
  per(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "per", [arg1]),
    );
  }
  percent(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "percent", [arg1]),
    );
  }
  percentileCont(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "percentileCont", [arg1]),
    );
  }
  percentileDisc(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "percentileDisc", [arg1]),
    );
  }
  percentRank(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "percentRank", [arg1]),
    );
  }
  period(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "period", [arg1]),
    );
  }
  permission(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "permission", [arg1]),
    );
  }
  permute(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "permute", [arg1]),
    );
  }
  pipe(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pipe", [arg1]),
    );
  }
  placing(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "placing", [arg1]),
    );
  }
  plan(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "plan", [arg1]),
    );
  }
  plans(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "plans", [arg1]),
    );
  }
  pli(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pli", [arg1]),
    );
  }
  policy(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "policy", [arg1]),
    );
  }
  portion(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "portion", [arg1]),
    );
  }
  position(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "position", [arg1]),
    );
  }
  positionRegex(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "positionRegex", [arg1]),
    );
  }
  power(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "power", [arg1]),
    );
  }
  precedes(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "precedes", [arg1]),
    );
  }
  preceding(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "preceding", [arg1]),
    );
  }
  precision(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "precision", [arg1]),
    );
  }
  prepare(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "prepare", [arg1]),
    );
  }
  prepared(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "prepared", [arg1]),
    );
  }
  preserve(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "preserve", [arg1]),
    );
  }
  prev(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "prev", [arg1]),
    );
  }
  primary(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "primary", [arg1]),
    );
  }
  prior(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "prior", [arg1]),
    );
  }
  private(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "private", [arg1]),
    );
  }
  privileges(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "privileges", [arg1]),
    );
  }
  procedural(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "procedural", [arg1]),
    );
  }
  procedure(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "procedure", [arg1]),
    );
  }
  procedures(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "procedures", [arg1]),
    );
  }
  program(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "program", [arg1]),
    );
  }
  prune(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "prune", [arg1]),
    );
  }
  ptf(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ptf", [arg1]),
    );
  }
  public(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "public", [arg1]),
    );
  }
  publication(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "publication", [arg1]),
    );
  }
  quote(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "quote", [arg1]),
    );
  }
  quotes(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "quotes", [arg1]),
    );
  }
  range(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "range", [arg1]),
    );
  }
  rank(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rank", [arg1]),
    );
  }
  read(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "read", [arg1]),
    );
  }
  reads(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "reads", [arg1]),
    );
  }
  real(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "real", [arg1]),
    );
  }
  reassign(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "reassign", [arg1]),
    );
  }
  recovery(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "recovery", [arg1]),
    );
  }
  recursive(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "recursive", [arg1]),
    );
  }
  ref(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ref", [arg1]),
    );
  }
  references(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "references", [arg1]),
    );
  }
  referencing(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "referencing", [arg1]),
    );
  }
  refresh(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "refresh", [arg1]),
    );
  }
  regrAvgx(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrAvgx", [arg1]),
    );
  }
  regrAvgy(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrAvgy", [arg1]),
    );
  }
  regrCount(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrCount", [arg1]),
    );
  }
  regrIntercept(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrIntercept", [arg1]),
    );
  }
  regrR2(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrR2", [arg1]),
    );
  }
  regrSlope(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrSlope", [arg1]),
    );
  }
  regrSxx(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrSxx", [arg1]),
    );
  }
  regrSxy(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrSxy", [arg1]),
    );
  }
  regrSyy(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrSyy", [arg1]),
    );
  }
  reindex(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "reindex", [arg1]),
    );
  }
  relative(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "relative", [arg1]),
    );
  }
  release(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "release", [arg1]),
    );
  }
  rename(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rename", [arg1]),
    );
  }
  repeatable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "repeatable", [arg1]),
    );
  }
  replace(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "replace", [arg1]),
    );
  }
  replica(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "replica", [arg1]),
    );
  }
  requiring(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "requiring", [arg1]),
    );
  }
  reset(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "reset", [arg1]),
    );
  }
  respect(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "respect", [arg1]),
    );
  }
  restart(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "restart", [arg1]),
    );
  }
  restore(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "restore", [arg1]),
    );
  }
  restrict(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "restrict", [arg1]),
    );
  }
  result(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "result", [arg1]),
    );
  }
  return(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "return", [arg1]),
    );
  }
  returnedCardinality(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returnedCardinality", [arg1]),
    );
  }
  returnedLength(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returnedLength", [arg1]),
    );
  }
  returnedOctetLength(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returnedOctetLength", [arg1]),
    );
  }
  returnedSqlstate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returnedSqlstate", [arg1]),
    );
  }
  returning(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returning", [arg1]),
    );
  }
  returns(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returns", [arg1]),
    );
  }
  revoke(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "revoke", [arg1]),
    );
  }
  right(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "right", [arg1]),
    );
  }
  role(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "role", [arg1]),
    );
  }
  rollback(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rollback", [arg1]),
    );
  }
  rollup(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rollup", [arg1]),
    );
  }
  routine(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "routine", [arg1]),
    );
  }
  routines(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "routines", [arg1]),
    );
  }
  routineCatalog(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "routineCatalog", [arg1]),
    );
  }
  routineName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "routineName", [arg1]),
    );
  }
  routineSchema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "routineSchema", [arg1]),
    );
  }
  row(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "row", [arg1]),
    );
  }
  rows(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rows", [arg1]),
    );
  }
  rowCount(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rowCount", [arg1]),
    );
  }
  rowNumber(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rowNumber", [arg1]),
    );
  }
  rpad(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rpad", [arg1]),
    );
  }
  rtrim(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rtrim", [arg1]),
    );
  }
  rule(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rule", [arg1]),
    );
  }
  running(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "running", [arg1]),
    );
  }
  savepoint(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "savepoint", [arg1]),
    );
  }
  scalar(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scalar", [arg1]),
    );
  }
  scale(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scale", [arg1]),
    );
  }
  schema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "schema", [arg1]),
    );
  }
  schemas(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "schemas", [arg1]),
    );
  }
  schemaName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "schemaName", [arg1]),
    );
  }
  scope(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scope", [arg1]),
    );
  }
  scopeCatalog(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scopeCatalog", [arg1]),
    );
  }
  scopeName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scopeName", [arg1]),
    );
  }
  scopeSchema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scopeSchema", [arg1]),
    );
  }
  scroll(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scroll", [arg1]),
    );
  }
  search(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "search", [arg1]),
    );
  }
  second(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "second", [arg1]),
    );
  }
  section(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "section", [arg1]),
    );
  }
  security(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "security", [arg1]),
    );
  }
  seek(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "seek", [arg1]),
    );
  }
  select(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "select", [arg1]),
    );
  }
  selective(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "selective", [arg1]),
    );
  }
  self(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "self", [arg1]),
    );
  }
  semantics(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "semantics", [arg1]),
    );
  }
  sensitive(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sensitive", [arg1]),
    );
  }
  sequence(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sequence", [arg1]),
    );
  }
  sequences(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sequences", [arg1]),
    );
  }
  serializable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "serializable", [arg1]),
    );
  }
  server(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "server", [arg1]),
    );
  }
  serverName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "serverName", [arg1]),
    );
  }
  session(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "session", [arg1]),
    );
  }
  sessionUser(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sessionUser", [arg1]),
    );
  }
  set(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "set", [arg1]),
    );
  }
  setof(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "setof", [arg1]),
    );
  }
  sets(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sets", [arg1]),
    );
  }
  share(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "share", [arg1]),
    );
  }
  show(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "show", [arg1]),
    );
  }
  similar(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "similar", [arg1]),
    );
  }
  simple(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "simple", [arg1]),
    );
  }
  sin(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sin", [arg1]),
    );
  }
  sinh(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sinh", [arg1]),
    );
  }
  size(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "size", [arg1]),
    );
  }
  skip(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "skip", [arg1]),
    );
  }
  smallint(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "smallint", [arg1]),
    );
  }
  snapshot(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "snapshot", [arg1]),
    );
  }
  some(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "some", [arg1]),
    );
  }
  sortDirection(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sortDirection", [arg1]),
    );
  }
  source(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "source", [arg1]),
    );
  }
  space(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "space", [arg1]),
    );
  }
  specific(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "specific", [arg1]),
    );
  }
  specifictype(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "specifictype", [arg1]),
    );
  }
  specificName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "specificName", [arg1]),
    );
  }
  sql(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sql", [arg1]),
    );
  }
  sqlcode(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqlcode", [arg1]),
    );
  }
  sqlerror(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqlerror", [arg1]),
    );
  }
  sqlexception(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqlexception", [arg1]),
    );
  }
  sqlstate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqlstate", [arg1]),
    );
  }
  sqlwarning(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqlwarning", [arg1]),
    );
  }
  sqrt(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqrt", [arg1]),
    );
  }
  stable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stable", [arg1]),
    );
  }
  standalone(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "standalone", [arg1]),
    );
  }
  start(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "start", [arg1]),
    );
  }
  state(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "state", [arg1]),
    );
  }
  statement(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "statement", [arg1]),
    );
  }
  static(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "static", [arg1]),
    );
  }
  statistics(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "statistics", [arg1]),
    );
  }
  stddevPop(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stddevPop", [arg1]),
    );
  }
  stddevSamp(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stddevSamp", [arg1]),
    );
  }
  stdin(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stdin", [arg1]),
    );
  }
  stdout(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stdout", [arg1]),
    );
  }
  storage(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "storage", [arg1]),
    );
  }
  stored(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stored", [arg1]),
    );
  }
  strict(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "strict", [arg1]),
    );
  }
  string(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "string", [arg1]),
    );
  }
  strip(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "strip", [arg1]),
    );
  }
  structure(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "structure", [arg1]),
    );
  }
  style(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "style", [arg1]),
    );
  }
  subclassOrigin(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "subclassOrigin", [arg1]),
    );
  }
  submultiset(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "submultiset", [arg1]),
    );
  }
  subscription(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "subscription", [arg1]),
    );
  }
  subset(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "subset", [arg1]),
    );
  }
  substring(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "substring", [arg1]),
    );
  }
  substringRegex(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "substringRegex", [arg1]),
    );
  }
  succeeds(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "succeeds", [arg1]),
    );
  }
  sum(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sum", [arg1]),
    );
  }
  support(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "support", [arg1]),
    );
  }
  symmetric(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "symmetric", [arg1]),
    );
  }
  sysid(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sysid", [arg1]),
    );
  }
  system(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "system", [arg1]),
    );
  }
  systemTime(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "systemTime", [arg1]),
    );
  }
  systemUser(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "systemUser", [arg1]),
    );
  }
  t(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "t", [arg1]),
    );
  }
  table(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "table", [arg1]),
    );
  }
  tables(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tables", [arg1]),
    );
  }
  tablesample(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tablesample", [arg1]),
    );
  }
  tablespace(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tablespace", [arg1]),
    );
  }
  tableName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tableName", [arg1]),
    );
  }
  tan(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tan", [arg1]),
    );
  }
  tanh(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tanh", [arg1]),
    );
  }
  target(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "target", [arg1]),
    );
  }
  temp(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "temp", [arg1]),
    );
  }
  template(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "template", [arg1]),
    );
  }
  temporary(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "temporary", [arg1]),
    );
  }
  text(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "text", [arg1]),
    );
  }
  then(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "then", [arg1]),
    );
  }
  through(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "through", [arg1]),
    );
  }
  ties(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ties", [arg1]),
    );
  }
  time(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "time", [arg1]),
    );
  }
  timestamp(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "timestamp", [arg1]),
    );
  }
  timezoneHour(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "timezoneHour", [arg1]),
    );
  }
  timezoneMinute(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "timezoneMinute", [arg1]),
    );
  }
  to(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "to", [arg1]),
    );
  }
  token(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "token", [arg1]),
    );
  }
  topLevelCount(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "topLevelCount", [arg1]),
    );
  }
  trailing(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "trailing", [arg1]),
    );
  }
  transaction(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transaction", [arg1]),
    );
  }
  transactionsCommitted(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transactionsCommitted", [arg1]),
    );
  }
  transactionsRolledBack(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transactionsRolledBack", [arg1]),
    );
  }
  transactionActive(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transactionActive", [arg1]),
    );
  }
  transform(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transform", [arg1]),
    );
  }
  transforms(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transforms", [arg1]),
    );
  }
  translate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "translate", [arg1]),
    );
  }
  translateRegex(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "translateRegex", [arg1]),
    );
  }
  translation(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "translation", [arg1]),
    );
  }
  treat(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "treat", [arg1]),
    );
  }
  trigger(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "trigger", [arg1]),
    );
  }
  triggerCatalog(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "triggerCatalog", [arg1]),
    );
  }
  triggerName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "triggerName", [arg1]),
    );
  }
  triggerSchema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "triggerSchema", [arg1]),
    );
  }
  trim(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "trim", [arg1]),
    );
  }
  trimArray(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "trimArray", [arg1]),
    );
  }
  true(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "true", [arg1]),
    );
  }
  truncate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "truncate", [arg1]),
    );
  }
  trusted(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "trusted", [arg1]),
    );
  }
  type(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "type", [arg1]),
    );
  }
  types(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "types", [arg1]),
    );
  }
  uescape(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "uescape", [arg1]),
    );
  }
  unbounded(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unbounded", [arg1]),
    );
  }
  uncommitted(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "uncommitted", [arg1]),
    );
  }
  unconditional(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unconditional", [arg1]),
    );
  }
  under(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "under", [arg1]),
    );
  }
  unencrypted(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unencrypted", [arg1]),
    );
  }
  union(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "union", [arg1]),
    );
  }
  unique(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unique", [arg1]),
    );
  }
  unknown(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unknown", [arg1]),
    );
  }
  unlink(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unlink", [arg1]),
    );
  }
  unlisten(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unlisten", [arg1]),
    );
  }
  unlogged(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unlogged", [arg1]),
    );
  }
  unmatched(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unmatched", [arg1]),
    );
  }
  unnamed(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unnamed", [arg1]),
    );
  }
  unnest(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unnest", [arg1]),
    );
  }
  until(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "until", [arg1]),
    );
  }
  untyped(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "untyped", [arg1]),
    );
  }
  update(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "update", [arg1]),
    );
  }
  upper(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "upper", [arg1]),
    );
  }
  uri(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "uri", [arg1]),
    );
  }
  usage(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "usage", [arg1]),
    );
  }
  user(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "user", [arg1]),
    );
  }
  userDefinedTypeCatalog(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "userDefinedTypeCatalog", [arg1]),
    );
  }
  userDefinedTypeCode(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "userDefinedTypeCode", [arg1]),
    );
  }
  userDefinedTypeName(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "userDefinedTypeName", [arg1]),
    );
  }
  userDefinedTypeSchema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "userDefinedTypeSchema", [arg1]),
    );
  }
  using(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "using", [arg1]),
    );
  }
  utf16(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "utf16", [arg1]),
    );
  }
  utf32(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "utf32", [arg1]),
    );
  }
  utf8(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "utf8", [arg1]),
    );
  }
  vacuum(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "vacuum", [arg1]),
    );
  }
  valid(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "valid", [arg1]),
    );
  }
  validate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "validate", [arg1]),
    );
  }
  validator(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "validator", [arg1]),
    );
  }
  value(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "value", [arg1]),
    );
  }
  values(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "values", [arg1]),
    );
  }
  valueOf(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "valueOf", [arg1]),
    );
  }
  varbinary(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "varbinary", [arg1]),
    );
  }
  varchar(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "varchar", [arg1]),
    );
  }
  variadic(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "variadic", [arg1]),
    );
  }
  varying(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "varying", [arg1]),
    );
  }
  varPop(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "varPop", [arg1]),
    );
  }
  varSamp(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "varSamp", [arg1]),
    );
  }
  verbose(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "verbose", [arg1]),
    );
  }
  version(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "version", [arg1]),
    );
  }
  versioning(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "versioning", [arg1]),
    );
  }
  view(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "view", [arg1]),
    );
  }
  views(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "views", [arg1]),
    );
  }
  virtual(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "virtual", [arg1]),
    );
  }
  volatile(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "volatile", [arg1]),
    );
  }
  when(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "when", [arg1]),
    );
  }
  whenever(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "whenever", [arg1]),
    );
  }
  where(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "where", [arg1]),
    );
  }
  whitespace(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "whitespace", [arg1]),
    );
  }
  widthBucket(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "widthBucket", [arg1]),
    );
  }
  window(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "window", [arg1]),
    );
  }
  with(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "with", [arg1]),
    );
  }
  within(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "within", [arg1]),
    );
  }
  without(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "without", [arg1]),
    );
  }
  work(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "work", [arg1]),
    );
  }
  wrapper(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "wrapper", [arg1]),
    );
  }
  write(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "write", [arg1]),
    );
  }
  xml(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xml", [arg1]),
    );
  }
  xmlagg(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlagg", [arg1]),
    );
  }
  xmlattributes(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlattributes", [arg1]),
    );
  }
  xmlbinary(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlbinary", [arg1]),
    );
  }
  xmlcast(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlcast", [arg1]),
    );
  }
  xmlcomment(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlcomment", [arg1]),
    );
  }
  xmlconcat(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlconcat", [arg1]),
    );
  }
  xmldeclaration(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmldeclaration", [arg1]),
    );
  }
  xmldocument(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmldocument", [arg1]),
    );
  }
  xmlelement(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlelement", [arg1]),
    );
  }
  xmlexists(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlexists", [arg1]),
    );
  }
  xmlforest(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlforest", [arg1]),
    );
  }
  xmliterate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmliterate", [arg1]),
    );
  }
  xmlnamespaces(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlnamespaces", [arg1]),
    );
  }
  xmlparse(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlparse", [arg1]),
    );
  }
  xmlpi(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlpi", [arg1]),
    );
  }
  xmlquery(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlquery", [arg1]),
    );
  }
  xmlroot(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlroot", [arg1]),
    );
  }
  xmlschema(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlschema", [arg1]),
    );
  }
  xmlserialize(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlserialize", [arg1]),
    );
  }
  xmltable(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmltable", [arg1]),
    );
  }
  xmltext(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmltext", [arg1]),
    );
  }
  xmlvalidate(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlvalidate", [arg1]),
    );
  }
  year(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "year", [arg1]),
    );
  }
  yes(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "yes", [arg1]),
    );
  }
  zone(arg1?: QueryBuilder): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "zone", [arg1]),
    );
  }
}
