module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: { project: "./tsconfig.json" },
  env: { es2021: true, browser: true, jest: true, node: true },
  plugins: ["simple-import-sort", "sort-destructure-keys", "tailwindcss"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  rules: {
    "no-console": ["error", { allow: ["warn", "info", "error"] }],
    "no-restricted-syntax": ["error", { selector: "TSEnumDeclaration", message: "Don't declare enums" }],
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "func-style": ["error", "expression"],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "error",
    "react/jsx-handler-names": [
      "error",
      {
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "on",
        checkLocalVariables: true,
        checkInlineFunction: true,
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/newline-after-import": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
    "@typescript-eslint/naming-convention": [
      "error",
      { selector: ["typeAlias", "typeParameter"], format: ["PascalCase"] },
      { selector: ["method"], format: ["camelCase"] },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["no", "is", "has", "should"],
        filter: { regex: "^_", match: false },
      },
    ],
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      { components: ["Link"], specialLink: ["hrefLeft", "hrefRight"], aspects: ["invalidHref", "preferButton"] },
    ],
  },
  overrides: [
    {
      files: ["src/pages/**/*.page.tsx", "src/pages/api/**/*.page.ts"],
      rules: {
        "import/no-default-export": "off",
        "@typescript-eslint/naming-convention": [
          "error",
          { selector: ["typeAlias", "typeParameter"], format: ["PascalCase"] },
          { selector: ["classProperty", "typeProperty", "method"], format: ["camelCase"] },
          { selector: "variable", types: ["boolean"], format: ["PascalCase"], prefix: ["is", "has", "should"] },
        ],
      },
    },
    {
      files: ["src/type/**/*.d.ts", "jest.config.js"],
      rules: {
        "@typescript-eslint/naming-convention": [
          "error",
          { selector: ["typeAlias", "typeParameter"], format: ["PascalCase"] },
          { selector: ["classProperty", "method"], format: ["camelCase"] },
          { selector: "variable", types: ["boolean"], format: ["PascalCase"], prefix: ["is", "has", "should"] },
        ],
      },
    },
    {
      files: ["src/components/**/*.spec.tsx", "src/components/**/*.test.tsx"],
      rules: {
        "react/jsx-handler-names": [
          "error",
          {
            eventHandlerPrefix: "handle",
            eventHandlerPropPrefix: "mockHandle",
            checkLocalVariables: true,
            checkInlineFunction: true,
          },
        ],
      },
    },
  ],
};
