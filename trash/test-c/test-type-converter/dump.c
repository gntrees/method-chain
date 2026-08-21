#include "dump.h"
#include "base-utils.h"

#include <stdio.h>

void dump_schema(const SchemaType *s)
{
    printf("%s\n", getJSONSchema(s));
}
