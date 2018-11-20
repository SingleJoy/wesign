'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/bottom-sheet.less');

var _BottomSheet = require('./BottomSheet');

var _BottomSheet2 = _interopRequireDefault(_BottomSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_BottomSheet2.default.install = function (Vue) {
  Vue.component(_BottomSheet2.default.name, _BottomSheet2.default);
};

exports.default = _BottomSheet2.default;