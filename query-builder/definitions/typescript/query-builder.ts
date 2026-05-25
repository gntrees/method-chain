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
            importString: "",
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
  a(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "a", [], false),
    );
  }
  abort(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "abort", [], false),
    );
  }
  abs(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "abs", [], false),
    );
  }
  absent(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "absent", [], false),
    );
  }
  absolute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "absolute", [], false),
    );
  }
  access(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "access", [], false),
    );
  }
  according(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "according", [], false),
    );
  }
  acos(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "acos", [], false),
    );
  }
  action(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "action", [], false),
    );
  }
  ada(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ada", [], false),
    );
  }
  add(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "add", [], false),
    );
  }
  admin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "admin", [], false),
    );
  }
  after(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "after", [], false),
    );
  }
  aggregate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "aggregate", [], false),
    );
  }
  all(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "all", [], false),
    );
  }
  allocate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "allocate", [], false),
    );
  }
  also(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "also", [], false),
    );
  }
  alter(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "alter", [], false),
    );
  }
  always(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "always", [], false),
    );
  }
  analyse(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "analyse", [], false),
    );
  }
  analyze(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "analyze", [], false),
    );
  }
  and(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "and", [], false),
    );
  }
  any(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "any", [], false),
    );
  }
  anyValue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "anyValue", [], false),
    );
  }
  are(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "are", [], false),
    );
  }
  array(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "array", [], false),
    );
  }
  arrayAgg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "arrayAgg", [], false),
    );
  }
  arrayMaxCardinality(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "arrayMaxCardinality", [], false),
    );
  }
  as(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "as", [], false),
    );
  }
  asc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "asc", [], false),
    );
  }
  asensitive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "asensitive", [], false),
    );
  }
  asin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "asin", [], false),
    );
  }
  assertion(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "assertion", [], false),
    );
  }
  assignment(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "assignment", [], false),
    );
  }
  asymmetric(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "asymmetric", [], false),
    );
  }
  at(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "at", [], false),
    );
  }
  atan(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "atan", [], false),
    );
  }
  atomic(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "atomic", [], false),
    );
  }
  attach(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "attach", [], false),
    );
  }
  attribute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "attribute", [], false),
    );
  }
  attributes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "attributes", [], false),
    );
  }
  authorization(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "authorization", [], false),
    );
  }
  avg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "avg", [], false),
    );
  }
  backward(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "backward", [], false),
    );
  }
  base64(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "base64", [], false),
    );
  }
  before(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "before", [], false),
    );
  }
  begin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "begin", [], false),
    );
  }
  beginFrame(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "beginFrame", [], false),
    );
  }
  beginPartition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "beginPartition", [], false),
    );
  }
  bernoulli(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "bernoulli", [], false),
    );
  }
  between(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "between", [], false),
    );
  }
  bigint(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "bigint", [], false),
    );
  }
  binary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "binary", [], false),
    );
  }
  bit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "bit", [], false),
    );
  }
  bitLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "bitLength", [], false),
    );
  }
  blob(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "blob", [], false),
    );
  }
  blocked(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "blocked", [], false),
    );
  }
  bom(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "bom", [], false),
    );
  }
  boolean(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "boolean", [], false),
    );
  }
  both(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "both", [], false),
    );
  }
  breadth(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "breadth", [], false),
    );
  }
  btrim(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "btrim", [], false),
    );
  }
  by(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "by", [], false),
    );
  }
  c(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "c", [], false),
    );
  }
  cache(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cache", [], false),
    );
  }
  call(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "call", [], false),
    );
  }
  called(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "called", [], false),
    );
  }
  cardinality(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cardinality", [], false),
    );
  }
  cascade(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cascade", [], false),
    );
  }
  cascaded(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cascaded", [], false),
    );
  }
  case(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "case", [], false),
    );
  }
  cast(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cast", [], false),
    );
  }
  catalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "catalog", [], false),
    );
  }
  catalogName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "catalogName", [], false),
    );
  }
  ceil(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ceil", [], false),
    );
  }
  ceiling(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ceiling", [], false),
    );
  }
  chain(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "chain", [], false),
    );
  }
  chaining(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "chaining", [], false),
    );
  }
  char(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "char", [], false),
    );
  }
  character(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "character", [], false),
    );
  }
  characteristics(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characteristics", [], false),
    );
  }
  characters(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characters", [], false),
    );
  }
  characterLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characterLength", [], false),
    );
  }
  characterSetCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characterSetCatalog", [], false),
    );
  }
  characterSetName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characterSetName", [], false),
    );
  }
  characterSetSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "characterSetSchema", [], false),
    );
  }
  charLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "charLength", [], false),
    );
  }
  check(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "check", [], false),
    );
  }
  checkpoint(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "checkpoint", [], false),
    );
  }
  class(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "class", [], false),
    );
  }
  classifier(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "classifier", [], false),
    );
  }
  classOrigin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "classOrigin", [], false),
    );
  }
  clob(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "clob", [], false),
    );
  }
  close(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "close", [], false),
    );
  }
  cluster(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cluster", [], false),
    );
  }
  coalesce(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "coalesce", [], false),
    );
  }
  cobol(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cobol", [], false),
    );
  }
  collate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collate", [], false),
    );
  }
  collation(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collation", [], false),
    );
  }
  collationCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collationCatalog", [], false),
    );
  }
  collationName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collationName", [], false),
    );
  }
  collationSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collationSchema", [], false),
    );
  }
  collect(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "collect", [], false),
    );
  }
  column(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "column", [], false),
    );
  }
  columns(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "columns", [], false),
    );
  }
  columnName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "columnName", [], false),
    );
  }
  commandFunction(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "commandFunction", [], false),
    );
  }
  commandFunctionCode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "commandFunctionCode", [], false),
    );
  }
  comment(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "comment", [], false),
    );
  }
  comments(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "comments", [], false),
    );
  }
  commit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "commit", [], false),
    );
  }
  committed(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "committed", [], false),
    );
  }
  compression(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "compression", [], false),
    );
  }
  concurrently(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "concurrently", [], false),
    );
  }
  condition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "condition", [], false),
    );
  }
  conditional(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "conditional", [], false),
    );
  }
  conditionNumber(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "conditionNumber", [], false),
    );
  }
  configuration(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "configuration", [], false),
    );
  }
  conflict(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "conflict", [], false),
    );
  }
  connect(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "connect", [], false),
    );
  }
  connection(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "connection", [], false),
    );
  }
  connectionName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "connectionName", [], false),
    );
  }
  constraint(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constraint", [], false),
    );
  }
  constraints(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constraints", [], false),
    );
  }
  constraintCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constraintCatalog", [], false),
    );
  }
  constraintName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constraintName", [], false),
    );
  }
  constraintSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constraintSchema", [], false),
    );
  }
  constructorKeyword(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "constructorKeyword", [], false),
    );
  }
  contains(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "contains", [], false),
    );
  }
  content(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "content", [], false),
    );
  }
  continue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "continue", [], false),
    );
  }
  control(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "control", [], false),
    );
  }
  conversion(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "conversion", [], false),
    );
  }
  convert(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "convert", [], false),
    );
  }
  copartition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "copartition", [], false),
    );
  }
  copy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "copy", [], false),
    );
  }
  corr(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "corr", [], false),
    );
  }
  corresponding(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "corresponding", [], false),
    );
  }
  cos(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cos", [], false),
    );
  }
  cosh(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cosh", [], false),
    );
  }
  cost(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cost", [], false),
    );
  }
  count(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "count", [], false),
    );
  }
  covarPop(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "covarPop", [], false),
    );
  }
  covarSamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "covarSamp", [], false),
    );
  }
  create(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "create", [], false),
    );
  }
  cross(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cross", [], false),
    );
  }
  csv(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "csv", [], false),
    );
  }
  cube(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cube", [], false),
    );
  }
  cumeDist(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cumeDist", [], false),
    );
  }
  current(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "current", [], false),
    );
  }
  currentCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentCatalog", [], false),
    );
  }
  currentDate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentDate", [], false),
    );
  }
  currentDefaultTransformGroup(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentDefaultTransformGroup", [], false),
    );
  }
  currentPath(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentPath", [], false),
    );
  }
  currentRole(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentRole", [], false),
    );
  }
  currentRow(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentRow", [], false),
    );
  }
  currentSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentSchema", [], false),
    );
  }
  currentTime(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentTime", [], false),
    );
  }
  currentTimestamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentTimestamp", [], false),
    );
  }
  currentTransformGroupForType(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentTransformGroupForType", [], false),
    );
  }
  currentUser(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "currentUser", [], false),
    );
  }
  cursor(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cursor", [], false),
    );
  }
  cursorName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cursorName", [], false),
    );
  }
  cycle(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "cycle", [], false),
    );
  }
  data(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "data", [], false),
    );
  }
  database(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "database", [], false),
    );
  }
  datalink(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "datalink", [], false),
    );
  }
  date(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "date", [], false),
    );
  }
  datetimeIntervalCode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "datetimeIntervalCode", [], false),
    );
  }
  datetimeIntervalPrecision(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "datetimeIntervalPrecision", [], false),
    );
  }
  day(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "day", [], false),
    );
  }
  db(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "db", [], false),
    );
  }
  deallocate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "deallocate", [], false),
    );
  }
  dec(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dec", [], false),
    );
  }
  decfloat(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "decfloat", [], false),
    );
  }
  decimal(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "decimal", [], false),
    );
  }
  declare(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "declare", [], false),
    );
  }
  default(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "default", [], false),
    );
  }
  defaults(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "defaults", [], false),
    );
  }
  deferrable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "deferrable", [], false),
    );
  }
  deferred(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "deferred", [], false),
    );
  }
  define(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "define", [], false),
    );
  }
  defined(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "defined", [], false),
    );
  }
  definer(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "definer", [], false),
    );
  }
  degree(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "degree", [], false),
    );
  }
  delete(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "delete", [], false),
    );
  }
  delimiter(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "delimiter", [], false),
    );
  }
  delimiters(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "delimiters", [], false),
    );
  }
  denseRank(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "denseRank", [], false),
    );
  }
  depends(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "depends", [], false),
    );
  }
  depth(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "depth", [], false),
    );
  }
  deref(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "deref", [], false),
    );
  }
  derived(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "derived", [], false),
    );
  }
  desc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "desc", [], false),
    );
  }
  describe(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "describe", [], false),
    );
  }
  descriptor(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "descriptor", [], false),
    );
  }
  detach(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "detach", [], false),
    );
  }
  deterministic(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "deterministic", [], false),
    );
  }
  diagnostics(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "diagnostics", [], false),
    );
  }
  dictionary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dictionary", [], false),
    );
  }
  disable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "disable", [], false),
    );
  }
  discard(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "discard", [], false),
    );
  }
  disconnect(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "disconnect", [], false),
    );
  }
  dispatch(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dispatch", [], false),
    );
  }
  distinct(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "distinct", [], false),
    );
  }
  dlnewcopy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlnewcopy", [], false),
    );
  }
  dlpreviouscopy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlpreviouscopy", [], false),
    );
  }
  dlurlcomplete(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlcomplete", [], false),
    );
  }
  dlurlcompleteonly(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlcompleteonly", [], false),
    );
  }
  dlurlcompletewrite(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlcompletewrite", [], false),
    );
  }
  dlurlpath(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlpath", [], false),
    );
  }
  dlurlpathonly(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlpathonly", [], false),
    );
  }
  dlurlpathwrite(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlpathwrite", [], false),
    );
  }
  dlurlscheme(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlscheme", [], false),
    );
  }
  dlurlserver(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlurlserver", [], false),
    );
  }
  dlvalue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dlvalue", [], false),
    );
  }
  do(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "do", [], false),
    );
  }
  document(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "document", [], false),
    );
  }
  domain(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "domain", [], false),
    );
  }
  double(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "double", [], false),
    );
  }
  drop(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "drop", [], false),
    );
  }
  dynamic(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dynamic", [], false),
    );
  }
  dynamicFunction(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dynamicFunction", [], false),
    );
  }
  dynamicFunctionCode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "dynamicFunctionCode", [], false),
    );
  }
  each(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "each", [], false),
    );
  }
  element(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "element", [], false),
    );
  }
  else(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "else", [], false),
    );
  }
  empty(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "empty", [], false),
    );
  }
  enable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "enable", [], false),
    );
  }
  encoding(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "encoding", [], false),
    );
  }
  encrypted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "encrypted", [], false),
    );
  }
  end(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "end", [], false),
    );
  }
  endExec(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "endExec", [], false),
    );
  }
  endFrame(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "endFrame", [], false),
    );
  }
  endPartition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "endPartition", [], false),
    );
  }
  enforced(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "enforced", [], false),
    );
  }
  enum(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "enum", [], false),
    );
  }
  equals(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "equals", [], false),
    );
  }
  error(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "error", [], false),
    );
  }
  escape(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "escape", [], false),
    );
  }
  event(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "event", [], false),
    );
  }
  every(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "every", [], false),
    );
  }
  except(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "except", [], false),
    );
  }
  exception(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exception", [], false),
    );
  }
  exclude(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exclude", [], false),
    );
  }
  excluding(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "excluding", [], false),
    );
  }
  exclusive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exclusive", [], false),
    );
  }
  exec(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exec", [], false),
    );
  }
  execute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "execute", [], false),
    );
  }
  exists(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exists", [], false),
    );
  }
  exp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "exp", [], false),
    );
  }
  explain(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "explain", [], false),
    );
  }
  expression(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "expression", [], false),
    );
  }
  extension(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "extension", [], false),
    );
  }
  external(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "external", [], false),
    );
  }
  extract(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "extract", [], false),
    );
  }
  false(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "false", [], false),
    );
  }
  family(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "family", [], false),
    );
  }
  fetch(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "fetch", [], false),
    );
  }
  file(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "file", [], false),
    );
  }
  filter(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "filter", [], false),
    );
  }
  final(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "final", [], false),
    );
  }
  finalize(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "finalize", [], false),
    );
  }
  finish(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "finish", [], false),
    );
  }
  first(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "first", [], false),
    );
  }
  firstValue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "firstValue", [], false),
    );
  }
  flag(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "flag", [], false),
    );
  }
  float(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "float", [], false),
    );
  }
  floor(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "floor", [], false),
    );
  }
  following(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "following", [], false),
    );
  }
  for(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "for", [], false),
    );
  }
  force(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "force", [], false),
    );
  }
  foreign(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "foreign", [], false),
    );
  }
  format(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "format", [], false),
    );
  }
  fortran(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "fortran", [], false),
    );
  }
  forward(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "forward", [], false),
    );
  }
  found(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "found", [], false),
    );
  }
  frameRow(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "frameRow", [], false),
    );
  }
  free(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "free", [], false),
    );
  }
  freeze(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "freeze", [], false),
    );
  }
  from(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "from", [], false),
    );
  }
  fs(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "fs", [], false),
    );
  }
  fulfill(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "fulfill", [], false),
    );
  }
  full(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "full", [], false),
    );
  }
  function(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "function", [], false),
    );
  }
  functions(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "functions", [], false),
    );
  }
  fusion(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "fusion", [], false),
    );
  }
  g(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "g", [], false),
    );
  }
  general(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "general", [], false),
    );
  }
  generated(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "generated", [], false),
    );
  }
  get(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "get", [], false),
    );
  }
  global(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "global", [], false),
    );
  }
  go(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "go", [], false),
    );
  }
  goto(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "goto", [], false),
    );
  }
  grant(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "grant", [], false),
    );
  }
  granted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "granted", [], false),
    );
  }
  greatest(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "greatest", [], false),
    );
  }
  group(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "group", [], false),
    );
  }
  grouping(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "grouping", [], false),
    );
  }
  groups(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "groups", [], false),
    );
  }
  handler(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "handler", [], false),
    );
  }
  having(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "having", [], false),
    );
  }
  header(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "header", [], false),
    );
  }
  hex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "hex", [], false),
    );
  }
  hierarchy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "hierarchy", [], false),
    );
  }
  hold(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "hold", [], false),
    );
  }
  hour(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "hour", [], false),
    );
  }
  id(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "id", [], false),
    );
  }
  identity(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "identity", [], false),
    );
  }
  if(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "if", [], false),
    );
  }
  ignore(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ignore", [], false),
    );
  }
  ilike(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ilike", [], false),
    );
  }
  immediate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "immediate", [], false),
    );
  }
  immediately(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "immediately", [], false),
    );
  }
  immutable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "immutable", [], false),
    );
  }
  implementation(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "implementation", [], false),
    );
  }
  implicit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "implicit", [], false),
    );
  }
  import(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "import", [], false),
    );
  }
  in(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "in", [], false),
    );
  }
  include(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "include", [], false),
    );
  }
  including(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "including", [], false),
    );
  }
  increment(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "increment", [], false),
    );
  }
  indent(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "indent", [], false),
    );
  }
  index(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "index", [], false),
    );
  }
  indexes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "indexes", [], false),
    );
  }
  indicator(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "indicator", [], false),
    );
  }
  inherit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "inherit", [], false),
    );
  }
  inherits(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "inherits", [], false),
    );
  }
  initial(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "initial", [], false),
    );
  }
  initially(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "initially", [], false),
    );
  }
  inline(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "inline", [], false),
    );
  }
  inner(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "inner", [], false),
    );
  }
  inout(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "inout", [], false),
    );
  }
  input(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "input", [], false),
    );
  }
  insensitive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "insensitive", [], false),
    );
  }
  insert(
    table?: QueryBuilder,
    values?: QueryBuilder | QueryBuilder[],
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "insert", [table, values], false),
    );
  }
  instance(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "instance", [], false),
    );
  }
  instantiable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "instantiable", [], false),
    );
  }
  instead(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "instead", [], false),
    );
  }
  int(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "int", [], false),
    );
  }
  integer(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "integer", [], false),
    );
  }
  integrity(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "integrity", [], false),
    );
  }
  intersect(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "intersect", [], false),
    );
  }
  intersection(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "intersection", [], false),
    );
  }
  interval(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "interval", [], false),
    );
  }
  into(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "into", [], false),
    );
  }
  invoker(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "invoker", [], false),
    );
  }
  is(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "is", [], false),
    );
  }
  isnull(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "isnull", [], false),
    );
  }
  isolation(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "isolation", [], false),
    );
  }
  join(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "join", [], false),
    );
  }
  json(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "json", [], false),
    );
  }
  jsonArray(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonArray", [], false),
    );
  }
  jsonArrayagg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonArrayagg", [], false),
    );
  }
  jsonExists(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonExists", [], false),
    );
  }
  jsonObject(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonObject", [], false),
    );
  }
  jsonObjectagg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonObjectagg", [], false),
    );
  }
  jsonQuery(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonQuery", [], false),
    );
  }
  jsonScalar(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonScalar", [], false),
    );
  }
  jsonSerialize(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonSerialize", [], false),
    );
  }
  jsonTable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonTable", [], false),
    );
  }
  jsonTablePrimitive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonTablePrimitive", [], false),
    );
  }
  jsonValue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "jsonValue", [], false),
    );
  }
  k(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "k", [], false),
    );
  }
  keep(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "keep", [], false),
    );
  }
  key(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "key", [], false),
    );
  }
  keys(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "keys", [], false),
    );
  }
  keyMember(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "keyMember", [], false),
    );
  }
  keyType(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "keyType", [], false),
    );
  }
  label(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "label", [], false),
    );
  }
  lag(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lag", [], false),
    );
  }
  language(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "language", [], false),
    );
  }
  large(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "large", [], false),
    );
  }
  last(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "last", [], false),
    );
  }
  lastValue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lastValue", [], false),
    );
  }
  lateral(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lateral", [], false),
    );
  }
  lead(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lead", [], false),
    );
  }
  leading(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "leading", [], false),
    );
  }
  leakproof(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "leakproof", [], false),
    );
  }
  least(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "least", [], false),
    );
  }
  left(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "left", [], false),
    );
  }
  length(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "length", [], false),
    );
  }
  level(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "level", [], false),
    );
  }
  library(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "library", [], false),
    );
  }
  like(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "like", [], false),
    );
  }
  likeRegex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "likeRegex", [], false),
    );
  }
  limit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "limit", [], false),
    );
  }
  link(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "link", [], false),
    );
  }
  listagg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "listagg", [], false),
    );
  }
  listen(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "listen", [], false),
    );
  }
  ln(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ln", [], false),
    );
  }
  load(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "load", [], false),
    );
  }
  local(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "local", [], false),
    );
  }
  localtime(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "localtime", [], false),
    );
  }
  localtimestamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "localtimestamp", [], false),
    );
  }
  location(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "location", [], false),
    );
  }
  locator(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "locator", [], false),
    );
  }
  lock(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lock", [], false),
    );
  }
  locked(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "locked", [], false),
    );
  }
  log(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "log", [], false),
    );
  }
  log10(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "log10", [], false),
    );
  }
  logged(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "logged", [], false),
    );
  }
  lower(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lower", [], false),
    );
  }
  lpad(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "lpad", [], false),
    );
  }
  ltrim(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ltrim", [], false),
    );
  }
  m(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "m", [], false),
    );
  }
  map(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "map", [], false),
    );
  }
  mapping(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "mapping", [], false),
    );
  }
  match(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "match", [], false),
    );
  }
  matched(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "matched", [], false),
    );
  }
  matches(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "matches", [], false),
    );
  }
  matchNumber(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "matchNumber", [], false),
    );
  }
  matchRecognize(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "matchRecognize", [], false),
    );
  }
  materialized(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "materialized", [], false),
    );
  }
  max(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "max", [], false),
    );
  }
  maxvalue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "maxvalue", [], false),
    );
  }
  measures(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "measures", [], false),
    );
  }
  member(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "member", [], false),
    );
  }
  merge(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "merge", [], false),
    );
  }
  mergeAction(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "mergeAction", [], false),
    );
  }
  messageLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "messageLength", [], false),
    );
  }
  messageOctetLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "messageOctetLength", [], false),
    );
  }
  messageText(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "messageText", [], false),
    );
  }
  method(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "method", [], false),
    );
  }
  min(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "min", [], false),
    );
  }
  minute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "minute", [], false),
    );
  }
  minvalue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "minvalue", [], false),
    );
  }
  mod(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "mod", [], false),
    );
  }
  mode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "mode", [], false),
    );
  }
  modifies(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "modifies", [], false),
    );
  }
  module(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "module", [], false),
    );
  }
  month(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "month", [], false),
    );
  }
  more(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "more", [], false),
    );
  }
  move(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "move", [], false),
    );
  }
  multiset(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "multiset", [], false),
    );
  }
  mumps(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "mumps", [], false),
    );
  }
  name(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "name", [], false),
    );
  }
  names(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "names", [], false),
    );
  }
  namespace(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "namespace", [], false),
    );
  }
  national(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "national", [], false),
    );
  }
  natural(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "natural", [], false),
    );
  }
  nchar(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nchar", [], false),
    );
  }
  nclob(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nclob", [], false),
    );
  }
  nested(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nested", [], false),
    );
  }
  nesting(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nesting", [], false),
    );
  }
  new(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "new", [], false),
    );
  }
  next(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "next", [], false),
    );
  }
  nfc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nfc", [], false),
    );
  }
  nfd(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nfd", [], false),
    );
  }
  nfkc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nfkc", [], false),
    );
  }
  nfkd(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nfkd", [], false),
    );
  }
  nil(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nil", [], false),
    );
  }
  no(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "no", [], false),
    );
  }
  none(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "none", [], false),
    );
  }
  normalize(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "normalize", [], false),
    );
  }
  normalized(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "normalized", [], false),
    );
  }
  not(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "not", [], false),
    );
  }
  nothing(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nothing", [], false),
    );
  }
  notify(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "notify", [], false),
    );
  }
  notnull(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "notnull", [], false),
    );
  }
  nowait(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nowait", [], false),
    );
  }
  nthValue(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nthValue", [], false),
    );
  }
  ntile(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ntile", [], false),
    );
  }
  null(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "null", [], false),
    );
  }
  nullable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nullable", [], false),
    );
  }
  nullif(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nullif", [], false),
    );
  }
  nulls(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nulls", [], false),
    );
  }
  nullOrdering(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "nullOrdering", [], false),
    );
  }
  number(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "number", [], false),
    );
  }
  numeric(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "numeric", [], false),
    );
  }
  object(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "object", [], false),
    );
  }
  objects(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "objects", [], false),
    );
  }
  occurrence(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "occurrence", [], false),
    );
  }
  occurrencesRegex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "occurrencesRegex", [], false),
    );
  }
  octets(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "octets", [], false),
    );
  }
  octetLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "octetLength", [], false),
    );
  }
  of(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "of", [], false),
    );
  }
  off(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "off", [], false),
    );
  }
  offset(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "offset", [], false),
    );
  }
  oids(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "oids", [], false),
    );
  }
  old(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "old", [], false),
    );
  }
  omit(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "omit", [], false),
    );
  }
  on(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "on", [], false),
    );
  }
  one(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "one", [], false),
    );
  }
  only(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "only", [], false),
    );
  }
  open(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "open", [], false),
    );
  }
  operator(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "operator", [], false),
    );
  }
  option(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "option", [], false),
    );
  }
  options(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "options", [], false),
    );
  }
  or(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "or", [], false),
    );
  }
  order(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "order", [], false),
    );
  }
  ordering(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ordering", [], false),
    );
  }
  ordinality(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ordinality", [], false),
    );
  }
  others(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "others", [], false),
    );
  }
  out(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "out", [], false),
    );
  }
  outer(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "outer", [], false),
    );
  }
  output(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "output", [], false),
    );
  }
  over(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "over", [], false),
    );
  }
  overflow(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "overflow", [], false),
    );
  }
  overlaps(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "overlaps", [], false),
    );
  }
  overlay(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "overlay", [], false),
    );
  }
  overriding(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "overriding", [], false),
    );
  }
  owned(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "owned", [], false),
    );
  }
  owner(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "owner", [], false),
    );
  }
  p(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "p", [], false),
    );
  }
  pad(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pad", [], false),
    );
  }
  parallel(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parallel", [], false),
    );
  }
  parameter(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameter", [], false),
    );
  }
  parameterMode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterMode", [], false),
    );
  }
  parameterName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterName", [], false),
    );
  }
  parameterOrdinalPosition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterOrdinalPosition", [], false),
    );
  }
  parameterSpecificCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterSpecificCatalog", [], false),
    );
  }
  parameterSpecificName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterSpecificName", [], false),
    );
  }
  parameterSpecificSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parameterSpecificSchema", [], false),
    );
  }
  parser(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "parser", [], false),
    );
  }
  partial(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "partial", [], false),
    );
  }
  partition(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "partition", [], false),
    );
  }
  pascal(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pascal", [], false),
    );
  }
  pass(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pass", [], false),
    );
  }
  passing(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "passing", [], false),
    );
  }
  passthrough(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "passthrough", [], false),
    );
  }
  password(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "password", [], false),
    );
  }
  past(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "past", [], false),
    );
  }
  path(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "path", [], false),
    );
  }
  pattern(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pattern", [], false),
    );
  }
  per(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "per", [], false),
    );
  }
  percent(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "percent", [], false),
    );
  }
  percentileCont(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "percentileCont", [], false),
    );
  }
  percentileDisc(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "percentileDisc", [], false),
    );
  }
  percentRank(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "percentRank", [], false),
    );
  }
  period(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "period", [], false),
    );
  }
  permission(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "permission", [], false),
    );
  }
  permute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "permute", [], false),
    );
  }
  pipe(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pipe", [], false),
    );
  }
  placing(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "placing", [], false),
    );
  }
  plan(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "plan", [], false),
    );
  }
  plans(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "plans", [], false),
    );
  }
  pli(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "pli", [], false),
    );
  }
  policy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "policy", [], false),
    );
  }
  portion(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "portion", [], false),
    );
  }
  position(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "position", [], false),
    );
  }
  positionRegex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "positionRegex", [], false),
    );
  }
  power(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "power", [], false),
    );
  }
  precedes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "precedes", [], false),
    );
  }
  preceding(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "preceding", [], false),
    );
  }
  precision(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "precision", [], false),
    );
  }
  prepare(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "prepare", [], false),
    );
  }
  prepared(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "prepared", [], false),
    );
  }
  preserve(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "preserve", [], false),
    );
  }
  prev(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "prev", [], false),
    );
  }
  primary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "primary", [], false),
    );
  }
  prior(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "prior", [], false),
    );
  }
  private(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "private", [], false),
    );
  }
  privileges(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "privileges", [], false),
    );
  }
  procedural(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "procedural", [], false),
    );
  }
  procedure(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "procedure", [], false),
    );
  }
  procedures(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "procedures", [], false),
    );
  }
  program(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "program", [], false),
    );
  }
  prune(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "prune", [], false),
    );
  }
  ptf(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ptf", [], false),
    );
  }
  public(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "public", [], false),
    );
  }
  publication(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "publication", [], false),
    );
  }
  quote(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "quote", [], false),
    );
  }
  quotes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "quotes", [], false),
    );
  }
  range(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "range", [], false),
    );
  }
  rank(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rank", [], false),
    );
  }
  read(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "read", [], false),
    );
  }
  reads(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "reads", [], false),
    );
  }
  real(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "real", [], false),
    );
  }
  reassign(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "reassign", [], false),
    );
  }
  recovery(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "recovery", [], false),
    );
  }
  recursive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "recursive", [], false),
    );
  }
  ref(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ref", [], false),
    );
  }
  references(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "references", [], false),
    );
  }
  referencing(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "referencing", [], false),
    );
  }
  refresh(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "refresh", [], false),
    );
  }
  regrAvgx(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrAvgx", [], false),
    );
  }
  regrAvgy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrAvgy", [], false),
    );
  }
  regrCount(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrCount", [], false),
    );
  }
  regrIntercept(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrIntercept", [], false),
    );
  }
  regrR2(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrR2", [], false),
    );
  }
  regrSlope(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrSlope", [], false),
    );
  }
  regrSxx(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrSxx", [], false),
    );
  }
  regrSxy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrSxy", [], false),
    );
  }
  regrSyy(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "regrSyy", [], false),
    );
  }
  reindex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "reindex", [], false),
    );
  }
  relative(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "relative", [], false),
    );
  }
  release(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "release", [], false),
    );
  }
  rename(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rename", [], false),
    );
  }
  repeatable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "repeatable", [], false),
    );
  }
  replace(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "replace", [], false),
    );
  }
  replica(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "replica", [], false),
    );
  }
  requiring(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "requiring", [], false),
    );
  }
  reset(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "reset", [], false),
    );
  }
  respect(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "respect", [], false),
    );
  }
  restart(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "restart", [], false),
    );
  }
  restore(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "restore", [], false),
    );
  }
  restrict(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "restrict", [], false),
    );
  }
  result(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "result", [], false),
    );
  }
  return(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "return", [], false),
    );
  }
  returnedCardinality(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returnedCardinality", [], false),
    );
  }
  returnedLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returnedLength", [], false),
    );
  }
  returnedOctetLength(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returnedOctetLength", [], false),
    );
  }
  returnedSqlstate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returnedSqlstate", [], false),
    );
  }
  returning(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returning", [], false),
    );
  }
  returns(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "returns", [], false),
    );
  }
  revoke(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "revoke", [], false),
    );
  }
  right(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "right", [], false),
    );
  }
  role(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "role", [], false),
    );
  }
  rollback(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rollback", [], false),
    );
  }
  rollup(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rollup", [], false),
    );
  }
  routine(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "routine", [], false),
    );
  }
  routines(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "routines", [], false),
    );
  }
  routineCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "routineCatalog", [], false),
    );
  }
  routineName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "routineName", [], false),
    );
  }
  routineSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "routineSchema", [], false),
    );
  }
  row(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "row", [], false),
    );
  }
  rows(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rows", [], false),
    );
  }
  rowCount(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rowCount", [], false),
    );
  }
  rowNumber(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rowNumber", [], false),
    );
  }
  rpad(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rpad", [], false),
    );
  }
  rtrim(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rtrim", [], false),
    );
  }
  rule(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "rule", [], false),
    );
  }
  running(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "running", [], false),
    );
  }
  savepoint(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "savepoint", [], false),
    );
  }
  scalar(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scalar", [], false),
    );
  }
  scale(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scale", [], false),
    );
  }
  schema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "schema", [], false),
    );
  }
  schemas(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "schemas", [], false),
    );
  }
  schemaName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "schemaName", [], false),
    );
  }
  scope(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scope", [], false),
    );
  }
  scopeCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scopeCatalog", [], false),
    );
  }
  scopeName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scopeName", [], false),
    );
  }
  scopeSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scopeSchema", [], false),
    );
  }
  scroll(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "scroll", [], false),
    );
  }
  search(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "search", [], false),
    );
  }
  second(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "second", [], false),
    );
  }
  section(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "section", [], false),
    );
  }
  security(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "security", [], false),
    );
  }
  seek(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "seek", [], false),
    );
  }
  select(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "select", [], false),
    );
  }
  selective(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "selective", [], false),
    );
  }
  self(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "self", [], false),
    );
  }
  semantics(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "semantics", [], false),
    );
  }
  sensitive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sensitive", [], false),
    );
  }
  sequence(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sequence", [], false),
    );
  }
  sequences(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sequences", [], false),
    );
  }
  serializable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "serializable", [], false),
    );
  }
  server(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "server", [], false),
    );
  }
  serverName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "serverName", [], false),
    );
  }
  session(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "session", [], false),
    );
  }
  sessionUser(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sessionUser", [], false),
    );
  }
  set(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "set", [], false),
    );
  }
  setof(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "setof", [], false),
    );
  }
  sets(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sets", [], false),
    );
  }
  share(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "share", [], false),
    );
  }
  show(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "show", [], false),
    );
  }
  similar(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "similar", [], false),
    );
  }
  simple(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "simple", [], false),
    );
  }
  sin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sin", [], false),
    );
  }
  sinh(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sinh", [], false),
    );
  }
  size(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "size", [], false),
    );
  }
  skip(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "skip", [], false),
    );
  }
  smallint(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "smallint", [], false),
    );
  }
  snapshot(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "snapshot", [], false),
    );
  }
  some(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "some", [], false),
    );
  }
  sortDirection(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sortDirection", [], false),
    );
  }
  source(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "source", [], false),
    );
  }
  space(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "space", [], false),
    );
  }
  specific(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "specific", [], false),
    );
  }
  specifictype(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "specifictype", [], false),
    );
  }
  specificName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "specificName", [], false),
    );
  }
  sql(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sql", [], false),
    );
  }
  sqlcode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqlcode", [], false),
    );
  }
  sqlerror(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqlerror", [], false),
    );
  }
  sqlexception(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqlexception", [], false),
    );
  }
  sqlstate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqlstate", [], false),
    );
  }
  sqlwarning(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqlwarning", [], false),
    );
  }
  sqrt(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sqrt", [], false),
    );
  }
  stable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stable", [], false),
    );
  }
  standalone(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "standalone", [], false),
    );
  }
  start(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "start", [], false),
    );
  }
  state(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "state", [], false),
    );
  }
  statement(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "statement", [], false),
    );
  }
  static(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "static", [], false),
    );
  }
  statistics(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "statistics", [], false),
    );
  }
  stddevPop(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stddevPop", [], false),
    );
  }
  stddevSamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stddevSamp", [], false),
    );
  }
  stdin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stdin", [], false),
    );
  }
  stdout(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stdout", [], false),
    );
  }
  storage(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "storage", [], false),
    );
  }
  stored(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "stored", [], false),
    );
  }
  strict(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "strict", [], false),
    );
  }
  string(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "string", [], false),
    );
  }
  strip(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "strip", [], false),
    );
  }
  structure(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "structure", [], false),
    );
  }
  style(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "style", [], false),
    );
  }
  subclassOrigin(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "subclassOrigin", [], false),
    );
  }
  submultiset(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "submultiset", [], false),
    );
  }
  subscription(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "subscription", [], false),
    );
  }
  subset(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "subset", [], false),
    );
  }
  substring(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "substring", [], false),
    );
  }
  substringRegex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "substringRegex", [], false),
    );
  }
  succeeds(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "succeeds", [], false),
    );
  }
  sum(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sum", [], false),
    );
  }
  support(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "support", [], false),
    );
  }
  symmetric(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "symmetric", [], false),
    );
  }
  sysid(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "sysid", [], false),
    );
  }
  system(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "system", [], false),
    );
  }
  systemTime(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "systemTime", [], false),
    );
  }
  systemUser(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "systemUser", [], false),
    );
  }
  t(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "t", [], false),
    );
  }
  table(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "table", [], false),
    );
  }
  tables(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tables", [], false),
    );
  }
  tablesample(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tablesample", [], false),
    );
  }
  tablespace(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tablespace", [], false),
    );
  }
  tableName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tableName", [], false),
    );
  }
  tan(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tan", [], false),
    );
  }
  tanh(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "tanh", [], false),
    );
  }
  target(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "target", [], false),
    );
  }
  temp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "temp", [], false),
    );
  }
  template(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "template", [], false),
    );
  }
  temporary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "temporary", [], false),
    );
  }
  text(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "text", [], false),
    );
  }
  then(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "then", [], false),
    );
  }
  through(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "through", [], false),
    );
  }
  ties(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "ties", [], false),
    );
  }
  time(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "time", [], false),
    );
  }
  timestamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "timestamp", [], false),
    );
  }
  timezoneHour(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "timezoneHour", [], false),
    );
  }
  timezoneMinute(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "timezoneMinute", [], false),
    );
  }
  to(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "to", [], false),
    );
  }
  token(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "token", [], false),
    );
  }
  topLevelCount(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "topLevelCount", [], false),
    );
  }
  trailing(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "trailing", [], false),
    );
  }
  transaction(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transaction", [], false),
    );
  }
  transactionsCommitted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transactionsCommitted", [], false),
    );
  }
  transactionsRolledBack(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transactionsRolledBack", [], false),
    );
  }
  transactionActive(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transactionActive", [], false),
    );
  }
  transform(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transform", [], false),
    );
  }
  transforms(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "transforms", [], false),
    );
  }
  translate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "translate", [], false),
    );
  }
  translateRegex(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "translateRegex", [], false),
    );
  }
  translation(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "translation", [], false),
    );
  }
  treat(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "treat", [], false),
    );
  }
  trigger(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "trigger", [], false),
    );
  }
  triggerCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "triggerCatalog", [], false),
    );
  }
  triggerName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "triggerName", [], false),
    );
  }
  triggerSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "triggerSchema", [], false),
    );
  }
  trim(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "trim", [], false),
    );
  }
  trimArray(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "trimArray", [], false),
    );
  }
  true(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "true", [], false),
    );
  }
  truncate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "truncate", [], false),
    );
  }
  trusted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "trusted", [], false),
    );
  }
  type(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "type", [], false),
    );
  }
  types(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "types", [], false),
    );
  }
  uescape(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "uescape", [], false),
    );
  }
  unbounded(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unbounded", [], false),
    );
  }
  uncommitted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "uncommitted", [], false),
    );
  }
  unconditional(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unconditional", [], false),
    );
  }
  under(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "under", [], false),
    );
  }
  unencrypted(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unencrypted", [], false),
    );
  }
  union(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "union", [], false),
    );
  }
  unique(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unique", [], false),
    );
  }
  unknown(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unknown", [], false),
    );
  }
  unlink(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unlink", [], false),
    );
  }
  unlisten(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unlisten", [], false),
    );
  }
  unlogged(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unlogged", [], false),
    );
  }
  unmatched(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unmatched", [], false),
    );
  }
  unnamed(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unnamed", [], false),
    );
  }
  unnest(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "unnest", [], false),
    );
  }
  until(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "until", [], false),
    );
  }
  untyped(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "untyped", [], false),
    );
  }
  update(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "update", [], false),
    );
  }
  upper(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "upper", [], false),
    );
  }
  uri(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "uri", [], false),
    );
  }
  usage(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "usage", [], false),
    );
  }
  user(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "user", [], false),
    );
  }
  userDefinedTypeCatalog(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "userDefinedTypeCatalog", [], false),
    );
  }
  userDefinedTypeCode(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "userDefinedTypeCode", [], false),
    );
  }
  userDefinedTypeName(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "userDefinedTypeName", [], false),
    );
  }
  userDefinedTypeSchema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "userDefinedTypeSchema", [], false),
    );
  }
  using(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "using", [], false),
    );
  }
  utf16(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "utf16", [], false),
    );
  }
  utf32(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "utf32", [], false),
    );
  }
  utf8(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "utf8", [], false),
    );
  }
  vacuum(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "vacuum", [], false),
    );
  }
  valid(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "valid", [], false),
    );
  }
  validate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "validate", [], false),
    );
  }
  validator(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "validator", [], false),
    );
  }
  value(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "value", [], false),
    );
  }
  values(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "values", [], false),
    );
  }
  valueOf(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "valueOf", [], false),
    );
  }
  varbinary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "varbinary", [], false),
    );
  }
  varchar(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "varchar", [], false),
    );
  }
  variadic(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "variadic", [], false),
    );
  }
  varying(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "varying", [], false),
    );
  }
  varPop(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "varPop", [], false),
    );
  }
  varSamp(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "varSamp", [], false),
    );
  }
  verbose(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "verbose", [], false),
    );
  }
  version(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "version", [], false),
    );
  }
  versioning(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "versioning", [], false),
    );
  }
  view(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "view", [], false),
    );
  }
  views(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "views", [], false),
    );
  }
  virtual(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "virtual", [], false),
    );
  }
  volatile(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "volatile", [], false),
    );
  }
  when(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "when", [], false),
    );
  }
  whenever(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "whenever", [], false),
    );
  }
  where(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "where", [], false),
    );
  }
  whitespace(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "whitespace", [], false),
    );
  }
  widthBucket(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "widthBucket", [], false),
    );
  }
  window(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "window", [], false),
    );
  }
  with(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "with", [], false),
    );
  }
  within(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "within", [], false),
    );
  }
  without(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "without", [], false),
    );
  }
  work(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "work", [], false),
    );
  }
  wrapper(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "wrapper", [], false),
    );
  }
  write(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "write", [], false),
    );
  }
  xml(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xml", [], false),
    );
  }
  xmlagg(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlagg", [], false),
    );
  }
  xmlattributes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlattributes", [], false),
    );
  }
  xmlbinary(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlbinary", [], false),
    );
  }
  xmlcast(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlcast", [], false),
    );
  }
  xmlcomment(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlcomment", [], false),
    );
  }
  xmlconcat(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlconcat", [], false),
    );
  }
  xmldeclaration(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmldeclaration", [], false),
    );
  }
  xmldocument(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmldocument", [], false),
    );
  }
  xmlelement(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlelement", [], false),
    );
  }
  xmlexists(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlexists", [], false),
    );
  }
  xmlforest(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlforest", [], false),
    );
  }
  xmliterate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmliterate", [], false),
    );
  }
  xmlnamespaces(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlnamespaces", [], false),
    );
  }
  xmlparse(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlparse", [], false),
    );
  }
  xmlpi(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlpi", [], false),
    );
  }
  xmlquery(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlquery", [], false),
    );
  }
  xmlroot(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlroot", [], false),
    );
  }
  xmlschema(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlschema", [], false),
    );
  }
  xmlserialize(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlserialize", [], false),
    );
  }
  xmltable(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmltable", [], false),
    );
  }
  xmltext(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmltext", [], false),
    );
  }
  xmlvalidate(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "xmlvalidate", [], false),
    );
  }
  year(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "year", [], false),
    );
  }
  yes(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "yes", [], false),
    );
  }
  zone(): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "zone", [], false),
    );
  }
  insertInto(table?: QueryBuilder, cols?: QueryBuilder[]): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "insertInto", [table, cols], false),
    );
  }
  raw(
    strings: TemplateStringsArray,
    ...args: (string | number)[]
  ): QueryBuilder {
    return new QueryBuilder().initFromStructure<QueryBuilder>(
      cloneSchema(this.getSchema(), "raw", [strings, ...args], true),
    );
  }
}
