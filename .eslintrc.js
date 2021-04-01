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
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'fbjs',
  ],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
      flowVersion: '0.53',
    },
  },
  rules: {
    semi: [ERROR, 'always'],
    'react/no-unescaped-entities': [ERROR, {'forbid': ['>', '"', '}']}],
    'max-len': [WARN, 120, INDENT_SIZE, {'ignoreUrls': true}],
    'jsx-quotes': [WARN, 'prefer-single'],
  },
};    




