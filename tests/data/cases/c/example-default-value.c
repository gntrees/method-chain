#include "gntrees-method-chain.h"

Builder default_value_schema() {
    return createTypeConverter(
        variableName("c"),
        label(),
        tags());
}
