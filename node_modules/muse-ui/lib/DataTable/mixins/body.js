'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _Checkbox = require('../../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _transitions = require('../../internal/transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      hoverIndex: -1,
      expandIndex: -1,
      isSelectAll: false
    };
  },

  methods: {
    handleScroll: function handleScroll(e) {
      var scrollLeft = e.target.scrollLeft;
      var theader = this.$refs.header;
      var tfooter = this.$refs.tfooter;
      if (theader) theader.scrollLeft = scrollLeft;
      if (tfooter) tfooter.scrollLeft = scrollLeft;
    },
    isSelected: function isSelected(index) {
      return this.selects.indexOf(index) !== -1;
    },
    toggleSelect: function toggleSelect(index) {
      if (!this.selectable) return;
      var selects = [].concat((0, _toConsumableArray3.default)(this.selects));
      var selectIndex = selects.indexOf(index);
      if (selectIndex !== -1) {
        selects.splice(selectIndex, 1);
      } else {
        selects.push(index);
      }
      selects.sort(function (a, b) {
        return a - b;
      });
      this.$emit('update:selects', selects);
      this.$emit('select-change', index, selects);
    },
    toggleExpand: function toggleExpand(index) {
      this.expandIndex = this.expandIndex === index ? -1 : index;
    },
    createEmpty: function createEmpty(h) {
      return [this.$slots.empty ? this.$slots.empty : h('div', { staticClass: 'mu-table-empty' }, this.noDataText)];
    },
    createSlotContent: function createSlotContent(row, index) {
      return this.$scopedSlots.default({
        row: row,
        $index: index
      });
    },
    createCheckboxTd: function createCheckboxTd(h, index) {
      return h('td', {
        staticClass: 'mu-checkbox-col'
      }, [h(_Checkbox2.default, {
        props: {
          inputValue: this.isSelected(index),
          disabled: !this.selectable
        }
      })]);
    },
    createContent: function createContent(h) {
      var _this = this;

      var contents = [];

      var _loop = function _loop(index) {
        var row = _this.data[index];
        var arr = _this.$scopedSlots.default ? _this.createSlotContent(row, index) : _this.columns.map(function (column) {
          return h('td', {}, row[column.name]);
        }) || [];
        if (_this.checkbox) arr.unshift(_this.createCheckboxTd(h, index));
        contents.push(h('tr', {
          class: {
            'is-hover': _this.hover && _this.hoverIndex === index,
            'is-stripe': _this.stripe && index % 2 !== 0,
            'is-selected': _this.isSelected(index)
          },
          on: {
            mouseenter: function mouseenter() {
              return _this.hoverIndex = index;
            },
            mouseleave: function mouseleave() {
              return _this.hoverIndex = -1;
            },
            click: function click() {
              _this.toggleSelect(index);
              _this.toggleExpand(index);
              _this.$emit('row-click', index, row);
            }
          },
          key: row[_this.rowKey]
        }, arr));

        if (_this.$scopedSlots.expand) {
          contents.push(h('tr', {
            staticClass: 'mu-table-expand-row'
          }, [h('td', {
            attrs: {
              colspan: _this.columns.length + (_this.checkbox ? 1 : 0)
            },
            class: {
              'is-expand': _this.expandIndex === index
            }
          }, _this.expandIndex === index ? [h(_transitions.ExpandTransition, {}, _this.$scopedSlots.expand({
            row: row,
            $index: index
          }))] : undefined)]));
        }
      };

      for (var index = 0; index < this.data.length; index++) {
        _loop(index);
      }
      return contents;
    },
    createBody: function createBody(h) {
      return this.data && this.data.length > 0 ? h('div', {
        staticClass: 'mu-table-body-wrapper',
        on: {
          scroll: this.handleScroll
        },
        ref: 'body'
      }, [h('table', {
        staticClass: 'mu-table-body',
        style: {
          width: this.tableWidth
        }
      }, [this.createColGroup(h), h('tbody', {}, this.createContent(h))])]) : this.createEmpty(h);
    }
  },
  watch: {
    selects: function selects(val) {
      this.isSelectAll = val && val.length >= this.data.length;
    }
  }
};