'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/snackbar.less');

var _Snackbar = require('./Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Snackbar2.default.install = function (Vue) {
  Vue.component(_Snackbar2.default.name, _Snackbar2.default);
};

exports.default = _Snackbar2.default;