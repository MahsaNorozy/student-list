import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

import sonarjs from "eslint-plugin-sonarjs";
import prettierPlugin from "eslint-plugin-prettier";
import prettierRecommended from "eslint-plugin-prettier/recommended"; // Flat-Config-Preset

export default tseslint.config(
  { ignores: ["dist"] },
  /* ───────── SonarJS-Regeln (automatisch inkl. Plugin) ───────── */
  sonarjs.configs.recommended, // bindet alle Clean-Code-Regeln von SonarJS ein und registriert das Plugin (Flat-Style) – keine Dopplung nötig.

  /* ───────── Prettier-Integration ───────── */
  prettierRecommended, // enthält eslint-config-prettier + plugin // schaltet Format-Regeln ab (eslint-config-prettier) und aktiviert eslint-plugin-prettier, damit Prettier-Fehler als ESLint-Warnungen erscheinen.

  /* ───────── Dein bestehendes Projekt-Profil ───────── */
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      // Prettier-Plugin muss *hier* noch einmal benannt sein,
      // weil das empfohlene Preset Regeln liefert, aber das Objekt `plugins`
      // NICHT automatisch ergänzt.
      //enthält deine React-Hooks-Regeln, Globaleinstellungen usw. Reihenfolge ist wichtig → Prettier kommt zuletzt, damit es andere Format-Regeln überstimmt.
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
);
