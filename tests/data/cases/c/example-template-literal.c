#include "gntrees-method-chain.h"

Builder template_literal_schema() {
    return createTypeConverter(
        variableName("c"),
        interpolate("hello ", 42, " world ", "x"),
        pipe(chain(interpolate("a ", 7))));
}
