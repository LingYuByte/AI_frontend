"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_router_1 = require("vue-router");
var provider_1 = require("../stores/provider");
var user_1 = require("../stores/user");
var routes = [
    {
        path: '/',
        redirect: '/home',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('@/views/HomeView.vue')); }); },
        children: [
            {
                path: '/home',
                name: '首页',
                component: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/HomePage.vue')); }); },
                meta: {
                    title: 'LingYu Byte AI - 控制台首页',
                    keywords: 'LingYu Byte AI, 内网穿透, 端口映射, frp, 免费frp, 映射',
                    description: 'LingYu Byte AI控制台首页，您可以在这里查看您的LingYu Byte AI账户预览',
                    requiresAuth: true,
                }
            }
        ]
    },
    {
        path: '/',
        name: 'AI 功能',
        component: function () { return Promise.resolve().then(function () { return __importStar(require('@/views/ChatView.vue')); }); },
        children: [
            {
                path: '/chat',
                name: 'AI 对话',
                component: function () { return Promise.resolve().then(function () { return __importStar(require('@/pages/Chat/ChatMain.vue')); }); },
                meta: {
                    title: 'LingYu Byte AI - 控制台首页',
                    keywords: 'LingYu Byte AI, ChatGPT',
                    requiresAuth: true,
                }
            }
        ]
    }
];
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(),
    routes: routes,
});
router.beforeEach(function (to, _from, next) {
    var _a;
    (_a = (0, provider_1.useProviderStore)().loadingBar) === null || _a === void 0 ? void 0 : _a.start();
    var userStore = (0, user_1.useUserStore)();
    var isAuthenticated = !!userStore.userInfo; // 检查是否存在用户信息
    if (to.meta.requiresAuth && !isAuthenticated) {
        // 如果路由需要认证且用户未登录
        next({ path: '/sign' });
    }
    else {
        next();
    }
});
router.afterEach(function () {
    var _a;
    (_a = (0, provider_1.useProviderStore)().loadingBar) === null || _a === void 0 ? void 0 : _a.finish();
});
exports.default = router;
