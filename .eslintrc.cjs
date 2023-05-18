module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "no-undef": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "react-refresh/only-export-components": "warn",
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        name: "react-redux",
        importNames: ["useSelector", "useDispatch"],
        message:
          "Usa typed hooks `useAppDispatch` y `useAppSelector` en vez de useDispatch o useSelector",
      },
    ],
  },
};
