import { dirname } from "path";
import { fileURLToPath } from "url";
import eslintPluginReact from "eslint-plugin-react";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      react: eslintPluginReact,
    },
  },
];

export default eslintConfig;
