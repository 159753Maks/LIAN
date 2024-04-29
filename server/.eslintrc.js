const OFF = 0,
  WARN = 1,
  ERROR = 2

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': ERROR,
    eqeqeq: ERROR,
    'no-console': ERROR,
    '@typescript-eslint/no-namespace': OFF,
    '@typescript-eslint/member-delimiter-style': [
      WARN,
      {
        multiline: { delimiter: 'none' },
        singleline: { delimiter: 'semi' },
      },
    ],
    'simple-import-sort/imports': WARN,
    '@typescript-eslint/no-explicit-any': [
      WARN,
      {
        ignoreRestArgs: true,
      },
    ],
    '@typescript-eslint/no-empty-interface': OFF,
    '@typescript-eslint/array-type': [
      ERROR,
      {
        default: 'generic',
      },
    ],
  },
}
