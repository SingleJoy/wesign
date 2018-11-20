'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-icon',
  functional: true,
  props: {
    value: String,
    left: Boolean,
    right: Boolean,
    size: [Number, String],
    color: String
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props;

    if (!props.value) return null;
    data.style = data.style || {};
    data.style = (0, _extends3.default)({}, data.style, {
      'user-select': 'none',
      'font-size': props.size + 'px',
      'width': props.size + 'px',
      'height': props.size + 'px',
      'color': _color2.default.methods.getColor(props.color)
    });
    var isMaterial = props.value.indexOf(':') !== 0;
    var text = isMaterial ? props.value : '';

    data.staticClass = (data.staticClass || '') + ' mu-icon ' + _color2.default.methods.getNormalColorClass(props.color, true) + ' ' + (isMaterial ? 'material-icons' : props.value.substring(1)) + ' ' + (props.left ? 'mu-icon-left' : '') + ' ' + (props.right ? 'mu-icon-right' : '');
    return h('i', data, text);
  }
};