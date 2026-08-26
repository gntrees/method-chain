#include "gntrees-method-chain.h"

Builder property_call_schema() {
    return createTypeConverter(
        variableName("c"),
        testvar,
        stringify("hello"),
        testvar,
        label("aa"));
}
