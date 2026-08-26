import {
  createTypeConverter,
  createStringFormatter,
} from "../../../gntrees-method-chain/typescript/index";

const c = createTypeConverter("c");
const f = createStringFormatter("f");
export const schema = c.label().label("hello").tags().pipe(f.label());
