// Auto-generated single-header for lingua-tungga
#ifndef GN_TREES_LINGUA_TUNGGA_H
#define GN_TREES_LINGUA_TUNGGA_H

#ifndef _POSIX_C_SOURCE
#define _POSIX_C_SOURCE 200809L
#endif

#include "cJSON.h"

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
typedef struct CopyType CopyType;
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
typedef struct PropertySignature PropertySignature;
typedef struct StructureRegistry StructureRegistry;

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
    int provided;
};

enum ChainValueKind
{
    V_FUNCTION_CALL,
    V_PROPERTY_CALL,
    V_COPY
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

struct ChainType
{
    const char *typeName;
    ChainValue *values;
    size_t valueCount;
    InitFunctionType initFunction;
};

struct CopyType
{
    ChainType source;
};

struct ChainValue
{
    enum ChainValueKind kind;
    union
    {
        FunctionCallType functionCall;
        PropertyCallType propertyCall;
        CopyType copy;
    } as;
};

struct SchemaType
{
    const char *exportName;
    ArgumentValue importPaths;
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
    const char *returnTypeName;
};

struct PropertySignature
{
    const char *name;
    const char *returnTypeName;
};

struct StructureRegistry
{
    const char *typeName;
    const FunctionSignature *functions;
    size_t functionCount;
    const PropertySignature *properties;
    size_t propertyCount;
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

static void validate_schema(const SchemaType *s, const StructureRegistry *registries, size_t registryCount);
static SchemaType validate_and_return(SchemaType s, const StructureRegistry *registries, size_t registryCount);

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
    ((ArgumentType){ .argument = (val), .hasDefault = 0, .def = {0}, .provided = 1 })

/**
 * @param val ArgumentValue
 * @param dflt ArgumentValue
 * @return ArgumentType
 */
#define mkarg_def(val, dflt) \
    ((ArgumentType){ .argument = (val), .hasDefault = 1, .def = (dflt), .provided = 1 })

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
 * @param src Builder (schema/init-function)
 * @return Builder (copy)
 *
 * Membungkus builder hasil init function agar semua builder-nya ditaruh
 * ke chain builder lain saat dipakai sebagai argumen chain (param kedua
 * init function / isi chain()). Sumber disimpan sebagai nilai V_COPY di
 * chain (bukan di-flatten) sehingga skema JSON tetap merekam operasi copy.
 * Builder mentah tanpa copy() akan ditolak oleh builder_chain.
 */
#define copy(src) \
    ((Builder){ \
        .type = "copy", \
        .schema = { .exportName = 0, .chain = { \
            .typeName = 0, \
            .values = (ChainValue[]){ { \
                .kind = V_COPY, \
                .as.copy = { .source = (src).schema.chain } \
            } }, \
            .valueCount = 1, \
            .initFunction = {0}, \
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
#define arr(...) CAT(arr_, __VA_OPT__(1))(__VA_ARGS__)
#define arr_() \
    ((ArgumentValue){ .type = D_ARRAY, .count = 0, .as.data = 0 })
#define arr_1(...) \
    ((ArgumentValue){ \
        .type = D_ARRAY, \
        .count = sizeof((ArgumentValue[]){ VA_MAP(v, __VA_ARGS__) }) / sizeof(ArgumentValue), \
        .as.data = (ArgumentValue[]){ VA_MAP(v, __VA_ARGS__) } \
    })

/**
 * @param ... MapEntry
 * @return ArgumentValue (map)
 */
#define map(...) CAT(map_, __VA_OPT__(1))(__VA_ARGS__)
#define map_() \
    ((ArgumentValue){ .type = D_MAP, .count = 0, .as.data = 0 })
#define map_1(...) \
    ((ArgumentValue){ \
        .type = D_MAP, \
        .count = sizeof((MapEntry[]){ __VA_ARGS__ }) / sizeof(MapEntry), \
        .as.data = (MapEntry[]){ __VA_ARGS__ } \
    })

#endif


/* ---- base utilities (di-inline sebagai header-only) ---- */
#ifdef __GNUC__
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wunused-function"
#endif
#ifndef GN_TREES_BASE_UTILS_H
#define GN_TREES_BASE_UTILS_H

#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <ctype.h>

static SchemaType getSchema_impl(const Builder *b, const char *exportName, ArgumentValue importPaths);

static inline SchemaType getSchema_exportName_impl(const Builder *b, const char *exportName)
{
    return getSchema_impl(b, exportName, (ArgumentValue){0});
}

static inline SchemaType getSchema_importPaths_impl(const Builder *b, ArgumentValue importPaths)
{
    return getSchema_impl(b, NULL, importPaths);
}

#define GET_SCHEMA_1(b) getSchema_impl((b), NULL, (ArgumentValue){0})
#define GET_SCHEMA_2(b, e) _Generic((e), \
    const char *: getSchema_exportName_impl, \
    char *: getSchema_exportName_impl, \
    default: getSchema_importPaths_impl)((b), (e))
#define GET_SCHEMA_3(b, e, i) getSchema_impl((b), (e), (i))
#define GET_SCHEMA_SELECT(_1, _2, _3, NAME, ...) NAME
/**
 * @param b Builder *
 * @param e const char * (optional) exportName ATAU ArgumentValue (optional) importPaths map
 * @param i ArgumentValue (optional, map of language -> import path)
 * @return SchemaType
 */
#define getSchema(...) \
    GET_SCHEMA_SELECT(__VA_ARGS__, GET_SCHEMA_3, GET_SCHEMA_2, GET_SCHEMA_1)(__VA_ARGS__)

static const char *getJSONSchema_impl(const SchemaType *s);

static inline const char *getJSONSchema_builder(const Builder *b)
{
    return getJSONSchema_impl(&b->schema);
}

/**
 * @param x SchemaType * | Builder *
 * @return const char *
 */
#define getJSONSchema(x) \
    _Generic((x), \
        const Builder *: getJSONSchema_builder, \
        Builder *: getJSONSchema_builder, \
        default: getJSONSchema_impl)(x)

/* ---- value manipulation helpers (string / array / object) ----
 * Semua alokasi helper dicatat di arena `lt_allocs` sehingga
 * `lt_free_all()` dapat membebaskan semuanya sekaligus. Nilai dari
 * literal / macro `arr` / `map` (compound literal) tidak dialokasikan
 * lewat arena dan karenanya tidak ikut di-free.
 */

#ifndef LT_MAX_ALLOCS
#define LT_MAX_ALLOCS 4096
#endif

static void *lt_allocs[LT_MAX_ALLOCS];
static size_t lt_alloc_count = 0;

static void *lt_alloc(size_t n)
{
    void *p = malloc(n ? n : 1);
    if (p && lt_alloc_count < LT_MAX_ALLOCS)
        lt_allocs[lt_alloc_count++] = p;
    return p;
}

static void lt_free_all(void)
{
    for (size_t i = 0; i < lt_alloc_count; i++)
        free(lt_allocs[i]);
    lt_alloc_count = 0;
}

static ArgumentValue lt_make_arr(ArgumentValue *items, size_t count)
{
    ArgumentValue *copy = NULL;
    if (count)
    {
        copy = lt_alloc(count * sizeof(ArgumentValue));
        if (!copy)
            return v_null();
        memcpy(copy, items, count * sizeof(ArgumentValue));
    }
    return (ArgumentValue){ .type = D_ARRAY, .count = count, .as.data = copy };
}

static ArgumentValue lt_make_map(MapEntry *entries, size_t count)
{
    MapEntry *copy = NULL;
    if (count)
    {
        copy = lt_alloc(count * sizeof(MapEntry));
        if (!copy)
            return v_null();
        memcpy(copy, entries, count * sizeof(MapEntry));
    }
    return (ArgumentValue){ .type = D_MAP, .count = count, .as.data = copy };
}

static const char *lt_as_string(const ArgumentValue *v)
{
    return v->type == D_STRING && v->as.s ? v->as.s : "";
}

static long long lt_as_int(const ArgumentValue *v)
{
    return v->type == D_INT ? v->as.i : 0;
}

static int lt_value_equals(ArgumentValue a, ArgumentValue b)
{
    if (a.type != b.type)
        return 0;
    switch (a.type)
    {
    case D_INT:
        return a.as.i == b.as.i;
    case D_FLOAT:
        return a.as.f == b.as.f;
    case D_STRING:
        return strcmp(lt_as_string(&a), lt_as_string(&b)) == 0;
    case D_BOOL:
        return (a.as.i != 0) == (b.as.i != 0);
    case D_NULL:
        return 1;
    default:
        return a.as.data == b.as.data;
    }
}

static const char *lt_repr(ArgumentValue v, char *buf, size_t bufsize)
{
    switch (v.type)
    {
    case D_STRING:
        return lt_as_string(&v);
    case D_INT:
        snprintf(buf, bufsize, "%lld", v.as.i);
        return buf;
    case D_FLOAT:
        snprintf(buf, bufsize, "%g", v.as.f);
        return buf;
    case D_BOOL:
        return v.as.i ? "true" : "false";
    case D_NULL:
        return "null";
    default:
        return "";
    }
}

/* ---- string manipulation ---- */

static ArgumentValue lt_str_concat(ArgumentValue a, ArgumentValue b)
{
    const char *sa = lt_as_string(&a);
    const char *sb = lt_as_string(&b);
    size_t la = strlen(sa), lb = strlen(sb);
    char *buf = lt_alloc(la + lb + 1);
    if (!buf)
        return v_null();
    memcpy(buf, sa, la);
    memcpy(buf + la, sb, lb + 1);
    return v_string(buf);
}

static ArgumentValue lt_len(ArgumentValue a)
{
    if (a.type == D_STRING)
        return v_int((long long)strlen(lt_as_string(&a)));
    if (a.type == D_ARRAY || a.type == D_MAP)
        return v_int((long long)a.count);
    return v_int(0);
}

static ArgumentValue lt_to_upper(ArgumentValue a)
{
    const char *s = lt_as_string(&a);
    size_t n = strlen(s);
    char *buf = lt_alloc(n + 1);
    if (!buf)
        return v_null();
    for (size_t i = 0; i < n; i++)
        buf[i] = (char)toupper((unsigned char)s[i]);
    buf[n] = '\0';
    return v_string(buf);
}

static ArgumentValue lt_to_lower(ArgumentValue a)
{
    const char *s = lt_as_string(&a);
    size_t n = strlen(s);
    char *buf = lt_alloc(n + 1);
    if (!buf)
        return v_null();
    for (size_t i = 0; i < n; i++)
        buf[i] = (char)tolower((unsigned char)s[i]);
    buf[n] = '\0';
    return v_string(buf);
}

static ArgumentValue lt_trim(ArgumentValue a)
{
    const char *s = lt_as_string(&a);
    while (*s && isspace((unsigned char)*s))
        s++;
    size_t n = strlen(s);
    while (n > 0 && isspace((unsigned char)s[n - 1]))
        n--;
    char *buf = lt_alloc(n + 1);
    if (!buf)
        return v_null();
    memcpy(buf, s, n);
    buf[n] = '\0';
    return v_string(buf);
}

static long long lt_norm_index(long long i, long long len)
{
    if (i < 0)
        i += len;
    if (i < 0)
        i = 0;
    if (i > len)
        i = len;
    return i;
}

static ArgumentValue lt_slice(ArgumentValue a, ArgumentValue start, ArgumentValue end)
{
    long long s = lt_as_int(&start);
    long long e = lt_as_int(&end);
    if (a.type == D_STRING)
    {
        const char *str = lt_as_string(&a);
        long long len = (long long)strlen(str);
        s = lt_norm_index(s, len);
        e = lt_norm_index(e, len);
        if (e < s)
            e = s;
        size_t n = (size_t)(e - s);
        char *buf = lt_alloc(n + 1);
        if (!buf)
            return v_null();
        memcpy(buf, str + s, n);
        buf[n] = '\0';
        return v_string(buf);
    }
    if (a.type == D_ARRAY)
    {
        const ArgumentValue *items = a.as.data;
        long long len = (long long)a.count;
        s = lt_norm_index(s, len);
        e = lt_norm_index(e, len);
        if (e < s)
            e = s;
        return lt_make_arr((ArgumentValue *)(items ? items + s : NULL), (size_t)(e - s));
    }
    return v_null();
}

static ArgumentValue lt_replace(ArgumentValue a, ArgumentValue search, ArgumentValue replacement)
{
    const char *str = lt_as_string(&a);
    const char *find = lt_as_string(&search);
    const char *rep = lt_as_string(&replacement);
    size_t fl = strlen(find);
    if (fl == 0)
    {
        char *empty = lt_alloc(strlen(str) + 1);
        if (!empty)
            return v_null();
        strcpy(empty, str);
        return v_string(empty);
    }
    size_t rl = strlen(rep);
    size_t count = 0;
    for (const char *p = str; (p = strstr(p, find)); p += fl)
        count++;
    long long total = (long long)strlen(str) + (long long)count * ((long long)rl - (long long)fl);
    char *buf = lt_alloc((size_t)total + 1);
    if (!buf)
        return v_null();
    char *out = buf;
    const char *p = str;
    const char *q;
    while ((q = strstr(p, find)))
    {
        size_t seg = (size_t)(q - p);
        memcpy(out, p, seg);
        out += seg;
        memcpy(out, rep, rl);
        out += rl;
        p = q + fl;
    }
    strcpy(out, p);
    return v_string(buf);
}

static ArgumentValue lt_split(ArgumentValue a, ArgumentValue separator)
{
    const char *str = lt_as_string(&a);
    const char *d = lt_as_string(&separator);
    size_t dl = strlen(d);
    if (dl == 0)
        return lt_make_arr(NULL, 0);
    size_t cap = 8, count = 0;
    ArgumentValue *items = lt_alloc(cap * sizeof(ArgumentValue));
    if (!items)
        return v_null();
    const char *p = str;
    while (1)
    {
        const char *q = strstr(p, d);
        size_t n = q ? (size_t)(q - p) : strlen(p);
        char *buf = lt_alloc(n + 1);
        if (!buf)
            return v_null();
        memcpy(buf, p, n);
        buf[n] = '\0';
        items[count++] = v_string(buf);
        if (count == cap)
        {
            size_t ncap = cap * 2;
            ArgumentValue *bigger = lt_alloc(ncap * sizeof(ArgumentValue));
            if (!bigger)
                return v_null();
            memcpy(bigger, items, count * sizeof(ArgumentValue));
            items = bigger;
            cap = ncap;
        }
        if (!q)
            break;
        p = q + dl;
    }
    return lt_make_arr(items, count);
}

static ArgumentValue lt_contains(ArgumentValue a, ArgumentValue item)
{
    if (a.type == D_STRING)
        return v_bool(strstr(lt_as_string(&a), lt_as_string(&item)) != NULL);
    if (a.type == D_ARRAY)
    {
        const ArgumentValue *items = a.as.data;
        for (size_t i = 0; i < a.count; i++)
            if (lt_value_equals(items[i], item))
                return v_bool(1);
    }
    return v_bool(0);
}

static ArgumentValue lt_index_of(ArgumentValue a, ArgumentValue item)
{
    if (a.type == D_STRING)
    {
        const char *p = strstr(lt_as_string(&a), lt_as_string(&item));
        return v_int(p ? (long long)(p - lt_as_string(&a)) : -1);
    }
    if (a.type == D_ARRAY)
    {
        const ArgumentValue *items = a.as.data;
        for (size_t i = 0; i < a.count; i++)
            if (lt_value_equals(items[i], item))
                return v_int((long long)i);
    }
    return v_int(-1);
}

static ArgumentValue lt_repeat(ArgumentValue a, ArgumentValue count)
{
    const char *s = lt_as_string(&a);
    long long c = lt_as_int(&count);
    if (c < 0)
        c = 0;
    size_t l = strlen(s);
    char *buf = lt_alloc(l * (size_t)c + 1);
    if (!buf)
        return v_null();
    for (long long i = 0; i < c; i++)
        memcpy(buf + (size_t)i * l, s, l);
    buf[l * (size_t)c] = '\0';
    return v_string(buf);
}

static ArgumentValue lt_char_at(ArgumentValue a, ArgumentValue index)
{
    const char *s = lt_as_string(&a);
    long long i = lt_as_int(&index);
    if (i < 0 || i >= (long long)strlen(s))
        return v_string("");
    char *buf = lt_alloc(2);
    if (!buf)
        return v_null();
    buf[0] = s[i];
    buf[1] = '\0';
    return v_string(buf);
}

static ArgumentValue lt_starts_with(ArgumentValue a, ArgumentValue prefix)
{
    const char *s = lt_as_string(&a);
    const char *p = lt_as_string(&prefix);
    return v_bool(strncmp(s, p, strlen(p)) == 0);
}

static ArgumentValue lt_ends_with(ArgumentValue a, ArgumentValue suffix)
{
    const char *s = lt_as_string(&a);
    const char *p = lt_as_string(&suffix);
    size_t sl = strlen(s), pl = strlen(p);
    return v_bool(pl <= sl && strcmp(s + sl - pl, p) == 0);
}

/* ---- array manipulation ---- */

static ArgumentValue lt_index(ArgumentValue a, ArgumentValue index)
{
    if (a.type != D_ARRAY)
        return v_null();
    long long i = lt_as_int(&index);
    if (i < 0 || i >= (long long)a.count)
        return v_null();
    return ((const ArgumentValue *)a.as.data)[i];
}

static ArgumentValue lt_append(ArgumentValue a, ArgumentValue item)
{
    size_t ca = a.type == D_ARRAY ? a.count : 0;
    const ArgumentValue *src = a.type == D_ARRAY ? a.as.data : NULL;
    ArgumentValue *out = lt_alloc((ca + 1) * sizeof(ArgumentValue));
    if (!out)
        return v_null();
    for (size_t i = 0; i < ca; i++)
        out[i] = src[i];
    out[ca] = item;
    return lt_make_arr(out, ca + 1);
}

static ArgumentValue lt_arr_concat(ArgumentValue a, ArgumentValue b)
{
    size_t ca = a.type == D_ARRAY ? a.count : 0;
    size_t cb = b.type == D_ARRAY ? b.count : 0;
    const ArgumentValue *ia = a.type == D_ARRAY ? a.as.data : NULL;
    const ArgumentValue *ib = b.type == D_ARRAY ? b.as.data : NULL;
    ArgumentValue *out = lt_alloc((ca + cb ? ca + cb : 1) * sizeof(ArgumentValue));
    if (!out)
        return v_null();
    for (size_t i = 0; i < ca; i++)
        out[i] = ia[i];
    for (size_t i = 0; i < cb; i++)
        out[ca + i] = ib[i];
    return lt_make_arr(out, ca + cb);
}

static ArgumentValue lt_join(ArgumentValue a, ArgumentValue separator)
{
    const char *d = lt_as_string(&separator);
    size_t dl = strlen(d);
    if (a.type != D_ARRAY)
        return v_string("");
    const ArgumentValue *items = a.as.data;
    size_t total = 1;
    char tmp[64];
    for (size_t i = 0; i < a.count; i++)
    {
        if (i)
            total += dl;
        total += strlen(lt_repr(items[i], tmp, sizeof tmp));
    }
    char *buf = lt_alloc(total);
    if (!buf)
        return v_null();
    buf[0] = '\0';
    for (size_t i = 0; i < a.count; i++)
    {
        if (i)
            strcat(buf, d);
        strcat(buf, lt_repr(items[i], tmp, sizeof tmp));
    }
    return v_string(buf);
}

static ArgumentValue lt_reverse(ArgumentValue a)
{
    if (a.type != D_ARRAY)
        return v_null();
    const ArgumentValue *items = a.as.data;
    size_t n = a.count;
    ArgumentValue *out = lt_alloc((n ? n : 1) * sizeof(ArgumentValue));
    if (!out)
        return v_null();
    for (size_t i = 0; i < n; i++)
        out[i] = items[n - 1 - i];
    return lt_make_arr(out, n);
}

static int lt_compare(ArgumentValue x, ArgumentValue y)
{
    if ((x.type == D_INT || x.type == D_FLOAT) && (y.type == D_INT || y.type == D_FLOAT))
    {
        double dx = x.type == D_INT ? (double)x.as.i : x.as.f;
        double dy = y.type == D_INT ? (double)y.as.i : y.as.f;
        return dx < dy ? -1 : dx > dy ? 1 : 0;
    }
    if (x.type == D_STRING && y.type == D_STRING)
    {
        int r = strcmp(lt_as_string(&x), lt_as_string(&y));
        return r < 0 ? -1 : r > 0 ? 1 : 0;
    }
    return (int)x.type - (int)y.type;
}

static ArgumentValue lt_sort(ArgumentValue a)
{
    if (a.type != D_ARRAY)
        return v_null();
    const ArgumentValue *items = a.as.data;
    size_t n = a.count;
    ArgumentValue *out = lt_alloc((n ? n : 1) * sizeof(ArgumentValue));
    if (!out)
        return v_null();
    for (size_t i = 0; i < n; i++)
        out[i] = items[i];
    for (size_t i = 1; i < n; i++)
    {
        ArgumentValue key = out[i];
        size_t j = i;
        while (j > 0 && lt_compare(out[j - 1], key) > 0)
        {
            out[j] = out[j - 1];
            j--;
        }
        out[j] = key;
    }
    return lt_make_arr(out, n);
}

static ArgumentValue lt_unique(ArgumentValue a)
{
    if (a.type != D_ARRAY)
        return v_null();
    const ArgumentValue *items = a.as.data;
    size_t n = a.count;
    ArgumentValue *out = lt_alloc((n ? n : 1) * sizeof(ArgumentValue));
    if (!out)
        return v_null();
    size_t m = 0;
    for (size_t i = 0; i < n; i++)
    {
        int duplicate = 0;
        for (size_t j = 0; j < m; j++)
            if (lt_value_equals(out[j], items[i]))
            {
                duplicate = 1;
                break;
            }
        if (!duplicate)
            out[m++] = items[i];
    }
    return lt_make_arr(out, m);
}

/* ---- object manipulation ---- */

static ArgumentValue lt_get(ArgumentValue a, ArgumentValue key)
{
    const char *k = lt_as_string(&key);
    if (a.type != D_MAP)
        return v_null();
    const MapEntry *entries = a.as.data;
    for (size_t i = 0; i < a.count; i++)
        if (entries[i].key && strcmp(entries[i].key, k) == 0)
            return entries[i].value;
    return v_null();
}

static ArgumentValue lt_set(ArgumentValue a, ArgumentValue key, ArgumentValue value)
{
    const char *k = lt_as_string(&key);
    size_t count = a.type == D_MAP ? a.count : 0;
    const MapEntry *src = a.type == D_MAP ? a.as.data : NULL;
    MapEntry *out = lt_alloc((count + 1) * sizeof(MapEntry));
    if (!out)
        return v_null();
    size_t n = 0;
    int replaced = 0;
    for (size_t i = 0; i < count; i++)
    {
        if (src[i].key && strcmp(src[i].key, k) == 0)
        {
            out[n].key = src[i].key;
            out[n].value = value;
            n++;
            replaced = 1;
        }
        else
        {
            out[n++] = src[i];
        }
    }
    if (!replaced)
    {
        out[n].key = k;
        out[n].value = value;
        n++;
    }
    return lt_make_map(out, n);
}

static ArgumentValue lt_keys(ArgumentValue a)
{
    size_t n = a.type == D_MAP ? a.count : 0;
    const MapEntry *entries = a.type == D_MAP ? a.as.data : NULL;
    ArgumentValue *out = lt_alloc((n ? n : 1) * sizeof(ArgumentValue));
    if (!out)
        return v_null();
    for (size_t i = 0; i < n; i++)
        out[i] = v_string(entries[i].key ? entries[i].key : "");
    return lt_make_arr(out, n);
}

static ArgumentValue lt_values(ArgumentValue a)
{
    size_t n = a.type == D_MAP ? a.count : 0;
    const MapEntry *entries = a.type == D_MAP ? a.as.data : NULL;
    ArgumentValue *out = lt_alloc((n ? n : 1) * sizeof(ArgumentValue));
    if (!out)
        return v_null();
    for (size_t i = 0; i < n; i++)
        out[i] = entries[i].value;
    return lt_make_arr(out, n);
}

static ArgumentValue lt_has(ArgumentValue a, ArgumentValue key)
{
    const char *k = lt_as_string(&key);
    if (a.type != D_MAP)
        return v_bool(0);
    const MapEntry *entries = a.as.data;
    for (size_t i = 0; i < a.count; i++)
        if (entries[i].key && strcmp(entries[i].key, k) == 0)
            return v_bool(1);
    return v_bool(0);
}

static ArgumentValue lt_merge(ArgumentValue a, ArgumentValue b)
{
    size_t ca = a.type == D_MAP ? a.count : 0;
    size_t cb = b.type == D_MAP ? b.count : 0;
    const MapEntry *ea = a.type == D_MAP ? a.as.data : NULL;
    const MapEntry *eb = b.type == D_MAP ? b.as.data : NULL;
    MapEntry *out = lt_alloc((ca + cb ? ca + cb : 1) * sizeof(MapEntry));
    if (!out)
        return v_null();
    size_t n = 0;
    for (size_t i = 0; i < ca; i++)
        out[n++] = ea[i];
    for (size_t i = 0; i < cb; i++)
    {
        int found = 0;
        for (size_t j = 0; j < n; j++)
        {
            if (out[j].key && eb[i].key && strcmp(out[j].key, eb[i].key) == 0)
            {
                out[j].value = eb[i].value;
                found = 1;
                break;
            }
        }
        if (!found)
            out[n++] = eb[i];
    }
    return lt_make_map(out, n);
}

static ArgumentValue lt_delete(ArgumentValue a, ArgumentValue key)
{
    const char *k = lt_as_string(&key);
    size_t count = a.type == D_MAP ? a.count : 0;
    const MapEntry *src = a.type == D_MAP ? a.as.data : NULL;
    MapEntry *out = lt_alloc((count ? count : 1) * sizeof(MapEntry));
    if (!out)
        return v_null();
    size_t n = 0;
    for (size_t i = 0; i < count; i++)
        if (!(src[i].key && strcmp(src[i].key, k) == 0))
            out[n++] = src[i];
    return lt_make_map(out, n);
}

static ArgumentValue lt_entries(ArgumentValue a)
{
    size_t n = a.type == D_MAP ? a.count : 0;
    const MapEntry *entries = a.type == D_MAP ? a.as.data : NULL;
    ArgumentValue *out = lt_alloc((n ? n : 1) * sizeof(ArgumentValue));
    if (!out)
        return v_null();
    for (size_t i = 0; i < n; i++)
    {
        ArgumentValue pair[2];
        pair[0] = v_string(entries[i].key ? entries[i].key : "");
        pair[1] = entries[i].value;
        out[i] = lt_make_arr(pair, 2);
    }
    return lt_make_arr(out, n);
}

#endif



#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <stdarg.h>

#define V(name, dtype, member, param, value) \
    static ArgumentValue name(param x) { return (ArgumentValue){.type = dtype, .as.member = (value)}; }

V(v_int, D_INT, i, long long, x)
V(v_float, D_FLOAT, f, double, x)
V(v_string, D_STRING, s, const char *, x)
V(v_bool, D_BOOL, i, int, x ? 1 : 0)

static ArgumentValue v_null(void) { return (ArgumentValue){.type = D_NULL, .as.i = 0}; }

static ArgumentValue v_pass(ArgumentValue v) { return v; }

static ArgumentValue v_builder(Builder b)
{
    ChainType *c = malloc(sizeof(ChainType));
    if (c)
        *c = b.schema.chain;
    return (ArgumentValue){.type = D_CHAIN, .as.chain = c ? c : &b.schema.chain};
}

enum ValidateResult
{
    V_OK = 0,
    V_TYPE_MISMATCH,
    V_ARRAY_MIXED,
    V_UNKNOWN_KEY,
    V_UNION_NO_MATCH,
    V_UNION_AMBIGUOUS,
    V_CHAIN_TYPE,
    V_NON_FINITE,
    V_MISSING_KEY,
    V_DUPLICATE_KEY,
    V_DEPTH_LIMIT
};

static const char *result_msg(enum ValidateResult r)
{
    switch (r)
    {
    case V_TYPE_MISMATCH:
        return "type mismatch";
    case V_ARRAY_MIXED:
        return "array items must match element type";
    case V_UNKNOWN_KEY:
        return "unexpected object key";
    case V_UNION_NO_MATCH:
        return "value does not match any union type";
    case V_UNION_AMBIGUOUS:
        return "value matches multiple union types (ambiguous)";
    case V_CHAIN_TYPE:
        return "chain type mismatch for structure call";
    case V_NON_FINITE:
        return "value is not a finite number";
    case V_MISSING_KEY:
        return "missing required object key";
    case V_DUPLICATE_KEY:
        return "duplicate object key";
    case V_DEPTH_LIMIT:
        return "value nesting too deep";
    default:
        return "ok";
    }
}

static void fail(const char *fmt, ...) __attribute__((noreturn));

static void fail(const char *fmt, ...)
{
    va_list ap;
    va_start(ap, fmt);
    vfprintf(stderr, fmt, ap);
    va_end(ap);
    fputc('\n', stderr);
    abort();
}

static char union_reasons[2048];
static size_t union_reasons_len = 0;

static void union_reason_append(const char *text)
{
    size_t n = strlen(text);
    if (union_reasons_len + n + 3 >= sizeof(union_reasons))
        return;
    if (union_reasons_len)
    {
        union_reasons[union_reasons_len++] = ' ';
        union_reasons[union_reasons_len++] = '|';
        union_reasons[union_reasons_len++] = ' ';
    }
    memcpy(union_reasons + union_reasons_len, text, n);
    union_reasons_len += n;
    union_reasons[union_reasons_len] = '\0';
}

static const char *value_kind_name(const ArgumentValue *v)
{
    switch (v->type)
    {
    case D_INT: return "int";
    case D_FLOAT: return "float";
    case D_STRING: return "string";
    case D_BOOL: return "boolean";
    case D_NULL: return "null";
    case D_MAP: return "object";
    case D_ARRAY: return "array";
    case D_CHAIN: return "structure";
    }
    return "unknown";
}

static void union_reason_append_branch(const StructType *st, const ArgumentValue *v, enum ValidateResult r)
{
    char tmp[128];
    const char *vk = value_kind_name(v);
    if (r == V_TYPE_MISMATCH)
    {
        switch (st->kind)
        {
        case S_STRING: snprintf(tmp, sizeof tmp, "expected string, got %s", vk); break;
        case S_NUMBER: snprintf(tmp, sizeof tmp, "expected number, got %s", vk); break;
        case S_BOOL: snprintf(tmp, sizeof tmp, "expected boolean, got %s", vk); break;
        case S_NULL: snprintf(tmp, sizeof tmp, "expected null, got %s", vk); break;
        case S_ARRAY: snprintf(tmp, sizeof tmp, v->type == D_ARRAY ? "array items must match element type" : "expected array, got %s", vk); break;
        case S_MAP: snprintf(tmp, sizeof tmp, v->type == D_MAP ? "map value type mismatch" : "expected map, got %s", vk); break;
        case S_OBJECT: snprintf(tmp, sizeof tmp, v->type == D_MAP ? "object field type mismatch" : "expected object, got %s", vk); break;
        case S_STRUCT_CALL: snprintf(tmp, sizeof tmp, "expected structure instance, got %s", vk); break;
        default: snprintf(tmp, sizeof tmp, "%s", result_msg(r)); break;
        }
    }
    else
    {
        snprintf(tmp, sizeof tmp, "%s", result_msg(r));
    }
    union_reason_append(tmp);
}

#define MAX_VALIDATE_DEPTH 128
static int validate_value_depth = 0;

static enum ValidateResult validate_value_impl(const ArgumentValue *v, const StructType *st);

static enum ValidateResult validate_value(const ArgumentValue *v, const StructType *st)
{
    if (++validate_value_depth > MAX_VALIDATE_DEPTH)
    {
        validate_value_depth--;
        return V_DEPTH_LIMIT;
    }
    enum ValidateResult res = validate_value_impl(v, st);
    validate_value_depth--;
    return res;
}

static enum ValidateResult validate_value_impl(const ArgumentValue *v, const StructType *st)
{
    switch (st->kind)
    {
    case S_STRING:
        return v->type == D_STRING ? V_OK : V_TYPE_MISMATCH;
    case S_NUMBER:
        if (v->type == D_FLOAT)
            return isfinite(v->as.f) ? V_OK : V_NON_FINITE;
        return (v->type == D_INT || v->type == D_FLOAT) ? V_OK : V_TYPE_MISMATCH;
    case S_BOOL:
        return v->type == D_BOOL ? V_OK : V_TYPE_MISMATCH;
    case S_NULL:
        return v->type == D_NULL ? V_OK : V_TYPE_MISMATCH;
    case S_ARRAY:
    {
        if (v->type != D_ARRAY)
            return V_TYPE_MISMATCH;
        const ArgumentValue *items = v->as.data;
        for (size_t i = 0; i < v->count; i++)
            if (validate_value(&items[i], st->as.array.elem) != V_OK)
                return V_ARRAY_MIXED;
        return V_OK;
    }
    case S_MAP:
    {
        if (v->type != D_MAP)
            return V_TYPE_MISMATCH;
        const MapEntry *entries = v->as.data;
        for (size_t i = 0; i < v->count; i++)
            for (size_t j = i + 1; j < v->count; j++)
                if (strcmp(entries[i].key, entries[j].key) == 0)
                    return V_DUPLICATE_KEY;
        for (size_t i = 0; i < v->count; i++)
            if (validate_value(&entries[i].value, st->as.map.value) != V_OK)
                return V_TYPE_MISMATCH;
        return V_OK;
    }
    case S_OBJECT:
    {
        if (v->type != D_MAP)
            return V_TYPE_MISMATCH;
        const MapEntry *entries = v->as.data;
        for (size_t i = 0; i < v->count; i++)
            for (size_t j = i + 1; j < v->count; j++)
                if (strcmp(entries[i].key, entries[j].key) == 0)
                    return V_DUPLICATE_KEY;
        for (size_t i = 0; i < v->count; i++)
        {
            const StructKey *found = NULL;
            for (size_t j = 0; j < st->as.object.count; j++)
                if (strcmp(st->as.object.keys[j].key, entries[i].key) == 0)
                {
                    found = &st->as.object.keys[j];
                    break;
                }
            if (!found)
                return V_UNKNOWN_KEY;
            if (validate_value(&entries[i].value, &found->type) != V_OK)
                return V_TYPE_MISMATCH;
        }
        for (size_t j = 0; j < st->as.object.count; j++)
        {
            int present = 0;
            for (size_t i = 0; i < v->count; i++)
                if (strcmp(st->as.object.keys[j].key, entries[i].key) == 0)
                {
                    present = 1;
                    break;
                }
            if (!present)
                return V_MISSING_KEY;
        }
        return V_OK;
    }
    case S_UNION:
    {
        size_t snapshot = union_reasons_len;
        int matches = 0;
        for (size_t i = 0; i < st->as.unionType.count; i++)
        {
            enum ValidateResult r = validate_value(v, &st->as.unionType.types[i]);
            if (r == V_OK)
                matches++;
            else
                union_reason_append_branch(&st->as.unionType.types[i], v, r);
        }
        if (matches == 0)
            return V_UNION_NO_MATCH;
        if (matches > 1)
        {
            union_reasons_len = snapshot;
            union_reasons[union_reasons_len] = '\0';
            if (v->type == D_ARRAY && v->count == 0)
                return V_OK;
            return V_UNION_AMBIGUOUS;
        }
        union_reasons_len = snapshot;
        union_reasons[union_reasons_len] = '\0';
        return V_OK;
    }
    case S_STRUCT_CALL:
        if (v->type != D_CHAIN)
            return V_TYPE_MISMATCH;
        if (!v->as.chain)
            return V_TYPE_MISMATCH;
        if (v->as.chain->typeName && v->as.chain->typeName[0])
            return strcmp(v->as.chain->typeName, st->as.structureCall.name) == 0 ? V_OK : V_CHAIN_TYPE;
        return V_OK;
    }
    return V_TYPE_MISMATCH;
}

static const StructureRegistry *find_structure(const StructureRegistry *registries, size_t registryCount, const char *typeName)
{
    if (!typeName || !typeName[0])
        return NULL;
    for (size_t i = 0; i < registryCount; i++)
        if (strcmp(registries[i].typeName, typeName) == 0)
            return &registries[i];
    return NULL;
}

static const FunctionSignature *find_function(const StructureRegistry *reg, const char *name)
{
    for (size_t i = 0; i < reg->functionCount; i++)
        if (strcmp(reg->functions[i].name, name) == 0)
            return &reg->functions[i];
    return NULL;
}

static const PropertySignature *find_property(const StructureRegistry *reg, const char *name)
{
    for (size_t i = 0; i < reg->propertyCount; i++)
        if (strcmp(reg->properties[i].name, name) == 0)
            return &reg->properties[i];
    return NULL;
}

static void validate_chain_flow(const ChainType *chain, const StructureRegistry *registries, size_t registryCount, const char *forcedStartName);
static void validate_function_args(const FunctionCallType *fc, const FunctionSignature *sig, const StructureRegistry *registries, size_t registryCount);

static int collect_structure_call_name(const StructType *st, const char **out, int *found)
{
    switch (st->kind)
    {
    case S_STRUCT_CALL:
        if (*found == 0)
        {
            *out = st->as.structureCall.name;
            *found = 1;
            return 1;
        }
        return strcmp(*out, st->as.structureCall.name) == 0;
    case S_UNION:
        for (size_t i = 0; i < st->as.unionType.count; i++)
            if (!collect_structure_call_name(&st->as.unionType.types[i], out, found))
                return 0;
        return 1;
    case S_ARRAY:
        return collect_structure_call_name(st->as.array.elem, out, found);
    case S_MAP:
        return collect_structure_call_name(st->as.map.value, out, found);
    default:
        return 1;
    }
}

static void validate_sub_chain_arg(const ArgumentValue *arg, const StructType *st, const StructureRegistry *registries, size_t registryCount)
{
    if (arg->type != D_CHAIN || !arg->as.chain)
        return;
    const char *start = arg->as.chain->typeName;
    if (!start || !start[0])
    {
        const char *single = NULL;
        int found = 0;
        if (!collect_structure_call_name(st, &single, &found) || found != 1)
            return;
        start = single;
    }
    validate_chain_flow(arg->as.chain, registries, registryCount, start);
}

static void validate_nested_chain_args(const ArgumentValue *v, const StructType *st, const StructureRegistry *registries, size_t registryCount)
{
    switch (st->kind)
    {
    case S_STRUCT_CALL:
        if (v->type == D_CHAIN && v->as.chain)
            validate_sub_chain_arg(v, st, registries, registryCount);
        break;
    case S_ARRAY:
        if (v->type == D_ARRAY)
        {
            const ArgumentValue *items = v->as.data;
            for (size_t i = 0; i < v->count; i++)
                validate_nested_chain_args(&items[i], st->as.array.elem, registries, registryCount);
        }
        break;
    case S_MAP:
        if (v->type == D_MAP)
        {
            const MapEntry *e = v->as.data;
            for (size_t i = 0; i < v->count; i++)
                validate_nested_chain_args(&e[i].value, st->as.map.value, registries, registryCount);
        }
        break;
    case S_OBJECT:
        if (v->type == D_MAP)
        {
            const MapEntry *e = v->as.data;
            for (size_t i = 0; i < v->count; i++)
                for (size_t j = 0; j < st->as.object.count; j++)
                    if (strcmp(st->as.object.keys[j].key, e[i].key) == 0)
                    {
                        validate_nested_chain_args(&e[i].value, &st->as.object.keys[j].type, registries, registryCount);
                        break;
                    }
        }
        break;
    case S_UNION:
        for (size_t i = 0; i < st->as.unionType.count; i++)
            if (validate_value(v, &st->as.unionType.types[i]) == V_OK)
            {
                validate_nested_chain_args(v, &st->as.unionType.types[i], registries, registryCount);
                break;
            }
        break;
    default:
        break;
    }
}

static void fail_value_result(const char *func, size_t k, const char *kind, enum ValidateResult r)
{
    if (r == V_UNION_NO_MATCH && union_reasons_len)
        fail("validate: %s %s %zu: value does not match any union type: %s", func, kind, k, union_reasons);
    fail("validate: %s %s %zu: %s", func, kind, k, result_msg(r));
}

static void validate_function_args(const FunctionCallType *fc, const FunctionSignature *sig, const StructureRegistry *registries, size_t registryCount)
{
    if (fc->isTemplateLiteral)
    {
        for (size_t k = 0; k < fc->argumentCount; k++)
        {
            enum ValidateResult r = validate_value(&fc->arguments[k].argument, &sig->argumentStructs[1]);
            if (r != V_OK && fc->arguments[k].argument.type != D_STRING)
                fail_value_result(fc->name, k, "arg", r);
            validate_nested_chain_args(&fc->arguments[k].argument, &sig->argumentStructs[1], registries, registryCount);
        }
        return;
    }
    if (fc->argumentCount != sig->argumentCount)
        fail("validate: %s expects %zu args, got %zu", fc->name, sig->argumentCount, fc->argumentCount);
    for (size_t k = 0; k < fc->argumentCount; k++)
    {
        const StructType *st = &sig->argumentStructs[k];
        if (!fc->arguments[k].provided && !fc->arguments[k].hasDefault)
            fail("validate: %s argument #%zu was not provided", fc->name, k + 1);
        enum ValidateResult r = validate_value(&fc->arguments[k].argument, st);
        if (r != V_OK)
            fail_value_result(fc->name, k, "arg", r);
        if (fc->arguments[k].hasDefault)
        {
            enum ValidateResult rd = validate_value(&fc->arguments[k].def, st);
            if (rd != V_OK)
                fail_value_result(fc->name, k, "default arg", rd);
        }
        validate_nested_chain_args(&fc->arguments[k].argument, st, registries, registryCount);
    }
}

#define MAX_CHAIN_DEPTH 64
static int chain_flow_depth = 0;

static void validate_chain_flow(const ChainType *chain, const StructureRegistry *registries, size_t registryCount, const char *forcedStartName)
{
    if (++chain_flow_depth > MAX_CHAIN_DEPTH)
    {
        chain_flow_depth--;
        fail("validate: chain nesting too deep");
    }
    const char *start = forcedStartName && forcedStartName[0] ? forcedStartName : chain->typeName;
    const StructureRegistry *current = find_structure(registries, registryCount, start);
    if (!current)
        fail("validate: unknown structure '%s'", start ? start : "(none)");

    for (size_t i = 0; i < chain->valueCount; i++)
    {
        const ChainValue *cv = &chain->values[i];
        if (cv->kind == V_FUNCTION_CALL)
        {
            const FunctionCallType *fc = &cv->as.functionCall;
            const FunctionSignature *sig = find_function(current, fc->name);
            if (!sig)
                fail("validate: function '%s' is not a member of structure '%s'", fc->name, current->typeName);
            if (fc->isTemplateLiteral != sig->isTemplateLiteral)
                fail("validate: function '%s' template literal flag mismatch", fc->name);
            validate_function_args(fc, sig, registries, registryCount);
            current = find_structure(registries, registryCount, sig->returnTypeName);
            if (!current)
                fail("validate: function '%s' returns unknown structure '%s'", fc->name, sig->returnTypeName ? sig->returnTypeName : "(none)");
        }
        else if (cv->kind == V_PROPERTY_CALL)
        {
            const PropertyCallType *pc = &cv->as.propertyCall;
            const PropertySignature *prop = find_property(current, pc->name);
            if (!prop)
                fail("validate: property '%s' is not a member of structure '%s'", pc->name, current->typeName);
            if (pc->builder && pc->builder->schema.chain.typeName && pc->builder->schema.chain.typeName[0])
            {
                if (strcmp(pc->builder->schema.chain.typeName, prop->returnTypeName) != 0)
                    fail("validate: property '%s' builder type name mismatch", pc->name);
            }
            current = find_structure(registries, registryCount, prop->returnTypeName);
            if (!current)
                fail("validate: property '%s' returns unknown structure", pc->name);
        }
        else if (cv->kind == V_COPY)
        {
            const ChainType *src = &cv->as.copy.source;
            if (!src->typeName || !src->typeName[0])
                fail("validate: copy source chain without structure type");
            if (strcmp(src->typeName, current->typeName) != 0)
                fail("validate: cannot copy builder of structure '%s' into '%s'", src->typeName, current->typeName);
            validate_chain_flow(src, registries, registryCount, src->typeName);
        }
        else
        {
            fail("validate: unknown chain value kind");
        }
    }
    chain_flow_depth--;
}

static void validate_schema(const SchemaType *s, const StructureRegistry *registries, size_t registryCount)
{
    if (!s->chain.initFunction.name || !s->chain.initFunction.name[0])
        fail("validate: schema init function without name");
    validate_chain_flow(&s->chain, registries, registryCount, NULL);
}

static ArgumentValue deep_copy_value(const ArgumentValue *v);
static ChainType *deep_copy_chain(const ChainType *c);
static SchemaType deep_copy_schema(const SchemaType *s);

static ArgumentValue deep_copy_value(const ArgumentValue *v)
{
    ArgumentValue copy = *v;
    switch (v->type)
    {
    case D_CHAIN:
        copy.as.chain = deep_copy_chain(v->as.chain);
        break;
    case D_ARRAY:
    {
        const ArgumentValue *src = v->as.data;
        ArgumentValue *items = malloc(v->count * sizeof(ArgumentValue));
        if (items)
        {
            for (size_t i = 0; i < v->count; i++)
                items[i] = deep_copy_value(&src[i]);
            copy.as.data = items;
        }
        break;
    }
    case D_MAP:
    {
        const MapEntry *src = v->as.data;
        MapEntry *entries = malloc(v->count * sizeof(MapEntry));
        if (entries)
        {
            for (size_t i = 0; i < v->count; i++)
            {
                entries[i].key = src[i].key;
                entries[i].value = deep_copy_value(&src[i].value);
            }
            copy.as.data = entries;
        }
        break;
    }
    default:
        break;
    }
    return copy;
}

static ChainType *deep_copy_chain(const ChainType *c)
{
    ChainType *copy = malloc(sizeof(ChainType));
    if (!copy)
        return NULL;
    *copy = *c;
    copy->values = NULL;
    if (c->valueCount == 0)
        return copy;

    ChainValue *values = malloc(c->valueCount * sizeof(ChainValue));
    if (!values)
        return copy;
    for (size_t i = 0; i < c->valueCount; i++)
    {
        values[i] = c->values[i];
        if (values[i].kind == V_FUNCTION_CALL)
        {
            FunctionCallType *fc = &values[i].as.functionCall;
            if (fc->argumentCount == 0)
                continue;
            ArgumentType *args = malloc(fc->argumentCount * sizeof(ArgumentType));
            if (!args)
                continue;
            for (size_t j = 0; j < fc->argumentCount; j++)
            {
                args[j] = fc->arguments[j];
                args[j].argument = deep_copy_value(&fc->arguments[j].argument);
                if (args[j].hasDefault)
                    args[j].def = deep_copy_value(&fc->arguments[j].def);
            }
            fc->arguments = args;
        }
        else if (values[i].kind == V_PROPERTY_CALL)
        {
            if (values[i].as.propertyCall.builder)
            {
                Builder *b = malloc(sizeof(Builder));
                if (b)
                {
                    b->schema = deep_copy_schema(&values[i].as.propertyCall.builder->schema);
                    values[i].as.propertyCall.builder = b;
                }
            }
        }
        else if (values[i].kind == V_COPY)
        {
            ChainType *srcCopy = deep_copy_chain(&values[i].as.copy.source);
            if (srcCopy)
            {
                values[i].as.copy.source = *srcCopy;
                free(srcCopy);
            }
        }
    }
    copy->values = values;
    return copy;
}

static SchemaType deep_copy_schema(const SchemaType *s)
{
    SchemaType copy = *s;
    ChainType *c = deep_copy_chain(&s->chain);
    if (c)
        copy.chain = *c;
    return copy;
}

static ChainType builder_chain(const char *typeName, const Builder *builders, size_t count, InitFunctionType init)
{
    ChainType flat = {0};
    flat.typeName = typeName;
    flat.initFunction = init;
    size_t total = 0;
    for (size_t i = 0; i < count; i++)
    {
        const Builder *b = &builders[i];
        if (b->type && strcmp(b->type, "init-function") == 0)
            fail("builder_chain: builder '%s' (%s) cannot be placed directly in a chain; wrap it with copy(...)",
                 b->schema.chain.initFunction.variableName ? b->schema.chain.initFunction.variableName : "(anonymous)",
                 b->schema.chain.initFunction.name ? b->schema.chain.initFunction.name : "(unknown)");
        total += b->schema.chain.valueCount;
    }
    flat.valueCount = total;
    if (total == 0)
        return flat;

    ChainValue *values = malloc(total * sizeof(ChainValue));
    if (!values)
        return flat;
    size_t k = 0;
    for (size_t i = 0; i < count; i++)
    {
        const ChainType *src = &builders[i].schema.chain;
        for (size_t j = 0; j < src->valueCount; j++)
            values[k++] = src->values[j];
    }
    flat.values = values;

    ChainType *copy = deep_copy_chain(&flat);
    free(values);
    if (copy)
        return *copy;
    return flat;
}

static Builder builder_single(const char *typeName, const ChainValue *value)
{
    ChainType src = { .typeName = typeName, .values = (ChainValue *)value, .valueCount = 1, .initFunction = {0} };
    ChainType *copy = deep_copy_chain(&src);
    if (copy)
        return (Builder){ .type = "function-call", .schema = { .exportName = 0, .chain = *copy } };
    return (Builder){ .type = "function-call", .schema = { .exportName = 0, .chain = src } };
}

static SchemaType validate_and_return(SchemaType s, const StructureRegistry *registries, size_t registryCount)
{
    validate_schema(&s, registries, registryCount);
    return deep_copy_schema(&s);
}

static cJSON *jval(const ArgumentValue *d);
static cJSON *jarg(const ArgumentType *a);

static void print_indent(FILE *out, int depth)
{
    for (int i = 0; i < depth; i++)
        fputs("  ", out);
}

static void print_json_string(FILE *out, const char *s)
{
    cJSON *tmp = cJSON_CreateString(s);
    char *str = cJSON_PrintUnformatted(tmp);
    fputs(str, out);
    cJSON_free(str);
    cJSON_Delete(tmp);
}

static void schema_print_value(FILE *out, const cJSON *node, int depth)
{
    if (cJSON_IsObject(node))
    {
        if (!node->child)
        {
            fputs("{}", out);
            return;
        }
        fputs("{\n", out);
        for (const cJSON *c = node->child; c; c = c->next)
        {
            print_indent(out, depth + 1);
            print_json_string(out, c->string);
            fputs(": ", out);
            schema_print_value(out, c, depth + 1);
            fputs(c->next ? ",\n" : "\n", out);
        }
        print_indent(out, depth);
        fputs("}", out);
    }
    else if (cJSON_IsArray(node))
    {
        if (!node->child)
        {
            fputs("[]", out);
            return;
        }
        fputs("[\n", out);
        for (const cJSON *c = node->child; c; c = c->next)
        {
            print_indent(out, depth + 1);
            schema_print_value(out, c, depth + 1);
            fputs(c->next ? ",\n" : "\n", out);
        }
        print_indent(out, depth);
        fputs("]", out);
    }
    else
    {
        char *str = cJSON_PrintUnformatted(node);
        fputs(str, out);
        cJSON_free(str);
    }
}

static cJSON *jchain(const ChainType *c)
{
    cJSON *outer = cJSON_CreateObject();
    cJSON *inner = cJSON_CreateObject();

    cJSON *values = cJSON_CreateArray();
    for (size_t i = 0; i < c->valueCount; i++)
    {
        const ChainValue *cv = &c->values[i];
        cJSON *item = cJSON_CreateObject();
        if (cv->kind == V_FUNCTION_CALL)
        {
            cJSON *fc = cJSON_CreateObject();
            cJSON_AddStringToObject(fc, "name", cv->as.functionCall.name);
            cJSON *args = cJSON_CreateArray();
            for (size_t j = 0; j < cv->as.functionCall.argumentCount; j++)
                cJSON_AddItemToArray(args, jarg(&cv->as.functionCall.arguments[j]));
            cJSON_AddItemToObject(fc, "arguments", args);
            cJSON_AddBoolToObject(fc, "isTemplateLiteral", (cJSON_bool)cv->as.functionCall.isTemplateLiteral);
            cJSON_AddItemToObject(item, "functionCall", fc);
        }
        else if (cv->kind == V_PROPERTY_CALL)
        {
            cJSON *pc = cJSON_CreateObject();
            cJSON_AddStringToObject(pc, "name", cv->as.propertyCall.name);
            if (cv->as.propertyCall.builder)
                cJSON_AddItemToObject(pc, "builder", jchain(&cv->as.propertyCall.builder->schema.chain));
            cJSON_AddItemToObject(item, "propertyCall", pc);
        }
        else if (cv->kind == V_COPY)
        {
            cJSON *cp = cJSON_CreateObject();
            cJSON_AddItemToObject(cp, "chain", jchain(&cv->as.copy.source));
            cJSON_AddItemToObject(item, "copy", cp);
        }
        cJSON_AddItemToArray(values, item);
    }
    cJSON_AddItemToObject(inner, "values", values);

    cJSON *init = cJSON_CreateObject();
    cJSON_AddStringToObject(init, "name", c->initFunction.name);
    cJSON_AddStringToObject(init, "variableName", c->initFunction.variableName ? c->initFunction.variableName : "");
    cJSON_AddStringToObject(init, "importString", c->initFunction.importString);
    cJSON_AddItemToObject(inner, "initFunction", init);

    cJSON_AddItemToObject(outer, "chain", inner);
    return outer;
}

static cJSON *jarg(const ArgumentType *a)
{
    cJSON *obj = cJSON_CreateObject();
    cJSON_AddItemToObject(obj, "argument", jval(&a->argument));
    cJSON_AddItemToObject(obj, "default", a->hasDefault ? jval(&a->def) : cJSON_CreateNull());
    return obj;
}

static cJSON *jval(const ArgumentValue *d)
{
    switch (d->type)
    {
    case D_INT:
    {
        cJSON *tag = cJSON_CreateObject();
        cJSON *value = cJSON_CreateObject();
        cJSON_AddNumberToObject(value, "value", (double)d->as.i);
        cJSON_AddItemToObject(tag, "number", value);
        return tag;
    }
    case D_FLOAT:
    {
        cJSON *tag = cJSON_CreateObject();
        cJSON *value = cJSON_CreateObject();
        cJSON_AddNumberToObject(value, "value", d->as.f);
        cJSON_AddItemToObject(tag, "number", value);
        return tag;
    }
    case D_STRING:
    {
        cJSON *tag = cJSON_CreateObject();
        cJSON *value = cJSON_CreateObject();
        cJSON_AddStringToObject(value, "value", d->as.s);
        cJSON_AddItemToObject(tag, "string", value);
        return tag;
    }
    case D_BOOL:
    {
        cJSON *tag = cJSON_CreateObject();
        cJSON *value = cJSON_CreateObject();
        cJSON_AddBoolToObject(value, "value", (cJSON_bool)d->as.i);
        cJSON_AddItemToObject(tag, "boolean", value);
        return tag;
    }
    case D_NULL:
    {
        cJSON *tag = cJSON_CreateObject();
        cJSON *value = cJSON_CreateObject();
        cJSON_AddNullToObject(value, "value");
        cJSON_AddItemToObject(tag, "null", value);
        return tag;
    }
    case D_CHAIN:
    {
        cJSON *tag = cJSON_CreateObject();
        cJSON_AddItemToObject(tag, "chain", jchain(d->as.chain));
        return tag;
    }
    case D_MAP:
    {
        cJSON *tag = cJSON_CreateObject();
        cJSON *value = cJSON_CreateObject();
        cJSON *obj = cJSON_CreateObject();
        const MapEntry *e = d->as.data;
        for (size_t i = 0; i < d->count; i++)
            cJSON_AddItemToObject(obj, e[i].key, jval(&e[i].value));
        cJSON_AddItemToObject(value, "value", obj);
        cJSON_AddItemToObject(tag, "object", value);
        return tag;
    }
    default:
    {
        cJSON *tag = cJSON_CreateObject();
        cJSON *value = cJSON_CreateObject();
        cJSON *arr = cJSON_CreateArray();
        const ArgumentValue *items = d->as.data;
        for (size_t i = 0; i < d->count; i++)
            cJSON_AddItemToArray(arr, jval(&items[i]));
        cJSON_AddItemToObject(value, "value", arr);
        cJSON_AddItemToObject(tag, "array", value);
        return tag;
    }
    }
}

static char *json_buf = NULL;

static SchemaType getSchema_impl(const Builder *b, const char *exportName, ArgumentValue importPaths)
{
    SchemaType s = b->schema;
    if (exportName)
        s.exportName = exportName;
    if (importPaths.type == D_MAP)
        s.importPaths = importPaths;
    return s;
}

static const char *getJSONSchema_impl(const SchemaType *s)
{
    cJSON *root = cJSON_CreateObject();
    cJSON *schema = cJSON_CreateObject();
    cJSON_AddStringToObject(schema, "exportName", s->exportName);
    if (s->importPaths.type == D_MAP)
    {
        cJSON *ip = cJSON_CreateObject();
        const MapEntry *e = s->importPaths.as.data;
        for (size_t i = 0; i < s->importPaths.count; i++)
            cJSON_AddStringToObject(ip, e[i].key, e[i].value.as.s);
        cJSON_AddItemToObject(schema, "importPaths", ip);
    }
    cJSON_AddItemToObject(schema, "chain", jchain(&s->chain));
    cJSON_AddItemToObject(root, "schema", schema);

    char *buf = NULL;
    size_t size = 0;
    FILE *out = open_memstream(&buf, &size);
    schema_print_value(out, root, 0);
    cJSON_Delete(root);
    fclose(out);

    free(json_buf);
    json_buf = buf;
    return json_buf;
}

#ifdef __GNUC__
#pragma GCC diagnostic pop
#endif

/* ---- definitions ---- */
#ifdef __GNUC__
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wunused-variable"
#endif
// ==== lingua-tungga ====

/**
 * @param statements map<array<string>>
 * @return Builder (function-call) : lingua-tungga
 */
#define setStatements(statements) \
    builder_call("set-statements", ((ArgumentType[]){ mkarg(v(statements)) }), 1, 0)

/**
 * @param statements map<array<string>>
 * @return Builder (function-call) : lingua-tungga
 */
#define addStatements(statements) \
    builder_call("add-statements", ((ArgumentType[]){ mkarg(v(statements)) }), 1, 0)

/**
 * @return Builder (function-call) : lingua-tungga
 */
#define getStatements() \
    builder_call("get-statements", ((ArgumentType[]){  }), 0, 0)

/**
 * @return Builder (function-call) : lingua-tungga
 */
#define getResolvedStatements() \
    builder_call("get-resolved-statements", ((ArgumentType[]){  }), 0, 0)

/**
 * @param functionName string
 * @param args array<string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string> | chain<lingua-tungga>> (default: [])
 * @return Builder (function-call) : lingua-tungga
 */
#define structureFunctionCall(functionName, args) \
    builder_call("structure-function-call", ((ArgumentType[]){ mkarg(v(functionName)), mkarg_def(v(args), v(((ArgumentValue){ .type = D_ARRAY, .count = 0, .as.data = 0 }))) }), 2, 0)

/**
 * @param variableName string
 * @return Builder (function-call) : lingua-tungga
 */
#define structureVariableCall(variableName) \
    builder_call("structure-variable-call", ((ArgumentType[]){ mkarg(v(variableName)) }), 1, 0)

/**
 * @param functionName string
 * @param args array<string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string> | chain<lingua-tungga>> (default: [])
 * @return Builder (function-call) : lingua-tungga
 */
#define addStructureFunctionCall(functionName, args) \
    builder_call("add-structure-function-call", ((ArgumentType[]){ mkarg(v(functionName)), mkarg_def(v(args), v(((ArgumentValue){ .type = D_ARRAY, .count = 0, .as.data = 0 }))) }), 2, 0)

/**
 * @param variableName string
 * @return Builder (function-call) : lingua-tungga
 */
#define addStructureVariableCall(variableName) \
    builder_call("add-structure-variable-call", ((ArgumentType[]){ mkarg(v(variableName)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define addValue(value) \
    builder_call("add-value", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param variableName string
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define addVariable(variableName, value) \
    builder_call("add-variable", ((ArgumentType[]){ mkarg(v(variableName)), mkarg(v(value)) }), 2, 0)

/**
 * @param condition string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param body chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define if_(condition, body) \
    builder_call("if", ((ArgumentType[]){ mkarg(v(condition)), mkarg(v(body)) }), 2, 0)

/**
 * @param condition string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param body chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define elseIf(condition, body) \
    builder_call("else-if", ((ArgumentType[]){ mkarg(v(condition)), mkarg(v(body)) }), 2, 0)

/**
 * @param body chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define else_(body) \
    builder_call("else", ((ArgumentType[]){ mkarg(v(body)) }), 1, 0)

/**
 * @param condition string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param body chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define while_(condition, body) \
    builder_call("while", ((ArgumentType[]){ mkarg(v(condition)), mkarg(v(body)) }), 2, 0)

/**
 * @param array string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param variableName string
 * @param body chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define forEach(array, variableName, body) \
    builder_call("for-each", ((ArgumentType[]){ mkarg(v(array)), mkarg(v(variableName)), mkarg(v(body)) }), 3, 0)

/**
 * @param init string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param condition string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param update string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param body chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define forCounter(init, condition, update, body) \
    builder_call("for-counter", ((ArgumentType[]){ mkarg(v(init)), mkarg(v(condition)), mkarg(v(update)), mkarg(v(body)) }), 4, 0)

/**
 * @param name string
 * @return Builder (function-call) : lingua-tungga
 */
#define variableForCounter(name) \
    builder_call("variable-for-counter", ((ArgumentType[]){ mkarg(v(name)) }), 1, 0)

/**
 * @param variableName string
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define declareForCounter(variableName, value) \
    builder_call("declare-for-counter", ((ArgumentType[]){ mkarg(v(variableName)), mkarg(v(value)) }), 2, 0)

/**
 * @param target string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define incrementForCounter(target) \
    builder_call("increment-for-counter", ((ArgumentType[]){ mkarg(v(target)) }), 1, 0)

/**
 * @return Builder (function-call) : lingua-tungga
 */
#define freeCVariables() \
    builder_call("free-c-variables", ((ArgumentType[]){  }), 0, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga> (default: null)
 * @return Builder (function-call) : lingua-tungga
 */
#define return_(...) \
    CAT(return__, __VA_OPT__(1))(__VA_ARGS__)
#define return__1(value) \
    builder_call("return", ((ArgumentType[]){ mkarg_def(v(value), v(NULL)) }), 1, 0)
#define return__() \
    return__1(NULL)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringConcat(left, right) \
    builder_call("string-concat", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringLength(value) \
    builder_call("string-length", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringUpper(value) \
    builder_call("string-upper", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringLower(value) \
    builder_call("string-lower", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringTrim(value) \
    builder_call("string-trim", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param start string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param end string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringSlice(value, start, end) \
    builder_call("string-slice", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(start)), mkarg(v(end)) }), 3, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param search string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param replacement string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringReplace(value, search, replacement) \
    builder_call("string-replace", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(search)), mkarg(v(replacement)) }), 3, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param separator string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringSplit(value, separator) \
    builder_call("string-split", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(separator)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param search string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringIncludes(value, search) \
    builder_call("string-includes", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(search)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param count string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringRepeat(value, count) \
    builder_call("string-repeat", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(count)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param index string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringCharAt(value, index) \
    builder_call("string-char-at", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(index)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param prefix string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringStartsWith(value, prefix) \
    builder_call("string-starts-with", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(prefix)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param suffix string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define stringEndsWith(value, suffix) \
    builder_call("string-ends-with", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(suffix)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param index string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arrayGet(value, index) \
    builder_call("array-get", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(index)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arrayLength(value) \
    builder_call("array-length", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param item string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arrayAppend(value, item) \
    builder_call("array-append", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(item)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arrayConcat(left, right) \
    builder_call("array-concat", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param separator string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arrayJoin(value, separator) \
    builder_call("array-join", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(separator)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param start string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param end string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arraySlice(value, start, end) \
    builder_call("array-slice", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(start)), mkarg(v(end)) }), 3, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param item string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arrayIncludes(value, item) \
    builder_call("array-includes", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(item)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param item string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arrayIndexOf(value, item) \
    builder_call("array-index-of", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(item)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arrayReverse(value) \
    builder_call("array-reverse", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arraySort(value) \
    builder_call("array-sort", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define arrayUnique(value) \
    builder_call("array-unique", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param key string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define objectGet(value, key) \
    builder_call("object-get", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(key)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param key string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param newValue string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define objectSet(value, key, newValue) \
    builder_call("object-set", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(key)), mkarg(v(newValue)) }), 3, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define objectKeys(value) \
    builder_call("object-keys", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define objectValues(value) \
    builder_call("object-values", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param key string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define objectHas(value, key) \
    builder_call("object-has", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(key)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define objectMerge(left, right) \
    builder_call("object-merge", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param key string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define objectDelete(value, key) \
    builder_call("object-delete", ((ArgumentType[]){ mkarg(v(value)), mkarg(v(key)) }), 2, 0)

/**
 * @param value string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define objectEntries(value) \
    builder_call("object-entries", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define add(left, right) \
    builder_call("add", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define subtract(left, right) \
    builder_call("subtract", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define multiply(left, right) \
    builder_call("multiply", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define divide(left, right) \
    builder_call("divide", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define modulo(left, right) \
    builder_call("modulo", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define equal(left, right) \
    builder_call("equal", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define notEqual(left, right) \
    builder_call("not-equal", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define greaterThan(left, right) \
    builder_call("greater-than", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define lessThan(left, right) \
    builder_call("less-than", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define greaterThanOrEqual(left, right) \
    builder_call("greater-than-or-equal", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define lessThanOrEqual(left, right) \
    builder_call("less-than-or-equal", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define and(left, right) \
    builder_call("and", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define or(left, right) \
    builder_call("or", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define xor(left, right) \
    builder_call("xor", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param operand string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define not(operand) \
    builder_call("not", ((ArgumentType[]){ mkarg(v(operand)) }), 1, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define bitwiseAnd(left, right) \
    builder_call("bitwise-and", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define bitwiseOr(left, right) \
    builder_call("bitwise-or", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define leftShift(left, right) \
    builder_call("left-shift", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @param left string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @param right string | number | boolean | null | array<string | number | boolean | null | array<string | number | boolean | null> | map<string | number | boolean | null>> | map<string | number | boolean | null> | chain<lingua-tungga>
 * @return Builder (function-call) : lingua-tungga
 */
#define rightShift(left, right) \
    builder_call("right-shift", ((ArgumentType[]){ mkarg(v(left)), mkarg(v(right)) }), 2, 0)

/**
 * @return char *
 */
static char * lingua_tungga_generate_impl(Builder builder, ArgumentType *args, size_t count) {
(void)builder; (void)args; (void)count;
/* implemented externally */
return 0;
}

static const FunctionSignature lingua_tungga_generate_sig = { "generate", 0, 0, 0, "lingua-tungga" };

#define generate(builder) \
    ({ \
        if (!(builder).schema.chain.typeName || !(strcmp((builder).schema.chain.typeName, "lingua-tungga") == 0)) \
            fail("custom function 'generate' is not a member of structure '%s'", (builder).schema.chain.typeName ? (builder).schema.chain.typeName : "(none)"); \
        lingua_tungga_generate_impl((builder), 0, 0); \
    })

static const StructType lingua_tungga_set_statements_arg0 = { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_STRING } } } } };
static const StructType lingua_tungga_add_statements_arg0 = { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_STRING } } } } };
static const StructType lingua_tungga_get_statements_args[] = {  };
static const StructType lingua_tungga_get_resolved_statements_args[] = {  };
static const StructType lingua_tungga_structure_function_call_arg0 = { .kind = S_STRING };
static const StructType lingua_tungga_structure_function_call_arg1 = { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 7, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_STRING } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } } } };
static const StructType lingua_tungga_structure_function_call_args[] = { lingua_tungga_structure_function_call_arg0, lingua_tungga_structure_function_call_arg1 };
static const StructType lingua_tungga_structure_variable_call_arg0 = { .kind = S_STRING };
static const StructType lingua_tungga_add_structure_function_call_arg0 = { .kind = S_STRING };
static const StructType lingua_tungga_add_structure_function_call_arg1 = { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 7, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_STRING } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } } } };
static const StructType lingua_tungga_add_structure_function_call_args[] = { lingua_tungga_add_structure_function_call_arg0, lingua_tungga_add_structure_function_call_arg1 };
static const StructType lingua_tungga_add_structure_variable_call_arg0 = { .kind = S_STRING };
static const StructType lingua_tungga_add_value_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_add_variable_arg0 = { .kind = S_STRING };
static const StructType lingua_tungga_add_variable_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_add_variable_args[] = { lingua_tungga_add_variable_arg0, lingua_tungga_add_variable_arg1 };
static const StructType lingua_tungga_if_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_if_arg1 = { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } };
static const StructType lingua_tungga_if_args[] = { lingua_tungga_if_arg0, lingua_tungga_if_arg1 };
static const StructType lingua_tungga_else_if_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_else_if_arg1 = { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } };
static const StructType lingua_tungga_else_if_args[] = { lingua_tungga_else_if_arg0, lingua_tungga_else_if_arg1 };
static const StructType lingua_tungga_else_arg0 = { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } };
static const StructType lingua_tungga_while_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_while_arg1 = { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } };
static const StructType lingua_tungga_while_args[] = { lingua_tungga_while_arg0, lingua_tungga_while_arg1 };
static const StructType lingua_tungga_for_each_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_for_each_arg1 = { .kind = S_STRING };
static const StructType lingua_tungga_for_each_arg2 = { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } };
static const StructType lingua_tungga_for_each_args[] = { lingua_tungga_for_each_arg0, lingua_tungga_for_each_arg1, lingua_tungga_for_each_arg2 };
static const StructType lingua_tungga_for_counter_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_for_counter_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_for_counter_arg2 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_for_counter_arg3 = { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } };
static const StructType lingua_tungga_for_counter_args[] = { lingua_tungga_for_counter_arg0, lingua_tungga_for_counter_arg1, lingua_tungga_for_counter_arg2, lingua_tungga_for_counter_arg3 };
static const StructType lingua_tungga_variable_for_counter_arg0 = { .kind = S_STRING };
static const StructType lingua_tungga_declare_for_counter_arg0 = { .kind = S_STRING };
static const StructType lingua_tungga_declare_for_counter_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_declare_for_counter_args[] = { lingua_tungga_declare_for_counter_arg0, lingua_tungga_declare_for_counter_arg1 };
static const StructType lingua_tungga_increment_for_counter_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_free_c_variables_args[] = {  };
static const StructType lingua_tungga_return_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_concat_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_concat_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_concat_args[] = { lingua_tungga_string_concat_arg0, lingua_tungga_string_concat_arg1 };
static const StructType lingua_tungga_string_length_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_upper_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_lower_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_trim_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_slice_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_slice_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_slice_arg2 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_slice_args[] = { lingua_tungga_string_slice_arg0, lingua_tungga_string_slice_arg1, lingua_tungga_string_slice_arg2 };
static const StructType lingua_tungga_string_replace_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_replace_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_replace_arg2 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_replace_args[] = { lingua_tungga_string_replace_arg0, lingua_tungga_string_replace_arg1, lingua_tungga_string_replace_arg2 };
static const StructType lingua_tungga_string_split_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_split_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_split_args[] = { lingua_tungga_string_split_arg0, lingua_tungga_string_split_arg1 };
static const StructType lingua_tungga_string_includes_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_includes_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_includes_args[] = { lingua_tungga_string_includes_arg0, lingua_tungga_string_includes_arg1 };
static const StructType lingua_tungga_string_repeat_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_repeat_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_repeat_args[] = { lingua_tungga_string_repeat_arg0, lingua_tungga_string_repeat_arg1 };
static const StructType lingua_tungga_string_char_at_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_char_at_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_char_at_args[] = { lingua_tungga_string_char_at_arg0, lingua_tungga_string_char_at_arg1 };
static const StructType lingua_tungga_string_starts_with_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_starts_with_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_starts_with_args[] = { lingua_tungga_string_starts_with_arg0, lingua_tungga_string_starts_with_arg1 };
static const StructType lingua_tungga_string_ends_with_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_ends_with_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_string_ends_with_args[] = { lingua_tungga_string_ends_with_arg0, lingua_tungga_string_ends_with_arg1 };
static const StructType lingua_tungga_array_get_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_get_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_get_args[] = { lingua_tungga_array_get_arg0, lingua_tungga_array_get_arg1 };
static const StructType lingua_tungga_array_length_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_append_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_append_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_append_args[] = { lingua_tungga_array_append_arg0, lingua_tungga_array_append_arg1 };
static const StructType lingua_tungga_array_concat_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_concat_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_concat_args[] = { lingua_tungga_array_concat_arg0, lingua_tungga_array_concat_arg1 };
static const StructType lingua_tungga_array_join_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_join_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_join_args[] = { lingua_tungga_array_join_arg0, lingua_tungga_array_join_arg1 };
static const StructType lingua_tungga_array_slice_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_slice_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_slice_arg2 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_slice_args[] = { lingua_tungga_array_slice_arg0, lingua_tungga_array_slice_arg1, lingua_tungga_array_slice_arg2 };
static const StructType lingua_tungga_array_includes_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_includes_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_includes_args[] = { lingua_tungga_array_includes_arg0, lingua_tungga_array_includes_arg1 };
static const StructType lingua_tungga_array_index_of_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_index_of_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_index_of_args[] = { lingua_tungga_array_index_of_arg0, lingua_tungga_array_index_of_arg1 };
static const StructType lingua_tungga_array_reverse_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_sort_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_array_unique_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_get_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_get_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_get_args[] = { lingua_tungga_object_get_arg0, lingua_tungga_object_get_arg1 };
static const StructType lingua_tungga_object_set_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_set_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_set_arg2 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_set_args[] = { lingua_tungga_object_set_arg0, lingua_tungga_object_set_arg1, lingua_tungga_object_set_arg2 };
static const StructType lingua_tungga_object_keys_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_values_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_has_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_has_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_has_args[] = { lingua_tungga_object_has_arg0, lingua_tungga_object_has_arg1 };
static const StructType lingua_tungga_object_merge_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_merge_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_merge_args[] = { lingua_tungga_object_merge_arg0, lingua_tungga_object_merge_arg1 };
static const StructType lingua_tungga_object_delete_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_delete_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_object_delete_args[] = { lingua_tungga_object_delete_arg0, lingua_tungga_object_delete_arg1 };
static const StructType lingua_tungga_object_entries_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_add_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_add_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_add_args[] = { lingua_tungga_add_arg0, lingua_tungga_add_arg1 };
static const StructType lingua_tungga_subtract_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_subtract_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_subtract_args[] = { lingua_tungga_subtract_arg0, lingua_tungga_subtract_arg1 };
static const StructType lingua_tungga_multiply_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_multiply_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_multiply_args[] = { lingua_tungga_multiply_arg0, lingua_tungga_multiply_arg1 };
static const StructType lingua_tungga_divide_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_divide_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_divide_args[] = { lingua_tungga_divide_arg0, lingua_tungga_divide_arg1 };
static const StructType lingua_tungga_modulo_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_modulo_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_modulo_args[] = { lingua_tungga_modulo_arg0, lingua_tungga_modulo_arg1 };
static const StructType lingua_tungga_equal_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_equal_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_equal_args[] = { lingua_tungga_equal_arg0, lingua_tungga_equal_arg1 };
static const StructType lingua_tungga_not_equal_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_not_equal_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_not_equal_args[] = { lingua_tungga_not_equal_arg0, lingua_tungga_not_equal_arg1 };
static const StructType lingua_tungga_greater_than_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_greater_than_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_greater_than_args[] = { lingua_tungga_greater_than_arg0, lingua_tungga_greater_than_arg1 };
static const StructType lingua_tungga_less_than_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_less_than_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_less_than_args[] = { lingua_tungga_less_than_arg0, lingua_tungga_less_than_arg1 };
static const StructType lingua_tungga_greater_than_or_equal_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_greater_than_or_equal_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_greater_than_or_equal_args[] = { lingua_tungga_greater_than_or_equal_arg0, lingua_tungga_greater_than_or_equal_arg1 };
static const StructType lingua_tungga_less_than_or_equal_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_less_than_or_equal_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_less_than_or_equal_args[] = { lingua_tungga_less_than_or_equal_arg0, lingua_tungga_less_than_or_equal_arg1 };
static const StructType lingua_tungga_and_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_and_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_and_args[] = { lingua_tungga_and_arg0, lingua_tungga_and_arg1 };
static const StructType lingua_tungga_or_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_or_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_or_args[] = { lingua_tungga_or_arg0, lingua_tungga_or_arg1 };
static const StructType lingua_tungga_xor_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_xor_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_xor_args[] = { lingua_tungga_xor_arg0, lingua_tungga_xor_arg1 };
static const StructType lingua_tungga_not_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_bitwise_and_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_bitwise_and_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_bitwise_and_args[] = { lingua_tungga_bitwise_and_arg0, lingua_tungga_bitwise_and_arg1 };
static const StructType lingua_tungga_bitwise_or_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_bitwise_or_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_bitwise_or_args[] = { lingua_tungga_bitwise_or_arg0, lingua_tungga_bitwise_or_arg1 };
static const StructType lingua_tungga_left_shift_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_left_shift_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_left_shift_args[] = { lingua_tungga_left_shift_arg0, lingua_tungga_left_shift_arg1 };
static const StructType lingua_tungga_right_shift_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_right_shift_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_NULL } } } } } }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "lingua-tungga" } } } } };
static const StructType lingua_tungga_right_shift_args[] = { lingua_tungga_right_shift_arg0, lingua_tungga_right_shift_arg1 };

