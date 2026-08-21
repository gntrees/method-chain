#include "type-converter.h"

/* property toJson (gap #6): variabel ChainValue yang isinya referensi Builder.
   toJson_builder diisi saat runtime di main.c sebelum toJson dipakai. */
Builder toJson_builder;
const ChainValue toJson = {
    .kind = V_PROPERTY_CALL,
    .as.propertyCall = { .name = "toJson", .builder = &toJson_builder },
};

/* custom variable & function (gap #1): stub — user isi implementasinya. */
ArgumentValue custom_label = { .type = D_STRING, .as.s = "custom" };

ArgumentValue custom_transform(const ArgumentValue *arg)
{
    /* stub kosong — user isi implementasinya */
    return *arg;
}
