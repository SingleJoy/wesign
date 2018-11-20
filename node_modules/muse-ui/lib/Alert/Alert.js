'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = require('../internal/mixins/color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-alert',
  mixins: [_color2.default],
  props: {
    delete: Boolean,
    transition: String,
    mode: String,
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleDelete: function handleDelete(e) {
      e.stopPropagation();
      this.$emit('update:show', false);
      this.$emit('delete');
    }
  },
  render: function render(h) {
    var deleteIcon = h('svg', {
      staticClass: 'mu-alert-delete-icon',
      attrs: {
        viewBox: '0 0 24 24'
      },
      on: {
        click: this.handleDelete
      }
    }, [h('path', {
      attrs: {
        d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
      }
    })]);

    return h('transition', {
      props: {
        mode: this.mode,
        name: this.transition
      }
    }, [this.show ? h('div', {
      staticClass: 'mu-alert ' + this.getColorClass(),
      style: {
        'background-color': this.getColor(this.color)
      },
      on: this.$listeners
    }, [this.$slots.default, this.delete ? deleteIcon : undefined]) : undefined]);
  }
};