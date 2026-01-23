// @ts-check

import eslint from '@eslint/js';
import {defineConfig} from 'eslint/config';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig(
 eslint.configs.recommended,
 ...tseslint.configs.recommended,
 react.configs.flat.recommended, // Enables recommended rules for React
 react.configs.flat['jsx-runtime'], // Enables rules for React 17+ JSX transform
 reactHooks.configs.flat["recommended-latest"],
 {
   // Custom settings or overrides
   settings: {
     react: {
       version: 'detect', // Automatically detect React version
     },
   },
   rules: {
     // Add or override specific rules here
     // 'react/jsx-uses-react': 'off', // Example: turn off a rule
     // 'react/react-in-jsx-scope': 'off', // Example: turn off a rule
     '@typescript-eslint/no-explicit-any': 'off',
     '@typescript-eslint/ban-ts-comment': 'off',
     'react/prop-types': 'off',
   },
 },
);