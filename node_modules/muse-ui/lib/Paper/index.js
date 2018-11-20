'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/paper.less');

var _Paper = require('./Paper');

var _Paper2 = _interopRequireDefault(_Paper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Paper2.default.install = function (Vue) {
  Vue.component(_Paper2.default.name, _Paper2.default);
};

exports.default = _Paper2.default;