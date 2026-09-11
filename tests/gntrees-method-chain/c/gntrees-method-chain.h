// Auto-generated single-header for gntrees-method-chain
#ifndef GN_TREES_GNTREES_METHOD_CHAIN_H
#define GN_TREES_GNTREES_METHOD_CHAIN_H

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
#include <stddef.h>
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
 * Semua alokasi helper diambil dari arena bump `lt_region`, sehingga
 * `lt_free_all()` mengembalikan seluruh region sekaligus dengan biaya
 * O(jumlah blok). Nilai dari literal / macro `arr` / `map` (compound
 * literal) tidak dialokasikan lewat arena dan karenanya tidak ikut
 * dibebaskan.
 */

#ifndef LT_BLOCK_SIZE
#define LT_BLOCK_SIZE 8192
#endif

#ifndef GN_BLOCK_SIZE
#define GN_BLOCK_SIZE 8192
#endif

#ifndef LT_OWN_BLOCK_SIZE
#define LT_OWN_BLOCK_SIZE 8192
#endif

typedef struct LtBlock
{
    struct LtBlock *next;
    size_t used;
    size_t cap;
    max_align_t _align;
    unsigned char mem[];
} LtBlock;

typedef struct LtRegion
{
    LtBlock *blocks;
    LtBlock *current;
    size_t block_size;
} LtRegion;

static LtRegion lt_region = {NULL, NULL, LT_BLOCK_SIZE};
static LtRegion gn_region = {NULL, NULL, GN_BLOCK_SIZE};
static LtRegion lt_own_region = {NULL, NULL, LT_OWN_BLOCK_SIZE};

static void *region_alloc(LtRegion *r, size_t n)
{
    const size_t align = _Alignof(max_align_t);
    size_t need = (n + align - 1) & ~(align - 1);
    if (need == 0)
        need = align;

    LtBlock *b = r->current;
    if (!b || b->cap - b->used < need)
    {
        size_t cap = need > r->block_size ? need : r->block_size;
        LtBlock *next = malloc(sizeof(LtBlock) + cap);
        if (!next)
            return NULL;
        next->next = NULL;
        next->used = 0;
        next->cap = cap;
        if (r->current)
            r->current->next = next;
        else
            r->blocks = next;
        r->current = next;
        b = next;
    }

    void *p = b->mem + b->used;
    b->used += need;
    return p;
}

/* Kembalikan seluruh blok ke kondisi kosong. Blok pertama dipertahankan
 * agar alokasi berikutnya tidak perlu malloc lagi. */
static void region_reset(LtRegion *r)
{
    LtBlock *first = r->blocks;
    if (!first)
        return;
    LtBlock *extra = first->next;
    while (extra)
    {
        LtBlock *next = extra->next;
        free(extra);
        extra = next;
    }
    first->used = 0;
    first->next = NULL;
    r->current = first;
}

static void region_destroy(LtRegion *r)
{
    LtBlock *b = r->blocks;
    while (b)
    {
        LtBlock *next = b->next;
        free(b);
        b = next;
    }
    r->blocks = NULL;
    r->current = NULL;
}

static void *lt_alloc(size_t n)
{
    return region_alloc(&lt_region, n);
}

static void lt_free_all(void)
{
    region_reset(&lt_region);
}

static void free_json_buf(void);

static void lt_shutdown(void)
{
    region_destroy(&lt_region);
    region_destroy(&lt_own_region);
    free_json_buf();
}

static char *lt_own_strdup(const char *s)
{
    const char *src = s ? s : "";
    size_t n = strlen(src) + 1;
    char *copy = region_alloc(&lt_own_region, n);
    if (copy)
        memcpy(copy, src, n);
    return copy;
}

/* Deep-copy `v` ke region owned di luar arena value, sehingga hasilnya
 * seragam region-allocated dan dibebaskan sekaligus dengan `lt_free_value`. */
static ArgumentValue lt_own_copy(ArgumentValue v)
{
    switch (v.type)
    {
    case D_STRING:
        v.as.s = lt_own_strdup(v.as.s);
        return v;
    case D_ARRAY:
    {
        const ArgumentValue *src = v.as.data;
        ArgumentValue *items = NULL;
        if (v.count)
        {
            items = region_alloc(&lt_own_region, v.count * sizeof(ArgumentValue));
            if (!items)
                return v_null();
            for (size_t i = 0; i < v.count; i++)
                items[i] = lt_own_copy(src[i]);
        }
        v.as.data = items;
        return v;
    }
    case D_MAP:
    {
        const MapEntry *src = v.as.data;
        MapEntry *entries = NULL;
        if (v.count)
        {
            entries = region_alloc(&lt_own_region, v.count * sizeof(MapEntry));
            if (!entries)
                return v_null();
            for (size_t i = 0; i < v.count; i++)
            {
                entries[i].key = lt_own_strdup(src[i].key);
                entries[i].value = lt_own_copy(src[i].value);
            }
        }
        v.as.data = entries;
        return v;
    }
    default:
        return v;
    }
}

