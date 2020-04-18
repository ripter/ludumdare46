module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-void': 'off',
    'no-param-reassign': 'off',
    'no-multi-assign': 'off',
    'no-bitwise': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'max-len': 'off',
    'brace-style': 'off',
    'prefer-promise-reject-errors': 'off',
    'class-methods-use-this': 'off',
    'prefer-rest-params': 'off',
    'prefer-spread': 'off',
  },
};
