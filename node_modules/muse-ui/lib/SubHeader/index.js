'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../styles/components/subheader.less');

var _SubHeader = require('./SubHeader');

var _SubHeader2 = _interopRequireDefault(_SubHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_SubHeader2.default.install = function (Vue) {
  Vue.component(_SubHeader2.default.name, _SubHeader2.default);
};

exports.default = _SubHeader2.default;