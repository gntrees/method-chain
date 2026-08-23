import { createTypeConverter } from "../../../gntrees-method-chain/typescript/index";
import { createStringFormatter } from "../../../gntrees-method-chain/typescript/index";

const c = createTypeConverter("c");
const f = createStringFormatter("f");
export const schema = c.unify("hello").unify(42).pipe(f.unify(7));
