// Auto-generated single-header for gntrees-method-chain
#ifndef GN_TREES_GNTREES_METHOD_CHAIN_H
#define GN_TREES_GNTREES_METHOD_CHAIN_H

/* open_memstream memerlukan _POSIX_C_SOURCE sebelum header sistem apa pun. */
#ifndef _POSIX_C_SOURCE
#define _POSIX_C_SOURCE 200809L
#endif

/* cJSON disediakan terpisah (cJSON.h + cJSON.c) di folder yang sama. */
#include "cJSON.h"

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

static ArgumentValue v_int(long long x);
static ArgumentValue v_float(double x);
static ArgumentValue v_string(const char *s);
static ArgumentValue v_bool(int b);
static ArgumentValue v_null(void);
static ArgumentValue v_pass(ArgumentValue v);
static ArgumentValue v_chain(const ChainType *c);

static int validate_schema(const SchemaType *s, const FunctionSignature *functions, size_t functionCount);
static int validate_properties(const SchemaType *s);
static int arg_value_equal(const ArgumentValue *a, const ArgumentValue *b);
static SchemaType validate_and_return(SchemaType s, const FunctionSignature *functions, size_t functionCount);

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


/* ---- base utilities (di-inline sebagai header-only) ---- */
#ifdef __GNUC__
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wunused-function"
#endif
#ifndef GN_TREES_BASE_UTILS_H
#define GN_TREES_BASE_UTILS_H


/* getSchema(builder[, exportName[, importString]]) — exportName & importString
   opsional (NULL = biarkan nilai bawaan init function). */
static SchemaType getSchema_impl(const Builder *b, const char *exportName, const char *importString);

#define GET_SCHEMA_1(b) getSchema_impl((b), NULL, NULL)
#define GET_SCHEMA_2(b, e) getSchema_impl((b), (e), NULL)
#define GET_SCHEMA_3(b, e, i) getSchema_impl((b), (e), (i))
#define GET_SCHEMA_SELECT(_1, _2, _3, NAME, ...) NAME
#define getSchema(...) \
    GET_SCHEMA_SELECT(__VA_ARGS__, GET_SCHEMA_3, GET_SCHEMA_2, GET_SCHEMA_1)(__VA_ARGS__)

/* getJSONSchema(builder) atau getJSONSchema(schema) — menerima pointer ke
   SchemaType maupun Builder. String mengarah ke buffer internal yang ditimpa
   pada pemanggilan berikutnya — caller TIDAK perlu free(). */
static const char *getJSONSchema_impl(const SchemaType *s);

static inline const char *getJSONSchema_builder(const Builder *b)
{
    return getJSONSchema_impl(&b->schema);
}

#define getJSONSchema(x) \
    _Generic((x), \
        const Builder *: getJSONSchema_builder, \
        Builder *: getJSONSchema_builder, \
        default: getJSONSchema_impl)(x)

#endif



#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define V(name, dtype, member, param, value) \
    static ArgumentValue name(param x) { return (ArgumentValue){.type = dtype, .as.member = (value)}; }

V(v_int, D_INT, i, long long, x)
V(v_float, D_FLOAT, f, double, x)
V(v_string, D_STRING, s, const char *, x)
V(v_bool, D_BOOL, i, int, x ? 1 : 0)

static ArgumentValue v_null(void) { return (ArgumentValue){.type = D_NULL, .as.i = 0}; }

static ArgumentValue v_pass(ArgumentValue v) { return v; }

static ArgumentValue v_chain(const ChainType *c)
{
    return (ArgumentValue){.type = D_CHAIN, .as.chain = c};
}

