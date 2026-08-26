#ifndef GN_TREES_BASE_TYPES_H
#define GN_TREES_BASE_TYPES_H

#include <stddef.h>
#include <alloca.h>

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

typedef struct Builder Builder;
typedef struct ChainType ChainType;
typedef struct FunctionCallType FunctionCallType;
typedef struct PropertyCallType PropertyCallType;
typedef struct ChainValue ChainValue;
typedef struct ArgumentValue ArgumentValue;
typedef struct ArgumentType ArgumentType;
typedef struct InitFunctionType InitFunctionType;
typedef struct SchemaType SchemaType;
typedef struct MapEntry MapEntry;
typedef struct StructType StructType;
typedef struct StructKey StructKey;
typedef struct FunctionSignature FunctionSignature;

struct ArgumentValue
{
    enum DynamicType type;
    size_t count;
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
    const Builder *builder;
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
    const char *typeName;
    ChainValue *values;
    size_t valueCount;
    InitFunctionType initFunction;
};

struct SchemaType
{
    const char *exportName;
    ChainType chain;
};

struct Builder
{
    const char *type;
    SchemaType schema;
};

enum StructKind
{
    S_STRING,
    S_NUMBER,
    S_BOOL,
    S_NULL,
    S_UNION,
    S_ARRAY,
    S_OBJECT,
    S_MAP,
    S_STRUCT_CALL
};

struct StructType
{
    enum StructKind kind;
    union
    {
        struct
        {
            size_t count;
            const StructType *types;
        } unionType;
        struct
        {
            const StructType *elem;
        } array;
        struct
        {
            size_t count;
            const StructKey *keys;
        } object;
        struct
        {
            const StructType *value;
        } map;
        struct
        {
            const char *name;
        } structureCall;
    } as;
};

struct StructKey
{
    const char *key;
    StructType type;
};

struct FunctionSignature
{
    const char *name;
    int isTemplateLiteral;
    const StructType *argumentStructs;
    size_t argumentCount;
};

/**
 * @param x long long
 * @return ArgumentValue (int)
 */
static ArgumentValue v_int(long long x);
/**
 * @param x double
 * @return ArgumentValue (float)
 */
static ArgumentValue v_float(double x);
/**
 * @param s const char *
 * @return ArgumentValue (string)
 */
static ArgumentValue v_string(const char *s);
/**
 * @param b int
 * @return ArgumentValue (boolean)
 */
static ArgumentValue v_bool(int b);
/**
 * @return ArgumentValue (null)
 */
static ArgumentValue v_null(void);
/**
 * @param v ArgumentValue
 * @return ArgumentValue
 */
static ArgumentValue v_pass(ArgumentValue v);
/**
 * @param b Builder
 * @return ArgumentValue (chain)
 */
static ArgumentValue v_builder(Builder b);

/**
 * @param typeName const char *
 * @param builders Builder[]
 * @param count size_t
 * @param init InitFunctionType
 * @return ChainType
 */
static ChainType builder_chain(const char *typeName, const Builder *builders, size_t count, InitFunctionType init);

/**
 * @param typeName const char *
 * @param value ChainValue *
 * @return Builder (function-call)
 */
static Builder builder_single(const char *typeName, const ChainValue *value);

static int validate_schema(const SchemaType *s, const FunctionSignature *functions, size_t functionCount);
static int validate_properties(const SchemaType *s);
static SchemaType validate_and_return(SchemaType s, const FunctionSignature *functions, size_t functionCount);

/**
 * @param n const char *
 * @param args ArgumentType[]
 * @param cnt size_t
 * @param tpl int
 * @return Builder (function-call)
 */
#define builder_call(n, args, cnt, tpl) \
    ((Builder){ \
        .type = "function-call", \
        .schema = { .exportName = 0, .chain = { \
            .typeName = 0, \
            .values = (ChainValue[]){ { \
                .kind = V_FUNCTION_CALL, \
                .as.functionCall = { \
                    .name = (n), \
                    .arguments = (args), \
                    .argumentCount = (cnt), \
                    .isTemplateLiteral = (tpl), \
                } \
            } }, \
            .valueCount = 1, \
            .initFunction = {0}, \
        } } \
    })

