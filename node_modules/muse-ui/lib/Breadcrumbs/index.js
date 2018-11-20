'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BreadcrumbsItem = exports.Breadcrumbs = undefined;

require('../styles/components/breadcrumbs.less');

var _Breadcrumbs = require('./Breadcrumbs');

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _BreadcrumbsItem = require('./BreadcrumbsItem');

var _BreadcrumbsItem2 = _interopRequireDefault(_BreadcrumbsItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Breadcrumbs2.default.install = function (Vue) {
  Vue.component(_Breadcrumbs2.default.name, _Breadcrumbs2.default);
  Vue.component(_BreadcrumbsItem2.default.name, _BreadcrumbsItem2.default);
};

exports.Breadcrumbs = _Breadcrumbs2.default;
exports.BreadcrumbsItem = _BreadcrumbsItem2.default;
exports.default = _Breadcrumbs2.default;