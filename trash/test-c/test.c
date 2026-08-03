#include <stdio.h>

typedef struct Calc Calc;

/** @brief Tipe data yang dapat disimpan dalam DynamicData. */
enum Type
{
    T_INT,
    T_FLOAT,
    T_STRING
};

/**
 * @brief Nilai dinamis dengan tipe bawaan.
 * @note Hanya T_INT dan T_FLOAT yang boleh dioperasikan.
 *       T_STRING tersimpan tetapi ditolak oleh add()/calc().
 */
struct DynamicData
{
    enum Type type;
    union
    {
        int i;
        float f;
        char *c;
    };
};

/** @brief Bungkus int menjadi DynamicData T_INT. @param x Nilai int. @return DynamicData. */
struct DynamicData dynamic_call_int(int x)
{
    return (struct DynamicData){.type = T_INT, .i = x};
}

/** @brief Bungkus float/double menjadi DynamicData T_FLOAT. @param x Nilai numerik. @return DynamicData. */
struct DynamicData dynamic_call_float(float x)
{
    return (struct DynamicData){.type = T_FLOAT, .f = x};
}

/** @brief Bungkus string menjadi DynamicData T_STRING. @param x String. @return DynamicData. */
struct DynamicData dynamic_call_string(char *x)
{
    return (struct DynamicData){.type = T_STRING, .c = x};
}

/**
 * @brief Konversi literal C ke DynamicData berdasarkan tipe saat kompilasi.
 * @param[in] X Nilai yang dibungkus (int, double, float, char*).
 * @return struct DynamicData
 */
#define d(X) _Generic((X), \
    int: dynamic_call_int,        \
    double: dynamic_call_float,   \
    float: dynamic_call_float,    \
    char *: dynamic_call_string   \
)(X)

/**
 * @brief Kalkulator dengan method-chaining lewat member function pointer.
 * @note value bertipe int; hanya T_INT yang dijumlahkan.
 */
struct Calc {
    /**
     * @brief Tambahkan nilai ke kalkulator (mendukung chaining).
     * @param self Pointer ke kalkulator.
     * @param num Nilai DynamicData yang ditambahkan (hanya int/float yang boleh masuk).
     *            T_INT diterima; T_FLOAT/T_STRING ditolak (error dicetak).
     * @return Salinan Calc by-value untuk chaining.
     */
    Calc (*add)(struct Calc*, struct DynamicData);
    int value;
};

/**
 * @brief Tambahkan nilai ke kalkulator (mendukung chaining).
 * @param self Pointer ke kalkulator.
 * @param num Nilai DynamicData yang ditambahkan (hanya int/float yang boleh masuk).
 *            T_INT diterima; T_FLOAT/T_STRING ditolak (error dicetak).
 * @return Salinan Calc by-value untuk chaining.
 */
Calc add(struct Calc* self, struct DynamicData num) {
    if (num.type != T_INT) {
        printf("Error: Only integers can be added.\n");
        return *self;
    }
    self->value += num.i;
    return *self;
}

/**
 * @brief Buat kalkulator dengan nilai awal.
 * @param value Nilai awal; hanya T_INT diterima.
 * @return Calc siap dipakai.
 */
Calc calc(struct DynamicData value) {
    if (value.type != T_INT) {
        printf("Error: Initial value must be an integer.\n");
        return (Calc){.value = 0, .add = add};
    }
    Calc c;
    c.value = value.i;
    c.add = add;
    return c;
}

int main() {
    Calc a = calc(d(3));
    a.add(&a, d(3)).add(&a, d("2")).add(&a, d(5));

    printf("a.value: %d\n", a.value);

    return 0;
}
