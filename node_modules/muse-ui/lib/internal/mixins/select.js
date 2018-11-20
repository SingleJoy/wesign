'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = function () {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'checkbox';

  var iconProps = type === 'switch' ? {} : { uncheckIcon: String, checkedIcon: String };
  return {
    mixins: [_color2.default],
    inheritAttrs: false,
    inject: {
      muFormItem: {
        default: ''
      }
    },
    model: {
      prop: 'inputValue',
      event: 'change'
    },
    props: (0, _extends3.default)({
      label: String,
      labelLeft: Boolean,
      readonly: Boolean
    }, iconProps, {
      disabled: Boolean,
      tabIndex: [Number, String]
    }),
    methods: {
      start: function start(event) {
        if (this.disabled) return;
        if (event.type !== 'mousedown' || event.button === 0) {
          this.$refs.ripple.start(event);
        }
        this.$emit(event.type, event);
      },
      end: function end(event) {
        if (this.disabled) return;
        this.$refs.ripple.end();
        this.$emit(event.type, event);
      },
      handleClick: function handleClick(e) {
        if (this.disabled || this.readonly) return;
        this.toggle();
        this.muFormItem && this.muFormItem.onBlur();
        this.$emit('click', e);
      },
      handleKeydown: function handleKeydown(e) {
        if (this.disabled) return;
        this.end(e);
        if ((0, _keycode2.default)(e) === 'enter' && !this.readonly) this.handleClick(e);
      },
      createRipple: function createRipple(h, staticClass, children) {
        return this.disabled ? h('div', {
          staticClass: staticClass
        }, children) : h(_TouchRipple2.default, {
          staticClass: staticClass,
          props: {
            rippleWrapperClass: 'mu-' + type + '-ripple-wrapper',
            centerRipple: true
          },
          ref: 'ripple'
        }, children);
      },
      createInputElement: function createInputElement(h) {
        return h('input', {
          attrs: (0, _extends3.default)({}, this.$attrs, {
            type: type === 'switch' ? 'checkbox' : type,
            disabled: this.disabled,
            checked: this.checked,
            readonly: this.readonly,
            tabindex: -1
          })
        });
      },
      createSelect: function createSelect(h, view) {
        var _class;

        var colorClass = this.getNormalColorClass(this.color, true);
        var label = this.label ? h('div', { staticClass: 'mu-' + type + '-label' }, this.label) : undefined;
        var wrapper = h('div', {
          staticClass: 'mu-' + type + '-wrapper'
        }, this.labelLeft ? [label, view] : [view, label]);

        return h('div', {
          staticClass: 'mu-' + type + ' ' + (this.checked ? colorClass : ''),
          attrs: {
            tabindex: this.disabled ? -1 : this.tabIndex ? this.tabIndex : 0
          },
          style: {
            color: this.checked && !this.disabled ? this.getColor(this.color) : ''
          },
          class: (_class = {
            'label-left': this.labelLeft,
            'disabled': this.disabled
          }, (0, _defineProperty3.default)(_class, 'mu-' + type + '-checked', this.checked), (0, _defineProperty3.default)(_class, 'no-label', !this.label), _class),
          on: (0, _extends3.default)({}, this.$listeners, {
            click: this.handleClick,
            keydown: this.handleKeydown,
            mousedown: this.start,
            mouseleave: this.end,
            mouseup: this.end,
            touchstart: this.start,
            touchend: this.end,
            touchcancel: this.end,
            focus: this.start,
            blur: this.end
          })
        }, [this.createInputElement(h), wrapper]);
      }
    }
  };
};

var _TouchRipple = require('../TouchRipple');

var _TouchRipple2 = _interopRequireDefault(_TouchRipple);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }