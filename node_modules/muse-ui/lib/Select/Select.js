'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _input = require('../internal/mixins/input.js');

var _input2 = _interopRequireDefault(_input);

var _menu = require('./mixins/menu');

var _menu2 = _interopRequireDefault(_menu);

var _selection = require('./mixins/selection');

var _selection2 = _interopRequireDefault(_selection);

var _events = require('./mixins/events');

var _events2 = _interopRequireDefault(_events);

var _keyboard = require('./mixins/keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-select',
  mixins: [_input2.default, _menu2.default, _selection2.default, _events2.default, _keyboard2.default],
  props: {
    popoverClass: [String, Object, Array],
    multiple: Boolean,
    maxHeight: {
      type: [String, Number],
      default: 300
    },
    readonly: Boolean,
    chips: Boolean,
    placeholder: String,
    separator: {
      type: String,
      default: ','
    },
    filterable: Boolean },
  render: function render(h) {
    var _createSelection = this.createSelection(h),
        data = _createSelection.data,
        children = _createSelection.children,
        defaultActionIcon = _createSelection.defaultActionIcon;

    return this.createInput(h, data, [].concat((0, _toConsumableArray3.default)(children), [this.createMenu(h)]), defaultActionIcon);
  }
};