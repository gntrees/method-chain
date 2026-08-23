import {
  createTypeConverter,
  createStringFormatter,
} from "../../../gntrees-method-chain/typescript/index";

const c = createTypeConverter("c");
const f = createStringFormatter("f");
export const schema = c.interpolate`hello ${42} world ${"x"}`.pipe(f.interpolate`a ${7}`);
