import { createTypeConverter } from "../../../gntrees-method-chain/typescript/definitions/index";

const c = createTypeConverter("c");
export const schema = c.label().tags();