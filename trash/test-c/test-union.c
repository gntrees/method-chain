#include <stdio.h>

#define TYPE_NAME(X) _Generic((X), \
    int: "int",                    \
    float: "float",                \
    double: "double",              \
    char *: "string",              \
    default: "unknown type")

#define PRINTF_FORMAT(X) _Generic((X), \
    int: "%d\n",                       \
    float: "%f\n",                     \
    double: "%f\n",                    \
    char *: "%s\n",                    \
    char: "%c\n")

#define print(X) printf(PRINTF_FORMAT(X), X)

enum Type
{
    T_INT,
    T_FLOAT,
    T_STRING
};

struct Data
{
    enum Type type;
    union
    {
        int i;
        float f;
        char *c;
    };
};

void dynamic_function(struct Data x)
{
    switch (x.type)
    {
    case T_INT:
        printf("Dynamic function called with int: %d\n", x.i);
        break;
    case T_FLOAT:
        printf("Dynamic function called with float: %f\n", x.f);
        break;
    case T_STRING:
        printf("Dynamic function called with string: %s\n", x.c);
        break;
    }
}

void dynamic_call_int(int x)
{
    dynamic_function((struct Data){.type = T_INT, .i = x});
}

void dynamic_call_float(float x)
{
    dynamic_function((struct Data){.type = T_FLOAT, .f = x});
}

void dynamic_call_string(char *x)
{
    dynamic_function((struct Data){.type = T_STRING, .c = x});
}

#define dynamic_call(X) _Generic((X), \
    int: dynamic_call_int,        \
    float: dynamic_call_float,    \
    char *: dynamic_call_string   \
)(X)


int main()
{
    int a = 10;
    float b = 5.5f;
    char *c = "Hello";

    print(30);
    dynamic_call(32);
    dynamic_call("qq");
    dynamic_call(3.14f);

    return 0;
}
