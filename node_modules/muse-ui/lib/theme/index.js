'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _baseTheme = require('./baseTheme');

var _baseTheme2 = _interopRequireDefault(_baseTheme);

var _theme = require('../AppBar/theme');

var _theme2 = _interopRequireDefault(_theme);

var _theme3 = require('../Avatar/theme');

var _theme4 = _interopRequireDefault(_theme3);

var _theme5 = require('../Badge/theme');

var _theme6 = _interopRequireDefault(_theme5);

var _theme7 = require('../BottomNav/theme');

var _theme8 = _interopRequireDefault(_theme7);

var _theme9 = require('../BottomSheet/theme');

var _theme10 = _interopRequireDefault(_theme9);

var _theme11 = require('../Breadcrumbs/theme');

var _theme12 = _interopRequireDefault(_theme11);

var _theme13 = require('../Button/theme');

var _theme14 = _interopRequireDefault(_theme13);

var _theme15 = require('../Card/theme');

var _theme16 = _interopRequireDefault(_theme15);

var _theme17 = require('../Checkbox/theme');

var _theme18 = _interopRequireDefault(_theme17);

var _theme19 = require('../Chip/theme');

var _theme20 = _interopRequireDefault(_theme19);

var _theme21 = require('../DataTable/theme');

var _theme22 = _interopRequireDefault(_theme21);

var _theme23 = require('../Dialog/theme');

var _theme24 = _interopRequireDefault(_theme23);

var _theme25 = require('../Divider/theme');

var _theme26 = _interopRequireDefault(_theme25);

var _theme27 = require('../Drawer/theme');

var _theme28 = _interopRequireDefault(_theme27);

var _theme29 = require('../Form/theme');

var _theme30 = _interopRequireDefault(_theme29);

var _theme31 = require('../GridList/theme');

var _theme32 = _interopRequireDefault(_theme31);

var _theme33 = require('../List/theme');

var _theme34 = _interopRequireDefault(_theme33);

var _theme35 = require('../Pagination/theme');

var _theme36 = _interopRequireDefault(_theme35);

var _theme37 = require('../Paper/theme');

var _theme38 = _interopRequireDefault(_theme37);

var _theme39 = require('../Picker/theme');

var _theme40 = _interopRequireDefault(_theme39);

var _theme41 = require('../Popover/theme');

var _theme42 = _interopRequireDefault(_theme41);

var _theme43 = require('../Progress/theme');

var _theme44 = _interopRequireDefault(_theme43);

var _theme45 = require('../Radio/theme');

var _theme46 = _interopRequireDefault(_theme45);

var _theme47 = require('../Select/theme');

var _theme48 = _interopRequireDefault(_theme47);

var _theme49 = require('../Slider/theme');

var _theme50 = _interopRequireDefault(_theme49);

var _theme51 = require('../Snackbar/theme');

var _theme52 = _interopRequireDefault(_theme51);

var _theme53 = require('../Stepper/theme');

var _theme54 = _interopRequireDefault(_theme53);

var _theme55 = require('../SubHeader/theme');

var _theme56 = _interopRequireDefault(_theme55);

var _theme57 = require('../Switch/theme');

var _theme58 = _interopRequireDefault(_theme57);

var _theme59 = require('../Tabs/theme');

var _theme60 = _interopRequireDefault(_theme59);

var _theme61 = require('../TextField/theme');

var _theme62 = _interopRequireDefault(_theme61);

var _colorTheme = require('./colorTheme');

var _colorTheme2 = _interopRequireDefault(_colorTheme);

var _light = require('./light');

var _light2 = _interopRequireDefault(_light);

var _dark = require('./dark');

var _dark2 = _interopRequireDefault(_dark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var themes = [_baseTheme2.default, _theme2.default, _theme4.default, _theme6.default, _theme8.default, _theme10.default, _theme12.default, _theme14.default, _theme16.default, _theme18.default, _theme20.default, _theme22.default, _theme24.default, _theme26.default, _theme28.default, _theme30.default, _theme32.default, _theme50.default, _theme34.default, _theme36.default, _theme38.default, _theme40.default, _theme42.default, _theme44.default, _theme46.default, _theme52.default, _theme48.default, _theme54.default, _theme56.default, _theme58.default, _theme60.default, _theme62.default, _colorTheme2.default];

var vars = {
  light: _light2.default,
  dark: _dark2.default
};

function getThemeStyle() {
  var themeId = 'muse-theme';
  var styleEl = document.getElementById(themeId);
  if (styleEl) return styleEl;
  styleEl = document.createElement('style');
  styleEl.id = themeId;
  document.body.appendChild(styleEl);
  return styleEl;
}

exports.default = {
  addCreateTheme: function addCreateTheme(theme) {
    themes.push(theme);
    return this;
  },
  add: function add(name) {
    var varObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var extendName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'light';

    var theme = (0, _extends3.default)({
      name: name
    }, vars[extendName], varObj);
    vars[name] = theme;
    return this;
  },
  use: function use(name) {
    var themeEl = getThemeStyle();
    themeEl.innerHTML = themes.map(function (theme) {
      return theme(vars[name], vars[name].type, name);
    }).join(' ');
  }
};