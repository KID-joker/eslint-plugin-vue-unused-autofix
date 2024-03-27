"use strict"

const { name, version } = require('../package.json')

module.exports = {
  meta: { name, version },
  configs: {
    base: require('./configs/base')
  },
  rules: {
    "no-unused-components": require("./rules/no-unused-components"),
    "no-unused-properties": require("./rules/no-unused-properties")
  },
  processors: {
    ".vue": require("eslint-plugin-vue/lib/processor")
  },
};
