#ifndef GN_TREES_STRING_FORMATTER_H
#define GN_TREES_STRING_FORMATTER_H

#include "base-types.h"

typedef struct StringFormatter StringFormatter;

struct StringFormatter
{
    SchemaType schema;
};

#define format(val) \
    op_call("format", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)

#define create_string_formatter(varName, ...) \
    ((struct StringFormatter){ \
        .schema = { \
            .exportName = "schema", \
            .chain = { \
                .initFunction = { \
                    .name = "create-string-formatter", \
                    .variableName = (varName), \
                    .importString = "import { createStringFormatter } from \"../generated-examples/definitions/typescript/create-string-formatter\"", \
                }, \
                .values = (ChainValue[]){ __VA_ARGS__ }, \
                .valueCount = OP_COUNT(__VA_ARGS__), \
            }, \
        }, \
    })

#endif
