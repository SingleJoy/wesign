'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/checkbox.less');

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Checkbox2.default.install = function (Vue) {
  Vue.component(_Checkbox2.default.name, _Checkbox2.default);
};

exports.default = _Checkbox2.default;