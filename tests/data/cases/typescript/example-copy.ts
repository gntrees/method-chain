import {
  createTypeConverter,
  copy,
} from "../../../gntrees-method-chain/typescript/index";

const f = createTypeConverter("f").label();
const c = createTypeConverter("c", copy(f));
export const schema = c.label("hello");
