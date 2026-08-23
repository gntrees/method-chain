import { queryBuilder } from "../../../gntrees-method-chain/typescript/index";

const c = queryBuilder("c");
export const schema = c
  .select("id")
  .select(42)
  .select(true)
  .select(["name", "age"])
  .select({ id: "id" })
  .from("users")
  .limit(10)
  .offset(20)
  .with("cte", c.select("id"))
  .between(1, 100)
  .where(c.eq("active"))
  .set({ name: "bob" })
  .values([["a", "b"], ["c", "d"]])
  .raw`SELECT ${"x"} FROM ${"users"} WHERE age > ${18} AND name = ${"Alice"}`
  .asc()
  .desc();