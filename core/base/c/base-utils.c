#define _POSIX_C_SOURCE 200809L

#include "base-utils.h"
#include "base-types.h"
#include "cJSON.h"

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