static int arg_value_equal(const ArgumentValue *a, const ArgumentValue *b)
{
    if (a->type != b->type)
        return 0;
    switch (a->type)
    {
    case D_INT:
        return a->as.i == b->as.i;
    case D_FLOAT:
        return a->as.f == b->as.f;
    case D_STRING:
        return strcmp(a->as.s, b->as.s) == 0;
    case D_BOOL:
        return a->as.i == b->as.i;
    case D_NULL:
        return 1;
    case D_ARRAY:
    {
        if (a->count != b->count)
            return 0;
        const ArgumentValue *aa = a->as.data;
        const ArgumentValue *bb = b->as.data;
        for (size_t i = 0; i < a->count; i++)
            if (!arg_value_equal(&aa[i], &bb[i]))
                return 0;
        return 1;
    }
    case D_MAP:
    {
        if (a->count != b->count)
            return 0;
        const MapEntry *ea = a->as.data;
        const MapEntry *eb = b->as.data;
        for (size_t i = 0; i < a->count; i++)
        {
            if (strcmp(ea[i].key, eb[i].key) != 0)
                return 0;
            if (!arg_value_equal(&ea[i].value, &eb[i].value))
                return 0;
        }
        return 1;
    }
    case D_CHAIN:
        return a->as.chain == b->as.chain;
    }
    return 0;
}

/* ---- validasi runtime (port normalizeArgument TS) ---- */

enum ValidateResult
{
    V_OK = 0,
    V_TYPE_MISMATCH,
    V_ARRAY_MIXED,
    V_UNKNOWN_KEY,
    V_UNION_NO_MATCH,
    V_UNION_AMBIGUOUS,
    V_CHAIN_TYPE
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
    default:
        return "ok";
    }
}

static enum ValidateResult validate_value(const ArgumentValue *v, const StructType *st)
{
    switch (st->kind)
    {
    case S_STRING:
        return v->type == D_STRING ? V_OK : V_TYPE_MISMATCH;
    case S_NUMBER:
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
        return V_OK;
    }
    case S_UNION:
    {
        int matches = 0;
        for (size_t i = 0; i < st->as.unionType.count; i++)
            if (validate_value(v, &st->as.unionType.types[i]) == V_OK)
                matches++;
        if (matches == 0)
            return V_UNION_NO_MATCH;
        if (matches > 1)
            return V_UNION_AMBIGUOUS;
        return V_OK;
    }
    case S_STRUCT_CALL:
        if (v->type != D_CHAIN)
            return V_TYPE_MISMATCH;
        return strcmp(v->as.chain->typeName, st->as.structureCall.name) == 0 ? V_OK : V_CHAIN_TYPE;
    }
    return V_TYPE_MISMATCH;
}

static int validate_schema(const SchemaType *s, const FunctionSignature *functions, size_t functionCount)
{
    int errors = 0;
    for (size_t i = 0; i < s->chain.valueCount; i++)
    {
        const ChainValue *cv = &s->chain.values[i];
        if (cv->kind != V_FUNCTION_CALL)
            continue;
        const FunctionCallType *fc = &cv->as.functionCall;

        const FunctionSignature *sig = NULL;
        for (size_t j = 0; j < functionCount; j++)
            if (strcmp(functions[j].name, fc->name) == 0)
            {
                sig = &functions[j];
                break;
            }
        if (!sig)
        {
            fprintf(stderr, "validate: unknown function '%s'\n", fc->name);
            errors++;
            continue;
        }

        if (fc->isTemplateLiteral)
        {
            /* pola index genap = string, ganjil = ekspresi (union) */
            for (size_t k = 0; k < fc->argumentCount; k++)
            {
                const StructType *st = (k % 2 == 0) ? &sig->argumentStructs[0] : &sig->argumentStructs[1];
                enum ValidateResult r = validate_value(&fc->arguments[k].argument, st);
                if (r != V_OK)
                {
                    fprintf(stderr, "validate: %s arg %zu: %s\n", fc->name, k, result_msg(r));
                    errors++;
                }
            }
        }
        else
        {
            if (fc->argumentCount != sig->argumentCount)
            {
                fprintf(stderr, "validate: %s expects %zu args, got %zu\n", fc->name, sig->argumentCount, fc->argumentCount);
                errors++;
                continue;
            }
            for (size_t k = 0; k < fc->argumentCount; k++)
            {
                enum ValidateResult r = validate_value(&fc->arguments[k].argument, &sig->argumentStructs[k]);
                if (r != V_OK)
                {
                    fprintf(stderr, "validate: %s arg %zu: %s\n", fc->name, k, result_msg(r));
                    errors++;
                }
                if (fc->arguments[k].hasDefault)
                {
                    enum ValidateResult rd = validate_value(&fc->arguments[k].def, &sig->argumentStructs[k]);
                    if (rd != V_OK)
                    {
                        fprintf(stderr, "validate: %s default arg %zu: %s\n", fc->name, k, result_msg(rd));
                        errors++;
                    }
                }
            }
        }
    }
    return errors;
}

