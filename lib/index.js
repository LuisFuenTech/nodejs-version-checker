"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var resolveComparison = function resolveComparison() {
  var _firstValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var _secondValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  var firstValues = _firstValues.split(".").map(Number);

  var secondValues = _secondValues.split(".").map(Number);

  var referenceLength = Math.max(firstValues.length, secondValues.length);
  var coefficient = 1;
  var counter = {
    first: 0,
    second: 0
  };

  for (var i = 0; i < referenceLength; i++) {
    /* istanbul ignore else */
    if ((firstValues[i] || 0) < (secondValues[i] || 0)) counter.second += coefficient;
    /* istanbul ignore else */

    if ((firstValues[i] || 0) > (secondValues[i] || 0)) counter.first += coefficient;
    coefficient /= 2;
  }
  /* istanbul ignore else */


  if (counter.first > counter.second) return [1, "greater"];
  /* istanbul ignore else */

  if (counter.first < counter.second) return [-1, "less"];
  return [0, "equal"];
};

var checkNodeJSVersion = function checkNodeJSVersion(options) {
  return new Promise(function (resolve, reject) {
    var _require = require("child_process"),
        exec = _require.exec;

    var result = {};
    var _node = {};
    var _npm = {};
    var node;
    var npm;
    /* istanbul ignore else */

    if (typeof options === "string") node = options;
    /* istanbul ignore else */

    if (_typeof(options) === "object") {
      node = options.node && options.node.toString().replace(/v/gi, "");
      npm = options.npm && options.npm.toString().replace(/v/gi, "");
    }

    exec("node -v && npm -v", function (error, stdout, stderr) {
      var _stdout$replace$split = stdout.replace(/v/gi, "").split("\n"),
          _stdout$replace$split2 = _slicedToArray(_stdout$replace$split, 2),
          nodeVersion = _stdout$replace$split2[0],
          npmVersion = _stdout$replace$split2[1];

      _node.current = nodeVersion;
      /* istanbul ignore else */

      if (node) {
        var _resolveComparison = resolveComparison(nodeVersion, node),
            _resolveComparison2 = _slicedToArray(_resolveComparison, 2),
            comparison = _resolveComparison2[0],
            comparisonString = _resolveComparison2[1];

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
          var _resolveComparison3 = resolveComparison(npmVersion, npm),
              _resolveComparison4 = _slicedToArray(_resolveComparison3, 2),
              _comparison = _resolveComparison4[0],
              _comparisonString = _resolveComparison4[1];

          _npm.comparison = _comparison;
          _npm.comparisonString = _comparisonString;
        }

        result.npm = _npm;
      }

      resolve(result);
    });
  });
};

module.exports = checkNodeJSVersion;