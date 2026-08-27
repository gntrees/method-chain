import { expect, test } from "bun:test";
import type { ArgumentValue, StructType } from "./gntrees-method-chain/typescript/index";
import {
    QueryBuilder,
    TypeConverter,
    createSchema,
    normalizeArgumentStructureCall,
    queryBuilder,
} from "./gntrees-method-chain/typescript/index";

const tc = () => new TypeConverter() as any;
const qb = () => queryBuilder("qb") as any;

const firstArg = (schema: any): { argument: ArgumentValue; default: ArgumentValue | null } => {
    const value = schema.schema.chain.chain.values[0];
    if (!("functionCall" in value)) throw new Error("expected a function call");
    return value.functionCall.arguments[0];
};

test("required param omitted throws", () => {
    expect(() => tc().stringify()).toThrow("was not provided");
});

test("required param explicit undefined throws", () => {
    expect(() => tc().stringify(undefined)).toThrow("cannot be undefined");
});

test("required param in second position omitted throws", () => {
    expect(() => qb().between(1)).toThrow("was not provided");
});

test("required param in second position explicit undefined throws", () => {
    expect(() => qb().between(1, undefined)).toThrow("cannot be undefined");
});

test("optional param explicit undefined throws even with default", () => {
    expect(() => tc().label(undefined)).toThrow("cannot be undefined");
});

test("optional param omitted records the default", () => {
    const arg = firstArg(tc().label().getSchema());
    expect(arg.argument).toEqual({ string: { value: "default" } });
    expect(arg.default).toEqual({ string: { value: "default" } });
});

test("structure call arg null throws", () => {
    expect(() => tc().pipe(null)).toThrow("structure instance");
});

test("structure call arg array throws", () => {
    expect(() => tc().pipe([])).toThrow("structure instance");
});

test("empty array argument is valid", () => {
    const arg = firstArg(tc().tags([]).getSchema());
    expect(arg.argument).toEqual({ array: { value: [] } });
});

test("array of matching items is valid", () => {
    const arg = firstArg(tc().tags(["a", "b"]).getSchema());
    expect(arg.argument).toEqual({
        array: { value: [{ string: { value: "a" } }, { string: { value: "b" } }] },
    });
});

test("heterogeneous array throws", () => {
    expect(() => tc().tags(["a", 1])).toThrow("Expected a string argument");
});

