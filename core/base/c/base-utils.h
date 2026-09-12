#ifndef GN_TREES_BASE_UTILS_H
#define GN_TREES_BASE_UTILS_H

#include "base-types.h"
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

/* ---- growable buffer / list (amortized O(n), region-backed) ---- */

typedef struct LtBuf
{
    char *data;
    size_t len;
    size_t cap;
} LtBuf;

typedef struct LtList
{
    ArgumentValue *data;
    size_t len;
    size_t cap;
} LtList;

static const char *lt_as_string(const ArgumentValue *v);
static long long lt_as_int(const ArgumentValue *v);

static ArgumentValue lt_buf_new(void)
{
    LtBuf *b = lt_alloc(sizeof(LtBuf));
    if (!b)
        return v_null();
    b->cap = 64;
    b->len = 0;
    b->data = lt_alloc(b->cap);
    if (!b->data)
        return v_null();
    b->data[0] = '\0';
    return (ArgumentValue){ .type = D_BUFFER, .count = 0, .as.data = b };
}

static ArgumentValue lt_buf_append(ArgumentValue a, ArgumentValue text)
{
    LtBuf *b = a.type == D_BUFFER ? (LtBuf *)a.as.data : NULL;
    if (!b)
        return a;
    const char *s = lt_as_string(&text);
    size_t add = strlen(s);
    size_t need = b->len + add + 1;
    if (need > b->cap)
    {
        size_t cap = b->cap ? b->cap : 64;
        while (cap < need)
            cap *= 2;
        char *grown = lt_alloc(cap);
        if (!grown)
            return a;
        memcpy(grown, b->data, b->len);
        b->data = grown;
        b->cap = cap;
    }
    memcpy(b->data + b->len, s, add);
    b->len += add;
    b->data[b->len] = '\0';
    ArgumentValue out = a;
    out.count = b->len;
    return out;
}

static ArgumentValue lt_buf_len(ArgumentValue a)
{
    LtBuf *b = a.type == D_BUFFER ? (LtBuf *)a.as.data : NULL;
    return v_int(b ? (long long)b->len : 0);
}

static ArgumentValue lt_buf_str(ArgumentValue a)
{
    LtBuf *b = a.type == D_BUFFER ? (LtBuf *)a.as.data : NULL;
    if (!b)
        return v_string("");
    char *out = lt_alloc(b->len + 1);
    if (!out)
        return v_null();
    memcpy(out, b->data, b->len + 1);
    return v_string(out);
}

static ArgumentValue lt_list_new(void)
{
    LtList *l = lt_alloc(sizeof(LtList));
    if (!l)
        return v_null();
    l->cap = 8;
    l->len = 0;
    l->data = lt_alloc(l->cap * sizeof(ArgumentValue));
    if (!l->data)
        return v_null();
    return (ArgumentValue){ .type = D_LIST, .count = 0, .as.data = l };
}

static ArgumentValue lt_list_push(ArgumentValue a, ArgumentValue item)
{
    LtList *l = a.type == D_LIST ? (LtList *)a.as.data : NULL;
    if (!l)
        return a;
    if (l->len + 1 > l->cap)
    {
        size_t cap = l->cap ? l->cap : 8;
        while (cap < l->len + 1)
            cap *= 2;
        ArgumentValue *grown = lt_alloc(cap * sizeof(ArgumentValue));
        if (!grown)
            return a;
        memcpy(grown, l->data, l->len * sizeof(ArgumentValue));
        l->data = grown;
        l->cap = cap;
    }
    l->data[l->len++] = item;
    ArgumentValue out = a;
    out.count = l->len;
    return out;
}

static ArgumentValue lt_list_len(ArgumentValue a)
{
    LtList *l = a.type == D_LIST ? (LtList *)a.as.data : NULL;
    return v_int(l ? (long long)l->len : 0);
}

static ArgumentValue lt_list_get(ArgumentValue a, ArgumentValue index)
{
    LtList *l = a.type == D_LIST ? (LtList *)a.as.data : NULL;
    long long i = lt_as_int(&index);
    if (!l || i < 0 || (size_t)i >= l->len)
        return v_null();
    return l->data[i];
}

static ArgumentValue lt_list_value(ArgumentValue a)
{
    LtList *l = a.type == D_LIST ? (LtList *)a.as.data : NULL;
    if (!l)
        return a;
    ArgumentValue *out = NULL;
    if (l->len)
    {
        out = lt_alloc(l->len * sizeof(ArgumentValue));
        if (!out)
            return v_null();
        memcpy(out, l->data, l->len * sizeof(ArgumentValue));
    }
    return lt_adopt_arr(out, l->len);
}

static const char *lt_as_string(const ArgumentValue *v)
{
    if (v->type == D_STRING)
        return v->as.s ? v->as.s : "";
    if (v->type == D_BUFFER && v->as.data)
        return ((const LtBuf *)v->as.data)->data;
    return "";
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
    case D_BUFFER:
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
    if (a.type == D_BUFFER)
        return lt_buf_len(a);
    if (a.type == D_LIST)
        return lt_list_len(a);
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
