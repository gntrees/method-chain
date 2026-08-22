#include "gntrees-method-chain.h"

Builder base_schema() {
    return createTypeConverter(
        variableName("c"),
        stringify("hello"));
}
