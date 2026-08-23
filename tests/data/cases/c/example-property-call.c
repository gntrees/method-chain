#include "gntrees-method-chain.h"

Builder property_call_schema() {
    Builder f = createStringFormatter(
        variableName("f"),
        format("hi"));
    return createTypeConverter(
        variableName("c"),
        stringify("x"),
        (ChainValue){ .kind = V_PROPERTY_CALL, .as.propertyCall = { .name = "toJson", .builder = &f } });
}
