"use strict"

function removeArrayOrObjectNode(problem, context, arrayOrObjectParent) {
  const { sourceCode } = context;
  const { node } = problem;

  let _node = arrayOrObjectParent || findArrayOrObjectParent(node);

  const { parent } = _node;

  problem.fix = function (fixer) {
    if (!parent) return null;

    const isArray = parent.type === "ArrayExpression";
    const siblings = isArray ? parent.elements : parent.properties;
    const parentStart = isArray ? "[" : "{";
    const parentEnd = isArray ? "]" : "}";

    // only one
    if (siblings.length === 1) {
      return fixer.replaceTextRange(parent.range, parentStart + parentEnd);
    }

    const nextToken = sourceCode.getTokenAfter(_node, {
      filter: (token) => token.value !== ",",
    });
    const isSameLine = nextToken.loc.start.line === _node.loc.start.line;

    const index = siblings.indexOf(_node);
    const isFirst = index === 0,
      isLast = index === siblings.length - 1;

    if (isSameLine) {
      if (isFirst) {
        const prevToken = sourceCode.getTokenBefore(_node, {
          filter: (token) => token.value === parentStart,
        });
        const nextTokenOrComment = sourceCode.getTokenAfter(_node, {
          includeComments: true,
          filter: (token) => token.value !== ",",
        });
        return fixer.replaceTextRange(
          [prevToken.end, nextTokenOrComment.start],
          isArray ? "" : " "
        );
      } else if (isLast) {
        const prevToken = sourceCode.getTokenBefore(_node, {
          filter: (token) => token.value === ",",
        });
        const nextToken = sourceCode.getTokenAfter(_node, {
          filter: (token) => token.value === parentEnd,
        });
        return fixer.replaceTextRange(
          [prevToken.start, nextToken.start],
          isArray ? "" : " "
        );
      } else {
        const prevToken = sourceCode.getTokenBefore(_node, {
          filter: (token) => token.value === ",",
        });
        const nextTokenOrComment = sourceCode.getTokenAfter(_node, {
          includeComments: true,
          filter: (token) => token.value !== ",",
        });
        return fixer.replaceTextRange(
          [prevToken.end, nextTokenOrComment.start],
          " "
        );
      }
    } else {
      if (isFirst) {
        const prevToken = sourceCode.getTokenBefore(_node, {
          filter: (token) => token.value === parentStart,
        });
        const nextTokenOrComment = sourceCode.getTokenAfter(_node, {
          includeComments: true,
          filter: (token) => token.loc.start.line !== _node.loc.end.line,
        });
        const endOfNode = sourceCode.getTokenBefore(nextTokenOrComment, {
          includeComments: true,
        });
        return fixer.removeRange([prevToken.end, endOfNode.end]);
      } else if (isLast) {
        const prevToken = sourceCode.getTokenBefore(_node, {
          filter: (token) => token.value === ",",
        });
        const endOfPrevToken = sourceCode.getTokenBefore(_node, {
          includeComments: true,
          filter: (token) => token.loc.start.line === prevToken.loc.end.line,
        });
        const nextToken = sourceCode.getTokenAfter(_node, {
          filter: (token) => token.value === parentEnd,
        });
        const prevOfNextToken = sourceCode.getTokenBefore(nextToken, {
          includeComments: true,
          filter: (token) => token.loc.start.line !== nextToken.loc.start.line,
        });
        return fixer.removeRange([endOfPrevToken.end, prevOfNextToken.end]);
      } else {
        const prevToken = sourceCode.getTokenBefore(_node, {
          filter: (token) => token.value === ",",
        });
        const endOfPrevToken = sourceCode.getTokenBefore(_node, {
          includeComments: true,
          filter: (token) => token.loc.start.line === prevToken.loc.end.line,
        });
        const nextTokenOrComment = sourceCode.getTokenAfter(_node, {
          includeComments: true,
          filter: (token) => token.loc.start.line !== _node.loc.end.line,
        });
        const endOfNode = sourceCode.getTokenBefore(nextTokenOrComment, {
          includeComments: true,
        });
        return fixer.removeRange([endOfPrevToken.end, endOfNode.end]);
      }
    }
  };

  return problem;
}

function findArrayOrObjectParent(node) {
  let _node = node;
  while (
    _node.parent &&
    _node.parent.type !== "ArrayExpression" &&
    _node.parent.type !== "ObjectExpression"
  ) {
    _node = _node.parent;
  }
  return _node;
}

module.exports = {
  removeArrayOrObjectNode,
  findArrayOrObjectParent,
};
