// Auto-generated definition for query-builder
import {} from "./query-builder.ts";
import type { SchemaType } from "./base-types.ts";
import { createSchema } from "./base-utils.ts";

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
            importString: "",
          },
        },
      },
    },
  };
  getSchema(exportName?: string, importString?: string): SchemaType {
    if (exportName) {
      this.schemaQueryBuilder.schema.exportName = exportName;
    }
    if (importString) {
      this.schemaQueryBuilder.schema.chain.chain.initFunction.importString =
        importString;
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
  a(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "a", [], false),
    );
  }
  abort(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "abort", [], false),
    );
  }
  abs(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "abs", [], false),
    );
  }
  absent(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "absent", [], false),
    );
  }
  absolute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "absolute", [], false),
    );
  }
  access(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "access", [], false),
    );
  }
  according(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "according", [], false),
    );
  }
  acos(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "acos", [], false),
    );
  }
  action(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "action", [], false),
    );
  }
  ada(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ada", [], false),
    );
  }
  add(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "add", [], false),
    );
  }
  admin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "admin", [], false),
    );
  }
  after(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "after", [], false),
    );
  }
  aggregate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "aggregate", [], false),
    );
  }
  all(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "all", [], false),
    );
  }
  allocate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "allocate", [], false),
    );
  }
  also(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "also", [], false),
    );
  }
  alter(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "alter", [], false),
    );
  }
  always(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "always", [], false),
    );
  }
  analyse(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "analyse", [], false),
    );
  }
  analyze(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "analyze", [], false),
    );
  }
  and(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "and", [], false),
    );
  }
  any(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "any", [], false),
    );
  }
  anyValue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "anyValue", [], false),
    );
  }
  are(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "are", [], false),
    );
  }
  array(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "array", [], false),
    );
  }
  arrayAgg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "arrayAgg", [], false),
    );
  }
  arrayMaxCardinality(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "arrayMaxCardinality", [], false),
    );
  }
  as(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "as", [], false),
    );
  }
  asc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "asc", [], false),
    );
  }
  asensitive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "asensitive", [], false),
    );
  }
  asin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "asin", [], false),
    );
  }
  assertion(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "assertion", [], false),
    );
  }
  assignment(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "assignment", [], false),
    );
  }
  asymmetric(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "asymmetric", [], false),
    );
  }
  at(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "at", [], false),
    );
  }
  atan(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "atan", [], false),
    );
  }
  atomic(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "atomic", [], false),
    );
  }
  attach(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "attach", [], false),
    );
  }
  attribute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "attribute", [], false),
    );
  }
  attributes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "attributes", [], false),
    );
  }
  authorization(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "authorization", [], false),
    );
  }
  avg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "avg", [], false),
    );
  }
  backward(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "backward", [], false),
    );
  }
  base64(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "base64", [], false),
    );
  }
  before(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "before", [], false),
    );
  }
  begin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "begin", [], false),
    );
  }
  beginFrame(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "beginFrame", [], false),
    );
  }
  beginPartition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "beginPartition", [], false),
    );
  }
  bernoulli(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "bernoulli", [], false),
    );
  }
  between(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "between", [], false),
    );
  }
  bigint(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "bigint", [], false),
    );
  }
  binary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "binary", [], false),
    );
  }
  bit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "bit", [], false),
    );
  }
  bitLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "bitLength", [], false),
    );
  }
  blob(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "blob", [], false),
    );
  }
  blocked(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "blocked", [], false),
    );
  }
  bom(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "bom", [], false),
    );
  }
  boolean(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "boolean", [], false),
    );
  }
  both(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "both", [], false),
    );
  }
  breadth(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "breadth", [], false),
    );
  }
  btrim(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "btrim", [], false),
    );
  }
  by(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "by", [], false),
    );
  }
  c(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "c", [], false),
    );
  }
  cache(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cache", [], false),
    );
  }
  call(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "call", [], false),
    );
  }
  called(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "called", [], false),
    );
  }
  cardinality(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cardinality", [], false),
    );
  }
  cascade(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cascade", [], false),
    );
  }
  cascaded(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cascaded", [], false),
    );
  }
  case(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "case", [], false),
    );
  }
  cast(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cast", [], false),
    );
  }
  catalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "catalog", [], false),
    );
  }
  catalogName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "catalogName", [], false),
    );
  }
  ceil(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ceil", [], false),
    );
  }
  ceiling(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ceiling", [], false),
    );
  }
  chain(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "chain", [], false),
    );
  }
  chaining(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "chaining", [], false),
    );
  }
  char(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "char", [], false),
    );
  }
  character(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "character", [], false),
    );
  }
  characteristics(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "characteristics", [], false),
    );
  }
  characters(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "characters", [], false),
    );
  }
  characterLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "characterLength", [], false),
    );
  }
  characterSetCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "characterSetCatalog", [], false),
    );
  }
  characterSetName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "characterSetName", [], false),
    );
  }
  characterSetSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "characterSetSchema", [], false),
    );
  }
  charLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "charLength", [], false),
    );
  }
  check(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "check", [], false),
    );
  }
  checkpoint(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "checkpoint", [], false),
    );
  }
  class(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "class", [], false),
    );
  }
  classifier(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "classifier", [], false),
    );
  }
  classOrigin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "classOrigin", [], false),
    );
  }
  clob(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "clob", [], false),
    );
  }
  close(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "close", [], false),
    );
  }
  cluster(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cluster", [], false),
    );
  }
  coalesce(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "coalesce", [], false),
    );
  }
  cobol(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cobol", [], false),
    );
  }
  collate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "collate", [], false),
    );
  }
  collation(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "collation", [], false),
    );
  }
  collationCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "collationCatalog", [], false),
    );
  }
  collationName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "collationName", [], false),
    );
  }
  collationSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "collationSchema", [], false),
    );
  }
  collect(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "collect", [], false),
    );
  }
  column(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "column", [], false),
    );
  }
  columns(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "columns", [], false),
    );
  }
  columnName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "columnName", [], false),
    );
  }
  commandFunction(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "commandFunction", [], false),
    );
  }
  commandFunctionCode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "commandFunctionCode", [], false),
    );
  }
  comment(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "comment", [], false),
    );
  }
  comments(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "comments", [], false),
    );
  }
  commit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "commit", [], false),
    );
  }
  committed(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "committed", [], false),
    );
  }
  compression(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "compression", [], false),
    );
  }
  concurrently(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "concurrently", [], false),
    );
  }
  condition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "condition", [], false),
    );
  }
  conditional(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "conditional", [], false),
    );
  }
  conditionNumber(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "conditionNumber", [], false),
    );
  }
  configuration(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "configuration", [], false),
    );
  }
  conflict(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "conflict", [], false),
    );
  }
  connect(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "connect", [], false),
    );
  }
  connection(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "connection", [], false),
    );
  }
  connectionName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "connectionName", [], false),
    );
  }
  constraint(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "constraint", [], false),
    );
  }
  constraints(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "constraints", [], false),
    );
  }
  constraintCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "constraintCatalog", [], false),
    );
  }
  constraintName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "constraintName", [], false),
    );
  }
  constraintSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "constraintSchema", [], false),
    );
  }
  constructorKeyword(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "constructorKeyword", [], false),
    );
  }
  contains(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "contains", [], false),
    );
  }
  content(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "content", [], false),
    );
  }
  continue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "continue", [], false),
    );
  }
  control(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "control", [], false),
    );
  }
  conversion(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "conversion", [], false),
    );
  }
  convert(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "convert", [], false),
    );
  }
  copartition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "copartition", [], false),
    );
  }
  copy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "copy", [], false),
    );
  }
  corr(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "corr", [], false),
    );
  }
  corresponding(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "corresponding", [], false),
    );
  }
  cos(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cos", [], false),
    );
  }
  cosh(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cosh", [], false),
    );
  }
  cost(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cost", [], false),
    );
  }
  count(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "count", [], false),
    );
  }
  covarPop(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "covarPop", [], false),
    );
  }
  covarSamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "covarSamp", [], false),
    );
  }
  create(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "create", [], false),
    );
  }
  cross(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cross", [], false),
    );
  }
  csv(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "csv", [], false),
    );
  }
  cube(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cube", [], false),
    );
  }
  cumeDist(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cumeDist", [], false),
    );
  }
  current(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "current", [], false),
    );
  }
  currentCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentCatalog", [], false),
    );
  }
  currentDate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentDate", [], false),
    );
  }
  currentDefaultTransformGroup(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentDefaultTransformGroup", [], false),
    );
  }
  currentPath(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentPath", [], false),
    );
  }
  currentRole(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentRole", [], false),
    );
  }
  currentRow(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentRow", [], false),
    );
  }
  currentSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentSchema", [], false),
    );
  }
  currentTime(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentTime", [], false),
    );
  }
  currentTimestamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentTimestamp", [], false),
    );
  }
  currentTransformGroupForType(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentTransformGroupForType", [], false),
    );
  }
  currentUser(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "currentUser", [], false),
    );
  }
  cursor(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cursor", [], false),
    );
  }
  cursorName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cursorName", [], false),
    );
  }
  cycle(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "cycle", [], false),
    );
  }
  data(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "data", [], false),
    );
  }
  database(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "database", [], false),
    );
  }
  datalink(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "datalink", [], false),
    );
  }
  date(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "date", [], false),
    );
  }
  datetimeIntervalCode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "datetimeIntervalCode", [], false),
    );
  }
  datetimeIntervalPrecision(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "datetimeIntervalPrecision", [], false),
    );
  }
  day(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "day", [], false),
    );
  }
  db(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "db", [], false),
    );
  }
  deallocate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "deallocate", [], false),
    );
  }
  dec(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dec", [], false),
    );
  }
  decfloat(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "decfloat", [], false),
    );
  }
  decimal(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "decimal", [], false),
    );
  }
  declare(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "declare", [], false),
    );
  }
  default(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "default", [], false),
    );
  }
  defaults(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "defaults", [], false),
    );
  }
  deferrable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "deferrable", [], false),
    );
  }
  deferred(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "deferred", [], false),
    );
  }
  define(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "define", [], false),
    );
  }
  defined(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "defined", [], false),
    );
  }
  definer(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "definer", [], false),
    );
  }
  degree(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "degree", [], false),
    );
  }
  delete(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "delete", [], false),
    );
  }
  delimiter(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "delimiter", [], false),
    );
  }
  delimiters(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "delimiters", [], false),
    );
  }
  denseRank(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "denseRank", [], false),
    );
  }
  depends(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "depends", [], false),
    );
  }
  depth(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "depth", [], false),
    );
  }
  deref(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "deref", [], false),
    );
  }
  derived(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "derived", [], false),
    );
  }
  desc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "desc", [], false),
    );
  }
  describe(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "describe", [], false),
    );
  }
  descriptor(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "descriptor", [], false),
    );
  }
  detach(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "detach", [], false),
    );
  }
  deterministic(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "deterministic", [], false),
    );
  }
  diagnostics(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "diagnostics", [], false),
    );
  }
  dictionary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dictionary", [], false),
    );
  }
  disable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "disable", [], false),
    );
  }
  discard(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "discard", [], false),
    );
  }
  disconnect(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "disconnect", [], false),
    );
  }
  dispatch(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dispatch", [], false),
    );
  }
  distinct(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "distinct", [], false),
    );
  }
  dlnewcopy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlnewcopy", [], false),
    );
  }
  dlpreviouscopy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlpreviouscopy", [], false),
    );
  }
  dlurlcomplete(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlurlcomplete", [], false),
    );
  }
  dlurlcompleteonly(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlurlcompleteonly", [], false),
    );
  }
  dlurlcompletewrite(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlurlcompletewrite", [], false),
    );
  }
  dlurlpath(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlurlpath", [], false),
    );
  }
  dlurlpathonly(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlurlpathonly", [], false),
    );
  }
  dlurlpathwrite(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlurlpathwrite", [], false),
    );
  }
  dlurlscheme(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlurlscheme", [], false),
    );
  }
  dlurlserver(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlurlserver", [], false),
    );
  }
  dlvalue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dlvalue", [], false),
    );
  }
  do(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "do", [], false),
    );
  }
  document(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "document", [], false),
    );
  }
  domain(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "domain", [], false),
    );
  }
  double(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "double", [], false),
    );
  }
  drop(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "drop", [], false),
    );
  }
  dynamic(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dynamic", [], false),
    );
  }
  dynamicFunction(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dynamicFunction", [], false),
    );
  }
  dynamicFunctionCode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "dynamicFunctionCode", [], false),
    );
  }
  each(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "each", [], false),
    );
  }
  element(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "element", [], false),
    );
  }
  else(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "else", [], false),
    );
  }
  empty(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "empty", [], false),
    );
  }
  enable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "enable", [], false),
    );
  }
  encoding(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "encoding", [], false),
    );
  }
  encrypted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "encrypted", [], false),
    );
  }
  end(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "end", [], false),
    );
  }
  endExec(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "endExec", [], false),
    );
  }
  endFrame(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "endFrame", [], false),
    );
  }
  endPartition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "endPartition", [], false),
    );
  }
  enforced(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "enforced", [], false),
    );
  }
  enum(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "enum", [], false),
    );
  }
  equals(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "equals", [], false),
    );
  }
  error(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "error", [], false),
    );
  }
  escape(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "escape", [], false),
    );
  }
  event(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "event", [], false),
    );
  }
  every(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "every", [], false),
    );
  }
  except(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "except", [], false),
    );
  }
  exception(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "exception", [], false),
    );
  }
  exclude(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "exclude", [], false),
    );
  }
  excluding(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "excluding", [], false),
    );
  }
  exclusive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "exclusive", [], false),
    );
  }
  exec(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "exec", [], false),
    );
  }
  execute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "execute", [], false),
    );
  }
  exists(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "exists", [], false),
    );
  }
  exp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "exp", [], false),
    );
  }
  explain(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "explain", [], false),
    );
  }
  expression(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "expression", [], false),
    );
  }
  extension(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "extension", [], false),
    );
  }
  external(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "external", [], false),
    );
  }
  extract(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "extract", [], false),
    );
  }
  false(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "false", [], false),
    );
  }
  family(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "family", [], false),
    );
  }
  fetch(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "fetch", [], false),
    );
  }
  file(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "file", [], false),
    );
  }
  filter(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "filter", [], false),
    );
  }
  final(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "final", [], false),
    );
  }
  finalize(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "finalize", [], false),
    );
  }
  finish(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "finish", [], false),
    );
  }
  first(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "first", [], false),
    );
  }
  firstValue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "firstValue", [], false),
    );
  }
  flag(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "flag", [], false),
    );
  }
  float(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "float", [], false),
    );
  }
  floor(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "floor", [], false),
    );
  }
  following(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "following", [], false),
    );
  }
  for(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "for", [], false),
    );
  }
  force(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "force", [], false),
    );
  }
  foreign(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "foreign", [], false),
    );
  }
  format(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "format", [], false),
    );
  }
  fortran(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "fortran", [], false),
    );
  }
  forward(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "forward", [], false),
    );
  }
  found(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "found", [], false),
    );
  }
  frameRow(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "frameRow", [], false),
    );
  }
  free(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "free", [], false),
    );
  }
  freeze(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "freeze", [], false),
    );
  }
  from(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "from", [], false),
    );
  }
  fs(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "fs", [], false),
    );
  }
  fulfill(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "fulfill", [], false),
    );
  }
  full(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "full", [], false),
    );
  }
  function(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "function", [], false),
    );
  }
  functions(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "functions", [], false),
    );
  }
  fusion(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "fusion", [], false),
    );
  }
  g(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "g", [], false),
    );
  }
  general(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "general", [], false),
    );
  }
  generated(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "generated", [], false),
    );
  }
  get(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "get", [], false),
    );
  }
  global(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "global", [], false),
    );
  }
  go(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "go", [], false),
    );
  }
  goto(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "goto", [], false),
    );
  }
  grant(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "grant", [], false),
    );
  }
  granted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "granted", [], false),
    );
  }
  greatest(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "greatest", [], false),
    );
  }
  group(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "group", [], false),
    );
  }
  grouping(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "grouping", [], false),
    );
  }
  groups(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "groups", [], false),
    );
  }
  handler(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "handler", [], false),
    );
  }
  having(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "having", [], false),
    );
  }
  header(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "header", [], false),
    );
  }
  hex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "hex", [], false),
    );
  }
  hierarchy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "hierarchy", [], false),
    );
  }
  hold(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "hold", [], false),
    );
  }
  hour(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "hour", [], false),
    );
  }
  id(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "id", [], false),
    );
  }
  identity(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "identity", [], false),
    );
  }
  if(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "if", [], false),
    );
  }
  ignore(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ignore", [], false),
    );
  }
  ilike(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ilike", [], false),
    );
  }
  immediate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "immediate", [], false),
    );
  }
  immediately(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "immediately", [], false),
    );
  }
  immutable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "immutable", [], false),
    );
  }
  implementation(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "implementation", [], false),
    );
  }
  implicit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "implicit", [], false),
    );
  }
  import(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "import", [], false),
    );
  }
  in(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "in", [], false),
    );
  }
  include(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "include", [], false),
    );
  }
  including(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "including", [], false),
    );
  }
  increment(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "increment", [], false),
    );
  }
  indent(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "indent", [], false),
    );
  }
  index(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "index", [], false),
    );
  }
  indexes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "indexes", [], false),
    );
  }
  indicator(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "indicator", [], false),
    );
  }
  inherit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "inherit", [], false),
    );
  }
  inherits(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "inherits", [], false),
    );
  }
  initial(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "initial", [], false),
    );
  }
  initially(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "initially", [], false),
    );
  }
  inline(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "inline", [], false),
    );
  }
  inner(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "inner", [], false),
    );
  }
  inout(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "inout", [], false),
    );
  }
  input(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "input", [], false),
    );
  }
  insensitive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "insensitive", [], false),
    );
  }
  insert(
    table: (QueryBuilder | string | number | boolean | null) | null = null,
    values:
      | { [key: string]: QueryBuilder | string | number | boolean | null }
      | { [key: string]: QueryBuilder | string | number | boolean | null }[]
      | null = null,
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "insert",
        [
          {
            arg: table,
            struct: {
              union: {
                types: [
                  {
                    union: {
                      types: [
                        { structureCall: { name: "query-builder" } },
                        { string: { type: "string" } },
                        { number: { type: "number" } },
                        { boolean: { type: "boolean" } },
                        { null: { type: "null" } },
                      ],
                    },
                  },
                  { null: { type: "null" } },
                ],
              },
            },
            default: { null: { value: null } },
          },
          {
            arg: values,
            struct: {
              union: {
                types: [
                  {
                    map: {
                      type: {
                        union: {
                          types: [
                            { structureCall: { name: "query-builder" } },
                            { string: { type: "string" } },
                            { number: { type: "number" } },
                            { boolean: { type: "boolean" } },
                            { null: { type: "null" } },
                          ],
                        },
                      },
                    },
                  },
                  {
                    array: {
                      type: {
                        map: {
                          type: {
                            union: {
                              types: [
                                { structureCall: { name: "query-builder" } },
                                { string: { type: "string" } },
                                { number: { type: "number" } },
                                { boolean: { type: "boolean" } },
                                { null: { type: "null" } },
                              ],
                            },
                          },
                        },
                      },
                    },
                  },
                  { null: { type: "null" } },
                ],
              },
            },
            default: { null: { value: null } },
          },
        ],
        false,
      ),
    );
  }
  instance(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "instance", [], false),
    );
  }
  instantiable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "instantiable", [], false),
    );
  }
  instead(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "instead", [], false),
    );
  }
  int(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "int", [], false),
    );
  }
  integer(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "integer", [], false),
    );
  }
  integrity(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "integrity", [], false),
    );
  }
  intersect(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "intersect", [], false),
    );
  }
  intersection(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "intersection", [], false),
    );
  }
  interval(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "interval", [], false),
    );
  }
  into(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "into", [], false),
    );
  }
  invoker(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "invoker", [], false),
    );
  }
  is(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "is", [], false),
    );
  }
  isnull(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "isnull", [], false),
    );
  }
  isolation(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "isolation", [], false),
    );
  }
  join(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "join", [], false),
    );
  }
  json(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "json", [], false),
    );
  }
  jsonArray(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonArray", [], false),
    );
  }
  jsonArrayagg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonArrayagg", [], false),
    );
  }
  jsonExists(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonExists", [], false),
    );
  }
  jsonObject(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonObject", [], false),
    );
  }
  jsonObjectagg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonObjectagg", [], false),
    );
  }
  jsonQuery(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonQuery", [], false),
    );
  }
  jsonScalar(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonScalar", [], false),
    );
  }
  jsonSerialize(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonSerialize", [], false),
    );
  }
  jsonTable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonTable", [], false),
    );
  }
  jsonTablePrimitive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonTablePrimitive", [], false),
    );
  }
  jsonValue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "jsonValue", [], false),
    );
  }
  k(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "k", [], false),
    );
  }
  keep(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "keep", [], false),
    );
  }
  key(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "key", [], false),
    );
  }
  keys(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "keys", [], false),
    );
  }
  keyMember(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "keyMember", [], false),
    );
  }
  keyType(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "keyType", [], false),
    );
  }
  label(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "label", [], false),
    );
  }
  lag(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "lag", [], false),
    );
  }
  language(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "language", [], false),
    );
  }
  large(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "large", [], false),
    );
  }
  last(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "last", [], false),
    );
  }
  lastValue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "lastValue", [], false),
    );
  }
  lateral(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "lateral", [], false),
    );
  }
  lead(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "lead", [], false),
    );
  }
  leading(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "leading", [], false),
    );
  }
  leakproof(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "leakproof", [], false),
    );
  }
  least(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "least", [], false),
    );
  }
  left(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "left", [], false),
    );
  }
  length(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "length", [], false),
    );
  }
  level(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "level", [], false),
    );
  }
  library(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "library", [], false),
    );
  }
  like(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "like", [], false),
    );
  }
  likeRegex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "likeRegex", [], false),
    );
  }
  limit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "limit", [], false),
    );
  }
  link(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "link", [], false),
    );
  }
  listagg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "listagg", [], false),
    );
  }
  listen(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "listen", [], false),
    );
  }
  ln(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ln", [], false),
    );
  }
  load(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "load", [], false),
    );
  }
  local(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "local", [], false),
    );
  }
  localtime(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "localtime", [], false),
    );
  }
  localtimestamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "localtimestamp", [], false),
    );
  }
  location(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "location", [], false),
    );
  }
  locator(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "locator", [], false),
    );
  }
  lock(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "lock", [], false),
    );
  }
  locked(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "locked", [], false),
    );
  }
  log(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "log", [], false),
    );
  }
  log10(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "log10", [], false),
    );
  }
  logged(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "logged", [], false),
    );
  }
  lower(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "lower", [], false),
    );
  }
  lpad(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "lpad", [], false),
    );
  }
  ltrim(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ltrim", [], false),
    );
  }
  m(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "m", [], false),
    );
  }
  map(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "map", [], false),
    );
  }
  mapping(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "mapping", [], false),
    );
  }
  match(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "match", [], false),
    );
  }
  matched(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "matched", [], false),
    );
  }
  matches(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "matches", [], false),
    );
  }
  matchNumber(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "matchNumber", [], false),
    );
  }
  matchRecognize(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "matchRecognize", [], false),
    );
  }
  materialized(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "materialized", [], false),
    );
  }
  max(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "max", [], false),
    );
  }
  maxvalue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "maxvalue", [], false),
    );
  }
  measures(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "measures", [], false),
    );
  }
  member(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "member", [], false),
    );
  }
  merge(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "merge", [], false),
    );
  }
  mergeAction(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "mergeAction", [], false),
    );
  }
  messageLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "messageLength", [], false),
    );
  }
  messageOctetLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "messageOctetLength", [], false),
    );
  }
  messageText(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "messageText", [], false),
    );
  }
  method(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "method", [], false),
    );
  }
  min(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "min", [], false),
    );
  }
  minute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "minute", [], false),
    );
  }
  minvalue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "minvalue", [], false),
    );
  }
  mod(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "mod", [], false),
    );
  }
  mode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "mode", [], false),
    );
  }
  modifies(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "modifies", [], false),
    );
  }
  module(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "module", [], false),
    );
  }
  month(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "month", [], false),
    );
  }
  more(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "more", [], false),
    );
  }
  move(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "move", [], false),
    );
  }
  multiset(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "multiset", [], false),
    );
  }
  mumps(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "mumps", [], false),
    );
  }
  name(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "name", [], false),
    );
  }
  names(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "names", [], false),
    );
  }
  namespace(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "namespace", [], false),
    );
  }
  national(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "national", [], false),
    );
  }
  natural(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "natural", [], false),
    );
  }
  nchar(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nchar", [], false),
    );
  }
  nclob(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nclob", [], false),
    );
  }
  nested(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nested", [], false),
    );
  }
  nesting(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nesting", [], false),
    );
  }
  new(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "new", [], false),
    );
  }
  next(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "next", [], false),
    );
  }
  nfc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nfc", [], false),
    );
  }
  nfd(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nfd", [], false),
    );
  }
  nfkc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nfkc", [], false),
    );
  }
  nfkd(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nfkd", [], false),
    );
  }
  nil(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nil", [], false),
    );
  }
  no(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "no", [], false),
    );
  }
  none(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "none", [], false),
    );
  }
  normalize(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "normalize", [], false),
    );
  }
  normalized(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "normalized", [], false),
    );
  }
  not(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "not", [], false),
    );
  }
  nothing(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nothing", [], false),
    );
  }
  notify(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "notify", [], false),
    );
  }
  notnull(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "notnull", [], false),
    );
  }
  nowait(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nowait", [], false),
    );
  }
  nthValue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nthValue", [], false),
    );
  }
  ntile(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ntile", [], false),
    );
  }
  null(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "null", [], false),
    );
  }
  nullable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nullable", [], false),
    );
  }
  nullif(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nullif", [], false),
    );
  }
  nulls(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nulls", [], false),
    );
  }
  nullOrdering(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "nullOrdering", [], false),
    );
  }
  number(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "number", [], false),
    );
  }
  numeric(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "numeric", [], false),
    );
  }
  object(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "object", [], false),
    );
  }
  objects(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "objects", [], false),
    );
  }
  occurrence(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "occurrence", [], false),
    );
  }
  occurrencesRegex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "occurrencesRegex", [], false),
    );
  }
  octets(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "octets", [], false),
    );
  }
  octetLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "octetLength", [], false),
    );
  }
  of(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "of", [], false),
    );
  }
  off(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "off", [], false),
    );
  }
  offset(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "offset", [], false),
    );
  }
  oids(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "oids", [], false),
    );
  }
  old(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "old", [], false),
    );
  }
  omit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "omit", [], false),
    );
  }
  on(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "on", [], false),
    );
  }
  one(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "one", [], false),
    );
  }
  only(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "only", [], false),
    );
  }
  open(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "open", [], false),
    );
  }
  operator(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "operator", [], false),
    );
  }
  option(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "option", [], false),
    );
  }
  options(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "options", [], false),
    );
  }
  or(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "or", [], false),
    );
  }
  order(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "order", [], false),
    );
  }
  ordering(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ordering", [], false),
    );
  }
  ordinality(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ordinality", [], false),
    );
  }
  others(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "others", [], false),
    );
  }
  out(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "out", [], false),
    );
  }
  outer(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "outer", [], false),
    );
  }
  output(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "output", [], false),
    );
  }
  over(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "over", [], false),
    );
  }
  overflow(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "overflow", [], false),
    );
  }
  overlaps(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "overlaps", [], false),
    );
  }
  overlay(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "overlay", [], false),
    );
  }
  overriding(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "overriding", [], false),
    );
  }
  owned(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "owned", [], false),
    );
  }
  owner(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "owner", [], false),
    );
  }
  p(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "p", [], false),
    );
  }
  pad(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "pad", [], false),
    );
  }
  parallel(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "parallel", [], false),
    );
  }
  parameter(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "parameter", [], false),
    );
  }
  parameterMode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "parameterMode", [], false),
    );
  }
  parameterName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "parameterName", [], false),
    );
  }
  parameterOrdinalPosition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "parameterOrdinalPosition", [], false),
    );
  }
  parameterSpecificCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "parameterSpecificCatalog", [], false),
    );
  }
  parameterSpecificName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "parameterSpecificName", [], false),
    );
  }
  parameterSpecificSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "parameterSpecificSchema", [], false),
    );
  }
  parser(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "parser", [], false),
    );
  }
  partial(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "partial", [], false),
    );
  }
  partition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "partition", [], false),
    );
  }
  pascal(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "pascal", [], false),
    );
  }
  pass(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "pass", [], false),
    );
  }
  passing(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "passing", [], false),
    );
  }
  passthrough(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "passthrough", [], false),
    );
  }
  password(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "password", [], false),
    );
  }
  past(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "past", [], false),
    );
  }
  path(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "path", [], false),
    );
  }
  pattern(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "pattern", [], false),
    );
  }
  per(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "per", [], false),
    );
  }
  percent(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "percent", [], false),
    );
  }
  percentileCont(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "percentileCont", [], false),
    );
  }
  percentileDisc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "percentileDisc", [], false),
    );
  }
  percentRank(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "percentRank", [], false),
    );
  }
  period(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "period", [], false),
    );
  }
  permission(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "permission", [], false),
    );
  }
  permute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "permute", [], false),
    );
  }
  pipe(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "pipe", [], false),
    );
  }
  placing(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "placing", [], false),
    );
  }
  plan(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "plan", [], false),
    );
  }
  plans(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "plans", [], false),
    );
  }
  pli(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "pli", [], false),
    );
  }
  policy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "policy", [], false),
    );
  }
  portion(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "portion", [], false),
    );
  }
  position(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "position", [], false),
    );
  }
  positionRegex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "positionRegex", [], false),
    );
  }
  power(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "power", [], false),
    );
  }
  precedes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "precedes", [], false),
    );
  }
  preceding(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "preceding", [], false),
    );
  }
  precision(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "precision", [], false),
    );
  }
  prepare(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "prepare", [], false),
    );
  }
  prepared(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "prepared", [], false),
    );
  }
  preserve(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "preserve", [], false),
    );
  }
  prev(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "prev", [], false),
    );
  }
  primary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "primary", [], false),
    );
  }
  prior(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "prior", [], false),
    );
  }
  private(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "private", [], false),
    );
  }
  privileges(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "privileges", [], false),
    );
  }
  procedural(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "procedural", [], false),
    );
  }
  procedure(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "procedure", [], false),
    );
  }
  procedures(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "procedures", [], false),
    );
  }
  program(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "program", [], false),
    );
  }
  prune(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "prune", [], false),
    );
  }
  ptf(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ptf", [], false),
    );
  }
  public(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "public", [], false),
    );
  }
  publication(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "publication", [], false),
    );
  }
  quote(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "quote", [], false),
    );
  }
  quotes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "quotes", [], false),
    );
  }
  range(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "range", [], false),
    );
  }
  rank(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "rank", [], false),
    );
  }
  read(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "read", [], false),
    );
  }
  reads(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "reads", [], false),
    );
  }
  real(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "real", [], false),
    );
  }
  reassign(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "reassign", [], false),
    );
  }
  recovery(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "recovery", [], false),
    );
  }
  recursive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "recursive", [], false),
    );
  }
  ref(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ref", [], false),
    );
  }
  references(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "references", [], false),
    );
  }
  referencing(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "referencing", [], false),
    );
  }
  refresh(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "refresh", [], false),
    );
  }
  regrAvgx(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "regrAvgx", [], false),
    );
  }
  regrAvgy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "regrAvgy", [], false),
    );
  }
  regrCount(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "regrCount", [], false),
    );
  }
  regrIntercept(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "regrIntercept", [], false),
    );
  }
  regrR2(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "regrR2", [], false),
    );
  }
  regrSlope(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "regrSlope", [], false),
    );
  }
  regrSxx(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "regrSxx", [], false),
    );
  }
  regrSxy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "regrSxy", [], false),
    );
  }
  regrSyy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "regrSyy", [], false),
    );
  }
  reindex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "reindex", [], false),
    );
  }
  relative(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "relative", [], false),
    );
  }
  release(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "release", [], false),
    );
  }
  rename(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "rename", [], false),
    );
  }
  repeatable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "repeatable", [], false),
    );
  }
  replace(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "replace", [], false),
    );
  }
  replica(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "replica", [], false),
    );
  }
  requiring(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "requiring", [], false),
    );
  }
  reset(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "reset", [], false),
    );
  }
  respect(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "respect", [], false),
    );
  }
  restart(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "restart", [], false),
    );
  }
  restore(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "restore", [], false),
    );
  }
  restrict(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "restrict", [], false),
    );
  }
  result(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "result", [], false),
    );
  }
  return(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "return", [], false),
    );
  }
  returnedCardinality(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "returnedCardinality", [], false),
    );
  }
  returnedLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "returnedLength", [], false),
    );
  }
  returnedOctetLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "returnedOctetLength", [], false),
    );
  }
  returnedSqlstate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "returnedSqlstate", [], false),
    );
  }
  returning(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "returning", [], false),
    );
  }
  returns(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "returns", [], false),
    );
  }
  revoke(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "revoke", [], false),
    );
  }
  right(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "right", [], false),
    );
  }
  role(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "role", [], false),
    );
  }
  rollback(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "rollback", [], false),
    );
  }
  rollup(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "rollup", [], false),
    );
  }
  routine(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "routine", [], false),
    );
  }
  routines(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "routines", [], false),
    );
  }
  routineCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "routineCatalog", [], false),
    );
  }
  routineName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "routineName", [], false),
    );
  }
  routineSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "routineSchema", [], false),
    );
  }
  row(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "row", [], false),
    );
  }
  rows(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "rows", [], false),
    );
  }
  rowCount(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "rowCount", [], false),
    );
  }
  rowNumber(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "rowNumber", [], false),
    );
  }
  rpad(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "rpad", [], false),
    );
  }
  rtrim(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "rtrim", [], false),
    );
  }
  rule(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "rule", [], false),
    );
  }
  running(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "running", [], false),
    );
  }
  savepoint(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "savepoint", [], false),
    );
  }
  scalar(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "scalar", [], false),
    );
  }
  scale(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "scale", [], false),
    );
  }
  schema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "schema", [], false),
    );
  }
  schemas(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "schemas", [], false),
    );
  }
  schemaName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "schemaName", [], false),
    );
  }
  scope(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "scope", [], false),
    );
  }
  scopeCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "scopeCatalog", [], false),
    );
  }
  scopeName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "scopeName", [], false),
    );
  }
  scopeSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "scopeSchema", [], false),
    );
  }
  scroll(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "scroll", [], false),
    );
  }
  search(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "search", [], false),
    );
  }
  second(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "second", [], false),
    );
  }
  section(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "section", [], false),
    );
  }
  security(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "security", [], false),
    );
  }
  seek(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "seek", [], false),
    );
  }
  select(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "select", [], false),
    );
  }
  selective(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "selective", [], false),
    );
  }
  self(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "self", [], false),
    );
  }
  semantics(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "semantics", [], false),
    );
  }
  sensitive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sensitive", [], false),
    );
  }
  sequence(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sequence", [], false),
    );
  }
  sequences(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sequences", [], false),
    );
  }
  serializable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "serializable", [], false),
    );
  }
  server(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "server", [], false),
    );
  }
  serverName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "serverName", [], false),
    );
  }
  session(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "session", [], false),
    );
  }
  sessionUser(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sessionUser", [], false),
    );
  }
  set(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "set", [], false),
    );
  }
  setof(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "setof", [], false),
    );
  }
  sets(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sets", [], false),
    );
  }
  share(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "share", [], false),
    );
  }
  show(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "show", [], false),
    );
  }
  similar(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "similar", [], false),
    );
  }
  simple(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "simple", [], false),
    );
  }
  sin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sin", [], false),
    );
  }
  sinh(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sinh", [], false),
    );
  }
  size(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "size", [], false),
    );
  }
  skip(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "skip", [], false),
    );
  }
  smallint(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "smallint", [], false),
    );
  }
  snapshot(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "snapshot", [], false),
    );
  }
  some(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "some", [], false),
    );
  }
  sortDirection(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sortDirection", [], false),
    );
  }
  source(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "source", [], false),
    );
  }
  space(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "space", [], false),
    );
  }
  specific(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "specific", [], false),
    );
  }
  specifictype(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "specifictype", [], false),
    );
  }
  specificName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "specificName", [], false),
    );
  }
  sql(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sql", [], false),
    );
  }
  sqlcode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sqlcode", [], false),
    );
  }
  sqlerror(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sqlerror", [], false),
    );
  }
  sqlexception(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sqlexception", [], false),
    );
  }
  sqlstate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sqlstate", [], false),
    );
  }
  sqlwarning(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sqlwarning", [], false),
    );
  }
  sqrt(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sqrt", [], false),
    );
  }
  stable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "stable", [], false),
    );
  }
  standalone(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "standalone", [], false),
    );
  }
  start(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "start", [], false),
    );
  }
  state(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "state", [], false),
    );
  }
  statement(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "statement", [], false),
    );
  }
  static(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "static", [], false),
    );
  }
  statistics(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "statistics", [], false),
    );
  }
  stddevPop(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "stddevPop", [], false),
    );
  }
  stddevSamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "stddevSamp", [], false),
    );
  }
  stdin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "stdin", [], false),
    );
  }
  stdout(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "stdout", [], false),
    );
  }
  storage(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "storage", [], false),
    );
  }
  stored(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "stored", [], false),
    );
  }
  strict(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "strict", [], false),
    );
  }
  string(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "string", [], false),
    );
  }
  strip(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "strip", [], false),
    );
  }
  structure(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "structure", [], false),
    );
  }
  style(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "style", [], false),
    );
  }
  subclassOrigin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "subclassOrigin", [], false),
    );
  }
  submultiset(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "submultiset", [], false),
    );
  }
  subscription(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "subscription", [], false),
    );
  }
  subset(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "subset", [], false),
    );
  }
  substring(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "substring", [], false),
    );
  }
  substringRegex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "substringRegex", [], false),
    );
  }
  succeeds(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "succeeds", [], false),
    );
  }
  sum(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sum", [], false),
    );
  }
  support(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "support", [], false),
    );
  }
  symmetric(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "symmetric", [], false),
    );
  }
  sysid(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "sysid", [], false),
    );
  }
  system(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "system", [], false),
    );
  }
  systemTime(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "systemTime", [], false),
    );
  }
  systemUser(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "systemUser", [], false),
    );
  }
  t(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "t", [], false),
    );
  }
  table(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "table", [], false),
    );
  }
  tables(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "tables", [], false),
    );
  }
  tablesample(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "tablesample", [], false),
    );
  }
  tablespace(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "tablespace", [], false),
    );
  }
  tableName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "tableName", [], false),
    );
  }
  tan(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "tan", [], false),
    );
  }
  tanh(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "tanh", [], false),
    );
  }
  target(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "target", [], false),
    );
  }
  temp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "temp", [], false),
    );
  }
  template(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "template", [], false),
    );
  }
  temporary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "temporary", [], false),
    );
  }
  text(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "text", [], false),
    );
  }
  then(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "then", [], false),
    );
  }
  through(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "through", [], false),
    );
  }
  ties(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "ties", [], false),
    );
  }
  time(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "time", [], false),
    );
  }
  timestamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "timestamp", [], false),
    );
  }
  timezoneHour(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "timezoneHour", [], false),
    );
  }
  timezoneMinute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "timezoneMinute", [], false),
    );
  }
  to(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "to", [], false),
    );
  }
  token(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "token", [], false),
    );
  }
  topLevelCount(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "topLevelCount", [], false),
    );
  }
  trailing(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "trailing", [], false),
    );
  }
  transaction(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "transaction", [], false),
    );
  }
  transactionsCommitted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "transactionsCommitted", [], false),
    );
  }
  transactionsRolledBack(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "transactionsRolledBack", [], false),
    );
  }
  transactionActive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "transactionActive", [], false),
    );
  }
  transform(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "transform", [], false),
    );
  }
  transforms(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "transforms", [], false),
    );
  }
  translate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "translate", [], false),
    );
  }
  translateRegex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "translateRegex", [], false),
    );
  }
  translation(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "translation", [], false),
    );
  }
  treat(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "treat", [], false),
    );
  }
  trigger(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "trigger", [], false),
    );
  }
  triggerCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "triggerCatalog", [], false),
    );
  }
  triggerName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "triggerName", [], false),
    );
  }
  triggerSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "triggerSchema", [], false),
    );
  }
  trim(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "trim", [], false),
    );
  }
  trimArray(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "trimArray", [], false),
    );
  }
  true(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "true", [], false),
    );
  }
  truncate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "truncate", [], false),
    );
  }
  trusted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "trusted", [], false),
    );
  }
  type(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "type", [], false),
    );
  }
  types(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "types", [], false),
    );
  }
  uescape(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "uescape", [], false),
    );
  }
  unbounded(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unbounded", [], false),
    );
  }
  uncommitted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "uncommitted", [], false),
    );
  }
  unconditional(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unconditional", [], false),
    );
  }
  under(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "under", [], false),
    );
  }
  unencrypted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unencrypted", [], false),
    );
  }
  union(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "union", [], false),
    );
  }
  unique(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unique", [], false),
    );
  }
  unknown(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unknown", [], false),
    );
  }
  unlink(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unlink", [], false),
    );
  }
  unlisten(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unlisten", [], false),
    );
  }
  unlogged(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unlogged", [], false),
    );
  }
  unmatched(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unmatched", [], false),
    );
  }
  unnamed(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unnamed", [], false),
    );
  }
  unnest(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "unnest", [], false),
    );
  }
  until(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "until", [], false),
    );
  }
  untyped(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "untyped", [], false),
    );
  }
  update(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "update", [], false),
    );
  }
  upper(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "upper", [], false),
    );
  }
  uri(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "uri", [], false),
    );
  }
  usage(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "usage", [], false),
    );
  }
  user(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "user", [], false),
    );
  }
  userDefinedTypeCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "userDefinedTypeCatalog", [], false),
    );
  }
  userDefinedTypeCode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "userDefinedTypeCode", [], false),
    );
  }
  userDefinedTypeName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "userDefinedTypeName", [], false),
    );
  }
  userDefinedTypeSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "userDefinedTypeSchema", [], false),
    );
  }
  using(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "using", [], false),
    );
  }
  utf16(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "utf16", [], false),
    );
  }
  utf32(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "utf32", [], false),
    );
  }
  utf8(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "utf8", [], false),
    );
  }
  vacuum(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "vacuum", [], false),
    );
  }
  valid(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "valid", [], false),
    );
  }
  validate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "validate", [], false),
    );
  }
  validator(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "validator", [], false),
    );
  }
  value(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "value", [], false),
    );
  }
  values(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "values", [], false),
    );
  }
  valueOf(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "valueOf", [], false),
    );
  }
  varbinary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "varbinary", [], false),
    );
  }
  varchar(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "varchar", [], false),
    );
  }
  variadic(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "variadic", [], false),
    );
  }
  varying(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "varying", [], false),
    );
  }
  varPop(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "varPop", [], false),
    );
  }
  varSamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "varSamp", [], false),
    );
  }
  verbose(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "verbose", [], false),
    );
  }
  version(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "version", [], false),
    );
  }
  versioning(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "versioning", [], false),
    );
  }
  view(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "view", [], false),
    );
  }
  views(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "views", [], false),
    );
  }
  virtual(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "virtual", [], false),
    );
  }
  volatile(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "volatile", [], false),
    );
  }
  when(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "when", [], false),
    );
  }
  whenever(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "whenever", [], false),
    );
  }
  where(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "where", [], false),
    );
  }
  whitespace(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "whitespace", [], false),
    );
  }
  widthBucket(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "widthBucket", [], false),
    );
  }
  window(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "window", [], false),
    );
  }
  with(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "with", [], false),
    );
  }
  within(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "within", [], false),
    );
  }
  without(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "without", [], false),
    );
  }
  work(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "work", [], false),
    );
  }
  wrapper(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "wrapper", [], false),
    );
  }
  write(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "write", [], false),
    );
  }
  xml(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xml", [], false),
    );
  }
  xmlagg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlagg", [], false),
    );
  }
  xmlattributes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlattributes", [], false),
    );
  }
  xmlbinary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlbinary", [], false),
    );
  }
  xmlcast(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlcast", [], false),
    );
  }
  xmlcomment(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlcomment", [], false),
    );
  }
  xmlconcat(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlconcat", [], false),
    );
  }
  xmldeclaration(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmldeclaration", [], false),
    );
  }
  xmldocument(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmldocument", [], false),
    );
  }
  xmlelement(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlelement", [], false),
    );
  }
  xmlexists(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlexists", [], false),
    );
  }
  xmlforest(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlforest", [], false),
    );
  }
  xmliterate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmliterate", [], false),
    );
  }
  xmlnamespaces(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlnamespaces", [], false),
    );
  }
  xmlparse(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlparse", [], false),
    );
  }
  xmlpi(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlpi", [], false),
    );
  }
  xmlquery(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlquery", [], false),
    );
  }
  xmlroot(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlroot", [], false),
    );
  }
  xmlschema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlschema", [], false),
    );
  }
  xmlserialize(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlserialize", [], false),
    );
  }
  xmltable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmltable", [], false),
    );
  }
  xmltext(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmltext", [], false),
    );
  }
  xmlvalidate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "xmlvalidate", [], false),
    );
  }
  year(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "year", [], false),
    );
  }
  yes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "yes", [], false),
    );
  }
  zone(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "zone", [], false),
    );
  }
  insert_(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(this.getSchema(), "insert", [], false),
    );
  }
  raw(
    strings: TemplateStringsArray,
    ...args: (string | number)[]
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      createSchema(
        this.getSchema(),
        "raw",
        [
          { arg: strings, struct: { string: { type: "string" } } },
          ...args.map((arg) => {
            return {
              arg: arg,
              struct: {
                union: {
                  types: [
                    { string: { type: "string" } },
                    { number: { type: "number" } },
                  ],
                },
              } as {
                union: {
                  types: [
                    { string: { type: "string" } },
                    { number: { type: "number" } },
                  ];
                };
              },
            };
          }),
        ],
        true,
      ),
    );
  }
}
