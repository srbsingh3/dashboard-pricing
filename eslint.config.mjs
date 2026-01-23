import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwindcss from "eslint-plugin-better-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Tailwind CSS linting for consistency
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "better-tailwindcss": tailwindcss,
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "./src/app/globals.css",
      },
    },
    rules: {
      // Correctness rules (errors) - catch real problems
      "better-tailwindcss/no-unknown-classes": "error",
      "better-tailwindcss/no-conflicting-classes": "error",
      "better-tailwindcss/no-duplicate-classes": "error",

      // Stylistic rules (warnings) - enforce consistency
      "better-tailwindcss/enforce-consistent-class-order": "warn",
      "better-tailwindcss/no-unnecessary-whitespace": "warn",
      "better-tailwindcss/enforce-shorthand-classes": "warn",
      "better-tailwindcss/enforce-canonical-classes": "warn",
      "better-tailwindcss/no-deprecated-classes": "warn",

      // Disable overly strict line wrapping (too noisy for this project)
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore Subframe synced components (managed externally)
    "src/subframe/**",
  ]),
]);

export default eslintConfig;
