# NodeJS Version Checker

This module allows you to check and compare versions of NodeJS and npm.

<a href="https://nodei.co/npm/nodejs-version-checker">
  <img src="https://nodei.co/npm/nodejs-version-checker.png?downloads=true">
</a>

[![npm version](https://img.shields.io/npm/v/nodejs-version-checker.svg?style=flat-square)](https://badge.fury.io/js/nodejs-version-checker)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/LuisFuenTech/nodejs-version-checker/blob/master/LICENSE)
[![NodeJS](https://img.shields.io/badge/node-6.x.x-brightgreen?style=flat-square)](https://github.com/LuisFuenTech/nodejs-version-checker/blob/master/package.json)
[![install size](https://packagephobia.now.sh/badge?p=nodejs-version-checker)](https://packagephobia.now.sh/result?p=nodejs-version-checker)
[![npm downloads](https://img.shields.io/npm/dm/nodejs-version-checker.svg?style=flat-square)](http://npm-stat.com/charts.html?package=nodejs-version-checker)

# Compatibility

The minimum supported version of Node.js is v6.

# Usage

## Installation

```bash
$ npm i nodejs-version-checker
```

<!-- ## Test

Run from the root folder:

```bash
$ npm run test
``` -->

## Importing

```js
const nodeJSVersionChecker = require("nodejs-version-checker");
```

## Example

```js
const nodeJSVersionChecker = require("nodejs-version-checker");

//Node version <=6.x.x
nodeJSVersionChecker({ node: "6.17.1", npm: "3.10.0"})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.error(error));

//Node version >=6.x.x
(async () => {
  try {
    const result = await nodeJSVersionChecker();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();
-----------------------------------------------------

nodeJSVersionChecker({ node: "6.17.1"})
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.error(error));

-----------------------------------------------------

nodeJSVersionChecker("6.17.1")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.error(error));

-----------------------------------------------------

nodeJSVersionChecker()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.error(error));
```

Output

```bash
{ node:
   { current: '8.17.1',
     expected: '6.17.1',
     comparison: 1,
     comparisonString: 'greater' },
  npm:
   { current: '3.5.10',
     expected: '3.10.0',
     comparison: -1,
     comparisonString: 'less' } }
-----------------------------------------------------

{ node:
   { current: '6.17.1',
     expected: '6.17.1',
     comparison: 0,
     comparisonString: 'equal' } }

-----------------------------------------------------

{ node:
   { current: '6.17.1',
     expected: '6.17.1',
     comparison: 0,
     comparisonString: 'equal' } }

-----------------------------------------------------
// Default result if no parameters is passed
{ node: { current: '6.17.1' } }

```

# Comparison mapping

- `comparison: 0`: The local version is _equal_ to the one expected
- `comparison: 1`: The local version is _greater_ than the one expected
- `comparison: -1`: The local version is _less_ than the one expected
- If the key does not appear, it means that a comparison parameter was not passed

# License

[MIT](https://github.com/LuisFuenTech/nodejs-version-checker/blob/master/LICENSE)
