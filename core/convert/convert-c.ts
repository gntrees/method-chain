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

function initMacro(initName: string): string {
    return normalizeName(initName, "camel");
}

function renderValue(value: JsonValue, declarations: BuilderDecl[], inContainer = false): string {
    if ("string" in value) {
        return cString(value.string.value);
    }
    if ("number" in value) {
        return String(value.number.value);
    }
    if ("boolean" in value) {
        const lit = value.boolean.value ? "1" : "0";
        return inContainer ? `v_bool(${lit})` : lit;
    }
    if ("null" in value) {
        return "v_null()";
    }
    if ("chain" in value) {
        const inner = value.chain.chain ?? value.chain;
        /* chain inline (hasil chain() di C, tanpa init function) ditulis
           langsung sebagai chain(...); chain bernama memakai deklarasi Builder. */
        if (!inner.initFunction || !inner.initFunction.name) {
            return `chain(${renderChainValues(inner.values, declarations).join(", ")})`;
        }
        const name = normalizeName(inner.initFunction.variableName, "camel");
        declarations.push({
            name,
            initMacro: initMacro(inner.initFunction.name),
            variableName: inner.initFunction.variableName,
            values: renderChainValues(inner.values, declarations),
        });
        return `${name}`;
    }
    if ("array" in value) {
        const items = (value.array.value as JsonValue[]).map(item => renderValue(item, declarations, true));
        return items.length
            ? `arr(${items.join(", ")})`
            : `((ArgumentValue){ .type = D_ARRAY, .count = 0, .as.data = 0 })`;
    }
    if ("object" in value) {
        const entries = Object.entries(value.object.value as Record<string, JsonValue>)
            .map(([key, item]) => `entry(${cString(key)}, ${renderValue(item, declarations, true)})`);
        return entries.length
            ? `map(${entries.join(", ")})`
            : `((ArgumentValue){ .type = D_MAP, .count = 0, .as.data = 0 })`;
    }
    throw new Error("Unsupported argument value for C");
}

function renderPropertyCall(propertyCall: JsonValue, declarations: BuilderDecl[]): string {
    const name = propertyCall.name as string;
    const builder = propertyCall.builder as JsonValue | undefined;
    if (!builder) {
        return name;
    }
    const inner = (builder.chain as JsonValue).chain ?? builder.chain;
    const declName = normalizeName(inner.initFunction.variableName, "camel");
    declarations.push({
        name: declName,
        initMacro: initMacro(inner.initFunction.name),
        variableName: inner.initFunction.variableName,
        values: renderChainValues(inner.values, declarations),
    });
    return `(ChainValue){ .kind = V_PROPERTY_CALL, .as.propertyCall = { .name = ${cString(name)}, .builder = &${declName} } }`;
}

function renderCopy(copy: JsonValue, declarations: BuilderDecl[]): string {
    const inner = (copy.chain as JsonValue).chain ?? copy.chain;
    const init = inner.initFunction as JsonValue;
    if (!init || !init.name || !init.variableName) {
        throw new Error("Copy source chain requires a named init function");
    }
    const name = normalizeName(init.variableName, "camel");
    if (!declarations.some(decl => decl.name === name)) {
        declarations.push({
            name,
            initMacro: initMacro(init.name),
            variableName: init.variableName,
            values: renderChainValues(inner.values, declarations),
        });
    }
    return `copy(${name})`;
}

function renderChainValues(values: JsonValue[], declarations: BuilderDecl[]): string[] {
    return values.map((value: JsonValue) => {
        if ("functionCall" in value) return renderFunctionCall(value.functionCall, declarations);
        if ("propertyCall" in value) return renderPropertyCall(value.propertyCall, declarations);
        if ("copy" in value) return renderCopy(value.copy, declarations);
        throw new Error("Unsupported chain value for C");
    });
}

function renderFunctionCall(functionCall: JsonValue, declarations: BuilderDecl[]): string {
    const args: JsonValue[] = functionCall.arguments ?? [];
    const first = args[0];
    const macroName = normalizeName(functionCall.name, "camel", true);
    if (first && args.length === 1 && first.default !== null && deepEqual(first.argument, first.default)) {
        return `${macroName}()`;
    }
    return `${macroName}(${args.map(arg => renderValue(arg.argument, declarations)).join(", ")})`;
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
    lines.push(`    return ${initMacro(init.name)}(`);
    outerArgs.forEach((arg, index) => {
        lines.push(`        ${arg}${index < outerArgs.length - 1 ? "," : ");"}`);
    });
    lines.push(`}`);

    return lines.join("\n") + "\n";
}
