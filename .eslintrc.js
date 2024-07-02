module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    // Allows for the parsing of modern ECMAScript features
    ecmaVersion: 2018,
    // Allows for the use of imports
    sourceType: 'module',
  },
  rules: {
    semi: 'off',
    indent: 'off',
    'react/no-unknown-property': [
      'warn', 
      { 
        ignore: [ 
          'onFocusCapture', 
          'onBlurCapture' 
        ] 
      } 
    ],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/semi': ['warn'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-console': 'off',
    'prettier/prettier': ['error'],
    // needed for NextJS's jsx without react import
    'react/react-in-jsx-scope': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    // 'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },

  globals: { React: 'writable' },
};
