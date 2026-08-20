#include "type-converter.h"
#include "string-formatter.h"
#include "dump.h"

int main(void)
{
    const char *l1 = "a";
    const char *l2 = "b";

    SchemaType base = create_type_converter("c", stringify("hello"));
    SchemaType chain = create_type_converter("c", stringify("hello"), numerify(42), boolify(1));

    StringFormatter f = create_string_formatter("f", format("hello"));
    SchemaType nested = create_type_converter("c", pipe(&f));

    SchemaType data = create_type_converter("c",
        setNested(map(
            entry("nums", arr(1, 2, 3)),
            entry("labels", arr(l1, l2)),
            entry("ratios", arr(0.5, 1.5)))));

    struct StringFormatter tf = create_string_formatter("f",
        interpolate("a ", 7, ""));

    SchemaType template = create_type_converter("c",
        interpolate("hello ", 42, " world ", "x", ""),
        pipe(&tf));

    dump_schema(&base);
    dump_schema(&chain);
    dump_schema(&nested);
    dump_schema(&data);
    dump_schema(&template);

    return 0;
}
