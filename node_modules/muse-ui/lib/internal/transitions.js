'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaleTransition = exports.BottomSheetTransition = exports.PopoverTransiton = exports.SlideBottomTransition = exports.SlideTopTransition = exports.FadeTransition = exports.ExpandTransition = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _isExtensible = require('babel-runtime/core-js/object/is-extensible');

var _isExtensible2 = _interopRequireDefault(_isExtensible);

var _ExpandTransition = require('./ExpandTransition');

Object.defineProperty(exports, 'ExpandTransition', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ExpandTransition).default;
  }
});

require('../styles/transitions.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTransition(name, mode) {
  return {
    name: name,
    functional: true,
    render: function render(h, context) {
      context.data = context.data || {};
      context.data.props = { name: name };
      context.data.on = context.data.on || {};
      if (!(0, _isExtensible2.default)(context.data.on)) {
        context.data.on = (0, _extends3.default)({}, context.data.on);
      }

      if (mode) context.data.props.mode = mode;

      return h('transition', context.data, context.children);
    }
  };
}

var FadeTransition = exports.FadeTransition = createTransition('mu-fade-transition');
var SlideTopTransition = exports.SlideTopTransition = createTransition('mu-slide-top-transition');
var SlideBottomTransition = exports.SlideBottomTransition = createTransition('mu-slide-bottom-transition');
var PopoverTransiton = exports.PopoverTransiton = createTransition('mu-popover-transition');
var BottomSheetTransition = exports.BottomSheetTransition = createTransition('mu-bottom-sheet-transition');
var ScaleTransition = exports.ScaleTransition = createTransition('mu-scale-transition');