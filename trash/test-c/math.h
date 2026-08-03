#ifndef MATH_H
#define MATH_H

struct Math {
    int (*add)(int);
    int value;
};

// Deklarasi fungsi (Prototip) -> Ini adalah proses "Export"
struct Math math(int);

#endif
