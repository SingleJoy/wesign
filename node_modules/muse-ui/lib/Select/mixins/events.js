'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    blur: function blur() {
      this.deactivateInput();
      this.closeMenu();
      this.$emit('blur');
    },
    focus: function focus() {
      this.activateInput();
      this.openMenu();
      this.$emit('focus');
    },
    focusInput: function focusInput() {
      this.$refs.input.focus();
    },
    createListeners: function createListeners() {
      var _this = this;

      var listeners = (0, _assign2.default)({}, this.$listeners);
      delete listeners.input;

      return (0, _extends3.default)({}, listeners, {
        click: function click(e) {
          if (_this.disabled || _this.readonly || !_this.filterable) return;
          if (_this.isFocused && !_this.open) {
            _this.openMenu();
            return;
          }
          _this.focus();
        },
        focus: function focus(e) {
          if (_this.disabled || _this.readonly || _this.isFocused) {
            return;
          }

          _this.activateInput();
          _this.$nextTick(_this.focusInput);
        },
        keydown: this.onKeydown });
    }
  }
};