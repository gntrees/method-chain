import { createTypeConverter } from "../generated-examples/definitions/typescript/create-type-converter";
import { createStringFormatter } from "../generated-examples/definitions/typescript/create-string-formatter";

const c = createTypeConverter("c");
const f = createStringFormatter("f");
export const schema = c.pipe(f.format("hello"));
