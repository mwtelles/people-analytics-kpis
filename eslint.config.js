import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import globals from "globals";

export default [
    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: "./tsconfig.json",
            },
            globals: {
                ...globals.browser,
                ...globals.node,
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

    {
        files: ["apps/backend/**/*.{ts,tsx}"],
        rules: {
            "no-console": "warn",
        },
    },

    {
        files: ["apps/frontend/**/*.{ts,tsx}"],
        rules: {
            "react/prop-types": "off",
        },
    },
];
