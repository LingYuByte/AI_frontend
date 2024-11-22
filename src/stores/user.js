"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserStore = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
exports.useUserStore = (0, pinia_1.defineStore)('user', function () {
    var userInfo = (0, vue_1.ref)(null);
    var setUser = function (info, duration) {
        if (duration === void 0) { duration = 'permanent'; }
        userInfo.value.userimg = "https://www.loliapi.com/acg/pp/";
        var expiry = duration === '1d' ? new Date().getTime() + 86400000 : null;
        var dataToStore = JSON.stringify(__assign(__assign({}, info), { expiry: expiry }));
        localStorage.setItem('userInfo', dataToStore);
        if (duration === '1d') {
            sessionStorage.setItem('userInfo', dataToStore);
        }
        userInfo.value = info;
    };
    var loadUser = function () {
        var savedUserInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
        if (savedUserInfo) {
            var parsedInfo = JSON.parse(savedUserInfo);
            if (parsedInfo.expiry && new Date().getTime() > parsedInfo.expiry) {
                clearUser();
            }
            else {
                userInfo.value = parsedInfo;
            }
        }
    };
    var clearUser = function () {
        userInfo.value = null;
        localStorage.removeItem('userInfo');
        sessionStorage.removeItem('userInfo');
    };
    return {
        userInfo: userInfo,
        setUser: setUser,
        loadUser: loadUser,
        clearUser: clearUser,
    };
});