/* Deep-copy nilai return keluar arena, lalu bebaskan seluruh arena. Hasil
 * dapat dibebaskan pemanggil dengan `lt_free_value`. */
static ArgumentValue lt_detach_copy(ArgumentValue v)
{
    ArgumentValue copy = lt_own_copy(v);
    lt_free_all();
    return copy;
}

/* Bebaskan semua nilai hasil `lt_detach_copy` / `lt_own_copy` sekaligus
 * dengan me-reset region owned (O(jumlah blok)). Argumen diabaikan; nilai
 * yang berasal dari arena atau literal aman dilewatkan ke sini. */
static void lt_free_value(ArgumentValue v)
{
    (void)v;
    region_reset(&lt_own_region);
}

/* ---- schema/builder arena ----
 * Alokasi schema (deep copy chain, builder, init function) berumur panjang
 * dan memakai region bump terpisah dari arena value, sehingga `lt_free_all`
 * tidak menyentuhnya. Panggil `gn_free_schemas()` saat schema tidak dipakai
 * lagi.
 */

static void *gn_alloc(size_t n)
{
    return region_alloc(&gn_region, n);
}

static void gn_free_schemas(void)
{
    region_reset(&gn_region);
}

static void gn_shutdown(void)
{
    region_destroy(&gn_region);
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

/* Wrap buffer `items` (milik pemanggil, hasil lt_alloc) langsung sebagai
 * array tanpa menyalin. Buffer tetap valid sampai lt_free_all. */
static ArgumentValue lt_adopt_arr(ArgumentValue *items, size_t count)
{
    return (ArgumentValue){ .type = D_ARRAY, .count = count, .as.data = items };
}

/* Wrap buffer `entries` (milik pemanggil, hasil lt_alloc) langsung sebagai
 * map tanpa menyalin. Buffer tetap valid sampai lt_free_all. */
static ArgumentValue lt_adopt_map(MapEntry *entries, size_t count)
{
    return (ArgumentValue){ .type = D_MAP, .count = count, .as.data = entries };
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
    size_t nparts = 1;
    for (const char *p = str; (p = strstr(p, d)); p += dl)
        nparts++;
    ArgumentValue *items = lt_alloc(nparts * sizeof(ArgumentValue));
    char *block = lt_alloc(strlen(str) + nparts);
    if (!items || !block)
        return v_null();
    size_t count = 0;
    char *out = block;
    const char *p = str;
    while (1)
    {
        const char *q = strstr(p, d);
        size_t n = q ? (size_t)(q - p) : strlen(p);
        memcpy(out, p, n);
        out[n] = '\0';
        items[count++] = v_string(out);
        out += n + 1;
        if (!q)
            break;
        p = q + dl;
    }
    return lt_adopt_arr(items, count);
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
    return lt_adopt_arr(out, ca + 1);
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
    return lt_adopt_arr(out, ca + cb);
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
    char *out = buf;
    for (size_t i = 0; i < a.count; i++)
    {
        const char *part = lt_repr(items[i], tmp, sizeof tmp);
        size_t pl = strlen(part);
        if (i)
        {
            memcpy(out, d, dl);
            out += dl;
        }
        memcpy(out, part, pl);
        out += pl;
    }
    *out = '\0';
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
    return lt_adopt_arr(out, n);
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

static int lt_compare_ptr(const void *pa, const void *pb)
{
    return lt_compare(*(const ArgumentValue *)pa, *(const ArgumentValue *)pb);
}

static int lt_compare_deref_ptr(const void *pa, const void *pb)
{
    const ArgumentValue *const *x = (const ArgumentValue *const *)pa;
    const ArgumentValue *const *y = (const ArgumentValue *const *)pb;
    return lt_compare(**x, **y);
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
    if (n > 1)
        qsort(out, n, sizeof(ArgumentValue), lt_compare_ptr);
    return lt_adopt_arr(out, n);
}

static ArgumentValue lt_unique(ArgumentValue a)
{
    if (a.type != D_ARRAY)
        return v_null();
    const ArgumentValue *items = a.as.data;
    size_t n = a.count;
    ArgumentValue *out = lt_alloc((n ? n : 1) * sizeof(ArgumentValue));
    const ArgumentValue **idx = lt_alloc((n ? n : 1) * sizeof(ArgumentValue *));
    char *keep = lt_alloc((n ? n : 1) * sizeof(char));
    if (!out || !idx || !keep)
        return v_null();
    for (size_t i = 0; i < n; i++)
        idx[i] = &items[i];
    if (n > 1)
        qsort(idx, n, sizeof(ArgumentValue *), lt_compare_deref_ptr);
    for (size_t i = 0; i < n; i++)
    {
        size_t orig = (size_t)(idx[i] - items);
        keep[orig] = (i == 0) || !lt_value_equals(*idx[i - 1], *idx[i]);
    }
    size_t m = 0;
    for (size_t i = 0; i < n; i++)
        if (keep[i])
            out[m++] = items[i];
    return lt_adopt_arr(out, m);
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
    return lt_adopt_map(out, n);
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
    return lt_adopt_arr(out, n);
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
    return lt_adopt_arr(out, n);
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

/* Arena-backed open-addressing string->index map (untuk dedup key di merge). */
typedef struct LtStrMap
{
    const char **slots;
    size_t *vals;
    size_t cap;
    size_t count;
} LtStrMap;

static size_t lt_str_hash(const char *s)
{
    size_t h = 5381;
    while (*s)
        h = h * 33 ^ (unsigned char)*s++;
    return h;
}

static LtStrMap lt_strmap_create(size_t hint)
{
    size_t cap = 4;
    while (cap < hint * 2)
        cap *= 2;
    LtStrMap m = { NULL, NULL, cap, 0 };
    m.slots = lt_alloc(cap * sizeof(const char *));
    m.vals = lt_alloc(cap * sizeof(size_t));
    if (m.slots)
        memset(m.slots, 0, cap * sizeof(const char *));
    return m;
}

/* Cari key. Kembalikan index tersimpan atau (size_t)-1 jika absen. */
static size_t lt_strmap_find(const LtStrMap *m, const char *key)
{
    if (!m->slots || !m->vals)
        return (size_t)-1;
    size_t i = lt_str_hash(key) & (m->cap - 1);
    while (m->slots[i])
    {
        if (strcmp(m->slots[i], key) == 0)
            return m->vals[i];
        i = (i + 1) & (m->cap - 1);
    }
    return (size_t)-1;
}

static void lt_strmap_insert(LtStrMap *m, const char *key, size_t idx)
{
    if (!m->slots || !m->vals)
        return;
    size_t i = lt_str_hash(key) & (m->cap - 1);
    while (m->slots[i])
        i = (i + 1) & (m->cap - 1);
    m->slots[i] = key;
    m->vals[i] = idx;
    m->count++;
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
    LtStrMap seen = lt_strmap_create(ca + cb);
    if (!seen.slots || !seen.vals)
        return v_null();
    size_t n = 0;
    for (size_t i = 0; i < ca; i++)
    {
        out[n++] = ea[i];
        if (ea[i].key)
            lt_strmap_insert(&seen, ea[i].key, n - 1);
    }
    for (size_t i = 0; i < cb; i++)
    {
        if (eb[i].key)
        {
            size_t prev = lt_strmap_find(&seen, eb[i].key);
            if (prev == (size_t)-1)
            {
                lt_strmap_insert(&seen, eb[i].key, n);
                out[n++] = eb[i];
            }
            else
                out[prev].value = eb[i].value;
        }
        else
            out[n++] = eb[i];
    }
    return lt_adopt_map(out, n);
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
    return lt_adopt_map(out, n);
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
    return lt_adopt_arr(out, n);
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
    ChainType *c = lt_alloc(sizeof(ChainType));
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
        ArgumentValue *items = gn_alloc(v->count * sizeof(ArgumentValue));
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
        MapEntry *entries = gn_alloc(v->count * sizeof(MapEntry));
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
    ChainType *copy = gn_alloc(sizeof(ChainType));
    if (!copy)
        return NULL;
    *copy = *c;
    copy->values = NULL;
    if (c->valueCount == 0)
        return copy;

    ChainValue *values = gn_alloc(c->valueCount * sizeof(ChainValue));
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
            ArgumentType *args = gn_alloc(fc->argumentCount * sizeof(ArgumentType));
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
                Builder *b = gn_alloc(sizeof(Builder));
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
                values[i].as.copy.source = *srcCopy;
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

    ChainValue *values = gn_alloc(total * sizeof(ChainValue));
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

static void free_json_buf(void)
{
    free(json_buf);
    json_buf = NULL;
}

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
// ==== type-converter ====

/**
 * @param val string
 * @return Builder (function-call) : type-converter
 */
#define stringify(val) \
    builder_call("stringify", ((ArgumentType[]){ mkarg(v(val)) }), 1, 0)

/**
 * @param val number
 * @return Builder (function-call) : type-converter
 */
#define numerify(val) \
    builder_call("numerify", ((ArgumentType[]){ mkarg(v(val)) }), 1, 0)

/**
 * @param val boolean
 * @return Builder (function-call) : type-converter
 */
#define boolify(val) \
    builder_call("boolify", ((ArgumentType[]){ mkarg(_Generic((val), ArgumentValue: v_pass, default: v_bool)(val)) }), 1, 0)

/**
 * @param formatter chain<string-formatter>
 * @return Builder (function-call) : type-converter
 */
#define pipe(formatter) \
    builder_call("pipe", ((ArgumentType[]){ mkarg(v(formatter)) }), 1, 0)

/*
 * type-converter
 *   param => value : string | number
 *   return => Builder (function-call) : type-converter
 * 
 * string-formatter
 *   param => value : string | number
 *   return => Builder (function-call) : string-formatter
 */
#define unify(value) \
    builder_call("unify", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/*
 * type-converter
 *   param => ... : variadic
 *   return => Builder (function-call) : type-converter
 * 
 * string-formatter
 *   param => ... : variadic
 *   return => Builder (function-call) : string-formatter
 */
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
                _args[_j++] = (ArgumentType){ .argument = _vals[_i], .hasDefault = 0, .def = {0}, .provided = 1 }; \
        builder_single(0, &(ChainValue){ \
            .kind = V_FUNCTION_CALL, \
            .as.functionCall = { \
                .name = "interpolate", \
                .arguments = _args, \
                .argumentCount = _cnt, \
                .isTemplateLiteral = 1, \
            } \
        }); \
    })

/*
 * type-converter
 *   param => value : string (default: "default")
 *   return => Builder (function-call) : type-converter
 * 
 * string-formatter
 *   param => value : string (default: "default")
 *   return => Builder (function-call) : string-formatter
 */
#define label(...) \
    CAT(label_, __VA_OPT__(1))(__VA_ARGS__)
#define label_1(value) \
    builder_call("label", ((ArgumentType[]){ mkarg_def(v(value), v("default")) }), 1, 0)
#define label_() \
    label_1("default")

/**
 * @param tags array<string> (default: [ "default" ])
 * @return Builder (function-call) : type-converter
 */
#define tags(...) \
    CAT(tags_, __VA_OPT__(1))(__VA_ARGS__)
#define tags_1(tags) \
    builder_call("tags", ((ArgumentType[]){ mkarg_def(v(tags), v(arr("default"))) }), 1, 0)
#define tags_() \
    tags_1(arr("default"))

/*
 * type-converter
 *   param => value : string
 *   return => char *
 * 
 * string-formatter
 *   param => value : string
 *   return => char *
 */
static char * type_converter_render_impl(Builder builder, ArgumentType *args, size_t count) {
(void)builder; (void)args; (void)count;
return "type-converter";
}

static char * string_formatter_render_impl(Builder builder, ArgumentType *args, size_t count) {
(void)builder; (void)args; (void)count;
return "string-formatter";
}

static const StructType type_converter_render_arg0 = { .kind = S_STRING };
static const FunctionSignature type_converter_render_sig = { "render", 0, &type_converter_render_arg0, 1, "type-converter" };

#define render(builder, value) \
    ({ \
        ArgumentType _args[] = { mkarg(v(value)) }; \
        if (!(builder).schema.chain.typeName || !(strcmp((builder).schema.chain.typeName, "type-converter") == 0 || strcmp((builder).schema.chain.typeName, "string-formatter") == 0)) \
            fail("custom function 'render' is not a member of structure '%s'", (builder).schema.chain.typeName ? (builder).schema.chain.typeName : "(none)"); \
        validate_function_args(&(FunctionCallType){ .name = "render", .arguments = _args, .argumentCount = 1, .isTemplateLiteral = 0 }, &type_converter_render_sig, gntrees_structures, COUNT_OF(gntrees_structures)); \
        strcmp((builder).schema.chain.typeName, "type-converter") == 0 ? type_converter_render_impl((builder), _args, 1) : string_formatter_render_impl((builder), _args, 1); \
    })

static const StructType type_converter_stringify_arg0 = { .kind = S_STRING };
static const StructType type_converter_numerify_arg0 = { .kind = S_NUMBER };
static const StructType type_converter_boolify_arg0 = { .kind = S_BOOL };
static const StructType type_converter_pipe_arg0 = { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "string-formatter" } };
static const StructType type_converter_unify_arg0 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } } } };
static const StructType type_converter_interpolate_expr = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } } } };
static const StructType type_converter_interpolate_args[] = { { .kind = S_STRING }, type_converter_interpolate_expr };
static const StructType type_converter_label_arg0 = { .kind = S_STRING };
static const StructType type_converter_tags_arg0 = { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_STRING } } };

