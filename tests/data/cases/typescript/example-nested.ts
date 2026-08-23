import { createTypeConverter } from "../../../gntrees-method-chain/typescript/definitions/index";
import { createStringFormatter } from "../../../gntrees-method-chain/typescript/definitions/index";

const c = createTypeConverter("c");
const f = createStringFormatter("f");
export const schema = c.pipe(f.format("hello"));
