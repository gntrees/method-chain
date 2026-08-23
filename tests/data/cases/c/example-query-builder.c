#include "gntrees-method-chain.h"

Builder query_builder_schema() {
    return queryBuilder(
        variableName("c"),
        select("id"),
        from("users"));
}
