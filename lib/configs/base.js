module.exports = {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ['vue-unused-autofix'],
  rules: {
    'vue-unused-autofix/no-unused-components': 'error',
    'vue-unused-autofix/no-unused-properties': 'error'
  }
}