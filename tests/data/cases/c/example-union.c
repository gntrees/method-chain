#include "gntrees-method-chain.h"

Builder union_schema() {
    return createTypeConverter(
        variableName("c"),
        unify("hello"),
        unify(42),
        pipe(chain(unify(7))));
}
