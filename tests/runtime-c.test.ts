import { expect, test } from "bun:test";
import { convertSchemaToC } from "../core/convert/convert-c";
import { compileAndRun } from "./compile-helper";

test("finite number: NaN argument aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
#include <math.h>
int main(void) {
    Builder b = createTypeConverter(variableName("c"), numerify(NAN));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("finite");
}, 60000);

test("object missing required key aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    StructType key_a = { .kind = S_STRING };
    StructType key_b = { .kind = S_NUMBER };
    StructKey keys[] = { { "a", key_a }, { "b", key_b } };
    StructType obj = { .kind = S_OBJECT, .as.object = { .count = 2, .keys = keys } };
    MapEntry e0 = { "a", { .type = D_STRING, .as.s = "x" } };
    MapEntry entries[] = { e0 };
    ArgumentValue arg = { .type = D_MAP, .count = 1, .as.data = entries };
    StructType sig_args[] = { obj };
    FunctionSignature sigs[] = { { "f", 0, sig_args, 1, "test-struct" } };
    StructureRegistry regs[] = { { "test-struct", sigs, 1, NULL, 0 } };
    ArgumentType at = { .argument = arg, .hasDefault = 0, .def = {0}, .provided = 1 };
    ChainValue cv = { .kind = V_FUNCTION_CALL, .as.functionCall = { .name = "f", .arguments = &at, .argumentCount = 1, .isTemplateLiteral = 0 } };
    ChainType chain = { .typeName = "test-struct", .values = &cv, .valueCount = 1, .initFunction = { .name = "init", .variableName = "v", .importString = 0 } };
    SchemaType s = { .exportName = 0, .chain = chain };
    validate_schema(&s, regs, 1);
    printf("NO ERROR\\n");
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("missing required object key");
}, 60000);

