#include "gntrees-method-chain.h"

Builder union_schema() {
    Builder f = createStringFormatter(
        variableName("f"),
        unify(7));
    return createTypeConverter(
        variableName("c"),
        unify("hello"),
        unify(42),
        pipe(&f));
}
