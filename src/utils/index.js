const resolveVersionComparison = (firstValue = "", secondValue = "") => {
  const counter = { [firstValue]: 0, [secondValue]: 0 };
  const firstValues = firstValue.toString().split(".").map(Number);
  const secondValues = secondValue.toString().split(".").map(Number);
  const referenceLength = Math.max(firstValues.length, secondValues.length);
  let coefficient = 1;

  for (let i = 0; i < referenceLength; i++) {
    /* istanbul ignore else */
    if ((firstValues[i] || 0) < (secondValues[i] || 0))
      counter[secondValue] += coefficient;
    /* istanbul ignore else */
    if ((firstValues[i] || 0) > (secondValues[i] || 0))
      counter[firstValue] += coefficient;

    coefficient /= 2;
  }

  /* istanbul ignore else */
  if (counter[firstValue] > counter[secondValue]) return [1, "greater"];
  /* istanbul ignore else */
  if (counter[firstValue] < counter[secondValue]) return [-1, "less"];
  return [0, "equal"];
};

module.exports = {
  resolveVersionComparison
};
