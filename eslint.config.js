// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import parser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tseslint.config(
  {
    files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    extends: [
      eslint.configs.recommended,
      // ...tseslint.configs.recommendedTypeChecked,
    ],
    plugins: {
      react,
      'react-hooks': reactHooks
    },
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        JSX: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 0,
      // "react/function-component-definition": ["error", {
      //   "namedComponents": "arrow-function",
      //   "unnamedComponents": "arrow-function"
      // }]
    },
  }
);