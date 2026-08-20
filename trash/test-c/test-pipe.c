#include <stdarg.h>
#include <stdio.h>

struct CalcOperation
{
    char *operation;
    int value;
};

struct Calc
{
    int value;
};

struct CalcOperation add(int x)
{
    struct CalcOperation c;
    c.operation = "add";
    c.value = x;
    return c;
}

struct Calc calc(struct CalcOperation first, ...)
{
    struct Calc result;
    result.value = 0;

    if (first.operation != 0)
    {
        if (first.operation[0] == 'a' && first.operation[1] == 'd' && first.operation[2] == 'd' && first.operation[3] == '\0')
        {
            result.value += first.value;
        }
    }

    va_list args;
    va_start(args, first);

    while (1)
    {
        struct CalcOperation op = va_arg(args, struct CalcOperation);
        if (op.operation == 0)
        {
            break;
        }

        if (op.operation[0] == 'a' && op.operation[1] == 'd' && op.operation[2] == 'd' && op.operation[3] == '\0')
        {
            result.value += op.value;
        }
    }

    va_end(args);
    return result;
}

struct Calc schema()
{
    return calc(
        add(1),
        add(2),
        add(3),
        add(30));
}

int main()
{
    struct Calc c = schema();
    printf("Result: %d\n", c.value);
    return 0;
}