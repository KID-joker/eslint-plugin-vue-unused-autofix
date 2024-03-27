"use strict"

const ruleComposer = require("eslint-rule-composer");
const {
  removeArrayOrObjectNode,
  findArrayOrObjectParent,
} = require("../utils");

const rule = require("eslint-plugin-vue/lib/rules/no-unused-properties");
rule.meta.fixable = "code";

const PROPERTY_LABEL = {
  props: "property",
  data: "data",
  asyncData: "async data",
  computed: "computed property",
  methods: "method",
  setup: "property returned from `setup()`",
};

module.exports = ruleComposer.filterReports(rule, function (problem, context) {
  const { node, data } = problem;
  if (PROPERTY_LABEL.props === data.group) {
    // prop
    removeArrayOrObjectNode(problem, context);
  } else if (
    [PROPERTY_LABEL.computed, PROPERTY_LABEL.methods].includes(data.group)
  ) {
    // computed or methods
    let _node = node;
    while (_node && _node.type !== "CallExpression") {
      _node = _node.parent;
    }

    if (
      _node &&
      /^mapState|mapGetters|mapMutations|mapActions$/u.test(_node.callee.name)
    ) {
      // only for vuex
      let __node = findArrayOrObjectParent(node);

      const { parent } = __node;
      const { parent: grandParent } = _node;

      if (parent) {
        const isArray = parent.type === "ArrayExpression";
        const siblings = isArray ? parent.elements : parent.properties;

        if (siblings.length === 1) {
          if (grandParent.type === "SpreadElement") {
            removeArrayOrObjectNode(problem, context, grandParent);
          } else {
            problem.fix = function (fixer) {
              return fixer.replaceTextRange(_node.range, "{}");
            };
          }
        } else {
          removeArrayOrObjectNode(problem, context, __node);
        }
      }
    }
  }

  return problem;
});
