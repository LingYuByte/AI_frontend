"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeStore = void 0;
var pinia_1 = require("pinia");
var THEME_KEY = 'app-theme';
var PRIMARY_COLOR_KEY = 'app-primary-color';
var AUTO_THEME_KEY = 'app-auto-theme';
var RGB_MODE_KEY = 'app-rgb-mode';
var DBH_MODE_KEY = 'app-dialog-box-hair-glass';
exports.useThemeStore = (0, pinia_1.defineStore)('theme', {
    state: function () { return ({
        theme: localStorage.getItem(THEME_KEY) || 'light',
        primaryColor: localStorage.getItem(PRIMARY_COLOR_KEY) || '#722ed1',
        isAutoTheme: localStorage.getItem(AUTO_THEME_KEY) === 'true' || localStorage.getItem(AUTO_THEME_KEY) === null,
        isRGBMode: localStorage.getItem(RGB_MODE_KEY) === 'true' || false,
        isDialogBoxHairGlass: localStorage.getItem(DBH_MODE_KEY) === 'true' || false,
    }); },
    actions: {
        setTheme: function (theme) {
            this.theme = theme;
            localStorage.setItem(THEME_KEY, theme);
        },
        setPrimaryColor: function (color) {
            this.primaryColor = color;
            localStorage.setItem(PRIMARY_COLOR_KEY, color);
        },
        setAutoTheme: function (isAuto) {
            this.isAutoTheme = isAuto;
            localStorage.setItem(AUTO_THEME_KEY, isAuto.toString());
        },
        setRGBMode: function (isRGB) {
            this.isRGBMode = isRGB;
            localStorage.setItem(RGB_MODE_KEY, isRGB.toString());
        },
        setDialogBoxHairGlass: function (isDBH) {
            this.isDialogBoxHairGlass = isDBH;
            localStorage.setItem(DBH_MODE_KEY, isDBH.toString());
        }
    },
});
