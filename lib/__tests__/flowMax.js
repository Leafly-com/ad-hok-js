"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var Comp = (0, _.flowMax)((0, _.addState)('x', 'setX', 'abcd'), function (_ref) {
  var x = _ref.x,
      setX = _ref.setX;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "a"
  }, x), _react["default"].createElement("button", {
    onClick: function onClick() {
      setX('efg');
    }
  }, "update"));
});
var addStuff = (0, _.flowMax)((0, _.addWrapper)(function (_ref2) {
  var _render = _ref2.render,
      props = _ref2.props;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "passed-z"
  }, props.z), _render({
    y: 2
  }));
}), (0, _.addProps)({
  d: 4
}));
var Outer = (0, _.flowMax)(addStuff, function (_ref3) {
  var y = _ref3.y,
      d = _ref3.d,
      e = _ref3.e;
  return _react["default"].createElement("div", null, _react["default"].createElement("div", {
    "data-testid": "child-y"
  }, y), _react["default"].createElement("div", {
    "data-testid": "child-d"
  }, d), _react["default"].createElement("div", {
    "data-testid": "child-e"
  }, e));
});
describe('flowMax', function () {
  test('works in place of flow()', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, null)),
        getByText = _render2.getByText,
        getByTestId = _render2.getByTestId;

    _reactTestingLibrary.fireEvent.click(getByText(/update/));

    expect(getByTestId('a')).toHaveTextContent('efg');
  });
  test('nesting with magic helpers', function () {
    var _render3 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Outer, {
      z: 3,
      e: 5
    })),
        getByTestId = _render3.getByTestId;

    expect(getByTestId('passed-z')).toHaveTextContent('3');
    expect(getByTestId('child-y')).toHaveTextContent('2');
    expect(getByTestId('child-d')).toHaveTextContent('4');
    expect(getByTestId('child-e')).toHaveTextContent('5');
  });
  test('throws nice error when passed a non-function', function () {
    expect(function () {
      (0, _.flowMax)({
        notA: 'function'
      });
    }).toThrow(TypeError);
  });
});