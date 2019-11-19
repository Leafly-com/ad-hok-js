"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Comp = (0, _.flowMax)((0, _.branchPure)(function (_ref) {
  var a = _ref.a;
  return a > 2;
}, function (props) {
  return _objectSpread({}, props, {
    a: 999
  });
}, function (props) {
  return _objectSpread({}, props, {
    a: -888
  });
}), function (_ref2) {
  var a = _ref2.a,
      testId = _ref2.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, a);
});
describe('branchPure', function () {
  test('works when test passes', function () {
    var testId = 'pass';

    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      a: 3,
      testId: testId
    })),
        getByTestId = _render.getByTestId;

    expect(getByTestId(testId)).toHaveTextContent('999');
  });
  test('works when test fails', function () {
    var testId = 'fail';

    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      a: 1,
      testId: testId
    })),
        getByTestId = _render2.getByTestId;

    expect(getByTestId(testId)).toHaveTextContent('-888');
  });
});