test("valid object passes validation", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    StructType key_a = { .kind = S_STRING };
    StructType key_b = { .kind = S_NUMBER };
    StructKey keys[] = { { "a", key_a }, { "b", key_b } };
    StructType obj = { .kind = S_OBJECT, .as.object = { .count = 2, .keys = keys } };
    MapEntry e0 = { "a", { .type = D_STRING, .as.s = "x" } };
    MapEntry e1 = { "b", { .type = D_INT, .as.i = 1 } };
    MapEntry entries[] = { e0, e1 };
    ArgumentValue arg = { .type = D_MAP, .count = 2, .as.data = entries };
    StructType sig_args[] = { obj };
    FunctionSignature sigs[] = { { "f", 0, sig_args, 1, "test-struct" } };
    StructureRegistry regs[] = { { "test-struct", sigs, 1, NULL, 0 } };
    ArgumentType at = { .argument = arg, .hasDefault = 0, .def = {0}, .provided = 1 };
    ChainValue cv = { .kind = V_FUNCTION_CALL, .as.functionCall = { .name = "f", .arguments = &at, .argumentCount = 1, .isTemplateLiteral = 0 } };
    ChainType chain = { .typeName = "test-struct", .values = &cv, .valueCount = 1, .initFunction = { .name = "init", .variableName = "v", .importString = 0 } };
    SchemaType s = { .exportName = 0, .chain = chain };
    validate_schema(&s, regs, 1);
    printf("OK\\n");
    return 0;
}
`;
    const { status, stderr } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
}, 60000);

test("valid multi-call chain passes", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder b = createTypeConverter(variableName("c"), stringify("hello"), label());
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
}, 60000);

test("first call not a member of init structure aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder b = createTypeConverter(variableName("c"), format("x"));
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("not a member");
}, 60000);

test("second call not a member of returned structure aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder b = createTypeConverter(variableName("c"), stringify("x"), format("y"));
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("not a member");
}, 60000);

test("property call followed by member function passes", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder b = createTypeConverter(variableName("c"), testvar, stringify("x"));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
}, 60000);

test("property call followed by wrong-structure function aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder b = createTypeConverter(variableName("c"), testvar, format("x"));
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("not a member");
}, 60000);

test("cross-structure init chain passes", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder b = createStringFormatter(variableName("s"), format("x"));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
}, 60000);

test("valid sub-chain argument passes", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder b = createTypeConverter(variableName("c"), pipe(chain(format("hello"))));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
}, 60000);

test("invalid sub-chain argument aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder b = createTypeConverter(variableName("c"), pipe(chain(stringify("x"))));
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("not a member");
}, 60000);

test("empty chain is valid", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder b = createTypeConverter(variableName("c"));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
}, 60000);

test("last call returning unknown structure aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    StructType arg0 = { .kind = S_STRING };
    StructType sig_args[] = { arg0 };
    FunctionSignature sigs[] = { { "f", 0, sig_args, 1, "no-such-structure" } };
    StructureRegistry regs[] = { { "test-struct", sigs, 1, NULL, 0 } };
    ArgumentType at = { .argument = v_string("x"), .hasDefault = 0, .def = {0}, .provided = 1 };
    ChainValue cv = { .kind = V_FUNCTION_CALL, .as.functionCall = { .name = "f", .arguments = &at, .argumentCount = 1, .isTemplateLiteral = 0 } };
    ChainType chain = { .typeName = "test-struct", .values = &cv, .valueCount = 1, .initFunction = { .name = "init", .variableName = "v", .importString = 0 } };
    SchemaType s = { .exportName = 0, .chain = chain };
    validate_schema(&s, regs, 1);
    printf("NO ERROR\\n");
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("returns unknown structure");
}, 60000);

test("NULL chain argument aborts instead of crashing", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    StructType sc = { .kind = S_STRUCT_CALL, .as.structureCall = { .name = "string-formatter" } };
    StructType sig_args[] = { sc };
    FunctionSignature sigs[] = { { "f", 0, sig_args, 1, "test-struct" } };
    StructureRegistry regs[] = { { "test-struct", sigs, 1, NULL, 0 } };
    ArgumentValue bad = { .type = D_CHAIN, .as.chain = NULL };
    ArgumentType at = { .argument = bad, .hasDefault = 0, .def = {0}, .provided = 1 };
    ChainValue cv = { .kind = V_FUNCTION_CALL, .as.functionCall = { .name = "f", .arguments = &at, .argumentCount = 1, .isTemplateLiteral = 0 } };
    ChainType chain = { .typeName = "test-struct", .values = &cv, .valueCount = 1, .initFunction = { .name = "init", .variableName = "v", .importString = 0 } };
    SchemaType s = { .exportName = 0, .chain = chain };
    validate_schema(&s, regs, 1);
    printf("NO ERROR\\n");
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal).not.toBe("SIGSEGV");
    expect(stderr).toContain("type mismatch");
}, 60000);

test("template literal flag mismatch aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    ArgumentType at = { .argument = v_string("x"), .hasDefault = 0, .def = {0}, .provided = 1 };
    ChainValue cv = { .kind = V_FUNCTION_CALL, .as.functionCall = { .name = "interpolate", .arguments = &at, .argumentCount = 1, .isTemplateLiteral = 0 } };
    ChainType chain = { .typeName = "type-converter", .values = &cv, .valueCount = 1, .initFunction = { .name = "init", .variableName = "v", .importString = 0 } };
    SchemaType s = { .exportName = 0, .chain = chain };
    validate_schema(&s, gntrees_structures, COUNT_OF(gntrees_structures));
    printf("NO ERROR\\n");
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("flag mismatch");
}, 60000);

test("union error message includes branch reasons", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder b = createTypeConverter(variableName("c"), unify(true));
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("expected string");
    expect(stderr).toContain("expected number");
}, 60000);

test("duplicate object key aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    StructType key_a = { .kind = S_STRING };
    StructKey keys[] = { { "a", key_a } };
    StructType obj = { .kind = S_OBJECT, .as.object = { .count = 1, .keys = keys } };
    MapEntry e0 = { "a", { .type = D_STRING, .as.s = "x" } };
    MapEntry e1 = { "a", { .type = D_STRING, .as.s = "y" } };
    MapEntry entries[] = { e0, e1 };
    ArgumentValue arg = { .type = D_MAP, .count = 2, .as.data = entries };
    StructType sig_args[] = { obj };
    FunctionSignature sigs[] = { { "f", 0, sig_args, 1, "test-struct" } };
    StructureRegistry regs[] = { { "test-struct", sigs, 1, NULL, 0 } };
    ArgumentType at = { .argument = arg, .hasDefault = 0, .def = {0}, .provided = 1 };
    ChainValue cv = { .kind = V_FUNCTION_CALL, .as.functionCall = { .name = "f", .arguments = &at, .argumentCount = 1, .isTemplateLiteral = 0 } };
    ChainType chain = { .typeName = "test-struct", .values = &cv, .valueCount = 1, .initFunction = { .name = "init", .variableName = "v", .importString = 0 } };
    SchemaType s = { .exportName = 0, .chain = chain };
    validate_schema(&s, regs, 1);
    printf("NO ERROR\\n");
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("duplicate object key");
}, 60000);

test("property builder type name mismatch aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder bld = { .type = "property-call", .schema = { .exportName = 0, .chain = { .typeName = "type-converter", .values = 0, .valueCount = 0, .initFunction = {0} } } };
    PropertySignature props[] = { { "p", "string-formatter" } };
    StructureRegistry regs[] = { { "test-struct", NULL, 0, props, 1 } };
    ChainValue cv = { .kind = V_PROPERTY_CALL, .as.propertyCall = { .name = "p", .builder = &bld } };
    ChainType chain = { .typeName = "test-struct", .values = &cv, .valueCount = 1, .initFunction = { .name = "init", .variableName = "v", .importString = 0 } };
    SchemaType s = { .exportName = 0, .chain = chain };
    validate_schema(&s, regs, 1);
    printf("NO ERROR\\n");
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("builder type name mismatch");
}, 60000);

test("schema without init function name aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    StructType arg0 = { .kind = S_STRING };
    StructType sig_args[] = { arg0 };
    FunctionSignature sigs[] = { { "f", 0, sig_args, 1, "test-struct" } };
    StructureRegistry regs[] = { { "test-struct", sigs, 1, NULL, 0 } };
    ArgumentType at = { .argument = v_string("x"), .hasDefault = 0, .def = {0}, .provided = 1 };
    ChainValue cv = { .kind = V_FUNCTION_CALL, .as.functionCall = { .name = "f", .arguments = &at, .argumentCount = 1, .isTemplateLiteral = 0 } };
    ChainType chain = { .typeName = "test-struct", .values = &cv, .valueCount = 1, .initFunction = {0} };
    SchemaType s = { .exportName = 0, .chain = chain };
    validate_schema(&s, regs, 1);
    printf("NO ERROR\\n");
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("init function without name");
}, 60000);

test("nested sub-chain in array with invalid member aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder b = queryBuilder(variableName("q"), values(arr(chain(stringify("x")))));
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("not a member");
}, 60000);

test("nested sub-chain in array with valid member passes", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder b = queryBuilder(variableName("q"), values(arr(chain(col("id")))));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
}, 60000);

test("template literal with invalid chain expression aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder b = queryBuilder(variableName("q"), raw("SELECT ", stringify("x")));
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("not a member");
}, 60000);

test("template literal with valid chain expression passes", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder b = queryBuilder(variableName("q"), raw("SELECT ", col("id")));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
}, 60000);

test("string variables passed to builder functions", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    char *a = "data";
    const char *b = "hello";
    Builder bld = createTypeConverter(
        variableName("c"),
        stringify(a),
        label(b),
        tags(arr(a, b)));
    printf("%s\\n", getJSONSchema(&bld));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain('"data"');
    expect(stdout).toContain('"hello"');
}, 60000);

test("numeric variables of each supported type", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    int i = 42;
    long l = 7;
    long long ll = 99;
    double d = 3.14;
    float f = 2.5f;
    Builder bld = createTypeConverter(
        variableName("c"),
        numerify(i),
        numerify(l),
        numerify(ll),
        numerify(d),
        numerify(f));
    printf("%s\\n", getJSONSchema(&bld));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain("42");
    expect(stdout).toContain("2.5");
}, 60000);

test("numeric variables in query-builder", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    int i = 42;
    long l = 7;
    long long ll = 99;
    double d = 3.14;
    Builder bld = queryBuilder(
        variableName("q"),
        select("id"),
        limit(i),
        offset(l),
        between(ll, d));
    printf("%s\\n", getJSONSchema(&bld));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain("42");
    expect(stdout).toContain("3.14");
}, 60000);

test("bool variable via boolify", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    int flag = 1;
    Builder bld = createTypeConverter(variableName("c"), boolify(flag));
    printf("%s\\n", getJSONSchema(&bld));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain("boolean");
}, 60000);

test("ArgumentValue variables pass through v_pass", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    ArgumentValue av = v_string("x");
    ArgumentValue num = v_int(7);
    Builder bld = createTypeConverter(variableName("c"), unify(av), unify(num));
    printf("%s\\n", getJSONSchema(&bld));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain('"x"');
}, 60000);

test("Builder variables used as sub-chain arguments", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder fmt = chain(format("hello"));
    Builder sub = chain(col("id"));
    Builder tc = createTypeConverter(variableName("c"), pipe(fmt));
    Builder qb = queryBuilder(variableName("q"), select("id"), with("cte", sub));
    printf("%s\\n", getJSONSchema(&tc));
    printf("%s\\n", getJSONSchema(&qb));
    return 0;
}
`;
    const { status, stderr } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
}, 60000);

