'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _testing = require('../utils/testing');

var _testing2 = _interopRequireDefault(_testing);

var _Alert = require('./Alert');

var _Alert2 = _interopRequireDefault(_Alert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _testing2.default)('Alert.vue', function (_ref) {
  var mount = _ref.mount;

  it('show be show by default', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var wrapper;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(_Alert2.default, {
              propsData: {
                show: true
              }
            });


            expect(wrapper.vm.show).toBe(true);
            expect(wrapper.html()).toMatchSnapshot();

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  })));
});