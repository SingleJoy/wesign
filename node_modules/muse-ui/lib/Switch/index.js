'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/switch.less');

var _Switch = require('./Switch');

var _Switch2 = _interopRequireDefault(_Switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Switch2.default.install = function (Vue) {
  Vue.component(_Switch2.default.name, _Switch2.default);
};

exports.default = _Switch2.default;