#include "math.h"

int addSomething(struct Math* self,int b){
    return self->value + b;
};

// Definisi fungsi
struct Math math(int value) {
    struct Math math;
    math.add = addSomething;
    math.value = value;
    return math;
}


