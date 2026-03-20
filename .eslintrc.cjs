module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:lit/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
  },
  rules: {
    // You can add custom rules here
  },
  ignorePatterns: ['dist'],
};