static const FunctionSignature lingua_tungga_functions[] = {
    { "set-statements", 0, &lingua_tungga_set_statements_arg0, 1, "lingua-tungga" },
    { "add-statements", 0, &lingua_tungga_add_statements_arg0, 1, "lingua-tungga" },
    { "get-statements", 0, lingua_tungga_get_statements_args, 0, "lingua-tungga" },
    { "get-resolved-statements", 0, lingua_tungga_get_resolved_statements_args, 0, "lingua-tungga" },
    { "structure-function-call", 0, lingua_tungga_structure_function_call_args, 2, "lingua-tungga" },
    { "structure-variable-call", 0, &lingua_tungga_structure_variable_call_arg0, 1, "lingua-tungga" },
    { "add-structure-function-call", 0, lingua_tungga_add_structure_function_call_args, 2, "lingua-tungga" },
    { "add-structure-variable-call", 0, &lingua_tungga_add_structure_variable_call_arg0, 1, "lingua-tungga" },
    { "add-value", 0, &lingua_tungga_add_value_arg0, 1, "lingua-tungga" },
    { "add-variable", 0, lingua_tungga_add_variable_args, 2, "lingua-tungga" },
    { "if", 0, lingua_tungga_if_args, 2, "lingua-tungga" },
    { "else-if", 0, lingua_tungga_else_if_args, 2, "lingua-tungga" },
    { "else", 0, &lingua_tungga_else_arg0, 1, "lingua-tungga" },
    { "while", 0, lingua_tungga_while_args, 2, "lingua-tungga" },
    { "for-each", 0, lingua_tungga_for_each_args, 3, "lingua-tungga" },
    { "for-counter", 0, lingua_tungga_for_counter_args, 4, "lingua-tungga" },
    { "variable-for-counter", 0, &lingua_tungga_variable_for_counter_arg0, 1, "lingua-tungga" },
    { "declare-for-counter", 0, lingua_tungga_declare_for_counter_args, 2, "lingua-tungga" },
    { "increment-for-counter", 0, &lingua_tungga_increment_for_counter_arg0, 1, "lingua-tungga" },
    { "free-c-variables", 0, lingua_tungga_free_c_variables_args, 0, "lingua-tungga" },
    { "return", 0, &lingua_tungga_return_arg0, 1, "lingua-tungga" },
    { "string-concat", 0, lingua_tungga_string_concat_args, 2, "lingua-tungga" },
    { "string-length", 0, &lingua_tungga_string_length_arg0, 1, "lingua-tungga" },
    { "string-upper", 0, &lingua_tungga_string_upper_arg0, 1, "lingua-tungga" },
    { "string-lower", 0, &lingua_tungga_string_lower_arg0, 1, "lingua-tungga" },
    { "string-trim", 0, &lingua_tungga_string_trim_arg0, 1, "lingua-tungga" },
    { "string-slice", 0, lingua_tungga_string_slice_args, 3, "lingua-tungga" },
    { "string-replace", 0, lingua_tungga_string_replace_args, 3, "lingua-tungga" },
    { "string-split", 0, lingua_tungga_string_split_args, 2, "lingua-tungga" },
    { "string-includes", 0, lingua_tungga_string_includes_args, 2, "lingua-tungga" },
    { "string-repeat", 0, lingua_tungga_string_repeat_args, 2, "lingua-tungga" },
    { "string-char-at", 0, lingua_tungga_string_char_at_args, 2, "lingua-tungga" },
    { "string-starts-with", 0, lingua_tungga_string_starts_with_args, 2, "lingua-tungga" },
    { "string-ends-with", 0, lingua_tungga_string_ends_with_args, 2, "lingua-tungga" },
    { "array-get", 0, lingua_tungga_array_get_args, 2, "lingua-tungga" },
    { "array-length", 0, &lingua_tungga_array_length_arg0, 1, "lingua-tungga" },
    { "array-append", 0, lingua_tungga_array_append_args, 2, "lingua-tungga" },
    { "array-concat", 0, lingua_tungga_array_concat_args, 2, "lingua-tungga" },
    { "array-join", 0, lingua_tungga_array_join_args, 2, "lingua-tungga" },
    { "array-slice", 0, lingua_tungga_array_slice_args, 3, "lingua-tungga" },
    { "array-includes", 0, lingua_tungga_array_includes_args, 2, "lingua-tungga" },
    { "array-index-of", 0, lingua_tungga_array_index_of_args, 2, "lingua-tungga" },
    { "array-reverse", 0, &lingua_tungga_array_reverse_arg0, 1, "lingua-tungga" },
    { "array-sort", 0, &lingua_tungga_array_sort_arg0, 1, "lingua-tungga" },
    { "array-unique", 0, &lingua_tungga_array_unique_arg0, 1, "lingua-tungga" },
    { "object-get", 0, lingua_tungga_object_get_args, 2, "lingua-tungga" },
    { "object-set", 0, lingua_tungga_object_set_args, 3, "lingua-tungga" },
    { "object-keys", 0, &lingua_tungga_object_keys_arg0, 1, "lingua-tungga" },
    { "object-values", 0, &lingua_tungga_object_values_arg0, 1, "lingua-tungga" },
    { "object-has", 0, lingua_tungga_object_has_args, 2, "lingua-tungga" },
    { "object-merge", 0, lingua_tungga_object_merge_args, 2, "lingua-tungga" },
    { "object-delete", 0, lingua_tungga_object_delete_args, 2, "lingua-tungga" },
    { "object-entries", 0, &lingua_tungga_object_entries_arg0, 1, "lingua-tungga" },
    { "add", 0, lingua_tungga_add_args, 2, "lingua-tungga" },
    { "subtract", 0, lingua_tungga_subtract_args, 2, "lingua-tungga" },
    { "multiply", 0, lingua_tungga_multiply_args, 2, "lingua-tungga" },
    { "divide", 0, lingua_tungga_divide_args, 2, "lingua-tungga" },
    { "modulo", 0, lingua_tungga_modulo_args, 2, "lingua-tungga" },
    { "equal", 0, lingua_tungga_equal_args, 2, "lingua-tungga" },
    { "not-equal", 0, lingua_tungga_not_equal_args, 2, "lingua-tungga" },
    { "greater-than", 0, lingua_tungga_greater_than_args, 2, "lingua-tungga" },
    { "less-than", 0, lingua_tungga_less_than_args, 2, "lingua-tungga" },
    { "greater-than-or-equal", 0, lingua_tungga_greater_than_or_equal_args, 2, "lingua-tungga" },
    { "less-than-or-equal", 0, lingua_tungga_less_than_or_equal_args, 2, "lingua-tungga" },
    { "and", 0, lingua_tungga_and_args, 2, "lingua-tungga" },
    { "or", 0, lingua_tungga_or_args, 2, "lingua-tungga" },
    { "xor", 0, lingua_tungga_xor_args, 2, "lingua-tungga" },
    { "not", 0, &lingua_tungga_not_arg0, 1, "lingua-tungga" },
    { "bitwise-and", 0, lingua_tungga_bitwise_and_args, 2, "lingua-tungga" },
    { "bitwise-or", 0, lingua_tungga_bitwise_or_args, 2, "lingua-tungga" },
    { "left-shift", 0, lingua_tungga_left_shift_args, 2, "lingua-tungga" },
    { "right-shift", 0, lingua_tungga_right_shift_args, 2, "lingua-tungga" },
};

/**
 * @param variableName variableName( var : string )
 * @param ... chain ( function-call | copy( builder ) )
 * @return Builder (schema) : lingua-tungga
 */
#define linguaTungga(meta, ...) \
    ((Builder){ \
        .type = "init-function", \
        .schema = validate_and_return( \
            (SchemaType){ \
                .exportName = "schema", \
                .chain = builder_chain( \
                    "lingua-tungga", \
                    (Builder[]){ __VA_ARGS__ }, \
                    BUILDER_COUNT(__VA_ARGS__), \
                    (InitFunctionType){ \
                        .name = "lingua-tungga", \
                        .variableName = (meta).schema.chain.initFunction.variableName, \
                        .importString = "import { linguaTungga } from \"./lingua-tungga.h\"", \
                    }), \
            }, \
            gntrees_structures, COUNT_OF(gntrees_structures)) \
    })
#ifdef __GNUC__
#pragma GCC diagnostic pop
#endif

/* ---- structure registry ---- */
static const StructureRegistry gntrees_structures[] = {
    { "lingua-tungga", lingua_tungga_functions, COUNT_OF(lingua_tungga_functions), NULL, 0 },
};

#endif /* GN_TREES_LINGUA_TUNGGA_H */
