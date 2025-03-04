import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs';
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  {
    ignores: ['.next/**/*'],
  },
  {
    rules: {
      'react/jsx-sort-props': ['error', {
        'callbacksLast': true,
        'shorthandFirst': false,
        'shorthandLast': true,
        'ignoreCase': true,
        'noSortAlphabetically': false
      }],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'max-len': ['warn', { code: 100 }],
      'semi': ['error', 'always'],
      'react/jsx-curly-spacing': ['error', { when: 'always', children: true }],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    }
  }
];
