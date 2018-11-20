'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/slider.less');

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Slider2.default.install = function (Vue) {
  Vue.component(_Slider2.default.name, _Slider2.default);
};

exports.default = _Slider2.default;