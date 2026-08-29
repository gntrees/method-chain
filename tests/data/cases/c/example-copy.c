#include "gntrees-method-chain.h"

Builder copy_schema() {
    Builder f = createTypeConverter(
        variableName("f"),
        label());
    return createTypeConverter(
        variableName("c"),
        copy(f),
        label("hello"));
}
