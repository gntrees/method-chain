#include "base-types.h"

#define V(name, dtype, member, param, value) \
    ArgumentValue name(param x) { return (ArgumentValue){.type = dtype, .as.member = (value)}; }

V(v_int, D_INT, i, long long, x)
V(v_float, D_FLOAT, f, double, x)
V(v_string, D_STRING, s, const char *, x)
V(v_bool, D_BOOL, i, int, x ? 1 : 0)

ArgumentValue v_null(void) { return (ArgumentValue){.type = D_NULL, .as.i = 0}; }

ArgumentValue v_pass(ArgumentValue v) { return v; }

ArgumentValue v_chain(const ChainType *c)
{
    return (ArgumentValue){.type = D_CHAIN, .as.chain = c};
}

#define ELEM(name, type, fn) \
    ArgumentValue name(const void *p) { return v_##fn(*(const type *)p); }

ELEM(elem_int, int, int)
ELEM(elem_double, double, float)
ELEM(elem_string, const char *const, string)
