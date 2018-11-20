'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormItem = exports.Form = undefined;

require('../styles/components/form.less');

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormItem = require('./FormItem');

var _FormItem2 = _interopRequireDefault(_FormItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Form2.default.install = function (Vue) {
  Vue.component(_Form2.default.name, _Form2.default);
  Vue.component(_FormItem2.default.name, _FormItem2.default);
};

exports.Form = _Form2.default;
exports.FormItem = _FormItem2.default;
exports.default = _Form2.default;