import {
  createTypeConverter,
  createStringFormatter,
} from "../../../gntrees-method-chain/typescript/index";

const c = createTypeConverter("c");
const f = createStringFormatter("f");
export const schema = c.pipe(f.format("hello"));
