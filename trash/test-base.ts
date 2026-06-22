import { convert } from "../convert";
import { sqlBuilder } from "../query-builder/definitions/typescript/sql-builder";

const q = sqlBuilder("q")

const p  = sqlBuilder("p")
const ccc = sqlBuilder("cc")

// console.dir(q.getSchema(), { depth: null });
const schema = q.insert(q.abort().insert(q.when()));
// const schema2 = q.select().select().from().raw`${4}${"aa"} dan 2`
// console.dir(q.getSchema(),{ depth: null });

console.log(await convert(schema.getSchema(), "typescript"));
// console.log(await convert(schema2.getSchema("ass"), "typescript"));

