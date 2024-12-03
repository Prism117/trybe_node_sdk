import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      //"no-console": ["error", { allow: ["error", "warn"] }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-duplicate-type-constituents": "error",
    },
  },
];
