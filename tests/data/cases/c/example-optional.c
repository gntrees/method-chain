#include "gntrees-method-chain.h"

Builder optional_schema() {
    Builder f = createStringFormatter(
        variableName("f"),
        label_def());
    return createTypeConverter(
        variableName("c"),
        label_def(),
        label("hello"),
        pipe(&f));
}
