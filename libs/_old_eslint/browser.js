module.exports = {
  extends: './common.js',
  env: {
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  globals: {
  },
  rules: {
    'no-var': 'off',
    'no-alert': ['error'],
  }
};