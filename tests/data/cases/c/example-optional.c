#include "gntrees-method-chain.h"

Builder optional_schema() {
    Builder f = createStringFormatter(
        variableName("f"),
        label());
    return createTypeConverter(
        variableName("c"),
        label(),
        label("hello"),
        tags(),
        pipe(f));
}
