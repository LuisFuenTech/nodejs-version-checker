const { resolveVersionComparison } = require("./utils");

const proccessVersion = ({
  resolve,
  node,
  npm,
  nodeVersion,
  npmVersion = ""
}) => {
  const result = {};
  const _node = {};
  const _npm = {};

  npmVersion = npmVersion.replace(/v/gi, "");
  _node.current = nodeVersion = nodeVersion.replace(/v/gi, "");

  /* istanbul ignore else */
  if (node) {
    const [comparison, comparisonString] = resolveVersionComparison(
      nodeVersion,
      node
    );
    _node.expected = node;
    _node.comparison = comparison;
    _node.comparisonString = comparisonString;
  }
  result.node = _node;

  /* istanbul ignore else */
  if (npm) {
    _npm.current = npmVersion || "not installed";
    _npm.expected = npm;

    /* istanbul ignore else */
    if (npmVersion) {
      const [comparison, comparisonString] = resolveVersionComparison(
        npmVersion,
        npm
      );

      _npm.comparison = comparison;
      _npm.comparisonString = comparisonString;
    }
    result.npm = _npm;
  }

  return resolve(result);
};

module.exports = {
  proccessVersion
};
