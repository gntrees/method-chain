#include "gntrees-method-chain.h"

Builder nested_schema() {
    Builder f = createStringFormatter(
        variableName("f"),
        format("hello"));
    return createTypeConverter(
        variableName("c"),
        pipe(&f));
}
