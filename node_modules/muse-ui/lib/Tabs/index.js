'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tab = exports.Tabs = undefined;

require('../styles/components/tabs.less');

var _Tabs = require('./Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Tabs2.default.install = function (Vue) {
  Vue.component(_Tabs2.default.name, _Tabs2.default);
  Vue.component(_Tab2.default.name, _Tab2.default);
};

exports.Tabs = _Tabs2.default;
exports.Tab = _Tab2.default;
exports.default = _Tabs2.default;