test("array of union items of different types throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "mixed",
            [
                {
                    arg: ["a", 1],
                    struct: {
                        array: {
                            type: {
                                union: {
                                    types: [
                                        { string: { type: "string" } },
                                        { number: { type: "number" } },
                                    ],
                                },
                            },
                        },
                    },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("same argument type");
});

test("non-finite number throws", () => {
    expect(() => tc().numerify(NaN)).toThrow("finite number");
});

test("object missing required key throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "objTest",
            [
                {
                    arg: { a: "x" },
                    struct: {
                        object: {
                            a: { string: { type: "string" } },
                            b: { number: { type: "number" } },
                        },
                    },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("Missing required key");
});

test("object with unexpected key throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "objTest",
            [
                {
                    arg: { a: "x", b: 1, c: 2 },
                    struct: {
                        object: {
                            a: { string: { type: "string" } },
                            b: { number: { type: "number" } },
                        },
                    },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("Unexpected key");
});

test("default value mismatching struct throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "badDefault",
            [
                {
                    arg: "x",
                    struct: { string: { type: "string" } },
                    default: { number: { value: 5 } },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("Expected a string argument");
});

test("getSchema with non-string exportName throws", () => {
    expect(() => tc().getSchema(123)).toThrow("getSchema exportName");
});

test("getSchema with importPaths sets importPaths", () => {
    const schema = tc().getSchema(undefined, { c: "./c", typescript: "./ts" });
    expect(schema.schema.importPaths).toEqual({ c: "./c", typescript: "./ts" });
});

test("getSchema merges importPaths with existing defaults", () => {
    const schema = tc().getSchema(undefined, { c: "./c" });
    expect(schema.schema.importPaths).toEqual({
        typescript: "../../../gntrees-method-chain/typescript/index",
        c: "./c",
    });
});

test("getSchema with non-object importPaths throws", () => {
    expect(() => tc().getSchema(undefined, 123)).toThrow("getSchema importPaths");
    expect(() => tc().getSchema(undefined, [])).toThrow("getSchema importPaths");
    expect(() => tc().getSchema(undefined, null)).toThrow("getSchema importPaths");
});

test("initFromStructure with invalid schema throws", () => {
    expect(() => tc().initFromStructure({})).toThrow("Invalid schema");
});

test("initFromInitFunction with invalid init function throws", () => {
    expect(() => tc().initFromInitFunction({})).toThrow("Invalid init function");
});

test("normalizeArgumentStructureCall rejects null", () => {
    expect(() => (normalizeArgumentStructureCall as any)(null)).toThrow("structure instance");
});

test("template literal with undefined expression throws", () => {
    expect(() => qb().raw`a ${undefined}`).toThrow("union");
});

test("template literal with too many expressions throws", () => {
    expect(() => (qb().raw as any)(["a"], "x", "y")).toThrow("expression");
});

test("template literal with too few expressions throws", () => {
    expect(() => (qb().raw as any)(["a", "b", "c"], "x")).toThrow("expression");
});

test("createSchema with invalid base schema throws", () => {
    expect(() => createSchema({} as any, "x", [], false)).toThrow("Invalid schema");
});

test("object struct key colliding with inherited property is detected as missing", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "objInherited",
            [
                {
                    arg: { x: "1" },
                    struct: {
                        object: {
                            toString: { string: { type: "string" } },
                        },
                    } as StructType["struct"],
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("Missing required key");
});

test("union error includes underlying reasons", () => {
    try {
        (tc().unify as any)({ a: 1 });
        throw new Error("expected unify to throw");
    } catch (e: any) {
        expect(e.message).toContain("does not match any type in the union");
        expect(e.message).toContain("Expected a string argument");
    }
});

test("template literal records string parts and normalized expressions", () => {
    const schema = qb().raw`SELECT ${"x"} FROM ${18}`.getSchema();
    const args = (schema.schema.chain.chain.values[0] as any).functionCall.arguments;
    expect(args[0].argument).toEqual({ string: { value: "SELECT " } });
    expect(args[1].argument).toEqual({ string: { value: "x" } });
    expect(args[2].argument).toEqual({ string: { value: " FROM " } });
    expect(args[3].argument).toEqual({ number: { value: 18 } });
});

test("empty array in union of multiple array types is accepted", () => {
    const schema = createSchema(
        tc().getSchema(),
        "emptyUnion",
        [
            {
                arg: [],
                struct: {
                    union: {
                        types: [
                            { array: { type: { string: { type: "string" } } } },
                            { array: { type: { number: { type: "number" } } } },
                        ],
                    },
                },
                provided: true,
            },
        ],
        false,
    );
    const arg = (schema.schema.chain.chain.values[0] as any).functionCall.arguments[0];
    expect(arg.argument).toEqual({ array: { value: [] } });
});

test("non-empty ambiguous union still throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "ambigUnion",
            [
                {
                    arg: ["a"],
                    struct: {
                        union: {
                            types: [
                                { array: { type: { string: { type: "string" } } } },
                                { array: { type: { string: { type: "string" } } } },
                            ],
                        },
                    },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("ambiguous");
});

test("non-plain empty object in map struct throws", () => {
    expect(() => qb().set(new Map([["a", 1]]) as any)).toThrow("plain object");
});

test("non-plain empty object in object struct throws", () => {
    expect(() =>
        createSchema(
            tc().getSchema(),
            "objExotic",
            [
                {
                    arg: new Date(),
                    struct: {
                        object: {
                            a: { string: { type: "string" } },
                        },
                    },
                    provided: true,
                },
            ],
            false,
        ),
    ).toThrow("plain object");
});

test("QueryBuilder import is usable", () => {
    expect(QueryBuilder).toBeDefined();
});