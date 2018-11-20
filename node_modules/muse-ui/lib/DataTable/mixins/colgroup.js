'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resize = require('../../internal/directives/resize');

var _resize2 = _interopRequireDefault(_resize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      cols: [],
      tableWidth: ''
    };
  },
  mounted: function mounted() {
    this.setCols();
  },

  methods: {
    setCols: function setCols() {
      var _this = this;

      var minWidth = 80;
      var checkboxColWidth = 75;
      var tableElWidth = this.$el.offsetWidth;
      var widthArr = this.columns.filter(function (column) {
        return column.width;
      }).map(function (column) {
        return Number(column.width);
      });
      widthArr.forEach(function (width) {
        return tableElWidth -= width;
      });
      var otherWidth = Math.floor(tableElWidth / (this.columns.length - widthArr.length));
      if (otherWidth < minWidth) otherWidth = minWidth;
      this.cols = this.columns.map(function (column) {
        return column.width ? column.width : _this.fit ? otherWidth : minWidth;
      });
      if (this.checkbox) this.cols.unshift(checkboxColWidth);
      var tableWidth = 0;
      this.cols.forEach(function (width) {
        return tableWidth += Number(width);
      });
      this.tableWidth = tableWidth + 'px';
    },
    createColGroup: function createColGroup(h) {
      return h('colgroup', {
        directives: [{
          name: 'resize',
          value: this.setCols
        }]
      }, this.cols.map(function (width) {
        return h('col', {
          attrs: {
            width: width
          }
        });
      }));
    }
  },
  watch: {
    columns: function columns() {
      this.setCols();
    }
  },
  directives: {
    resize: _resize2.default
  }
};