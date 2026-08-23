#include "gntrees-method-chain.h"

Builder template_literal_schema() {
    Builder f = createStringFormatter(
        variableName("f"),
        interpolate("a ", 7));
    return createTypeConverter(
        variableName("c"),
        interpolate("hello ", 42, " world ", "x"),
        interpolate(7, "!"),
        pipe(&f));
}
