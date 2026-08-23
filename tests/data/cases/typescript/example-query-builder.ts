import { queryBuilder } from "../../../gntrees-method-chain/typescript/definitions/index";

const c = queryBuilder("c")
export const schema = c.select("id").from("users");


