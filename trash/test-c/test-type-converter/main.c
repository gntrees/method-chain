#include "type-converter.h"
#include "string-formatter.h"

#include <stdio.h>

static void show(const Builder *b)
{
    printf("%s\n", getJSONSchema(b));
}

int main(void)
{
    const char *l1 = "a";
    const char *l2 = "b";

    /* init property builders (gap #6): isi Builder sebelum property dipakai */
    toJson_builder = createTypeConverter(variableName("c"));
    toString_builder = createStringFormatter(variableName("f"));

    Builder base = createTypeConverter(variableName("c"), stringify("hello"));
    Builder chain = createTypeConverter(variableName("c"), stringify("hello"), numerify(42), boolify(1));

    Builder f = createStringFormatter(variableName("f"), format("hello"));
    Builder nested = createTypeConverter(variableName("c"), pipe(&f));

    /* metadata exportName/importString diterapkan lewat getSchema() */
    Builder withMeta = createTypeConverter(variableName("c"), stringify("x"));

    /* map berisi array heterogen (string|number) */
    Builder data = createTypeConverter(variableName("c"),
        setNested(map(
            entry("nums", arr(1, 2, 3)),
            entry("labels", arr(l1, l2)),
            entry("ratios", arr(0.5, 1.5)))));

    /* nested array (array of array of number) */
    Builder matrix = createTypeConverter(variableName("c"),
        addMatrix(arr(arr(1, 2), arr(3, 4))));

    /* object dengan key tetap (validasi key tak dikenal) */
    Builder cfg = createTypeConverter(variableName("c"),
        setConfig(map(entry("a", "x"), entry("b", 1))));

    /* default argument */
    Builder def = createTypeConverter(variableName("c"), label_def());

    Builder tf = createStringFormatter(variableName("f"),
        interpolate("a ", 7, ""));

    Builder templated = createTypeConverter(variableName("c"),
        interpolate("hello ", 42, " world ", "x", ""),
        pipe(&tf));

    show(&base);
    show(&chain);
    show(&nested);

    /* getSchema(builder, exportName, importString) — exportName/importString opsional */
    SchemaType withMetaSchema = getSchema(&withMeta, "my-schema", "from \"./x\"");
    printf("%s\n", getJSONSchema(&withMetaSchema));

    show(&data);
    show(&matrix);
    show(&cfg);
    show(&def);
    show(&templated);

    /* propertyCall (gap #6): variabel berisi Builder, dipakai bare */
    Builder withProp = createTypeConverter(variableName("c"), stringify("x"), toJson);
    Builder sfProp = createStringFormatter(variableName("f"), format("hi"), toString);
    show(&withProp);
    show(&sfProp);

    /* custom variable & function (gap #1) */
    Builder custom = createTypeConverter(variableName("c"), stringify(custom_label));
    ArgumentValue transformed = custom_transform(&custom_label);
    printf("custom_label: %s\n", custom_label.as.s);
    printf("custom_transform: %s\n", transformed.as.s);
    show(&custom);

    /* getSchema tanpa argumen opsional */
    SchemaType baseSchema = getSchema(&base);
    printf("exportName (getSchema 1 arg): %s\n", baseSchema.exportName);

    /* kasus error: error dicetak ke stderr oleh validate_schema */
    fprintf(stderr, "\n--- error cases (diharapkan error) ---\n");
    (void)createTypeConverter(variableName("bad"), stringify(42));                  /* tipe salah */
    (void)createTypeConverter(variableName("bad"), addMatrix(arr(1, "a")));         /* elemen array tak cocok */
    (void)createTypeConverter(variableName("bad"), setConfig(map(entry("zzz", 1)))); /* key tak dikenal */
    (void)createTypeConverter(variableName("bad"), unify(map(entry("x", 1))));      /* union tak cocok */
    const ChainValue broken = {
        .kind = V_PROPERTY_CALL,
        .as.propertyCall = { .name = "broken", .builder = NULL },
    };
    (void)createTypeConverter(variableName("bad"), stringify("x"), broken);         /* property tanpa builder */

    return 0;
}