test("array and map variables in query-builder", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    ArgumentValue cols = arr("name", "age");
    ArgumentValue setMap = map(entry("name", "bob"));
    ArgumentValue nested = arr(arr("a", "b"), arr("c", "d"));
    Builder bld = queryBuilder(
        variableName("q"),
        select(cols),
        set(setMap),
        values(nested));
    printf("%s\\n", getJSONSchema(&bld));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain('"bob"');
}, 60000);

test("combined schema built from variables prints values", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    char *name = "data";
    const char *alias = "hello";
    int i = 42;
    double d = 3.14;
    ArgumentValue av = v_string("x");
    Builder fmt = chain(format("hello"));
    Builder bld = createTypeConverter(
        variableName("c"),
        stringify(name),
        label(alias),
        numerify(i),
        numerify(d),
        unify(av),
        pipe(fmt));
    printf("%s\\n", getJSONSchema(&bld));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain('"data"');
    expect(stdout).toContain('"hello"');
    expect(stdout).toContain('"x"');
    expect(stdout).toContain("42");
    expect(stdout).toContain("3.14");
}, 60000);

test("variable with type not covered by _Generic fails to compile", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    unsigned u = 5;
    Builder b = createTypeConverter(variableName("c"), numerify(u));
    return 0;
}
`;
    expect(() => compileAndRun(runner)).toThrow();
}, 60000);

test("getSchema with importPaths map sets importPaths in JSON", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder b = createTypeConverter(variableName("c"), stringify("hello"));
    SchemaType s = getSchema(&b, map(entry("c", "./c-lib"), entry("typescript", "./ts-lib")));
    printf("%s\\n", getJSONSchema(&s));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain('"importPaths"');
    expect(stdout).toContain('"c": "./c-lib"');
    expect(stdout).toContain('"typescript": "./ts-lib"');
}, 60000);

test("getSchema without importPaths omits importPaths from JSON", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder b = createTypeConverter(variableName("c"), stringify("hello"));
    SchemaType s = getSchema(&b);
    printf("%s\\n", getJSONSchema(&s));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).not.toContain("importPaths");
}, 60000);

test("empty map() and arr() macros produce zero-count values", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    ArgumentValue m = map();
    ArgumentValue a = arr();
    if (m.type != D_MAP || a.type != D_ARRAY || m.count != 0 || a.count != 0) return 1;
    printf("OK\\n");
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain("OK");
}, 60000);

test("non-empty map/arr dispatch preserves entries", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    ArgumentValue m = map(entry("a", v_int(1)), entry("b", v_int(2)));
    ArgumentValue a = arr(v_int(1), v_int(2));
    if (m.count != 2 || a.count != 2) return 1;
    if (((const MapEntry *)m.as.data)[0].value.as.i != 1) return 1;
    if (((const ArgumentValue *)a.as.data)[1].as.i != 2) return 1;
    printf("OK\\n");
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain("OK");
}, 60000);

test("copy() records the source builder as a copy value", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder f = createTypeConverter(variableName("f"), label());
    Builder b = createTypeConverter(variableName("c"), copy(f), label("hello"));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    const schema = JSON.parse(stdout);
    const values = schema.schema.chain.chain.values;
    expect(values).toHaveLength(2);
    expect(values[0].copy.chain.chain.initFunction.variableName).toBe("f");
    expect(values[0].copy.chain.chain.values[0].functionCall.name).toBe("label");
    expect(values[1].functionCall.name).toBe("label");
    expect(schema.schema.chain.chain.initFunction.variableName).toBe("c");
}, 60000);

test("raw init-function builder in chain args aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder f = createTypeConverter(variableName("f"), label());
    Builder b = createTypeConverter(variableName("c"), f);
    (void)b;
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("cannot be placed directly in a chain");
    expect(stderr).toContain("copy(");
}, 60000);

test("raw init-function builder inside chain() aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder f = createStringFormatter(variableName("s"), format("x"));
    Builder b = createTypeConverter(variableName("c"), pipe(chain(f)));
    (void)b;
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("cannot be placed directly in a chain");
}, 60000);

test("cross-type copy aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder s = createStringFormatter(variableName("s"), format("x"));
    Builder b = createTypeConverter(variableName("c"), copy(s));
    (void)b;
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("cannot copy builder of structure 'string-formatter' into 'type-converter'");
}, 60000);

test("copy of empty builder is valid", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder e = createTypeConverter(variableName("e"));
    Builder b = createTypeConverter(variableName("c"), copy(e), stringify("x"));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    const schema = JSON.parse(stdout);
    const values = schema.schema.chain.chain.values;
    expect(values).toHaveLength(2);
    expect(values[0].copy.chain.chain.values).toHaveLength(0);
    expect(values[1].functionCall.name).toBe("stringify");
}, 60000);

test("multiple copies keep their positions", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder f = createTypeConverter(variableName("f"), label());
    Builder g = createTypeConverter(variableName("g"), stringify("x"));
    Builder b = createTypeConverter(variableName("c"), copy(f), numerify(1), copy(g));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    const schema = JSON.parse(stdout);
    const values = schema.schema.chain.chain.values;
    expect(values).toHaveLength(3);
    expect(values[0].copy.chain.chain.initFunction.variableName).toBe("f");
    expect(values[1].functionCall.name).toBe("numerify");
    expect(values[2].copy.chain.chain.initFunction.variableName).toBe("g");
}, 60000);

test("init-function builder stays intact inside functionCall param", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder s = createStringFormatter(variableName("s"), format("x"));
    Builder b = createTypeConverter(variableName("c"), pipe(s));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    const schema = JSON.parse(stdout);
    const values = schema.schema.chain.chain.values;
    expect(values).toHaveLength(1);
    const arg = values[0].functionCall.arguments[0].argument;
    expect(arg.chain.chain.initFunction.variableName).toBe("s");
    expect(arg.chain.chain.values[0].functionCall.name).toBe("format");
}, 60000);

test("copy of the same source twice emits a single declaration", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder f = createTypeConverter(variableName("f"), label());
    Builder b = createTypeConverter(variableName("c"), copy(f), label("hello"), copy(f));
    b.schema.exportName = "copy-dedup";
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    const schema = JSON.parse(stdout);
    const values = schema.schema.chain.chain.values;
    expect(values).toHaveLength(3);
    expect(values[0].copy.chain.chain.initFunction.variableName).toBe("f");
    expect(values[2].copy.chain.chain.initFunction.variableName).toBe("f");

    const code = convertSchemaToC(schema);
    expect(code.match(/Builder f =/g)).toHaveLength(1);
    expect(code.match(/copy\(f\)/g)).toHaveLength(2);

    const roundtripRunner = `${code}
