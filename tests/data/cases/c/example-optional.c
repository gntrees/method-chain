#include "gntrees-method-chain.h"

Builder optional_schema() {
    Builder f = createStringFormatter(
        variableName("f"),
        labelDef());
    return createTypeConverter(
        variableName("c"),
        labelDef(),
        label("hello"),
        tagsDef(),
        pipe(&f));
}
