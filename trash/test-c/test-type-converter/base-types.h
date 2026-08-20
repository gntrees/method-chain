#ifndef GN_TREES_BASE_TYPES_H
#define GN_TREES_BASE_TYPES_H

#include <stddef.h>
#include <alloca.h>

/* Nama tipe mengikuti SchemaType di base/typescript/base-types.ts */

enum DynamicType
{
    D_INT,
    D_FLOAT,
    D_STRING,
    D_BOOL,
    D_NULL,
    D_MAP,
    D_ARRAY,
    D_CHAIN
};

typedef struct ChainType ChainType;
typedef struct FunctionCallType FunctionCallType;
typedef struct PropertyCallType PropertyCallType;
typedef struct ChainValue ChainValue;
typedef struct ArgumentValue ArgumentValue;
typedef struct ArgumentType ArgumentType;
typedef struct InitFunctionType InitFunctionType;
typedef struct SchemaType SchemaType;
typedef struct MapEntry MapEntry;

struct ArgumentValue
{
    enum DynamicType type;
    size_t elemSize;
    size_t count;
    ArgumentValue (*elemToData)(const void *);
    union
    {
        long long i;
        double f;
        const char *s;
        const void *data;
        const ChainType *chain;
    } as;
};

struct MapEntry
{
    const char *key;
    ArgumentValue value;
};

struct InitFunctionType
{
    const char *name;
    const char *variableName;
    const char *importString;
};

struct ArgumentType
{
    ArgumentValue argument;
    int hasDefault;
    ArgumentValue def;
};

enum ChainValueKind
{
    V_FUNCTION_CALL,
    V_PROPERTY_CALL
};

struct FunctionCallType
{
    const char *name;
    ArgumentType *arguments;
    size_t argumentCount;
    int isTemplateLiteral;
};

struct PropertyCallType
{
    const char *name;
};

struct ChainValue
{
    enum ChainValueKind kind;
    union
    {
        FunctionCallType functionCall;
        PropertyCallType propertyCall;
    } as;
};

struct ChainType
{
    ChainValue *values;
    size_t valueCount;
    InitFunctionType initFunction;
};

struct SchemaType
{
    const char *exportName;
    ChainType chain;
};

ArgumentValue v_int(long long x);
ArgumentValue v_float(double x);
ArgumentValue v_string(const char *s);
ArgumentValue v_bool(int b);
ArgumentValue v_null(void);
ArgumentValue v_pass(ArgumentValue v);
ArgumentValue v_chain(const ChainType *c);

ArgumentValue elem_int(const void *p);
ArgumentValue elem_double(const void *p);
ArgumentValue elem_string(const void *p);

#define op_call(n, args, cnt, tpl) \
    ((ChainValue){ \
        .kind = V_FUNCTION_CALL, \
        .as.functionCall = { \
            .name = (n), \
            .arguments = (args), \
            .argumentCount = (cnt), \
            .isTemplateLiteral = (tpl), \
        } \
    })

#define mkarg(val) \
    ((ArgumentType){ .argument = (val), .hasDefault = 0, .def = {0} })

#define mkarg_def(val, dflt) \
    ((ArgumentType){ .argument = (val), .hasDefault = 1, .def = (dflt) })

#define stringify(val) \
    op_call("stringify", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)
#define numerify(val) \
    op_call("numerify", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)
#define boolify(val) \
    op_call("boolify", (ArgumentType[]){ mkarg(v_bool((val) ? 1 : 0)) }, 1, 0)
#define unify(val) \
    op_call("unify", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)
#define setNested(data) \
    op_call("setNested", (ArgumentType[]){ mkarg(data) }, 1, 0)
#define pipe(f) \
    op_call("pipe", (ArgumentType[]){ mkarg(v_chain(&(f)->schema.chain)) }, 1, 0)
#define prop(name) \
    ((ChainValue){ .kind = V_PROPERTY_CALL, .as.propertyCall = { .name = (name) } })

