import { sqlBuilder } from "../../../query-builder/definitions/typescript/sql-builder";

const q = sqlBuilder('q')
export const schema = q.select();
