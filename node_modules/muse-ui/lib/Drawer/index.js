'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/drawer.less');

var _Drawer = require('./Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Drawer2.default.install = function (Vue) {
  Vue.component(_Drawer2.default.name, _Drawer2.default);
};

exports.default = _Drawer2.default;