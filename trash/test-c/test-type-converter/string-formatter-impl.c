#include "string-formatter.h"

/* property toString (gap #6). toString_builder diisi saat runtime di main.c. */
Builder toString_builder;
const ChainValue toString = {
    .kind = V_PROPERTY_CALL,
    .as.propertyCall = { .name = "toString", .builder = &toString_builder },
};
