#ifndef GN_TREES_STRING_FORMATTER_H
#define GN_TREES_STRING_FORMATTER_H

/* ---- Konvensi struktur header (diikuti generator nanti, gap #3) ----
   Lihat type-converter.h untuk daftar konvensi lengkap. */

#include "base-types.h"
#include "base-utils.h"

#define format(val) \
    builder_call("format", (ArgumentType[]){ mkarg(v(val)) }, 1, 0)

/* Fungsi bersama type-converter & string-formatter (salinan identik di
   type-converter.h); guard #ifndef agar aman jika kedua header di-import
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

static const StructType sf_string = { .kind = S_STRING };
static const StructType sf_num_or_str = {
    .kind = S_UNION,
    .as.unionType = {
        .count = 2,
        .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } },
    },
};

/* interpolate memakai pola argumen [string, union(string|number)] */
static const StructType sf_interpolate_args[] = {
    { .kind = S_STRING },
    { .kind = S_UNION, .as.unionType = { .count = 2, .types = (StructType[]){ { .kind = S_STRING }, { .kind = S_NUMBER } } } },
};

static const FunctionSignature string_formatter_functions[] = {
    { "format", 0, &sf_string, 1 },
    { "unify", 0, &sf_num_or_str, 1 },
    { "interpolate", 1, sf_interpolate_args, 2 },
    { "label", 0, &sf_string, 1 },
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
                        .importString = "import { createStringFormatter } from \"../generated-examples/definitions/typescript/create-string-formatter\"", \
                    }, \
                    .values = (ChainValue[]){ __VA_ARGS__ }, \
                    .valueCount = BUILDER_COUNT(__VA_ARGS__), \
                }, \
            }, \
            string_formatter_functions, COUNT_OF(string_formatter_functions)) \
    })

/* ---- property (gap #6): variabel yang isinya Builder ----
   toString_builder diisi saat runtime (lihat main.c) sebelum toString dipakai. */
extern Builder toString_builder;
extern const ChainValue toString;

#endif
