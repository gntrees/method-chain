import { createTypeConverter } from "../generated-examples/definitions/typescript/create-type-converter";

const c = createTypeConverter("c");
export const schema = c.stringify("hello").numerify(42).boolify(true);
