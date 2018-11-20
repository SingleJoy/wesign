'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/button.less');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Button2.default.install = function (Vue) {
  Vue.component(_Button2.default.name, _Button2.default);
};

exports.default = _Button2.default;