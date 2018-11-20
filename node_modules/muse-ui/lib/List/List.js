'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-list',
  provide: function provide() {
    return {
      listItemClick: this.listItemClick,
      getNestedLevel: this.getNestedLevel,
      getToggleNested: this.getToggleNested,
      getToggleNestedType: this.getToggleNestedType,
      getListValue: this.getListValue,
      getNestedIndent: this.getNestedIndent
    };
  },

  props: {
    nestedLevel: {
      type: Number,
      default: 0
    },
    textline: {
      type: String,
      default: '',
      validator: function validator(val) {
        return ['', 'two-line', 'three-line'].indexOf(val) !== -1;
      }
    },
    nestedIndent: {
      type: Boolean,
      default: true
    },
    toggleNested: Boolean,
    toggleNestedType: {
      type: String,
      default: 'expand',
      validator: function validator(val) {
        return ['expand', 'popover'].indexOf !== -1;
      }
    },
    dense: Boolean,
    value: {}
  },
  methods: {
    listItemClick: function listItemClick(item) {
      this.$emit('change', item.value);
      this.$emit('item-click', item);
    },
    getListValue: function getListValue() {
      return this.value;
    },
    getNestedLevel: function getNestedLevel() {
      return this.nestedLevel;
    },
    getNestedIndent: function getNestedIndent() {
      return this.nestedIndent;
    },
    getToggleNested: function getToggleNested() {
      return this.toggleNested;
    },
    getToggleNestedType: function getToggleNestedType() {
      return this.toggleNestedType;
    }
  },
  render: function render(h) {
    var _class;

    return h('ul', {
      staticClass: 'mu-list',
      class: (_class = {}, (0, _defineProperty3.default)(_class, 'mu-list-' + this.textline, this.textline), (0, _defineProperty3.default)(_class, 'mu-list-dense', this.dense), _class),
      on: this.$listeners
    }, this.$slots.default);
  }
};