"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestingLibrary = require("react-testing-library");

require("jest-dom/extend-expect");

var _fp = require("lodash/fp");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-console */
var Comp = (0, _fp.flow)((0, _.addProps)(function (_ref) {
  var x = _ref.x;
  console.log('recomputing y');
  return {
    y: x * 2
  };
}, ['x', 'user.id']), function (_ref2) {
  var y = _ref2.y,
      testId = _ref2.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, y);
});
var Comp2 = (0, _fp.flow)((0, _.addProps)(function (_ref3) {
  var x = _ref3.x;
  console.log('recomputing y');
  return {
    y: x * 2
  };
}, function (prevProps, props) {
  return props.x > prevProps.x;
}), function (_ref4) {
  var y = _ref4.y,
      testId = _ref4.testId;
  return _react["default"].createElement("div", {
    "data-testid": testId
  }, y);
});
describe('addProps', function () {
  test('adds object', function () {
    expect((0, _.addProps)({
      b: 2
    })({
      a: 1,
      b: 3
    })).toEqual({
      a: 1,
      b: 2
    });
  });
  test('adds function', function () {
    expect((0, _.addProps)(function (_ref5) {
      var b = _ref5.b;
      return {
        b: b + 1
      };
    })({
      a: 1,
      b: 2
    })).toEqual({
      a: 1,
      b: 3
    });
  });
  test('works with dependencies list', function () {
    jest.spyOn(console, 'log').mockImplementation(function () {});
    var testId = 'basic';

    var _render = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp, {
      x: 2,
      z: 3,
      testId: testId,
      user: {
        id: 3
      }
    })),
        getByTestId = _render.getByTestId,
        rerender = _render.rerender;

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('4');
    rerender(_react["default"].createElement(Comp, {
      x: 2,
      z: 5,
      testId: testId,
      user: {
        id: 3
      }
    }));
    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();
    rerender(_react["default"].createElement(Comp, {
      x: 4,
      z: 5,
      testId: testId
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('8');
    rerender(_react["default"].createElement(Comp, {
      x: 4,
      z: 5,
      testId: testId,
      user: {
        id: 4
      }
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
  });
  test('works with dependencies callback', function () {
    jest.spyOn(console, 'log').mockImplementation(function () {});
    var testId = 'dependencies-callback';

    var _render2 = (0, _reactTestingLibrary.render)(_react["default"].createElement(Comp2, {
      x: 2,
      z: 3,
      testId: testId
    })),
        getByTestId = _render2.getByTestId,
        rerender = _render2.rerender;

    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('4');
    rerender(_react["default"].createElement(Comp2, {
      x: 1,
      z: 5,
      testId: testId
    }));
    expect(console.log).not.toHaveBeenCalled();
    console.log.mockClear();
    rerender(_react["default"].createElement(Comp2, {
      x: 4,
      z: 5,
      testId: testId
    }));
    expect(console.log).toHaveBeenCalledTimes(1);
    console.log.mockClear();
    expect(getByTestId(testId)).toHaveTextContent('8');
  });
});