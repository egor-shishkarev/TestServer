module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
      node: true,
      jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
      // #region import
      // https://github.com/tportio/tportio.github.io/issues/13
      'import/extensions': 'off',
      // https://github.com/benmosher/eslint-plugin-import/issues/1753
      'import/named': 'off',
      'import/no-default-export': 'error',
      'import/order': [
          'error',
          {
              groups: [['builtin', 'external', 'internal']],
              'newlines-between': 'always',
              alphabetize: { order: 'asc', caseInsensitive: true },
          },
      ],
      'import/prefer-default-export': 'off',
      // #endregion

      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': [
          'error',
          {
              endOfLine: 'auto',
          },
      ],
  },
};
