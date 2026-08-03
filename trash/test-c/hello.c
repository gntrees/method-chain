#include <stdio.h>
#include <string.h>
#include "math.h"

void sapaan() {
    printf("Halo, selamat datang!\n");
}

int tambah(int a, int b) {
    return a + b;
}

// 1. Mendefinisikan struct
struct Mahasiswa {
    char nama[50];
    int nim;
    float ipk;
    void (*pemberiSalam)();             // Pointer ke fungsi tanpa argumen & return
    int (*hitung)(int, int);            // Pointer ke fungsi dengan argumen & return int
};

int main() {
    // 2. Mendeklarasikan variabel struct
    struct Mahasiswa mhs1;

    // 3. Hubungkan variabel di dalam struct dengan fungsi asli
    mhs1.pemberiSalam = sapaan;
    mhs1.hitung = tambah;

    // 3. Mengakses dan mengisi anggota struct (menggunakan operator titik '.')
    strcpy(mhs1.nama, "Budi Santoso");
    mhs1.nim = 123456;
    mhs1.ipk = 3.85;

    // 4. Menampilkan data struct
    printf("Nama: %s\n", mhs1.nama);
    printf("NIM: %d\n", mhs1.nim);
    printf("IPK: %.2f\n", mhs1.ipk);

    int hasil = math(1).add(2);
    printf("Hasil penjumlahan: %d\n", hasil);

    return 0;
}
