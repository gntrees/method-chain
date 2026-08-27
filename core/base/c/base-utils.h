#ifndef GN_TREES_BASE_UTILS_H
#define GN_TREES_BASE_UTILS_H

#include "base-types.h"

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

#endif