static int validate_properties(const SchemaType *s)
{
    int errors = 0;
    for (size_t i = 0; i < s->chain.valueCount; i++)
    {
        const ChainValue *cv = &s->chain.values[i];
        if (cv->kind != V_PROPERTY_CALL)
            continue;
        if (!cv->as.propertyCall.name || !cv->as.propertyCall.name[0])
        {
            fprintf(stderr, "validate: property without name\n");
            errors++;
        }
        if (!cv->as.propertyCall.builder)
        {
            fprintf(stderr, "validate: property '%s' has no builder\n", cv->as.propertyCall.name);
            errors++;
        }
    }
    return errors;
}

/* Deep-copy schema hasil createX() agar Builder aman dikembalikan dari fungsi
   (compound literal blok-scope mati saat blok keluar; pointer internal Builder
   hasil return akan menggantung). Salinan dialokasikan di heap dan tidak
   dibebaskan — cocok untuk definisi schema statis yang hidup selamanya. */
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

static SchemaType validate_and_return(SchemaType s, const FunctionSignature *functions, size_t functionCount)
{
    validate_schema(&s, functions, functionCount);
    validate_properties(&s);
    return deep_copy_schema(&s);
}

/* ---- serialisasi JSON (format sama dengan dump_schema lama) ---- */

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
        else
        {
            cJSON *pc = cJSON_CreateObject();
            cJSON_AddStringToObject(pc, "name", cv->as.propertyCall.name);
            if (cv->as.propertyCall.builder)
                cJSON_AddItemToObject(pc, "builder", jchain(&cv->as.propertyCall.builder->schema.chain));
            cJSON_AddItemToObject(item, "propertyCall", pc);
        }
        cJSON_AddItemToArray(values, item);
    }
    cJSON_AddItemToObject(inner, "values", values);

    cJSON *init = cJSON_CreateObject();
    cJSON_AddStringToObject(init, "name", c->initFunction.name);
    cJSON_AddStringToObject(init, "variableName", c->initFunction.variableName);
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
    default: /* D_ARRAY */
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

static char *json_buf = NULL; /* buffer hasil pemanggilan sebelumnya; ditimpa tiap panggilan */

static SchemaType getSchema_impl(const Builder *b, const char *exportName, const char *importString)
{
    SchemaType s = b->schema;
    if (exportName)
        s.exportName = exportName;
    if (importString)
        s.chain.initFunction.importString = importString;
    return s;
}

