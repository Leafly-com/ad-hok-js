"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helpers = require("./util/helpers");

var _useComputedFromDependencies = _interopRequireDefault(require("./util/useComputedFromDependencies"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addHandlers = function addHandlers(handlers, dependencies) {
  return function (props) {
    var createHandlerProps = function createHandlerProps() {
      return (0, _helpers.mapValues)(function (createHandler) {
        var handler = createHandler(props);
        return function () {
          return handler.apply(void 0, arguments);
        };
      })(handlers);
    };

    var handlerProps = (0, _useComputedFromDependencies["default"])({
      compute: createHandlerProps,
      dependencies: dependencies,
      props: props
    });
    return _objectSpread({}, props, {}, handlerProps);
  };
};

var _default = addHandlers;
exports["default"] = _default;