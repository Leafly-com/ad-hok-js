"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable react/prop-types */
var Wrapper = function Wrapper(_ref) {
  var x = _ref.x,
      children = _ref.children;
  return _react["default"].createElement("div", {
    "data-testid": "wrapper"
  }, _react["default"].createElement("span", {
    "data-testid": "passed-x"
  }, x), children);
};

var Comp = (0, _.flowMax)((0, _.addWrapper)(function (_ref2) {
  var _render = _ref2.render,
      props = _ref2.props;
  return _react["default"].createElement(Wrapper, {
    x: props.x
  }, _render({
    z: 3
  }));
}), function (_ref3) {
  var y = _ref3.y,
      z = _ref3.z;
  return _react["default"].createElement("div", null, _react["default"].createElement("span", {
    "data-testid": "child-y"
  }, y), _react["default"].createElement("span", {
    "data-testid": "child-z"
  }, z));
});
describe('addWrapper', function () {
  test('works', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      x: "2",
      y: "4"
    })),
        getByTestId = _render2.getByTestId;

    expect(getByTestId('child-y')).toHaveTextContent('4');
    expect(getByTestId('child-z')).toHaveTextContent('3');
    expect(getByTestId('passed-x')).toHaveTextContent('2');
  });
});