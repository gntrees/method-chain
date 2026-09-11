import type { SchemaType } from "../base/typescript/base-types";
import { normalizeName } from "../utils";

type JsonValue = Record<string, any>;

type BuilderDecl = {
    name: string;
    initMacro: string;
    variableName: string;
    values: string[];
};

type RenderContext = {
    declarations: BuilderDecl[];
    names: Map<object, string>;
    copies: Map<string, string>;
    used: Set<string>;
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

/**
 * Schema yang berasal dari builder TS menyimpan nama fungsi dalam camelCase
 * (mis. `setDialect`), sedangkan `normalizeName` menurunkan huruf tiap bagian.
 * Nama tanpa pemisah dipertahankan apa adanya; nama kebab/snake dinormalisasi.
 */
function callMacro(name: string): string {
    return /[-_\s]/.test(name) ? normalizeName(name, "camel", true) : name;
}

/**
 * Chain bersarang dari schema TS sering berbagi `initFunction.variableName`
 * (sub-builder mewarisi nama builder akarnya). Kunci nama C per identitas objek
 * chain agar tiap deklarasi unik dan objek yang sama di-dedupe.
 */
function uniqueName(ctx: RenderContext, inner: JsonValue): string {
    const key = inner as object;
    const existing = ctx.names.get(key);
    if (existing) return existing;
    const name = reserveName(ctx, normalizeName(inner.initFunction.variableName, "camel"));
    ctx.names.set(key, name);
    return name;
}

function reserveName(ctx: RenderContext, base: string): string {
    let name = base;
    let counter = 1;
    while (ctx.used.has(name)) {
        name = `${base}_${counter++}`;
    }
    ctx.used.add(name);
    return name;
}

function ensureDeclaration(ctx: RenderContext, inner: JsonValue): string {
    const name = uniqueName(ctx, inner);
    if (!ctx.declarations.some((decl) => decl.name === name)) {
        ctx.declarations.push({
            name,
            initMacro: initMacro(inner.initFunction.name),
            variableName: inner.initFunction.variableName,
            values: renderChainValues(inner.values, ctx),
        });
    }
    return name;
}

function renderValue(value: JsonValue, ctx: RenderContext): string {
    if ("string" in value) {
        return cString(value.string.value);
    }
    if ("number" in value) {
        return String(value.number.value);
    }
    if ("boolean" in value) {
        return `v_bool(${value.boolean.value ? 1 : 0})`;
    }
    if ("null" in value) {
        return "v_null()";
    }
    if ("chain" in value) {
        const inner = value.chain.chain ?? value.chain;
        /* chain inline (hasil chain() di C, tanpa init function) ditulis
           langsung sebagai chain(...); chain bernama memakai deklarasi Builder. */
        if (!inner.initFunction || !inner.initFunction.name) {
            return `chain(${renderChainValues(inner.values, ctx).join(", ")})`;
        }
        return ensureDeclaration(ctx, inner);
    }
    if ("array" in value) {
        const items = (value.array.value as JsonValue[]).map(item => renderValue(item, ctx));
        return items.length
            ? `arr(${items.join(", ")})`
            : `((ArgumentValue){ .type = D_ARRAY, .count = 0, .as.data = 0 })`;
    }
    if ("object" in value) {
        const entries = Object.entries(value.object.value as Record<string, JsonValue>)
            .map(([key, item]) => `entry(${cString(key)}, ${renderValue(item, ctx)})`);
        return entries.length
            ? `map(${entries.join(", ")})`
            : `((ArgumentValue){ .type = D_MAP, .count = 0, .as.data = 0 })`;
    }
    throw new Error("Unsupported argument value for C");
}

function renderPropertyCall(propertyCall: JsonValue, ctx: RenderContext): string {
    const name = propertyCall.name as string;
    const builder = propertyCall.builder as JsonValue | undefined;
    if (!builder) {
        return name;
    }
    const inner = (builder.chain as JsonValue).chain ?? builder.chain;
    const declName = ensureDeclaration(ctx, inner);
    return `(ChainValue){ .kind = V_PROPERTY_CALL, .as.propertyCall = { .name = ${cString(name)}, .builder = &${declName} } }`;
}

function renderCopy(copy: JsonValue, ctx: RenderContext): string {
    const inner = (copy.chain as JsonValue).chain ?? copy.chain;
    const init = inner.initFunction as JsonValue;
    if (!init || !init.name || !init.variableName) {
        throw new Error("Copy source chain requires a named init function");
    }
    /* `copy` mengacu pada builder sumber yang sama, de-dup per variableName. */
    let name = ctx.copies.get(init.variableName);
    if (!name) {
        name = reserveName(ctx, normalizeName(init.variableName, "camel"));
        ctx.copies.set(init.variableName, name);
    }
    if (!ctx.declarations.some((decl) => decl.name === name)) {
        ctx.declarations.push({
            name,
            initMacro: initMacro(init.name),
            variableName: init.variableName,
            values: renderChainValues(inner.values, ctx),
        });
    }
    return `copy(${name})`;
}

function renderChainValues(values: JsonValue[], ctx: RenderContext): string[] {
    return values.map((value: JsonValue) => {
        if ("functionCall" in value) return renderFunctionCall(value.functionCall, ctx);
        if ("propertyCall" in value) return renderPropertyCall(value.propertyCall, ctx);
        if ("copy" in value) return renderCopy(value.copy, ctx);
        throw new Error("Unsupported chain value for C");
    });
}

function renderFunctionCall(functionCall: JsonValue, ctx: RenderContext): string {
    const args: JsonValue[] = functionCall.arguments ?? [];
    const first = args[0];
    const macroName = callMacro(functionCall.name);
    if (first && args.length === 1 && first.default !== null && deepEqual(first.argument, first.default)) {
        return `${macroName}()`;
    }
    return `${macroName}(${args.map(arg => renderValue(arg.argument, ctx)).join(", ")})`;
}

export function convertSchemaToC(schema: SchemaType): string {
    const chain = schema.schema.chain.chain;
    const init = chain.initFunction;

    const ctx: RenderContext = { declarations: [], names: new Map(), copies: new Map(), used: new Set() };
    const outerValues = renderChainValues(chain.values, ctx);

    const fnName = `${normalizeName(schema.schema.exportName, "snake")}_schema`;
    const lines: string[] = [
        `#include "gntrees-method-chain.h"`,
        ``,
        `Builder ${fnName}() {`,
    ];
    for (const decl of ctx.declarations) {
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
