import prettier from "prettier";
import type { LanguageType } from "./base-types/typescript";

export function normalizeName(name: string, target: "camel" | "pascal" | "snake" | "kebab") {
    switch (target) {
        case "camel": {
            return name.split(/[-_\s]+/).map(i=>i.toLowerCase()).map((part, index) => index === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1)).join('');
        }
        case "pascal": {
            return name.split(/[-_\s]+/).map(i=>i.toLowerCase()).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
        }
        case "snake": {
            return name.split(/[-_\s]+/).map(i=>i.toLowerCase()).map(part => part.toLowerCase()).join('_');
        }
        case "kebab": {
            return name.split(/[-_\s]+/).map(i=>i.toLowerCase()).map(part => part.toLowerCase()).join('-');
        }
        default:
            return name;
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