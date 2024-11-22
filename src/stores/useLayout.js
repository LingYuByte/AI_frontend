"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLayoutStore = void 0;
var pinia_1 = require("pinia");
exports.useLayoutStore = (0, pinia_1.defineStore)('layout', {
    state: function () { return ({
        collapsed: JSON.parse(localStorage.getItem('collapsed') || 'false')
    }); },
    actions: {
        toggleCollapse: function () {
            this.collapsed = !this.collapsed;
            localStorage.setItem('collapsed', JSON.stringify(this.collapsed));
        },
        setCollapse: function (collapsed) {
            this.collapsed = collapsed;
            localStorage.setItem('collapsed', JSON.stringify(this.collapsed));
        }
    }
});
