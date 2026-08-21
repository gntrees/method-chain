#ifndef GN_TREES_TYPE_CONVERTER_H
#define GN_TREES_TYPE_CONVERTER_H

/* ---- Konvensi struktur header (diikuti generator nanti, gap #3) ----
   - Nama file: <kebab>.h (type-converter.h)
   - Include guard: GN_TREES_<SNAKE_UPPER>_H
   - typeName = kebab ("type-converter") — dipakai validasi S_STRUCT_CALL
   - Makro init: create + Pascal (createTypeConverter)
   - Registry: <snake>_functions
   - Property: variabel ChainValue yang isinya referensi Builder
   - exportName default: "schema"
   - Self-contained: header ini me-re-export base-types.h + base-utils.h,
     jadi pemakai cukup #include header struktur saja (gap #2). */

#include "base-types.h"
#include "base-utils.h"

#define stringify(val) \
    builder_call("stringify", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)
#define numerify(val) \
    builder_call("numerify", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)
#define boolify(val) \
    builder_call("boolify", (ArgumentType[]){ mkarg(v_bool((val) ? 1 : 0)) }, 1, 0)
#define pipe(f) \
    builder_call("pipe", (ArgumentType[]){ mkarg(v_chain(&(f)->schema.chain)) }, 1, 0)
#define setNested(data) \
    builder_call("setNested", (ArgumentType[]){ mkarg(data) }, 1, 0)

/* demo-only stand-in: belum ada di model TS */
#define addMatrix(data) \
    builder_call("addMatrix", (ArgumentType[]){ mkarg(data) }, 1, 0)
#define setConfig(data) \
    builder_call("setConfig", (ArgumentType[]){ mkarg(data) }, 1, 0)

/* Fungsi bersama type-converter & string-formatter (salinan identik di
   string-formatter.h); guard #ifndef agar aman jika kedua header di-import
   bersamaan. */
#ifndef unify
#define unify(val) \
    builder_call("unify", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)
#endif

#ifndef label
#define label(val) \
    builder_call("label", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)
#define label_def() \
    builder_call("label", (ArgumentType[]){ mkarg_def(v("default"), v("default")) }, 1, 0)
#endif

/* Statement-expression GNU C (gcc) + alloca: menyaring string kosong agar
   sama persis dengan createSchema TS yang membuang string kosong pada
   template literal. Memory alloca hidup di frame pemanggil, sama seperti
   compound literal lain di header ini. */
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

/* ---- registry signature fungsi (stand-in hasil generate core.ts) ---- */

static const StructType tc_string = { .kind = S_STRING };
static const StructType tc_number = { .kind = S_NUMBER };
static const StructType tc_bool = { .kind = S_BOOL };
static const StructType tc_num_or_str = {
    .kind = S_UNION,
    .as.unionType = {
        .count = 2,
        .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } },
    },
};
static const StructType tc_any_arr = {
    .kind = S_ARRAY,
    .as.array = { .elem = &tc_num_or_str },
};
static const StructType tc_num_arr = {
    .kind = S_ARRAY,
    .as.array = { .elem = &tc_number },
};
static const StructType tc_num_matrix = {
    .kind = S_ARRAY,
    .as.array = { .elem = &tc_num_arr },
};
static const StructType tc_config = {
    .kind = S_OBJECT,
    .as.object = {
        .count = 2,
        .keys = (StructKey[]){
            { "a", { .kind = S_STRING } },
            { "b", { .kind = S_NUMBER } },
        },
    },
};
static const StructType tc_setNested = {
    .kind = S_MAP,
    .as.map = { .value = &tc_any_arr },
};
static const StructType tc_pipe_arg = {
    .kind = S_STRUCT_CALL,
    .as.structureCall = { .name = "string-formatter" },
};

/* interpolate memakai pola argumen [string, union(string|number)] */
static const StructType tc_interpolate_args[] = {
    { .kind = S_STRING },
    { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } } } },
};

static const FunctionSignature type_converter_functions[] = {
    { "stringify", 0, &tc_string, 1 },
    { "numerify", 0, &tc_number, 1 },
    { "boolify", 0, &tc_bool, 1 },
    { "pipe", 0, &tc_pipe_arg, 1 },
    { "unify", 0, &tc_num_or_str, 1 },
    { "interpolate", 1, tc_interpolate_args, 2 },
    { "label", 0, &tc_string, 1 },
    /* demo-only stand-in */
    { "setNested", 0, &tc_setNested, 1 },
    { "addMatrix", 0, &tc_num_matrix, 1 },
    { "setConfig", 0, &tc_config, 1 },
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
                        .importString = "import { createTypeConverter } from \"../generated-examples/definitions/typescript/create-type-converter\"", \
                    }, \
                    .values = (ChainValue[]){ __VA_ARGS__ }, \
                    .valueCount = BUILDER_COUNT(__VA_ARGS__), \
                }, \
            }, \
            type_converter_functions, COUNT_OF(type_converter_functions)) \
    })

/* ---- property (gap #6): variabel yang isinya Builder ----
   toJson_builder diisi saat runtime (lihat main.c) sebelum toJson dipakai. */
extern Builder toJson_builder;
extern const ChainValue toJson;

/* ---- custom variable & function (gap #1): implementasi di type-converter-impl.c ---- */
extern ArgumentValue custom_label;
ArgumentValue custom_transform(const ArgumentValue *arg);

#endif
