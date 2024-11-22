"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScreenStore = void 0;
// 多端适配
var pinia_1 = require("pinia");
var vue_1 = require("vue");
exports.useScreenStore = (0, pinia_1.defineStore)('screen', function () {
    var screenWidth = (0, vue_1.ref)(window.innerWidth);
    var isHidden = (0, vue_1.ref)(screenWidth.value < 600); // 初始判断屏幕宽度
    var checkScreenWidth = function () {
        screenWidth.value = window.innerWidth;
        isHidden.value = screenWidth.value < 600;
    };
    (0, vue_1.onMounted)(function () {
        window.addEventListener('resize', checkScreenWidth);
        checkScreenWidth(); // 初始检查
    });
    (0, vue_1.onUnmounted)(function () {
        window.removeEventListener('resize', checkScreenWidth);
    });
    return {
        screenWidth: screenWidth,
        isHidden: isHidden
    };
});
