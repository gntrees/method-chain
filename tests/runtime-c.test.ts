import { expect, test } from "bun:test";
import { execSync, spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { unlinkSync, writeFileSync } from "node:fs";

const cGenDir = join(import.meta.dir, "gntrees-method-chain/c");

let tempCounter = 0;

function compileAndRun(runner: string): { status: number | null; signal: string | null; stderr: string } {
    const tag = `${process.pid}-${tempCounter++}`;
    const tempC = join(tmpdir(), `gntrees-runtime-c-${tag}.c`);
    const binary = join(tmpdir(), `gntrees-runtime-c-${tag}`);
    try {
        writeFileSync(tempC, runner);
        execSync(
            `gcc -Wall -Wextra -o ${binary} ${tempC} ${join(cGenDir, "cJSON.c")} -I${cGenDir} -lm`,
            { stdio: "pipe" }
        );
        const res = spawnSync(binary, [], { encoding: "utf8" });
        return { status: res.status, signal: res.signal, stderr: res.stderr };
    } finally {
        try { unlinkSync(tempC); } catch { /* ignore */ }
        try { unlinkSync(binary); } catch { /* ignore */ }
    }
}

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});

test("union error message includes branch reasons", () => {
    const runner = `#include "gntrees-method-chain.h"
int main(void) {
    Builder b = createTypeConverter(variableName("c"), unify(v_bool(1)));
    return 0;
}
`;
    const { status, signal, stderr } = compileAndRun(runner);
    expect(status).not.toBe(0);
    expect(signal === "SIGABRT" || (status !== null && status !== 0)).toBe(true);
    expect(stderr).toContain("expected string");
    expect(stderr).toContain("expected number");
});

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
});

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
});

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
});

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
});

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
});

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
});

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
});