static const FunctionSignature type_converter_functions[] = {
    { "stringify", 0, &type_converter_stringify_arg0, 1, "type-converter" },
    { "numerify", 0, &type_converter_numerify_arg0, 1, "type-converter" },
    { "boolify", 0, &type_converter_boolify_arg0, 1, "type-converter" },
    { "pipe", 0, &type_converter_pipe_arg0, 1, "type-converter" },
    { "unify", 0, &type_converter_unify_arg0, 1, "type-converter" },
    { "interpolate", 1, type_converter_interpolate_args, 2, "type-converter" },
    { "label", 0, &type_converter_label_arg0, 1, "type-converter" },
    { "tags", 0, &type_converter_tags_arg0, 1, "type-converter" },
};

static const PropertySignature type_converter_properties[] = {
    { "testvar", "type-converter" },
};

/**
 * @param variableName variableName( var : string )
 * @param ... chain ( function-call | copy( builder ) )
 * @return Builder (schema) : type-converter
 */
#define createTypeConverter(meta, ...) \
    ((Builder){ \
        .type = "init-function", \
        .schema = validate_and_return( \
            (SchemaType){ \
                .exportName = "schema", \
                .chain = builder_chain( \
                    "type-converter", \
                    (Builder[]){ __VA_ARGS__ }, \
                    BUILDER_COUNT(__VA_ARGS__), \
                    (InitFunctionType){ \
                        .name = "create-type-converter", \
                        .variableName = (meta).schema.chain.initFunction.variableName, \
                        .importString = "import { createTypeConverter } from \"../../../gntrees-method-chain/typescript/index\"", \
                    }), \
            }, \
            gntrees_structures, COUNT_OF(gntrees_structures)) \
    })

