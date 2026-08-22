import { createTypeConverter } from "../../../gntrees-method-chain/typescript/definitions/create-type-converter";
import { createStringFormatter } from "../../../gntrees-method-chain/typescript/definitions/create-string-formatter";

const c = createTypeConverter("c");
const f = createStringFormatter("f");
export const schema = c.pipe(f.format("hello"));
