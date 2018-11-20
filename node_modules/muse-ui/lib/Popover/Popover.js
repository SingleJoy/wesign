'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _popup = require('../internal/mixins/popup');

var _popup2 = _interopRequireDefault(_popup);

var _scroll = require('../internal/directives/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _resize = require('../internal/directives/resize');

var _resize2 = _interopRequireDefault(_resize);

var _clickOutside = require('../internal/directives/click-outside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

var _transitions = require('../internal/transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPACE = 8;
exports.default = {
  name: 'mu-popover',
  mixins: [_popup2.default],
  directives: {
    scroll: _scroll2.default,
    resize: _resize2.default,
    'click-outside': _clickOutside2.default
  },
  props: {
    overlay: {
      default: false
    },
    lazy: Boolean,
    cover: Boolean,
    trigger: {},
    placement: {
      type: String,
      default: 'bottom-start',
      validator: function validator(val) {
        return ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].indexOf(val) !== -1;
      }
    }
  },
  methods: {
    getLeftPosition: function getLeftPosition(width, react) {
      var left = 0;
      var maxLeft = window.innerWidth - SPACE - width;
      var minLeft = SPACE;
      switch (this.placement) {
        case 'left':
        case 'left-start':
        case 'left-end':
          left = react.left - width;
          if (this.cover) {
            left += react.width;
          } else if (left < minLeft) {
            left = react.left + react.width;
          };
          break;
        case 'right':
        case 'right-start':
        case 'right-end':
          left = this.cover ? react.left : react.left + react.width > maxLeft ? react.left - width : react.left + react.width;
          break;
        case 'top':
        case 'bottom':
          left = react.left + react.width / 2 - width / 2;
          break;
        case 'bottom-start':
        case 'top-start':
          left = react.left;
          break;
        case 'bottom-end':
        case 'top-end':
          left = react.left + react.width - width;
          break;
      }
      left = Math.min(maxLeft, left);
      left = Math.max(minLeft, left);
      return left;
    },
    getTopPosition: function getTopPosition(height, react) {
      var top = 0;
      var maxTop = window.innerHeight - SPACE - height;
      var minTop = SPACE;
      switch (this.placement) {
        case 'top':
        case 'top-start':
        case 'top-end':
          top = react.top - height;
          if (!this.cover) {
            if (top < minTop) top = react.top + react.height;
          } else {
            top += react.height;
          }
          break;
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
          top = this.cover ? react.top : react.top + react.height > maxTop ? react.top - height : react.top + react.height;
          break;
        case 'left':
        case 'right':
          top = react.top + react.height / 2 - height / 2;
          break;
        case 'left-start':
        case 'right-start':
          top = react.top;
          break;
        case 'left-end':
        case 'right-end':
          top = react.top + react.height - height;
          break;
      }
      top = Math.min(maxTop, top);
      top = Math.max(minTop, top);
      return top;
    },
    setStyle: function setStyle() {
      if (!this.open) return;
      var el = this.$el;
      var triggerEl = this.trigger;
      if (!el || !triggerEl) return;
      var react = triggerEl.getBoundingClientRect();
      if (react.top < -react.height || react.top > window.innerHeight) this.close('overflow');
      el.style.top = this.getTopPosition(el.offsetHeight, react) + 'px';
      el.style.left = this.getLeftPosition(el.offsetWidth, react) + 'px';
    },
    close: function close(reason) {
      if (!this.open) return;
      this.$emit('update:open', false);
      this.$emit('close', reason);
    },
    clickOutSide: function clickOutSide(e) {
      if (this.trigger && this.trigger.contains(e.target)) return;
      this.close('clickOutSide');
    }
  },
  mounted: function mounted() {
    this.setStyle();
  },
  updated: function updated() {
    var _this = this;

    setTimeout(function () {
      _this.setStyle();
    }, 0);
  },
  render: function render(h) {
    var directives = [{
      name: 'resize',
      value: this.setStyle
    }, {
      name: 'scroll',
      value: {
        target: this.trigger,
        callback: this.setStyle
      }
    }, {
      name: 'click-outside',
      value: this.clickOutSide
    }];
    if (!this.lazy) {
      directives.push({
        name: 'show',
        value: this.open
      });
    }

    return h(_transitions.PopoverTransiton, [!this.lazy || this.open ? h('div', {
      staticClass: 'mu-popover transition-' + this.placement,
      style: {
        'z-index': this.zIndex
      },
      on: this.$listeners,
      directives: directives
    }, this.$slots.default) : undefined]);
  }
};