/**
 * @return Builder property-call
 */
static Builder testvar = {
    .type = "property-call",
    .schema = { .exportName = 0, .chain = {
        .typeName = "type-converter",
        .values = (ChainValue[]){ { .kind = V_PROPERTY_CALL, .as.propertyCall = { .name = "testvar" } } },
        .valueCount = 1,
        .initFunction = {0},
    } }
};

// ==== string-formatter ====

/**
 * @param val string
 * @return Builder (function-call) : string-formatter
 */
#define format(val) \
    builder_call("format", ((ArgumentType[]){ mkarg(v(val)) }), 1, 0)

static const StructType string_formatter_format_arg0 = { .kind = S_STRING };
static const StructType string_formatter_unify_arg0 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } } } };
static const StructType string_formatter_interpolate_expr = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } } } };
static const StructType string_formatter_interpolate_args[] = { { .kind = S_STRING }, string_formatter_interpolate_expr };
static const StructType string_formatter_label_arg0 = { .kind = S_STRING };

static const FunctionSignature string_formatter_functions[] = {
    { "format", 0, &string_formatter_format_arg0, 1, "string-formatter" },
    { "unify", 0, &string_formatter_unify_arg0, 1, "string-formatter" },
    { "interpolate", 1, string_formatter_interpolate_args, 2, "string-formatter" },
    { "label", 0, &string_formatter_label_arg0, 1, "string-formatter" },
};

