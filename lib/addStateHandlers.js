"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _helpers = require("./util/helpers");

var _usePrevious = _interopRequireDefault(require("./util/usePrevious"));

var _useComputedFromDependencies = _interopRequireDefault(require("./util/useComputedFromDependencies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var addStateHandlers = function addStateHandlers(initial, handlers, dependencies) {
  return function (props) {
    var state = {};
    var setters = {};
    var computedInitial = (0, _react.useRef)();

    var useInitial = function () {
      if (!(0, _helpers.isFunction)(initial)) return initial;

      if (computedInitial.current == null) {
        computedInitial.current = initial(props);
      }

      return computedInitial.current;
    }();

    (0, _helpers.mapWithKey)(function (val, key) {
      var _useState = (0, _react.useState)(val),
          _useState2 = _slicedToArray(_useState, 2),
          stateVal = _useState2[0],
          setter = _useState2[1];

      state[key] = stateVal;
      setters[key] = setter;
    })(useInitial);

    var createHandlerProps = function createHandlerProps() {
      return (0, _helpers.mapValues)(function (handler) {
        var curriedHandler = handler(state, props);
        return function () {
          var updatedState = curriedHandler.apply(void 0, arguments);
          (0, _helpers.mapWithKey)(function (updatedValue, stateKey) {
            setters[stateKey](updatedValue);
          })(updatedState);
        };
      })(handlers);
    };

    var handlerProps = (0, _useComputedFromDependencies["default"])({
      compute: createHandlerProps,
      dependencies: dependencies != null ? (0, _helpers.isFunction)(dependencies) ? function () {
        var prevState = (0, _usePrevious["default"])(state);

        var hasStateChanged = function () {
          if (prevState == null) return true;

          for (var key in useInitial) {
            var currentStateVal = state[key];
            var prevStateVal = prevState[key];
            if (currentStateVal !== prevStateVal) return true;
          }

          return false;
        }();

        return function (prevProps, _props) {
          if (hasStateChanged) return true;
          return dependencies(prevProps, _props);
        };
      }() : dependencies : undefined,
      additionalResolvedDependencies: (0, _helpers.isArray)(dependencies) ? (0, _helpers.mapWithKey)(function (_, key) {
        return state[key];
      })(useInitial) : undefined,
      props: props
    });
    return _objectSpread({}, props, {}, state, {}, handlerProps);
  };
};

var _default = addStateHandlers;
exports["default"] = _default;