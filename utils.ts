import prettier from "prettier";
import type { LanguageType } from "./core.types";

export function normalizeName(name: string, target: "camel" | "pascal" | "snake" | "kebab", excludeFirstLastUnderscore: boolean = false): string {
    let result: string;
    switch (target) {
        case "camel": {
            result = name.split(/[-_\s]+/).map(i => i.toLowerCase()).map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join('');
            break;
        }
        case "pascal": {
            result = name.split(/[-_\s]+/).map(i => i.toLowerCase()).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
            break;
        }
        case "snake": {
            result = name.split(/[-_\s]+/).map(i => i.toLowerCase()).join('_');
            break;
        }
        case "kebab": {
            result = name.split(/[-_\s]+/).map(i => i.toLowerCase()).join('-');
            break;
        }
        default:
            result = name;
    }
    if (excludeFirstLastUnderscore) {
        if (name.startsWith('_')) {
            result = '_' + result
        }
        if (name.endsWith('_')) {
            result = result + '_';
        }
        return result;
    } else {
        return result;
    }
}

export async function prettierContent(content: string, language: LanguageType) {
    const languageKey = (() => {
        if (language === "typescript" || language === "javascript") return "typescript";
        // if (language === "go") return "go";
        // if (language === "php") return "php";
        throw new Error("Unsupported language for prettier");
    })()
    const result = await prettier.format(content, {
        parser: "typescript",
    })
    return result;
}