module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'complexity': [
      'error', { max: 5 }
    ],
    '@typescript-eslint/interface-name-prefix': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-explicit-any': ['error', { 'ignoreRestArgs': true }],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        'allowSingleExtends': false
      }
    ],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        'allowDestructuring': false,
        'allowedNames': ['self']
      }
    ],
    '@typescript-eslint/no-unnecessary-type-assertion': ['error', { typesToIgnore: [] }],
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-as-const': 'warn',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/triple-slash-reference': 'error',
    '@typescript-eslint/unbound-method': 'error',
  },
};