/**
 * @param variableName variableName( var : string )
 * @param ... chain ( function-call | copy( builder ) )
 * @return Builder (schema) : string-formatter
 */
#define createStringFormatter(meta, ...) \
    ((Builder){ \
        .type = "init-function", \
        .schema = validate_and_return( \
            (SchemaType){ \
                .exportName = "schema", \
                .chain = builder_chain( \
                    "string-formatter", \
                    (Builder[]){ __VA_ARGS__ }, \
                    BUILDER_COUNT(__VA_ARGS__), \
                    (InitFunctionType){ \
                        .name = "create-string-formatter", \
                        .variableName = (meta).schema.chain.initFunction.variableName, \
                        .importString = "import { createStringFormatter } from \"../../../gntrees-method-chain/typescript/index\"", \
                    }), \
            }, \
            gntrees_structures, COUNT_OF(gntrees_structures)) \
    })

// ==== query-builder ====

/**
 * @param columns string | number | boolean | chain<query-builder> | array<string | number | boolean | chain<query-builder>> | map<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define select(columns) \
    builder_call("select", ((ArgumentType[]){ mkarg(v(columns)) }), 1, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define from(table) \
    builder_call("from", ((ArgumentType[]){ mkarg(v(table)) }), 1, 0)

/**
 * @param transaction string | number | boolean | chain<query-builder> | array<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define transaction(transaction) \
    builder_call("transaction", ((ArgumentType[]){ mkarg(v(transaction)) }), 1, 0)

/**
 * @param columns string | number | boolean | chain<query-builder> | array<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define orderBy(columns) \
    builder_call("order-by", ((ArgumentType[]){ mkarg(v(columns)) }), 1, 0)

/**
 * @param count string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define limit(count) \
    builder_call("limit", ((ArgumentType[]){ mkarg(v(count)) }), 1, 0)

/**
 * @param count string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define offset(count) \
    builder_call("offset", ((ArgumentType[]){ mkarg(v(count)) }), 1, 0)

/**
 * @param statement string | number | boolean | chain<query-builder>
 * @param as string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define with(statement, as) \
    builder_call("with", ((ArgumentType[]){ mkarg(v(statement)), mkarg(v(as)) }), 2, 0)

/**
 * @param columns string | number | boolean | chain<query-builder> | array<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define groupBy(columns) \
    builder_call("group-by", ((ArgumentType[]){ mkarg(v(columns)) }), 1, 0)

/**
 * @param statement string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define having(statement) \
    builder_call("having", ((ArgumentType[]){ mkarg(v(statement)) }), 1, 0)

/**
 * @param statement string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define where(statement) \
    builder_call("where", ((ArgumentType[]){ mkarg(v(statement)) }), 1, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @param set string | number | boolean | chain<query-builder> | map<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define update(table, set) \
    builder_call("update", ((ArgumentType[]){ mkarg(v(table)), mkarg(v(set)) }), 2, 0)

/**
 * @param statement string | number | boolean | chain<query-builder> | map<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define set(statement) \
    builder_call("set", ((ArgumentType[]){ mkarg(v(statement)) }), 1, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @param set string | number | boolean | chain<query-builder> | map<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define insert(table, set) \
    builder_call("insert", ((ArgumentType[]){ mkarg(v(table)), mkarg(v(set)) }), 2, 0)

/**
 * @param values string | number | boolean | chain<query-builder> | array<string | number | boolean | chain<query-builder>> | array<array<string | number | boolean | chain<query-builder>>>
 * @return Builder (function-call) : query-builder
 */
