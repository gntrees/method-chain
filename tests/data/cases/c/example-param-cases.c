#include "gntrees-method-chain.h"

Builder param_cases_schema() {
    return queryBuilder(
        variableName("c"),
        select("id"),
        select(42),
        select(1),
        select(arr("name", "age")),
        select(map(entry("id", "id"))),
        from("users"),
        limit(10),
        offset(20),
        between(1, 100),
        set(map(entry("name", "bob"))),
        values(arr(arr("a", "b"), arr("c", "d"))),
        raw("SELECT ", "x", " FROM ", "users"),
        asc(),
        desc());
}