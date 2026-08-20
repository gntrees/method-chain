#include "dump.h"
#include "cJSON.h"

#include <stdio.h>

static cJSON *jval(const ArgumentValue *d);
static cJSON *jarg(const ArgumentType *a);

static void print_indent(int depth)
{
    for (int i = 0; i < depth; i++)
        fputs("  ", stdout);
}

static void print_json_string(const char *s)
{
    cJSON *tmp = cJSON_CreateString(s);
    char *out = cJSON_PrintUnformatted(tmp);
    fputs(out, stdout);
    cJSON_free(out);
    cJSON_Delete(tmp);
}

static void print_value(const cJSON *node, int depth)
{
    if (cJSON_IsObject(node))
    {
        if (!node->child)
        {
            fputs("{}", stdout);
            return;
        }
        fputs("{\n", stdout);
        for (const cJSON *c = node->child; c; c = c->next)
        {
            print_indent(depth + 1);
            print_json_string(c->string);
            fputs(": ", stdout);
            print_value(c, depth + 1);
            fputs(c->next ? ",\n" : "\n", stdout);
        }
        print_indent(depth);
        fputs("}", stdout);
    }
    else if (cJSON_IsArray(node))
    {
        if (!node->child)
        {
            fputs("[]", stdout);
            return;
        }
        fputs("[\n", stdout);
        for (const cJSON *c = node->child; c; c = c->next)
        {
            print_indent(depth + 1);
            print_value(c, depth + 1);
            fputs(c->next ? ",\n" : "\n", stdout);
        }
        print_indent(depth);
        fputs("]", stdout);
    }
    else
    {
        char *out = cJSON_PrintUnformatted(node);
        fputs(out, stdout);
        cJSON_free(out);
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
        for (size_t i = 0; i < d->count; i++)
        {
            ArgumentValue e;
            if (d->elemToData)
                e = d->elemToData((const char *)d->as.data + i * d->elemSize);
            else
                e = ((const ArgumentValue *)d->as.data)[i];
            cJSON_AddItemToArray(arr, jval(&e));
        }
        cJSON_AddItemToObject(value, "value", arr);
        cJSON_AddItemToObject(tag, "array", value);
        return tag;
    }
    }
}

void dump_schema(const SchemaType *s)
{
    cJSON *root = cJSON_CreateObject();
    cJSON *schema = cJSON_CreateObject();
    cJSON_AddStringToObject(schema, "exportName", s->exportName);
    cJSON_AddItemToObject(schema, "chain", jchain(&s->chain));
    cJSON_AddItemToObject(root, "schema", schema);

    print_value(root, 0);
    fputc('\n', stdout);
    cJSON_Delete(root);
}
