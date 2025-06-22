import pluginJs from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  perfectionist.configs["recommended-natural"],
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-duplicate-enum-values": "error",
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
    },
  },
];
