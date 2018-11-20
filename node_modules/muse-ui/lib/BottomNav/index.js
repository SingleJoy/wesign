'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BottomNavItem = exports.BottomNav = undefined;

require('../styles/components/bottom-nav.less');

var _BottomNav = require('./BottomNav');

var _BottomNav2 = _interopRequireDefault(_BottomNav);

var _BottomNavItem = require('./BottomNavItem');

var _BottomNavItem2 = _interopRequireDefault(_BottomNavItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_BottomNav2.default.install = function (Vue) {
  Vue.component(_BottomNav2.default.name, _BottomNav2.default);
  Vue.component(_BottomNavItem2.default.name, _BottomNavItem2.default);
};

exports.BottomNav = _BottomNav2.default;
exports.BottomNavItem = _BottomNavItem2.default;
exports.default = _BottomNav2.default;