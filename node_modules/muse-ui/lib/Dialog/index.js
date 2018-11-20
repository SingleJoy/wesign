'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/dialog.less');

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Dialog2.default.install = function (Vue) {
  Vue.component(_Dialog2.default.name, _Dialog2.default);
};

exports.default = _Dialog2.default;