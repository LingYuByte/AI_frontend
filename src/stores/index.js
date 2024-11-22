"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
exports.setupStore = setupStore;
var pinia_1 = require("pinia");
var plugins_1 = require("@/store/plugins");
var store = (0, pinia_1.createPinia)();
exports.store = store;
function setupStore(app) {
    app.use(store);
}
store.use(plugins_1.pluginPinia);
