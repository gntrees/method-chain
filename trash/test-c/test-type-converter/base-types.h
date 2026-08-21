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
typedef struct SchemaMetaBuilder SchemaMetaBuilder;
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
        const void *data; /* D_MAP: const MapEntry *; D_ARRAY: const ArgumentValue * */
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
    const Builder *builder; /* isinya Builder (referensi chain pemilik property) */
};

/* Metadata init function: variableName diisi lewat operation variableName()
   sebagai param pertama createTypeConverter / createStringFormatter. */
struct SchemaMetaBuilder
{
    const char *variableName;
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
    const char *typeName; /* struktur pemilik chain, untuk validasi structureCall */
    ChainValue *values;
    size_t valueCount;
    InitFunctionType initFunction;
};

struct SchemaType
{
    const char *exportName;
    ChainType chain;
};

/* Hasil init functions (createTypeConverter / createStringFormatter); dipakai
   oleh getSchema (return SchemaType). */
struct Builder
{
    SchemaType schema;
};

/* ---- StructType descriptor (mirror StructType TS) ---- */

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

/* Registry signature fungsi per struktur (di-generate core.ts). */
struct FunctionSignature
{
    const char *name;
    int isTemplateLiteral;
    const StructType *argumentStructs;
    size_t argumentCount;
};

ArgumentValue v_int(long long x);
ArgumentValue v_float(double x);
ArgumentValue v_string(const char *s);
ArgumentValue v_bool(int b);
ArgumentValue v_null(void);
ArgumentValue v_pass(ArgumentValue v);
ArgumentValue v_chain(const ChainType *c);

int validate_schema(const SchemaType *s, const FunctionSignature *functions, size_t functionCount);
int validate_properties(const SchemaType *s);
int arg_value_equal(const ArgumentValue *a, const ArgumentValue *b);
SchemaType validate_and_return(SchemaType s, const FunctionSignature *functions, size_t functionCount);

#define builder_call(n, args, cnt, tpl) \
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

/* variableName init function (param pertama createTypeConverter /
   createStringFormatter) */
#define variableName(x) \
    ((SchemaMetaBuilder){ .variableName = (x) })

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

#define BUILDER_COUNT(...) \
    (sizeof((ChainValue[]){ __VA_ARGS__ }) / sizeof(ChainValue))

#define COUNT_OF(a) \
    (sizeof(a) / sizeof((a)[0]))

/* Array = kumpulan dynamic value (ArgumentValue[]), bukan buffer elemen mentah
   (gap 5): menghilangkan elemSize/elemToData, mendukung nested array/object/chain.
   Compound literal polos (tanpa statement-expression) agar semua array hidup di
   blok pemanggil dan bisa bersarang dengan aman. */
#define arr(...) \
    ((ArgumentValue){ \
        .type = D_ARRAY, \
        .count = sizeof((ArgumentValue[]){ VA_MAP(v, __VA_ARGS__) }) / sizeof(ArgumentValue), \
        .as.data = (ArgumentValue[]){ VA_MAP(v, __VA_ARGS__) }, \
    })

#define map(first, ...) \
    ((ArgumentValue){ \
        .type = D_MAP, \
        .count = sizeof((MapEntry[]){ first, __VA_ARGS__ }) / sizeof(MapEntry), \
        .as.data = (MapEntry[]){ first, __VA_ARGS__ } \
    })

#endif