static const char *getJSONSchema_impl(const SchemaType *s)
{
    cJSON *root = cJSON_CreateObject();
    cJSON *schema = cJSON_CreateObject();
    cJSON_AddStringToObject(schema, "exportName", s->exportName);
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
// ==== type-converter ====

#ifndef stringify
#define stringify(val) \
    builder_call("stringify", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)
#endif

#ifndef numerify
#define numerify(val) \
    builder_call("numerify", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)
#endif

#ifndef boolify
#define boolify(val) \
    builder_call("boolify", (ArgumentType[]){ mkarg(v_bool((val) ? 1 : 0)) }, 1, 0)
#endif

#ifndef pipe
#define pipe(formatter) \
    builder_call("pipe", (ArgumentType[]){ mkarg(v_chain(&(formatter)->schema.chain)) }, 1, 0)
#endif

#ifndef unify
#define unify(value) \
    builder_call("unify", (ArgumentType[]){ mkarg(v(value)) }, 1, 0)
#endif

#ifndef interpolate
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
#endif

#ifndef label
#define label(value) \
    builder_call("label", (ArgumentType[]){ mkarg_def(v(value), v("default")) }, 1, 0)
#endif


#ifndef label_def
#define label_def() \
    builder_call("label", (ArgumentType[]){ mkarg_def(v("default"), v("default")) }, 1, 0)
#endif

static const StructType type_converter_stringify_arg0 = { .kind = S_STRING };
static const StructType type_converter_numerify_arg0 = { .kind = S_NUMBER };
static const StructType type_converter_boolify_arg0 = { .kind = S_BOOL };
static const StructType type_converter_pipe_arg0 = { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "string-formatter" } };
static const StructType type_converter_unify_arg0 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } } } };
static const StructType type_converter_interpolate_expr = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } } } };
static const StructType type_converter_interpolate_args[] = { { .kind = S_STRING }, type_converter_interpolate_expr };
static const StructType type_converter_label_arg0 = { .kind = S_STRING };

static const FunctionSignature type_converter_functions[] = {
    { "stringify", 0, &type_converter_stringify_arg0, 1 },
    { "numerify", 0, &type_converter_numerify_arg0, 1 },
    { "boolify", 0, &type_converter_boolify_arg0, 1 },
    { "pipe", 0, &type_converter_pipe_arg0, 1 },
    { "unify", 0, &type_converter_unify_arg0, 1 },
    { "interpolate", 1, type_converter_interpolate_args, 2 },
    { "label", 0, &type_converter_label_arg0, 1 },
};

#define createTypeConverter(meta, ...) \
    ((Builder){ \
        .schema = validate_and_return( \
            (SchemaType){ \
                .exportName = "schema", \
                .chain = { \
                    .typeName = "type-converter", \
                    .initFunction = { \
                        .name = "create-type-converter", \
                        .variableName = (meta).variableName, \
                        .importString = "import { createTypeConverter } from \"../../../gntrees-method-chain/typescript/definitions/create-type-converter\"", \
                    }, \
                    .values = (ChainValue[]){ __VA_ARGS__ }, \
                    .valueCount = BUILDER_COUNT(__VA_ARGS__), \
                }, \
            }, \
            type_converter_functions, COUNT_OF(type_converter_functions)) \
    })

// ==== string-formatter ====

#ifndef format
#define format(val) \
    builder_call("format", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)
#endif

static const StructType string_formatter_format_arg0 = { .kind = S_STRING };
static const StructType string_formatter_unify_arg0 = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } } } };
static const StructType string_formatter_interpolate_expr = { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } } } };
static const StructType string_formatter_interpolate_args[] = { { .kind = S_STRING }, string_formatter_interpolate_expr };
static const StructType string_formatter_label_arg0 = { .kind = S_STRING };

static const FunctionSignature string_formatter_functions[] = {
    { "format", 0, &string_formatter_format_arg0, 1 },
    { "unify", 0, &string_formatter_unify_arg0, 1 },
    { "interpolate", 1, string_formatter_interpolate_args, 2 },
    { "label", 0, &string_formatter_label_arg0, 1 },
};

#define createStringFormatter(meta, ...) \
    ((Builder){ \
        .schema = validate_and_return( \
            (SchemaType){ \
                .exportName = "schema", \
                .chain = { \
                    .typeName = "string-formatter", \
                    .initFunction = { \
                        .name = "create-string-formatter", \
                        .variableName = (meta).variableName, \
                        .importString = "import { createStringFormatter } from \"../../../gntrees-method-chain/typescript/definitions/create-string-formatter\"", \
                    }, \
                    .values = (ChainValue[]){ __VA_ARGS__ }, \
                    .valueCount = BUILDER_COUNT(__VA_ARGS__), \
                }, \
            }, \
            string_formatter_functions, COUNT_OF(string_formatter_functions)) \
    })

#endif /* GN_TREES_GNTREES_METHOD_CHAIN_H */
