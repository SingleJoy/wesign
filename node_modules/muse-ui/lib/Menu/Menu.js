'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Popover = require('../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-menu',
  props: {
    popoverClass: [String, Object, Array],
    cover: _Popover2.default.props.cover,
    placement: _Popover2.default.props.placement,
    open: Boolean,
    openOnHover: Boolean
  },
  data: function data() {
    return {
      active: this.open,
      trigger: null
    };
  },
  mounted: function mounted() {
    this.trigger = this.$el;
  },

  methods: {
    show: function show() {
      if (this.timer) clearTimeout(this.timer);
      this.active = true;
      this.$emit('open');
    },
    hide: function hide() {
      var _this = this;

      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this.active = false;
        _this.$emit('close');
      }, 200);
    },
    createPopover: function createPopover(h) {
      var _this2 = this;

      return h(_Popover2.default, {
        class: this.popoverClass,
        style: {
          'min-width': this.trigger ? this.trigger.offsetWidth + 'px' : ''
        },
        props: {
          cover: this.cover,
          placement: this.placement,
          open: this.active,
          trigger: this.trigger
        },
        on: {
          close: this.hide,
          mouseenter: function mouseenter() {
            return _this2.openOnHover && _this2.show();
          },
          mouseleave: function mouseleave() {
            return _this2.openOnHover && _this2.hide();
          }
        }
      }, this.$slots.content);
    }
  },
  render: function render(h) {
    var _this3 = this;

    return h('div', {
      staticClass: 'mu-menu'
    }, [h('div', {
      staticClass: 'mu-menu-activator',
      on: {
        click: function click() {
          return _this3.openOnHover ? null : _this3.active ? _this3.hide() : _this3.show();
        },
        mouseenter: function mouseenter() {
          return _this3.openOnHover && _this3.show();
        },
        mouseleave: function mouseleave() {
          return _this3.openOnHover && _this3.hide();
        }
      }
    }, this.$slots.default), this.createPopover(h)]);
  },

  watch: {
    active: function active(val) {
      this.$emit('update:open', val);
    },
    open: function open(val) {
      this.active = val;
    }
  }
};