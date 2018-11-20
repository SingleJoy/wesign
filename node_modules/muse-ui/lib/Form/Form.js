'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'mu-form',
  provide: function provide() {
    return {
      muForm: this
    };
  },

  props: {
    model: {
      type: Object,
      required: true
    },
    inline: Boolean,
    labelWidth: [String, Number],
    labelPosition: {
      type: String,
      default: 'top',
      validator: function validator(val) {
        return ['left', 'right', 'top'].indexOf(val) !== -1;
      }
    },
    autoValidate: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      items: []
    };
  },

  methods: {
    addItem: function addItem(item) {
      this.items.push(item);
    },
    removeItem: function removeItem(item) {
      var index = this.items.indexOf(item);
      if (index === -1) return;
      this.items.splice(index, 1);
    },
    validate: function validate() {
      var result = true;
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (!item.validate()) {
          result = false;
        }
      }
      return result;
    },
    clear: function clear() {
      this.items.forEach(function (item) {
        return item.errorMessage = '';
      });
    }
  },
  render: function render(h) {
    return h('form', {
      staticClass: 'mu-form',
      class: {
        'mu-form__inline': this.inline
      }
    }, this.$slots.default);
  }
};