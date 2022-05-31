module.exports = {
  root: true,
  extends: '"@callstack"',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'one-var': 'off',
    'no-multi-assign': 'off',
    'no-nested-ternary': 'off',
    'no-undef': 'off',
    'global-require': 'off',

    'import/no-extraneous-dependencies': 'off',
    'import/first': 'off',

    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'off',
    'react-native/no-raw-text': 'off',
  },
};
