'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/pagination.less');

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Pagination2.default.install = function (Vue) {
  Vue.component(_Pagination2.default.name, _Pagination2.default);
};

exports.default = _Pagination2.default;