#define values(values) \
    builder_call("values", ((ArgumentType[]){ mkarg(v(values)) }), 1, 0)

/**
 * @param columns string | number | boolean | chain<query-builder> | array<string | number | boolean | chain<query-builder>> | map<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define returning(columns) \
    builder_call("returning", ((ArgumentType[]){ mkarg(v(columns)) }), 1, 0)

/**
 * @param target string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define onConflictDoNothing(target) \
    builder_call("on-conflict-do-nothing", ((ArgumentType[]){ mkarg(v(target)) }), 1, 0)

/**
 * @param target string | number | boolean | chain<query-builder>
 * @param set string | number | boolean | chain<query-builder> | map<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define onConflictDoUpdate(target, set) \
    builder_call("on-conflict-do-update", ((ArgumentType[]){ mkarg(v(target)), mkarg(v(set)) }), 2, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define delete(table) \
    builder_call("delete", ((ArgumentType[]){ mkarg(v(table)) }), 1, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @param on string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define join(table, on) \
    builder_call("join", ((ArgumentType[]){ mkarg(v(table)), mkarg(v(on)) }), 2, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @param on string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define leftJoin(table, on) \
    builder_call("left-join", ((ArgumentType[]){ mkarg(v(table)), mkarg(v(on)) }), 2, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @param on string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define rightJoin(table, on) \
    builder_call("right-join", ((ArgumentType[]){ mkarg(v(table)), mkarg(v(on)) }), 2, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @param on string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define innerJoin(table, on) \
    builder_call("inner-join", ((ArgumentType[]){ mkarg(v(table)), mkarg(v(on)) }), 2, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @param on string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define fullJoin(table, on) \
    builder_call("full-join", ((ArgumentType[]){ mkarg(v(table)), mkarg(v(on)) }), 2, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @param on string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define crossJoin(table, on) \
    builder_call("cross-join", ((ArgumentType[]){ mkarg(v(table)), mkarg(v(on)) }), 2, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define eq(value) \
    builder_call("eq", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define gt(value) \
    builder_call("gt", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define gte(value) \
    builder_call("gte", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define lt(value) \
    builder_call("lt", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define lte(value) \
    builder_call("lte", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define exists(value) \
    builder_call("exists", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define isNull(value) \
    builder_call("is-null", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define in(value) \
    builder_call("in", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param first string | number | boolean | chain<query-builder>
 * @param second string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define between(first, second) \
    builder_call("between", ((ArgumentType[]){ mkarg(v(first)), mkarg(v(second)) }), 2, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define like(value) \
    builder_call("like", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define ilike(value) \
    builder_call("ilike", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define not(value) \
    builder_call("not", ((ArgumentType[]){ mkarg(v(value)) }), 1, 0)

/**
 * @param values string | number | boolean | chain<query-builder> | array<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define and(values) \
    builder_call("and", ((ArgumentType[]){ mkarg(v(values)) }), 1, 0)

/**
 * @param values string | number | boolean | chain<query-builder> | array<string | number | boolean | chain<query-builder>>
 * @return Builder (function-call) : query-builder
 */
#define or(values) \
    builder_call("or", ((ArgumentType[]){ mkarg(v(values)) }), 1, 0)

/**
 * @param operation string | number | boolean | chain<query-builder>
 * @param value string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define op(operation, value) \
    builder_call("op", ((ArgumentType[]){ mkarg(v(operation)), mkarg(v(value)) }), 2, 0)

/**
 * @param ... variadic
 * @return Builder (function-call) : query-builder
 */
#define raw(...) \
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
                _args[_j++] = (ArgumentType){ .argument = _vals[_i], .hasDefault = 0, .def = {0}, .provided = 1 }; \
        builder_single(0, &(ChainValue){ \
            .kind = V_FUNCTION_CALL, \
            .as.functionCall = { \
                .name = "raw", \
                .arguments = _args, \
                .argumentCount = _cnt, \
                .isTemplateLiteral = 1, \
            } \
        }); \
    })

