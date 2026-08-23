import { createTypeConverter } from "../../../gntrees-method-chain/typescript/index";

const c = createTypeConverter("c");
export const schema = c.stringify("hello").numerify(42).boolify(true);
