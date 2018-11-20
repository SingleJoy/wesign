'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _header = require('./mixins/header');

var _header2 = _interopRequireDefault(_header);

var _body = require('./mixins/body');

var _body2 = _interopRequireDefault(_body);

var _footer = require('./mixins/footer');

var _footer2 = _interopRequireDefault(_footer);

var _colgroup = require('./mixins/colgroup');

var _colgroup2 = _interopRequireDefault(_colgroup);

var _progress = require('./mixins/progress');

var _progress2 = _interopRequireDefault(_progress);

var _mousewheel = require('../internal/directives/mousewheel');

var _mousewheel2 = _interopRequireDefault(_mousewheel);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mu-data-table',
  mixins: [_header2.default, _body2.default, _footer2.default, _colgroup2.default, _progress2.default],
  props: {
    data: Array,
    columns: Array,
    noDataText: {
      type: String,
      default: '暂无数据'
    },
    height: [String, Number],
    maxHeight: [String, Number],
    selectAll: Boolean,
    selectable: Boolean,
    selects: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    sort: {
      type: Object
    },
    checkbox: Boolean,
    stripe: Boolean,
    border: Boolean,
    loading: Boolean,
    hideHeader: Boolean,
    rowKey: {
      type: String,
      default: 'id'
    },
    fit: {
      type: Boolean,
      default: true
    },
    hover: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleHeaderFooterMousewheel: function handleHeaderFooterMousewheel(event, data) {
      var pixelX = data.pixelX,
          pixelY = data.pixelY;

      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        event.preventDefault();
        this.$refs.body.scrollLeft += data.pixelX / 5;
      }
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'mu-table',
      class: {
        'mu-table-border': this.border
      },
      style: {
        'max-height': (0, _utils.getWidth)(this.maxHeight),
        'height': (0, _utils.getWidth)(this.height)
      }
    }, [!this.hideHeader ? this.createHeader(h) : undefined, this.createProgress(h), this.createBody(h), this.createFooter(h)]);
  },

  directives: {
    mousewheel: _mousewheel2.default
  }
};