#include <stdio.h>
int main(void) {
    Builder b = copy_dedup_schema();
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const roundtrip = compileAndRun(roundtripRunner);
    expect(roundtrip.status).toBe(0);
    expect(roundtrip.stderr).not.toContain("validate:");
    const regenerated = JSON.parse(roundtrip.stdout);
    expect(regenerated.schema.chain).toEqual(schema.schema.chain);
}, 60000);

test("copy source without named init function throws during conversion", () => {
    const bad = {
        schema: {
            exportName: "bad-copy",
            chain: {
                chain: {
                    values: [
                        { copy: { chain: { chain: { values: [], initFunction: {} } } } },
                    ],
                    initFunction: { name: "create-type-converter", variableName: "c", importString: "import" },
                },
            },
        },
    };
    expect(() => convertSchemaToC(bad as any)).toThrow("Copy source chain requires a named init function");
}, 60000);

test("copy source chain without structure type aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    ChainValue copyVal = { .kind = V_COPY, .as.copy = { .source = { .typeName = "", .values = 0, .valueCount = 0, .initFunction = {0} } } };
    ChainType chain = { .typeName = "type-converter", .values = &copyVal, .valueCount = 1, .initFunction = { .name = "init", .variableName = "v", .importString = 0 } };
    SchemaType s = { .exportName = 0, .chain = chain };
    validate_schema(&s, gntrees_structures, COUNT_OF(gntrees_structures));
    printf("NO ERROR\\n");
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("copy source chain without structure type");
}, 60000);

