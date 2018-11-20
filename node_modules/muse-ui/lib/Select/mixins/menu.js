'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _List = require('../../List');

var _List2 = _interopRequireDefault(_List);

var _Popover = require('../../Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  provide: function provide() {
    return {
      optionClick: this.optionClick,
      addOption: this.addOption,
      removeOption: this.removeOption,
      isOptionSelected: this.isOptionSelected,
      isMultiple: this.isMultiple
    };
  },

  props: {
    textline: _List2.default.props.textline,
    dense: (0, _extends3.default)({}, _List2.default.props.dense, {
      default: true
    }),
    noDataText: {
      type: String,
      default: '暂无数据显示'
    }
  },
  data: function data() {
    return {
      options: [],
      open: false
    };
  },

  computed: {
    selects: function selects() {
      return this.options.filter(function (option) {
        return option.selected;
      }).map(function (option, index) {
        return {
          value: option.value,
          label: option.label,
          index: index
        };
      });
    }
  },
  methods: {
    activateInput: function activateInput() {
      this.isFocused = true;
    },
    deactivateInput: function deactivateInput() {
      this.isFocused = false;
      this.selectedIndex = -1;
      this.setSeachValue();
    },
    openMenu: function openMenu() {
      this.open = true;
      this.setFocusIndex(this.getSelectedIndex());
    },
    closeMenu: function closeMenu() {
      this.open = false;
      this.resetFocusIndex();
    },
    toggleMenu: function toggleMenu() {
      if (this.open) return this.closeMenu();
      this.openMenu();
      this.focusInput();
    },
    isMultiple: function isMultiple() {
      return this.multiple;
    },
    isOptionSelected: function isOptionSelected(value) {
      return value === this.inputValue || this.multiple && this.inputValue && this.inputValue.indexOf(value) !== -1;
    },
    addOption: function addOption(option) {
      this.options.push(option);
    },
    removeOption: function removeOption(option) {
      var index = this.options.indexOf(option);
      if (index !== -1) this.options.splice(index, 1);
    },
    optionClick: function optionClick(option) {
      var _this = this;

      var value = option.value,
          selected = option.selected;

      var selectedValue = this.multiple ? this.inputValue ? [].concat((0, _toConsumableArray3.default)(this.inputValue)) : [] : this.inputValue;
      switch (true) {
        case selected && this.multiple:
          selectedValue.splice(selectedValue.indexOf(value), 1);
          break;
        case !selected && this.multiple:
          selectedValue = [];
          this.options.forEach(function (item) {
            if (item.value === option.value || item.selected) selectedValue.push(item.value);
          });
          break;
        default:
          selectedValue = value;
          break;
      }
      this.inputValue = selectedValue;
      if (this.multiple && this.filterable) this.searchValue = '';
      this.$nextTick(function () {
        _this.focusInput();
        if (!_this.multiple) _this.closeMenu();
      });
    },
    createContent: function createContent(h) {
      return h('div', {
        staticClass: 'mu-option-list',
        ref: 'list',
        style: {
          'maxHeight': this.maxHeight + 'px'
        }
      }, [h(_List2.default, {
        props: {
          textline: this.textline,
          dense: this.dense
        }
      }, [this.filterable && this.enableOptions.length === 0 ? h('div', { staticClass: 'mu-select-no-data' }, this.noDataText) : null, this.$slots.default])]);
    },
    createMenu: function createMenu(h) {
      var _this2 = this;

      var trigger = this.$refs.select;
      return h(_Popover2.default, {
        class: this.popoverClass,
        style: {
          'min-width': trigger ? trigger.offsetWidth + 'px' : ''
        },
        ref: 'popover',
        props: {
          trigger: trigger,
          open: this.open,
          cover: !this.filterable
        },
        on: {
          close: function close() {
            return _this2.closeMenu();
          }
        }
      }, [this.createContent(h)]);
    }
  }
};