import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import globals from "globals";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["apps/backend/**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./apps/backend/tsconfig.json",
            },
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "prettier/prettier": "error",
        },
    },
    {
        files: ["apps/frontend/**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./apps/frontend/tsconfig.json",
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            react,
            prettier,
        },
        rules: {
            "prettier/prettier": "error",
            "react/react-in-jsx-scope": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];
