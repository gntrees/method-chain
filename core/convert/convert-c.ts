import type { SchemaType } from "../base/typescript/base-types";
import { normalizeName } from "../utils";

type JsonValue = Record<string, any>;

type BuilderDecl = {
    name: string;
    initMacro: string;
    variableName: string;
    values: string[];
};

function deepEqual(a: unknown, b: unknown): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

function cString(value: string): string {
    return `"${value
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t")}"`;
}

function renderValue(value: JsonValue, declarations: BuilderDecl[]): string {
    if ("string" in value) {
        return cString(value.string.value);
    }
    if ("number" in value) {
        return String(value.number.value);
    }
    if ("boolean" in value) {
        return value.boolean.value ? "1" : "0";
    }
    if ("null" in value) {
        return "v_null()";
    }
    if ("chain" in value) {
        const inner = value.chain.chain ?? value.chain;
        const name = normalizeName(inner.initFunction.variableName, "camel");
        declarations.push({
            name,
            initMacro: normalizeName(inner.initFunction.name, "camel"),
            variableName: inner.initFunction.variableName,
            values: renderChainValues(inner.values, declarations),
        });
        return `&${name}`;
    }
    throw new Error("Unsupported argument value for C: object/array not yet supported");
}

function renderChainValues(values: JsonValue[], declarations: BuilderDecl[]): string[] {
    return values.map((value: JsonValue) => {
        if ("functionCall" in value) return renderFunctionCall(value.functionCall, declarations);
        throw new Error("Unsupported chain value for C");
    });
}

function renderFunctionCall(functionCall: JsonValue, declarations: BuilderDecl[]): string {
    const args: JsonValue[] = functionCall.arguments ?? [];
    const first = args[0];
    if (first && args.length === 1 && first.default !== null && deepEqual(first.argument, first.default)) {
        return `${functionCall.name}_def()`;
    }
    return `${functionCall.name}(${args.map(arg => renderValue(arg.argument, declarations)).join(", ")})`;
}

export function convertSchemaToC(schema: SchemaType): string {
    const chain = schema.schema.chain.chain;
    const init = chain.initFunction;

    const declarations: BuilderDecl[] = [];
    const outerValues = renderChainValues(chain.values, declarations);

    const fnName = `${normalizeName(schema.schema.exportName, "snake")}_schema`;
    const lines: string[] = [
        `#include "gntrees-method-chain.h"`,
        ``,
        `Builder ${fnName}() {`,
    ];
    for (const decl of declarations) {
        lines.push(`    Builder ${decl.name} = ${decl.initMacro}(`);
        const args = [`variableName(${cString(decl.variableName)})`, ...decl.values];
        args.forEach((arg, index) => {
            lines.push(`        ${arg}${index < args.length - 1 ? "," : ");"}`);
        });
    }
    const outerArgs = [`variableName(${cString(init.variableName)})`, ...outerValues];
    lines.push(`    return ${normalizeName(init.name, "camel")}(`);
    outerArgs.forEach((arg, index) => {
        lines.push(`        ${arg}${index < outerArgs.length - 1 ? "," : ");"}`);
    });
    lines.push(`}`);

    return lines.join("\n") + "\n";
}
