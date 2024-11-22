"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyleStore = void 0;
var pinia_1 = require("pinia");
var theme_1 = require("@/stores/theme");
exports.useStyleStore = (0, pinia_1.defineStore)('style', {
    actions: {
        getCardStyle: function () {
            var themeStore = (0, theme_1.useThemeStore)();
            var primaryColor = themeStore.primaryColor;
            var rgbaColor = this.colorToRgba(primaryColor, 0.15);
            return {
                backgroundColor: rgbaColor,
            };
        },
        colorToRgba: function (color, alpha) {
            var r = 0, g = 0, b = 0;
            if (color.startsWith('#')) {
                if (color.length === 4) {
                    r = parseInt(color[1] + color[1], 16);
                    g = parseInt(color[2] + color[2], 16);
                    b = parseInt(color[3] + color[3], 16);
                }
                else if (color.length === 7) {
                    r = parseInt(color[1] + color[2], 16);
                    g = parseInt(color[3] + color[4], 16);
                    b = parseInt(color[5] + color[6], 16);
                }
                else if (color.length === 9) {
                    r = parseInt(color[1] + color[2], 16);
                    g = parseInt(color[3] + color[4], 16);
                    b = parseInt(color[5] + color[6], 16);
                }
            }
            else if (color.startsWith('rgb')) {
                var rgbValues = color.match(/\d+/g);
                if (rgbValues) {
                    r = parseInt(rgbValues[0], 10);
                    g = parseInt(rgbValues[1], 10);
                    b = parseInt(rgbValues[2], 10);
                }
            }
            return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha, ")");
        },
    },
});
