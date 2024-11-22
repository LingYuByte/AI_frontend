"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProviderStore = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
exports.useProviderStore = (0, pinia_1.defineStore)('provider', function () {
    var loadingBar = (0, vue_1.ref)();
    function setLoadingBar(b) {
        loadingBar.value = b;
    }
    return { loadingBar: loadingBar, setLoadingBar: setLoadingBar };
});
