import { convert } from "../convert";
import { sqlBuilder } from "../query-builder/definitions/typescript/sql-builder";

const q = sqlBuilder("q")

const p  = sqlBuilder("p")
const ccc = sqlBuilder("cc")

// console.dir(q.getSchema(), { depth: null });
const schema = q.select().select(p.abs(q.abort()).absent()).from().where()
q.search()
q.search()
q.search()
q.search()
q.search()
q.search()
q.search()
const schema2 = q.select().select(ccc.abs(q.abort()).absent()).from().where()

// console.dir(q.getSchema(),{ depth: null });


console.log(await convert(schema.getSchema(), "typescript"));
console.log(await convert(schema2.getSchema("ass"), "typescript"));

