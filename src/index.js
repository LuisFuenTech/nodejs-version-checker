const resolveComparison = (_firstValues = "", _secondValues = "") => {
  const firstValues = _firstValues.split(".").map(Number);
  const secondValues = _secondValues.split(".").map(Number);
  const referenceLength = Math.max(firstValues.length, secondValues.length);
  let coefficient = 1;
  const counter = { first: 0, second: 0 };

  for (let i = 0; i < referenceLength; i++) {
    /* istanbul ignore else */
    if ((firstValues[i] || 0) < (secondValues[i] || 0))
      counter.second += coefficient;
    /* istanbul ignore else */
    if ((firstValues[i] || 0) > (secondValues[i] || 0))
      counter.first += coefficient;

    coefficient /= 2;
  }

  /* istanbul ignore else */
  if (counter.first > counter.second) return [1, "greater"];
  /* istanbul ignore else */
  if (counter.first < counter.second) return [-1, "less"];
  return [0, "equal"];
};

const checkNodeJSVersion = (options) => {
  return new Promise((resolve, reject) => {
    const { exec } = require("child_process");
    const result = {};
    const _node = {};
    const _npm = {};
    let node;
    let npm;

    /* istanbul ignore else */
    if (typeof options === "string") node = options;
    /* istanbul ignore else */
    if (typeof options === "object") {
      node = options.node && options.node.toString().replace(/v/gi, "");
      npm = options.npm && options.npm.toString().replace(/v/gi, "");
    }

    exec("node -v && npm -v", (error, stdout, stderr) => {
      const [nodeVersion, npmVersion] = stdout.replace(/v/gi, "").split("\n");
      _node.current = nodeVersion;

      /* istanbul ignore else */
      if (node) {
        const [comparison, comparisonString] = resolveComparison(
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
          const [comparison, comparisonString] = resolveComparison(
            npmVersion,
            npm
          );

          _npm.comparison = comparison;
          _npm.comparisonString = comparisonString;
        }
        result.npm = _npm;
      }

      resolve(result);
    });
  });
};

module.exports = checkNodeJSVersion;