/**
 * @return Builder (function-call) : query-builder
 */
#define asc() \
    builder_call("asc", ((ArgumentType[]){  }), 0, 0)

/**
 * @return Builder (function-call) : query-builder
 */
#define desc() \
    builder_call("desc", ((ArgumentType[]){  }), 0, 0)

/**
 * @param alias string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define as(alias) \
    builder_call("as", ((ArgumentType[]){ mkarg(v(alias)) }), 1, 0)

/**
 * @param column string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define col(column) \
    builder_call("col", ((ArgumentType[]){ mkarg(v(column)) }), 1, 0)

/**
 * @param table string | number | boolean | chain<query-builder>
 * @return Builder (function-call) : query-builder
 */
#define table(table) \
    builder_call("table", ((ArgumentType[]){ mkarg(v(table)) }), 1, 0)

/**
 * @return char *
 */
static char * query_builder_sign_impl(Builder builder, ArgumentType *args, size_t count) {
(void)builder; (void)args; (void)count;
return "query-builder-sign";
}

static const FunctionSignature query_builder_sign_sig = { "sign", 0, 0, 0, "query-builder" };

#define sign(builder) \
    ({ \
        if (!(builder).schema.chain.typeName || !(strcmp((builder).schema.chain.typeName, "query-builder") == 0)) \
            fail("custom function 'sign' is not a member of structure '%s'", (builder).schema.chain.typeName ? (builder).schema.chain.typeName : "(none)"); \
        query_builder_sign_impl((builder), 0, 0); \
    })

static const StructType query_builder_select_arg0 = { .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_from_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_transaction_arg0 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_order_by_arg0 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_limit_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_offset_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_with_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_with_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_with_args[] = { query_builder_with_arg0, query_builder_with_arg1 };
static const StructType query_builder_group_by_arg0 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_having_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_where_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_update_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_update_arg1 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_update_args[] = { query_builder_update_arg0, query_builder_update_arg1 };
static const StructType query_builder_set_arg0 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_insert_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_insert_arg1 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_insert_args[] = { query_builder_insert_arg0, query_builder_insert_arg1 };
static const StructType query_builder_values_arg0 = { .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } } } };
static const StructType query_builder_returning_arg0 = { .kind = S_UNION, .as.unionType = { .count = 3, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_on_conflict_do_nothing_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_on_conflict_do_update_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_on_conflict_do_update_arg1 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_MAP, .as.map = { .value = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_on_conflict_do_update_args[] = { query_builder_on_conflict_do_update_arg0, query_builder_on_conflict_do_update_arg1 };
static const StructType query_builder_delete_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_join_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_join_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_join_args[] = { query_builder_join_arg0, query_builder_join_arg1 };
static const StructType query_builder_left_join_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_left_join_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_left_join_args[] = { query_builder_left_join_arg0, query_builder_left_join_arg1 };
static const StructType query_builder_right_join_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_right_join_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_right_join_args[] = { query_builder_right_join_arg0, query_builder_right_join_arg1 };
static const StructType query_builder_inner_join_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_inner_join_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_inner_join_args[] = { query_builder_inner_join_arg0, query_builder_inner_join_arg1 };
static const StructType query_builder_full_join_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_full_join_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_full_join_args[] = { query_builder_full_join_arg0, query_builder_full_join_arg1 };
static const StructType query_builder_cross_join_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_cross_join_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_cross_join_args[] = { query_builder_cross_join_arg0, query_builder_cross_join_arg1 };
static const StructType query_builder_eq_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_gt_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_gte_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_lt_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_lte_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_exists_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_is_null_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_in_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_between_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_between_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_between_args[] = { query_builder_between_arg0, query_builder_between_arg1 };
static const StructType query_builder_like_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_ilike_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_not_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_and_arg0 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_or_arg0 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } }, { .kind = S_ARRAY, .as.array = { .elem = &(StructType){ .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } } } } } } };
static const StructType query_builder_op_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_op_arg1 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_op_args[] = { query_builder_op_arg0, query_builder_op_arg1 };
static const StructType query_builder_raw_expr = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_raw_args[] = { { .kind = S_STRING }, query_builder_raw_expr };
static const StructType query_builder_asc_args[] = {  };
static const StructType query_builder_desc_args[] = {  };
static const StructType query_builder_as_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_col_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };
static const StructType query_builder_table_arg0 = { .kind = S_UNION, .as.unionType = { .count = 4, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER }, { .kind = S_BOOL }, { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "query-builder" } } } } };

