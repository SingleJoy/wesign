'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/text-field.less');

var _TextField = require('./TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_TextField2.default.install = function (Vue) {
  Vue.component(_TextField2.default.name, _TextField2.default);
};

exports.default = _TextField2.default;