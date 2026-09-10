#ifndef GN_TREES_BASE_UTILS_H
#define GN_TREES_BASE_UTILS_H

#include "base-types.h"
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
static char lt_kept[LT_MAX_ALLOCS];

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

static void lt_mark_ptr(const void *p)
{
    if (!p)
        return;
    for (size_t i = 0; i < lt_alloc_count; i++)
        if (lt_allocs[i] == p)
        {
            lt_kept[i] = 1;
            return;
        }
}

static void lt_mark_value(ArgumentValue v)
{
    switch (v.type)
    {
    case D_STRING:
        lt_mark_ptr(v.as.s);
        break;
    case D_ARRAY:
    {
        lt_mark_ptr(v.as.data);
        const ArgumentValue *items = v.as.data;
        for (size_t i = 0; i < v.count; i++)
            lt_mark_value(items[i]);
        break;
    }
    case D_MAP:
    {
        lt_mark_ptr(v.as.data);
        const MapEntry *entries = v.as.data;
        for (size_t i = 0; i < v.count; i++)
        {
            lt_mark_ptr(entries[i].key);
            lt_mark_value(entries[i].value);
        }
        break;
    }
    default:
        break;
    }
}

/* Free semua alokasi arena kecuali yang reachable dari `v`, lalu keluarkan
 * alokasi milik `v` dari tracking (ownership pindah ke pemanggil). */
static ArgumentValue lt_detach(ArgumentValue v)
{
    for (size_t i = 0; i < lt_alloc_count; i++)
        lt_kept[i] = 0;
    lt_mark_value(v);
    for (size_t i = 0; i < lt_alloc_count; i++)
        if (!lt_kept[i])
            free(lt_allocs[i]);
    lt_alloc_count = 0;
    return v;
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