static const FunctionSignature query_builder_functions[] = {
    { "select", 0, &query_builder_select_arg0, 1, "query-builder" },
    { "from", 0, &query_builder_from_arg0, 1, "query-builder" },
    { "transaction", 0, &query_builder_transaction_arg0, 1, "query-builder" },
    { "order-by", 0, &query_builder_order_by_arg0, 1, "query-builder" },
    { "limit", 0, &query_builder_limit_arg0, 1, "query-builder" },
    { "offset", 0, &query_builder_offset_arg0, 1, "query-builder" },
    { "with", 0, query_builder_with_args, 2, "query-builder" },
    { "group-by", 0, &query_builder_group_by_arg0, 1, "query-builder" },
    { "having", 0, &query_builder_having_arg0, 1, "query-builder" },
    { "where", 0, &query_builder_where_arg0, 1, "query-builder" },
    { "update", 0, query_builder_update_args, 2, "query-builder" },
    { "set", 0, &query_builder_set_arg0, 1, "query-builder" },
    { "insert", 0, query_builder_insert_args, 2, "query-builder" },
    { "values", 0, &query_builder_values_arg0, 1, "query-builder" },
    { "returning", 0, &query_builder_returning_arg0, 1, "query-builder" },
    { "on-conflict-do-nothing", 0, &query_builder_on_conflict_do_nothing_arg0, 1, "query-builder" },
    { "on-conflict-do-update", 0, query_builder_on_conflict_do_update_args, 2, "query-builder" },
    { "delete", 0, &query_builder_delete_arg0, 1, "query-builder" },
    { "join", 0, query_builder_join_args, 2, "query-builder" },
    { "left-join", 0, query_builder_left_join_args, 2, "query-builder" },
    { "right-join", 0, query_builder_right_join_args, 2, "query-builder" },
    { "inner-join", 0, query_builder_inner_join_args, 2, "query-builder" },
    { "full-join", 0, query_builder_full_join_args, 2, "query-builder" },
    { "cross-join", 0, query_builder_cross_join_args, 2, "query-builder" },
    { "eq", 0, &query_builder_eq_arg0, 1, "query-builder" },
    { "gt", 0, &query_builder_gt_arg0, 1, "query-builder" },
    { "gte", 0, &query_builder_gte_arg0, 1, "query-builder" },
    { "lt", 0, &query_builder_lt_arg0, 1, "query-builder" },
    { "lte", 0, &query_builder_lte_arg0, 1, "query-builder" },
    { "exists", 0, &query_builder_exists_arg0, 1, "query-builder" },
    { "is-null", 0, &query_builder_is_null_arg0, 1, "query-builder" },
    { "in", 0, &query_builder_in_arg0, 1, "query-builder" },
    { "between", 0, query_builder_between_args, 2, "query-builder" },
    { "like", 0, &query_builder_like_arg0, 1, "query-builder" },
    { "ilike", 0, &query_builder_ilike_arg0, 1, "query-builder" },
    { "not", 0, &query_builder_not_arg0, 1, "query-builder" },
    { "and", 0, &query_builder_and_arg0, 1, "query-builder" },
    { "or", 0, &query_builder_or_arg0, 1, "query-builder" },
    { "op", 0, query_builder_op_args, 2, "query-builder" },
    { "raw", 1, query_builder_raw_args, 2, "query-builder" },
    { "asc", 0, query_builder_asc_args, 0, "query-builder" },
    { "desc", 0, query_builder_desc_args, 0, "query-builder" },
    { "as", 0, &query_builder_as_arg0, 1, "query-builder" },
    { "col", 0, &query_builder_col_arg0, 1, "query-builder" },
    { "table", 0, &query_builder_table_arg0, 1, "query-builder" },
};

/**
 * @param variableName variableName( var : string )
 * @param ... chain ( function-call | copy( builder ) )
 * @return Builder (schema) : query-builder
 */
#define queryBuilder(meta, ...) \
    ((Builder){ \
        .type = "init-function", \
        .schema = validate_and_return( \
            (SchemaType){ \
                .exportName = "schema", \
                .chain = builder_chain( \
                    "query-builder", \
                    (Builder[]){ __VA_ARGS__ }, \
                    BUILDER_COUNT(__VA_ARGS__), \
                    (InitFunctionType){ \
                        .name = "query-builder", \
                        .variableName = (meta).schema.chain.initFunction.variableName, \
                        .importString = "import { queryBuilder } from \"../../../gntrees-method-chain/typescript/index\"", \
                    }), \
            }, \
            gntrees_structures, COUNT_OF(gntrees_structures)) \
    })
#ifdef __GNUC__
#pragma GCC diagnostic pop
#endif

/* ---- structure registry ---- */
static const StructureRegistry gntrees_structures[] = {
    { "type-converter", type_converter_functions, COUNT_OF(type_converter_functions), type_converter_properties, COUNT_OF(type_converter_properties) },
    { "string-formatter", string_formatter_functions, COUNT_OF(string_formatter_functions), NULL, 0 },
    { "query-builder", query_builder_functions, COUNT_OF(query_builder_functions), NULL, 0 },
};

#endif /* GN_TREES_GNTREES_METHOD_CHAIN_H */