test("copy source deep-copied: mutating source later does not leak into target", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder f = createTypeConverter(variableName("f"), label());
    Builder b = createTypeConverter(variableName("c"), copy(f), label("hello"));
    f.schema.chain.values[0].as.functionCall.name = "stringify";
    printf("%s\\n", getJSONSchema(&b));
    printf("===SPLIT===\\n");
    printf("%s\\n", getJSONSchema(&f));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    const [bJson, fJson] = stdout.split("===SPLIT===\n").map(part => JSON.parse(part));
    const bValues = bJson.schema.chain.chain.values;
    expect(bValues).toHaveLength(2);
    expect(bValues[0].copy.chain.chain.values[0].functionCall.name).toBe("label");
    expect(JSON.stringify(bJson)).not.toContain('"stringify"');
    const fValues = fJson.schema.chain.chain.values;
    expect(fValues[0].functionCall.name).toBe("stringify");
}, 60000);

test("custom function dispatches to the matching structure impl", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder tc = createTypeConverter(variableName("c"), stringify("x"));
    Builder sf = createStringFormatter(variableName("s"), format("y"));
    printf("%s\\n", render(tc, "hello"));
    printf("%s\\n", render(sf, "world"));
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain("type-converter");
    expect(stdout).toContain("string-formatter");
}, 60000);

