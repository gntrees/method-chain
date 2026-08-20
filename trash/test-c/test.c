#include <stdio.h>

#define STB_DS_IMPLEMENTATION
#include "stb_ds.h"

enum DynamicType
{
    D_INT,
    D_FLOAT,
    D_STRING,
    D_OBJECT,
    D_MAP,
    D_ARRAY
};

struct DynamicData
{
    enum DynamicType type;
    const char *typeName;
    void (*freeFn)(const void *);
    union
    {
        long long i;
        double f;
        const char *s;
        const void *data;
    } as;
};

struct MapEntry
{
    const char *key;
    struct DynamicData value;
};

static struct DynamicData d_int(long long x)
{
    return (struct DynamicData){.type = D_INT, .typeName = "int", .as.i = x};
}

static struct DynamicData d_float(double x)
{
    return (struct DynamicData){.type = D_FLOAT, .typeName = "double", .as.f = x};
}

static struct DynamicData d_string(const char *s)
{
    return (struct DynamicData){.type = D_STRING, .typeName = "string", .as.s = s};
}

static struct DynamicData d_pass(struct DynamicData v)
{
    return v;
}

static void free_any_arr(const void *p)
{
    void *q = (void *)p;
    arrfree(q);
}

static void free_map(const void *p)
{
    struct MapEntry *entries = (struct MapEntry *)p;
    for (size_t i = 0; i < arrlenu(entries); i++)
        if (entries[i].value.freeFn)
            entries[i].value.freeFn(entries[i].value.as.data);
    void *q = entries;
    arrfree(q);
}

#define d(X) _Generic((X),                 \
    int: d_int,                            \
    long: d_int,                           \
    long long: d_int,                      \
    double: d_float,                       \
    float: d_float,                        \
    char *: d_string,                      \
    const char *: d_string,                \
    struct DynamicData: d_pass)(X)

#define d_arr(first, ...) ({ \
    __typeof__(first) _items[] = { first, __VA_ARGS__ }; \
    size_t _n = (sizeof(_items) / sizeof(_items[0])); \
    __typeof__(first) *_p = NULL; \
    for (size_t _i = 0; _i < _n; _i++) arrpush(_p, _items[_i]); \
    (struct DynamicData){ .type = D_ARRAY, .freeFn = free_any_arr, .as.data = _p }; \
})

#define d_entry(k, v) ((struct MapEntry){ (k), d(v) })

#define d_map(first, ...) ({ \
    struct MapEntry _entries[] = { first, __VA_ARGS__ }; \
    size_t _n = (sizeof(_entries) / sizeof(_entries[0])); \
    struct MapEntry *_p = NULL; \
    for (size_t _i = 0; _i < _n; _i++) arrpush(_p, _entries[_i]); \
    (struct DynamicData){ .type = D_MAP, .freeFn = free_map, .as.data = _p }; \
})

typedef struct InitFunction
{
    const char *name;
    const char *variableName;
    const char *importString;
} InitFunction;

typedef struct FunctionCall
{
    const char *name;
    struct DynamicData *args;
    int isTemplateLiteral;
} FunctionCall;

typedef struct Chain
{
    FunctionCall *values;
    InitFunction init;
} Chain;

typedef struct Schema
{
    const char *exportName;
    Chain chain;
} Schema;

static void schema_add(Schema *s, const char *name, struct DynamicData *args, size_t argCount, int isTemplateLiteral)
{
    FunctionCall call = {.name = name, .isTemplateLiteral = isTemplateLiteral, .args = NULL};
    for (size_t i = 0; i < argCount; i++)
    {
        arrpush(call.args, args[i]);
        if (args[i].freeFn)
            args[i].as.data = NULL;
    }
    arrpush(s->chain.values, call);
}

static void schema_free(Schema *s)
{
    for (size_t i = 0; i < arrlenu(s->chain.values); i++)
    {
        FunctionCall *call = &s->chain.values[i];
        for (size_t j = 0; j < arrlenu(call->args); j++)
        {
            struct DynamicData *a = &call->args[j];
            if (a->freeFn)
                a->freeFn(a->as.data);
        }
        arrfree(call->args);
    }
    arrfree(s->chain.values);
    s->chain.values = NULL;
}

int main()
{
    Schema s = {
        .exportName = "schema",
        .chain = {
            .init = {.name = "calc", .variableName = "c1", .importString = NULL},
            .values = NULL,
        },
    };

    schema_add(&s, "add", (struct DynamicData[]){ d(3) }, 1, 0);

    schema_add(&s, "setScores", (struct DynamicData[]){
        d_map(d_entry("a", 90), d_entry("b", 80)) }, 1, 0);

    schema_add(&s, "setLabels", (struct DynamicData[]){
        d_map(d_entry("custom-key", "custom-value")) }, 1, 0);

    schema_add(&s, "setNested", (struct DynamicData[]){
        d_map(d_entry("nums", d_arr(1, 2, 3)),
              d_entry("label", "x")) }, 1, 0);

    schema_add(&s, "addNums", (struct DynamicData[]){ d_arr(1, 2, 3) }, 1, 0);

    schema_add(&s, "addFloats", (struct DynamicData[]){ d_arr(1.5, 2.5, 3.5) }, 1, 0);

    schema_free(&s);
    printf("clean: no leak\n");
    return 0;
}
