'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/data-table.less');

var _DataTable = require('./DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_DataTable2.default.install = function (Vue) {
  Vue.component(_DataTable2.default.name, _DataTable2.default);
};

exports.default = _DataTable2.default;