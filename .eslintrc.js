const path = require('path');

const OFF = 0;
const WARN = 1;
const ERROR = 2;
const INDENT_SIZE = 2;

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js','.jsx', '.ts']
      },
      webpack: { config: path.resolve(__dirname, 'webpack/webpack.common.js') },
      
    },
  },
  rules: {
    'camelcase': OFF,
    'semi': [ERROR, 'always'],
    'react/no-unescaped-entities': [ERROR, {'forbid': ['>', '"', '}']}],
    'max-len': [WARN, 120, INDENT_SIZE, {'ignoreUrls': true}],
    'jsx-quotes': [WARN, 'prefer-single'],
    'no-irregular-whitespace': WARN,
    'no-multi-spaces': WARN,
    'import/prefer-default-export': OFF,
    'block-spacing': ERROR,
    'quotes': [ERROR, "single", { "allowTemplateLiterals": true }]
  },
};    




