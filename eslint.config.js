import typescript from '@typescript-eslint/parser';
import eslitPlugin from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: ['dist', 'node_modules', 'scource-gen'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescript,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': eslitPlugin,
      import: pluginImport,
    },
    rules: {
      ...eslitPlugin.configs['recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  prettier,
];
