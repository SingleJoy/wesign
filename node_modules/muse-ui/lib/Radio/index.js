'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/radio.less');

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Radio2.default.install = function (Vue) {
  Vue.component(_Radio2.default.name, _Radio2.default);
};

exports.default = _Radio2.default;