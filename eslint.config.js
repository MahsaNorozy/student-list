import eslint from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import tsdoc from "eslint-plugin-tsdoc";
import vitest from "eslint-plugin-vitest";
import globals from "globals";

// @type {import('eslint').Linter.Config[]}
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  eslint.configs.recommended,
  ...tseslint.configs["flat/strict"],
  ...tseslint.configs["flat/stylistic"],
  pluginReact.configs.flat.recommended,
  perfectionist.configs["recommended-natural"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...vitest.globals, // macht test/expect/describe etc. bekannt
      },
    },

    plugins: {
      tsdoc,
      vitest,
    },

    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/consistent-generic-constructors": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
        },
      ],
      "no-tabs": "error",
      "no-undef": "off",
      "no-unused-expressions": "off",
      "perfectionist/sort-imports": [
        "error",
        {
          customGroups: {
            value: {
              BboUiCommunication: [""],
              BboUiComponent: [""],
              Json: ["^.+\\.json"],
            },
          },
          groups: [
            ["builtin", "external"],
            "BboUiCommunication",
            "BboUiComponent",
            [
              "internal",
              "internal-type",
              "parent-type",
              "sibling-type",
              "index-type",
              "parent",
              "sibling",
              "index",
              "type",
            ],
            "object",
            "unknown",
            "Json",
          ],
        },
      ],
      "perfectionist/sort-interfaces": ["error", { partitionByNewLine: false }],
      "perfectionist/sort-modules": [
        "error",
        {
          customGroups: [],
          groups: [
            ["function", "declare-function", "declare-class"],
            ["declare-interface", "declare-type", "declare-enum", "enum"],
            ["export-function", "export-class"],
            ["interface"],
            ["class", "type"],
            ["export-interface", "export-type", "export-enum"],
          ],
          ignoreCase: true,
          newlinesBetween: "always",
          order: "asc",
        },
      ],
      "react/react-in-jsx-scope": "off",
      "tsdoc/syntax": "warn",
      "vitest/expect-expect": "warn", // Stellt sicher, dass jeder Test mindestens ein „expect“ enthält
      "vitest/no-focused-tests": "error", // Verhindert versehentliches Belassen von test.only oder describe.only
      "vitest/no-identical-title": "error", // Verhindert doppelte Testnamen
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
