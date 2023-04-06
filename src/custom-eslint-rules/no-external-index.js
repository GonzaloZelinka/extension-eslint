module.exports = function (context) {
  return {
    'CallExpression[callee.property.name="forEach"]': function (node) {
      const indexArg = node.arguments[0];
      if (indexArg.type === "ArrowFunctionExpression") {
        const indexParam = indexArg.params[1];
        if (indexParam && indexParam.type === "Identifier") {
          const indexName = indexParam.name;
          const scope = context.getScope();
          const variable = scope.variables.find((v) => v.name === indexName);
          if (variable && variable.defs.length > 0) {
            const def = variable.defs[0];
            if (def.type === "Parameter") {
              const funcNode = def.node.parent;
              if (funcNode.type === "ArrowFunctionExpression") {
                const parentScope = context.getScope().upper;
                const parentVariable = parentScope.variables.find(
                  (v) => v.name === indexName
                );
                if (!parentVariable) {
                  context.report({
                    node: indexParam,
                    message: `Do not use external variable '${indexName}' as index in forEach loop. Instead, use index from the forEach function.`,
                  });
                }
              }
            }
          }
        }
      }
    },
  };
};

// module.exports = {
//   meta: {
//     type: "problem",
//     docs: {
//       description: "Disallow external variables as index in forEach loop",
//       category: "Possible Errors",
//       recommended: true,
//     },
//     schema: [],
//   },
//   create: function (context) {
//     return {
//       'CallExpression[callee.property.name="forEach"]': function (node) {
//         const indexArg = node.arguments[0];
//         if (indexArg.type === "ArrowFunctionExpression") {
//           const indexParam = indexArg.params[1];
//           if (indexParam && indexParam.type === "Identifier") {
//             const indexName = indexParam.name;
//             const scope = context.getScope();
//             const variable = scope.variables.find((v) => v.name === indexName);
//             if (variable && variable.defs.length > 0) {
//               const def = variable.defs[0];
//               if (def.type === "Parameter") {
//                 const funcNode = def.node.parent;
//                 if (funcNode.type === "ArrowFunctionExpression") {
//                   const parentScope = context.getScope().upper;
//                   const parentVariable = parentScope.variables.find(
//                     (v) => v.name === indexName
//                   );
//                   if (!parentVariable) {
//                     context.report({
//                       node: indexParam,
//                       message: `Do not use external variable '${indexName}' as index in forEach loop. Instead, use index from the forEach function.`,
//                     });
//                   }
//                 }
//               }
//             }
//           }
//         }
//       },
//     };
//   },
// };