/**
 * @param val ArgumentValue
 * @return ArgumentType
 */
#define mkarg(val) \
    ((ArgumentType){ .argument = (val), .hasDefault = 0, .def = {0} })

/**
 * @param val ArgumentValue
 * @param dflt ArgumentValue
 * @return ArgumentType
 */
#define mkarg_def(val, dflt) \
    ((ArgumentType){ .argument = (val), .hasDefault = 1, .def = (dflt) })

/**
 * @param x const char *
 * @return Builder (meta)
 */
#define variableName(x) \
    ((Builder){ \
        .type = "meta", \
        .schema = { .exportName = 0, .chain = { \
            .typeName = "meta", \
            .values = 0, \
            .valueCount = 0, \
            .initFunction = { .name = "variableName", .variableName = (x), .importString = 0 }, \
        } } \
    })

/**
 * @param X any
 * @return ArgumentValue
 */
#define v(X) _Generic((X),                 \
    int: v_int,                            \
    long: v_int,                           \
    long long: v_int,                      \
    double: v_float,                       \
    float: v_float,                        \
    char *: v_string,                      \
    const char *: v_string,                \
    ArgumentValue: v_pass,                 \
    Builder: v_builder,                    \
    const Builder: v_builder)(X)

/**
 * @param ... Builder
 * @return Builder (chain)
 */
#define chain(...) \
    ((Builder){ \
        .type = "chain", \
        .schema = { .exportName = 0, .chain = builder_chain( \
            ((Builder[]){ __VA_ARGS__ })[0].schema.chain.typeName, \
            (Builder[]){ __VA_ARGS__ }, \
            BUILDER_COUNT(__VA_ARGS__), \
            ((Builder[]){ __VA_ARGS__ })[0].schema.chain.initFunction) } \
    })

/**
 * @param key const char *
 * @param val any
 * @return MapEntry
 */
#define entry(key, val) ((MapEntry){ (key), v(val) })

#define CAT2(a, b) a##b
#define CAT(a, b) CAT2(a, b)

#define VA_MAP_1(m, a) m(a)
#define VA_MAP_2(m, a, ...) m(a), VA_MAP_1(m, __VA_ARGS__)
#define VA_MAP_3(m, a, ...) m(a), VA_MAP_2(m, __VA_ARGS__)
#define VA_MAP_4(m, a, ...) m(a), VA_MAP_3(m, __VA_ARGS__)
#define VA_MAP_5(m, a, ...) m(a), VA_MAP_4(m, __VA_ARGS__)
#define VA_MAP_6(m, a, ...) m(a), VA_MAP_5(m, __VA_ARGS__)
#define VA_MAP_7(m, a, ...) m(a), VA_MAP_6(m, __VA_ARGS__)
#define VA_MAP_8(m, a, ...) m(a), VA_MAP_7(m, __VA_ARGS__)

#define VA_MAP_N(_1, _2, _3, _4, _5, _6, _7, _8, N, ...) CAT(VA_MAP_, N)
#define VA_MAP(m, ...) VA_MAP_N(__VA_ARGS__, 8, 7, 6, 5, 4, 3, 2, 1)(m, __VA_ARGS__)

#define BUILDER_COUNT(...) \
    (sizeof((Builder[]){ __VA_ARGS__ }) / sizeof(Builder))

#define COUNT_OF(a) \
    (sizeof(a) / sizeof((a)[0]))

/**
 * @param ... any
 * @return ArgumentValue (array)
 */
#define arr(...) \
    ((ArgumentValue){ \
        .type = D_ARRAY, \
        .count = sizeof((ArgumentValue[]){ VA_MAP(v, __VA_ARGS__) }) / sizeof(ArgumentValue), \
        .as.data = (ArgumentValue[]){ VA_MAP(v, __VA_ARGS__) }, \
    })

/**
 * @param first MapEntry
 * @param ... MapEntry
 * @return ArgumentValue (map)
 */
#define map(first, ...) \
    ((ArgumentValue){ \
        .type = D_MAP, \
        .count = sizeof((MapEntry[]){ first, __VA_ARGS__ }) / sizeof(MapEntry), \
        .as.data = (MapEntry[]){ first, __VA_ARGS__ } \
    })

#endif