test("custom function on wrong structure aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder qb = queryBuilder(variableName("q"));
    (void)render(qb, "x");
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("not a member");
}, 60000);

test("custom function wrong argument type aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder tc = createTypeConverter(variableName("c"));
    (void)render(tc, 42);
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("type mismatch");
}, 60000);

test("parse builds sql with dialect placeholders", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder qb = queryBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col(v_string("id"))),
        from(table(v_string("users"))),
        where(chain(col(v_string("active")), eq(true))),
        limit(v_int(10)));
    ParseResult r = parse(qb);
    printf("%s\\n", r.sql);
    printf("%s\\n", r.sqlWithParam);
    printf("%zu %d\\n", r.paramCount, (int)r.param[0].type);
    lt_free_value((ArgumentValue){0});
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain('SELECT "id" FROM "users" WHERE "active" = $1 LIMIT $2');
    expect(stdout).toContain('SELECT "id" FROM "users" WHERE "active" = TRUE LIMIT 10');
    expect(stdout).toContain("2 2");
}, 60000);

test("parse grows buffers for many parameters", () => {
    const n = 120;
    const calls = Array.from({ length: n }, (_, i) => `where(chain(col(v_string("a${i}")), eq(v_int(${i}))))`).join(",\n        ");
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder qb = queryBuilder(
        variableName("q"),
        setDialect("postgres"),
        select(col(v_string("id"))),
        ${calls});
    ParseResult r = parse(qb);
    printf("%zu\\n", r.paramCount);
    printf("%s\\n", r.sql + strlen(r.sql) - 4);
    lt_free_value((ArgumentValue){0});
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
    const lines = stdout.trim().split("\n");
    expect(lines[0]).toBe("120");
    expect(lines[1]).toBe("$120");
}, 60000);

