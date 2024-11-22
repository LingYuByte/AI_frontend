"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var App_vue_1 = __importDefault(require("./App.vue"));
var router_1 = __importDefault(require("./router"));
var pinia_1 = require("pinia");
require("@/assets/styles/themes.css");
require("@/assets/styles/global.scss");
var naive_ui_1 = __importDefault(require("naive-ui"));
var app = (0, vue_1.createApp)(App_vue_1.default);
app.use(naive_ui_1.default);
// 通用字体
require("vfonts/Lato.css");
// 等宽字体
require("vfonts/FiraCode.css");
router_1.default.beforeEach(function (to, _from, next) {
    var meta = to.meta;
    if (meta) {
        if (meta.title) {
            document.title = meta.title;
        }
        if (meta.keywords) {
            var keywords = document.querySelector('meta[name="keywords"]');
            if (keywords) {
                keywords.setAttribute('content', meta.keywords);
            }
            else {
                var metaTag = document.createElement('meta');
                metaTag.name = 'keywords';
                metaTag.content = meta.keywords;
                document.head.appendChild(metaTag);
            }
        }
        if (meta.description) {
            var description = document.querySelector('meta[name="description"]');
            if (description) {
                description.setAttribute('content', meta.description);
            }
            else {
                var metaTag = document.createElement('meta');
                metaTag.name = 'description';
                metaTag.content = meta.description;
                document.head.appendChild(metaTag);
            }
        }
    }
    next();
});
app.use((0, pinia_1.createPinia)());
app.use(naive_ui_1.default);
app.use(router_1.default);
app.mount('#app');
