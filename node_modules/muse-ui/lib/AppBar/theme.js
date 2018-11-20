"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (theme) {
  return "\n    .mu-appbar {\n      background-color: " + theme.background.default + ",\n      color: " + theme.text.primary + "\n    }\n  ";
};