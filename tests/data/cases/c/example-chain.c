#include "gntrees-method-chain.h"

Builder chain_schema() {
    return createTypeConverter(
        variableName("c"),
        stringify("hello"),
        numerify(42),
        boolify(v_bool(true)));
}
