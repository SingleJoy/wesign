'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _TextField = require('../TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Picker = require('../Picker');

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

var _dayjs = require('dayjs');

var _dayjs2 = _interopRequireDefault(_dayjs);

var _Button = require('../Button/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_FORMAT = {
  date: 'YYYY-MM-DD',
  time: 'HH:mm',
  year: 'YYYY',
  month: 'YYYY-MM',
  dateTime: 'YYYY-MM-DD HH:mm'
};

var PickerProps = (0, _extends3.default)({}, _Picker.TimePicker.props, _Picker.DatePicker.props);

delete PickerProps.date;
delete PickerProps.time;
delete PickerProps.type;
delete PickerProps.format;
exports.default = {
  name: 'mu-date-input',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: (0, _extends3.default)({
    container: {
      type: String,
      default: 'popover', validator: function validator(val) {
        return val && ['dialog', 'popover', 'bottomSheet'].indexOf(val) !== -1;
      }
    },
    type: {
      type: String,
      default: 'date' },
    format: {
      type: String
    },
    rangeSeparator: {
      type: String,
      default: '—'
    },
    actions: Boolean,
    clockType: _Picker.TimePicker.props.format,
    okLabel: {
      type: String,
      default: '确定'
    },
    cancelLabel: {
      type: String,
      default: '取消'
    },
    value: {},
    valueFormat: String
  }, _TextField2.default.props, PickerProps),
  data: function data() {
    return {
      open: false,
      date: this.value ? (0, _dayjs2.default)(this.value).toDate() : undefined
    };
  },

  methods: {
    changeValue: function changeValue() {
      this.closePicker();
      var value = this.valueFormat ? (0, _dayjs2.default)(this.date).format(this.valueFormat) : this.date;
      this.$emit('change', value);
      this.$emit('input', value);
    },
    closePicker: function closePicker() {
      this.open = false;
    },
    handleDateChange: function handleDateChange(date) {
      this.date = date;
      if (!this.actions) this.changeValue();
    },
    handleTimeChange: function handleTimeChange(date, mode, finished) {
      this.date = date;
      if (!finished || mode !== 'minute') return;
      if (!this.actions) this.changeValue();
    },
    generateTextFieldProps: function generateTextFieldProps() {
      return this.generateProps(_TextField2.default.props);
    },
    generateDatePickerProps: function generateDatePickerProps() {
      return this.generateProps(_Picker.DatePicker.props);
    },
    generateTimePickerProps: function generateTimePickerProps() {
      return this.generateProps(_Picker.TimePicker.props);
    },
    generateProps: function generateProps(props) {
      var _this = this;

      var obj = {};
      (0, _keys2.default)(props).forEach(function (key) {
        obj[key] = _this[key];
      });
      return obj;
    },
    createActions: function createActions(h) {
      if (!this.actions) return;
      return h('div', {
        staticClass: 'mu-picker-actions'
      }, [h(_Button2.default, {
        props: {
          flat: true,
          color: 'primary'
        },
        on: {
          click: this.closePicker
        }
      }, this.cancelLabel), h(_Button2.default, {
        props: {
          flat: true,
          color: 'primary'
        },
        on: {
          click: this.changeValue
        }
      }, this.okLabel)]);
    },
    createPicker: function createPicker(h) {
      switch (this.type) {
        case 'date':
        case 'year':
        case 'month':
          return h(_Picker.DatePicker, {
            props: (0, _extends3.default)({}, this.generateDatePickerProps(), {
              type: this.type === 'month' ? 'month' : this.type === 'year' ? 'year' : 'date',
              date: this.date
            }),
            on: {
              change: this.handleDateChange
            },
            style: {
              width: this.container === 'bottomSheet' ? 'auto' : ''
            }
          }, [this.createActions(h)]);
        case 'dateTime':
          return h(_Picker.DateTimePicker, {
            props: (0, _extends3.default)({}, this.generateDatePickerProps(), this.generateTimePickerProps(), {
              format: this.clockType,
              date: this.date
            }),
            on: {
              change: this.handleTimeChange
            },
            style: {
              width: this.container === 'bottomSheet' ? 'auto' : ''
            }
          }, [this.createActions(h)]);
        case 'time':
          return h(_Picker.TimePicker, {
            props: (0, _extends3.default)({}, this.generateTimePickerProps(), {
              time: this.date,
              format: this.clockType
            }),
            on: {
              change: this.handleTimeChange
            },
            style: {
              width: this.container === 'bottomSheet' ? 'auto' : ''
            }
          }, [this.createActions(h)]);
      }
    }
  },
  render: function render(h) {
    var _this2 = this;

    var dateStr = this.value ? (0, _dayjs2.default)(this.value).format(this.format ? this.format : DEFAULT_FORMAT[this.type]) : '';
    var listeners = this.$listeners;
    delete listeners.input;
    delete listeners.change;
    return h(_TextField2.default, {
      props: (0, _extends3.default)({}, this.generateTextFieldProps(), {
        value: dateStr
      }),
      attrs: (0, _extends3.default)({
        readonly: true
      }, this.$attrs),
      on: (0, _extends3.default)({}, listeners, {
        click: function click(e) {
          _this2.open = true;
          _this2.$emit('click', e);
        }
      })
    }, [h(_Container2.default, {
      props: {
        container: this.container,
        open: this.open,
        trigger: this.$el
      },
      on: {
        close: this.closePicker
      }
    }, [this.createPicker(h)])]);
  },

  watch: {
    value: function value(val) {
      this.date = val ? (0, _dayjs2.default)(val).toDate() : undefined;
    }
  }
};