'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Paper = require('../Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-appbar',
  mixins: [_color2.default],
  props: {
    zDepth: {
      type: Number,
      default: 4
    },
    title: {
      type: String,
      default: ''
    },
    textColor: String
  },
  render: function render(h) {
    var slots = this.$slots;
    var left = slots.left && slots.left.length > 0 ? h('div', { staticClass: 'mu-appbar-left' }, slots.left) : undefined;
    var right = slots.right && slots.right.length > 0 ? h('div', { staticClass: 'mu-appbar-right' }, slots.right) : undefined;
    var center = h('div', { staticClass: 'mu-appbar-title' }, slots.default && slots.default.length > 0 ? slots.default : this.title);

    return h(_Paper2.default, {
      staticClass: 'mu-appbar ' + this.getColorClass() + ' ' + this.getTextColorClass(),
      style: {
        'background-color': this.getColor(this.color),
        color: this.getColor(this.textColor)
      },
      props: {
        zDepth: this.zDepth,
        rounded: false
      }
    }, [left, center, right]);
  }
};