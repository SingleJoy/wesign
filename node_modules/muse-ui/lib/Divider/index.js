'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/divider.less');

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Divider2.default.install = function (Vue) {
  Vue.component(_Divider2.default.name, _Divider2.default);
};

exports.default = _Divider2.default;