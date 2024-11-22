"use strict";
// Vue Component Install
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_vue_1 = __importDefault(require("@/components/IconFont/index.vue"));
var Components = {
    install: function (app) {
        componentList.forEach(function (Comp) {
            app.component(Comp.name, Comp);
        });
    }
};
var componentList = [
    index_vue_1.default
];
exports.default = Components;
