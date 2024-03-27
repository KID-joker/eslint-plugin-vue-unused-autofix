"use strict"

const ruleComposer = require("eslint-rule-composer");
const { removeArrayOrObjectNode } = require("../utils");

const rule = require("eslint-plugin-vue/lib/rules/no-unused-components");
rule.meta.fixable = "code";

module.exports = ruleComposer.filterReports(rule, function (problem, context) {
  return removeArrayOrObjectNode(problem, context);
});