#define v(X) _Generic((X),                 \
    int: v_int,                            \
    long: v_int,                           \
    long long: v_int,                      \
    double: v_float,                       \
    float: v_float,                        \
    char *: v_string,                      \
    const char *: v_string,                \
    void *: v_null,                        \
    ArgumentValue: v_pass)(X)

#define ELEM_TO_DATA(X) _Generic((X),     \
    int: elem_int,                        \
    double: elem_double,                  \
    char *: elem_string,                  \
    const char *: elem_string,            \
    default: (ArgumentValue (*)(const void *))0)

#define entry(key, val) ((MapEntry){ (key), v(val) })

#define CAT2(a, b) a##b
#define CAT(a, b) CAT2(a, b)

#define VA_MAP_1(m, a) m(a)
#define VA_MAP_2(m, a, ...) m(a), VA_MAP_1(m, __VA_ARGS__)
#define VA_MAP_3(m, a, ...) m(a), VA_MAP_2(m, __VA_ARGS__)
#define VA_MAP_4(m, a, ...) m(a), VA_MAP_3(m, __VA_ARGS__)
#define VA_MAP_5(m, a, ...) m(a), VA_MAP_4(m, __VA_ARGS__)
#define VA_MAP_6(m, a, ...) m(a), VA_MAP_5(m, __VA_ARGS__)

#define VA_MAP_N(_1, _2, _3, _4, _5, _6, N, ...) CAT(VA_MAP_, N)
#define VA_MAP(m, ...) VA_MAP_N(__VA_ARGS__, 6, 5, 4, 3, 2, 1)(m, __VA_ARGS__)

#define arr(first, ...) \
    ((ArgumentValue){ \
        .type = D_ARRAY, \
        .elemSize = sizeof(first), \
        .count = sizeof((__typeof__(first)[]){ first, __VA_ARGS__ }) / sizeof(first), \
        .elemToData = ELEM_TO_DATA(first), \
        .as.data = (__typeof__(first)[]){ first, __VA_ARGS__ } \
    })

#define map(first, ...) \
    ((ArgumentValue){ \
        .type = D_MAP, \
        .count = sizeof((MapEntry[]){ first, __VA_ARGS__ }) / sizeof(MapEntry), \
        .as.data = (MapEntry[]){ first, __VA_ARGS__ } \
    })

/* Statement-expression GNU C (gcc) + alloca: menyaring string kosong agar
   sama persis dengan createSchema TS yang membuang string kosong pada
   template literal. Memory alloca hidup di frame pemanggil, sama seperti
   compound literal lain di header ini. */
#define interpolate(...) \
    ({ \
        const ArgumentValue _vals[] = { VA_MAP(v, __VA_ARGS__) }; \
        size_t _n = sizeof(_vals) / sizeof(_vals[0]); \
        size_t _cnt = 0; \
        for (size_t _i = 0; _i < _n; _i++) \
            _cnt += !(_vals[_i].type == D_STRING && _vals[_i].as.s[0] == '\0'); \
        ArgumentType *_args = alloca((_cnt ? _cnt : 1) * sizeof(ArgumentType)); \
        size_t _j = 0; \
        for (size_t _i = 0; _i < _n; _i++) \
            if (!(_vals[_i].type == D_STRING && _vals[_i].as.s[0] == '\0')) \
                _args[_j++] = (ArgumentType){ .argument = _vals[_i], .hasDefault = 0, .def = {0} }; \
        (ChainValue){ \
            .kind = V_FUNCTION_CALL, \
            .as.functionCall = { \
                .name = "interpolate", \
                .arguments = _args, \
                .argumentCount = _cnt, \
                .isTemplateLiteral = 1, \
            } \
        }; \
    })

#define OP_COUNT(...) \
    (sizeof((ChainValue[]){ __VA_ARGS__ }) / sizeof(ChainValue))

#endif
