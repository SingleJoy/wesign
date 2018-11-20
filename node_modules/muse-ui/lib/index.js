'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./styles/base.less');

var _Alert = require('./Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _AppBar = require('./AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _Badge = require('./Badge');

var _Badge2 = _interopRequireDefault(_Badge);

var _BottomNav = require('./BottomNav');

var _BottomNav2 = _interopRequireDefault(_BottomNav);

var _BottomSheet = require('./BottomSheet');

var _BottomSheet2 = _interopRequireDefault(_BottomSheet);

var _Breadcrumbs = require('./Breadcrumbs');

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Chip = require('./Chip');

var _Chip2 = _interopRequireDefault(_Chip);

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _DataTable = require('./DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

var _Dialog = require('./Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Drawer = require('./Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _GridList = require('./GridList');

var _GridList2 = _interopRequireDefault(_GridList);

var _Helpers = require('./Helpers');

var _Helpers2 = _interopRequireDefault(_Helpers);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _Paper = require('./Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Picker = require('./Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _Progress = require('./Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Snackbar = require('./Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _Stepper = require('./Stepper');

var _Stepper2 = _interopRequireDefault(_Stepper);

var _SubHeader = require('./SubHeader');

var _SubHeader2 = _interopRequireDefault(_SubHeader);

var _Switch = require('./Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _Tabs = require('./Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _TextField = require('./TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

require('./styles/theme.less');

var _theme = require('./theme');

var _theme2 = _interopRequireDefault(_theme);

var _colors = require('./theme/colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MuseUI(Vue) {
  [_Alert2.default, _AppBar2.default, _Avatar2.default, _Badge2.default, _BottomNav2.default, _BottomSheet2.default, _Breadcrumbs2.default, _Button2.default, _Card2.default, _Checkbox2.default, _Chip2.default, _DataTable2.default, _DateInput2.default, _Dialog2.default, _Divider2.default, _Drawer2.default, _Form2.default, _Grid2.default, _GridList2.default, _Helpers2.default, _Icon2.default, _List2.default, _Menu2.default, _Pagination2.default, _Paper2.default, _Picker2.default, _Popover2.default, _Progress2.default, _Radio2.default, _Select2.default, _Slider2.default, _Snackbar2.default, _Stepper2.default, _SubHeader2.default, _Switch2.default, _Tabs2.default, _TextField2.default, _Tooltip2.default].forEach(function (component) {
    Vue.use(component);
  });
}

MuseUI.theme = _theme2.default;
MuseUI.Colors = Colors;

if (typeof window !== 'undefined' && window.Vue) MuseUI(window.Vue);
exports.default = MuseUI;