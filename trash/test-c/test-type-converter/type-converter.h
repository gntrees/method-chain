#ifndef GN_TREES_TYPE_CONVERTER_H
#define GN_TREES_TYPE_CONVERTER_H

#include "base-types.h"

#define create_type_converter(varName, ...) \
    ((SchemaType){ \
        .exportName = "schema", \
        .chain = { \
            .initFunction = { \
                .name = "create-type-converter", \
                .variableName = (varName), \
                .importString = "import { createTypeConverter } from \"../generated-examples/definitions/typescript/create-type-converter\"", \
            }, \
            .values = (ChainValue[]){ __VA_ARGS__ }, \
            .valueCount = OP_COUNT(__VA_ARGS__), \
        }, \
    })

#endif