test("parse is memory-safe under AddressSanitizer", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder qb = queryBuilder(
        variableName("q"),
        setDialect("mysql"),
        select(arr(col(v_string("id")), col(v_string("name")))),
        from(table(v_string("users"))),
        where(chain(and(arr(
            chain(col(v_string("age")), gte(v_int(18))),
            chain(col(v_string("active")), eq(true)))))),
        orderBy(chain(col(v_string("name")), desc())),
        limit(v_int(5)));
    ParseResult r = parse(qb);
    printf("%s\\n", r.sql);
    printf("%s\\n", r.sqlWithParam);
    lt_free_value((ArgumentValue){0});
    lt_shutdown();
    return 0;
}
`;
    const { status, stderr, stdout } = compileAndRun(runner, {
        flags: "-fsanitize=address,undefined -fno-omit-frame-pointer -g",
        env: {
            ASAN_OPTIONS: "detect_leaks=1:abort_on_error=1",
            UBSAN_OPTIONS: "halt_on_error=1",
        },
    });
    expect(status).toBe(0);
    expect(stderr).not.toContain("AddressSanitizer");
    expect(stderr).not.toContain("LeakSanitizer");
    expect(stderr).not.toContain("runtime error:");
    expect(stderr).not.toContain("validate:");
    expect(stdout).toContain(
        "SELECT `id`, `name` FROM `users` WHERE ( `age` >= ? AND `active` = ? ) ORDER BY `name` DESC LIMIT ?"
    );
}, 60000);

test("valid literal string argument passes", () => {
    const runner = `#include "gntrees-method-chain.h"
#include <stdio.h>
int main(void) {
    Builder b = queryBuilder(variableName("q"), setDialect("postgres"));
    printf("%s\\n", getJSONSchema(&b));
    return 0;
}
`;
    const { status, stderr } = compileAndRun(runner);
    expect(status).toBe(0);
    expect(stderr).not.toContain("validate:");
}, 60000);

test("invalid literal string argument aborts", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder b = queryBuilder(variableName("q"), setDialect("oracle"));
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("literal");
}, 60000);

test("number and boolean literals validate", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    StructType int_lit = { .kind = S_LITERAL, .as.literal = { .type = D_INT, .value.i = 5 } };
    StructType float_lit = { .kind = S_LITERAL, .as.literal = { .type = D_FLOAT, .value.f = 1.5 } };
    StructType bool_lit = { .kind = S_LITERAL, .as.literal = { .type = D_BOOL, .value.i = 1 } };
    ArgumentValue i5 = v_int(5);
    ArgumentValue i6 = v_int(6);
    ArgumentValue f15 = v_float(1.5);
    ArgumentValue f50 = v_float(5.0);
    ArgumentValue b1 = v_bool(true);
    ArgumentValue b0 = v_bool(false);
    ArgumentValue sx = v_string("x");
    if (validate_value(&i5, &int_lit) != V_OK) return 1;
    if (validate_value(&f15, &float_lit) != V_OK) return 2;
    if (validate_value(&b1, &bool_lit) != V_OK) return 3;
    if (validate_value(&i6, &int_lit) == V_OK) return 4;
    if (validate_value(&b0, &bool_lit) == V_OK) return 5;
    if (validate_value(&sx, &int_lit) == V_OK) return 6;
    if (validate_value(&f50, &int_lit) != V_OK) return 7;
    return 0;
}
`;
    const { status } = compileAndRun(runner);
    expect(status).toBe(0);
}, 60000);
