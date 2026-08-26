#include "gntrees-method-chain.h"

Builder nested_schema() {
    return createTypeConverter(
        variableName("c"),
        pipe(chain(format("hello"))));
}
