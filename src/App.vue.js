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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var theme_1 = require("@/stores/theme");
var vue_router_1 = require("vue-router");
var provider_1 = require("./stores/provider");
var user_1 = require("@/stores/user");
var core_1 = __importDefault(require("highlight.js/lib/core"));
var ini_1 = __importDefault(require("highlight.js/lib/languages/ini"));
var nginx_1 = __importDefault(require("highlight.js/lib/languages/nginx"));
var powershell_1 = __importDefault(require("highlight.js/lib/languages/powershell"));
var naive_ui_1 = require("naive-ui");
var _a = await Promise.resolve().then(function () { return __importStar(require('vue')); }), defineProps = _a.defineProps, defineSlots = _a.defineSlots, defineEmits = _a.defineEmits, defineExpose = _a.defineExpose, defineModel = _a.defineModel, defineOptions = _a.defineOptions, withDefaults = _a.withDefaults;
core_1.default.registerLanguage('ini', ini_1.default);
core_1.default.registerLanguage('nginx', nginx_1.default);
core_1.default.registerLanguage('powershell', powershell_1.default);
var userStore = (0, user_1.useUserStore)();
onMounted(function () {
    userStore.loadUser();
});
// 获取当前年份
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
// 控制台输出版权信息
var LingYu_Byte = "\n#   .----------------.  .----------------.  .-----------------. .----------------.  .----------------.  .----------------.   .----------------.  .----------------.  .----------------.  .----------------. \n#  | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. | | .--------------. || .--------------. || .--------------. || .--------------. |\n#  | |   _____      | || |     _____    | || | ____  _____  | || |    ______    | || |  ____  ____  | || | _____  _____ | | | |   ______     | || |  ____  ____  | || |  _________   | || |  _________   | |\n#  | |  |_   _|     | || |    |_   _|   | || ||_   \\|_   _| | || |  .' ___  |   | || | |_  _||_  _| | || ||_   _||_   _|| | | |  |_   _ \\    | || | |_  _||_  _| | || | |  _   _  |  | || | |_   ___  |  | |\n#  | |    | |       | || |      | |     | || |  |   \\ | |   | || | / .'   \\_|   | || |   \\ \\  / /   | || |  | |    | |  | | | |    | |_) |   | || |   \\ \\  / /   | || | |_/ | | \\_|  | || |   | |_  \\_|  | |\n#  | |    | |   _   | || |      | |     | || |  | |\\ \\| |   | || | | |    ____  | || |    \\ \\/ /    | || |  | '    ' |  | | | |    |  __'.   | || |    \\ \\/ /    | || |     | |      | || |   |  _|  _   | |\n#  | |   _| |__/ |  | || |     _| |_    | || | _| |_\\   |_  | || | \\ `.___]  _| | || |    _|  |_    | || |   \\ `--' /   | | | |   _| |__) |  | || |    _|  |_    | || |    _| |_     | || |  _| |___/ |  | |\n#  | |  |________|  | || |    |_____|   | || ||_____|\\____| | || |  `._____.'   | || |   |______|   | || |    `.__.'    | | | |  |_______/   | || |   |______|   | || |   |_____|    | || | |_________|  | |\n#  | |              | || |              | || |              | || |              | || |              | || |              | | | |              | || |              | || |              | || |              | |\n#  | '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' | | '--------------' || '--------------' || '--------------' || '--------------' |\n#   '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'   '----------------'  '----------------'  '----------------'  '----------------' \n";
console.info(LingYu_Byte);
console.info("Copyright 2023 - ".concat(currentYear, " LingYu Byte All rights reserved."));
var themeStore = (0, theme_1.useThemeStore)();
var computedTheme = computed(function () {
    return themeStore.theme === 'dark' ? darkTheme : lightTheme;
});
var themeOverrides = computed(function () {
    var commonColors = {
        primaryColor: themeStore.primaryColor,
        primaryColorHover: themeStore.primaryColor,
        primaryColorPressed: themeStore.primaryColor,
        primaryColorSuppl: themeStore.primaryColor,
    };
    var lightThemeOverrides = {
        bodyColor: '#f5f5f5', // 更改亮色主题下的背景颜色
    };
    return {
        common: __assign(__assign({}, commonColors), (themeStore.theme === 'light' ? lightThemeOverrides : {})),
        Button: {
            // 调整Primary按钮，让它看起来更合适
            textColorPrimary: '#fff',
            textColorHoverPrimary: '#fff',
            textColorPressedPrimary: '#fff',
            textColorFocusPrimary: '#fff',
            textColorDisabledPrimary: '#fff',
            colorPrimary: themeStore.primaryColor,
            colorHoverPrimary: themeStore.primaryColor,
            colorPressedPrimary: themeStore.primaryColor,
            colorFocusPrimary: themeStore.primaryColor,
            colorDisabledPrimary: themeStore.primaryColor,
        },
    };
});
var provider = (0, provider_1.useProviderStore)();
var ViewComponent = defineComponent({
    render: function () { return h(vue_router_1.RouterView); },
    setup: function () {
        provider.setLoadingBar(useLoadingBar());
    },
});
var animationFrameId = null;
var isRGBRunning = false;
var animatePrimaryColor = function () {
    if (isRGBRunning)
        return;
    isRGBRunning = true;
    var r = 255, g = 0, b = 0;
    var dr = -5, dg = 5, db = 0;
    var step = function () {
        if (!themeStore.isRGBMode) {
            isRGBRunning = false;
            return;
        }
        if (r <= 0 && g >= 255) {
            dr = 0;
            dg = -5;
            db = 5;
        }
        if (g <= 0 && b >= 255) {
            dr = 5;
            dg = 0;
            db = -5;
        }
        if (b <= 0 && r >= 255) {
            dr = -5;
            dg = 5;
            db = 0;
        }
        r += dr;
        g += dg;
        b += db;
        themeStore.primaryColor = "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
        animationFrameId = requestAnimationFrame(step);
    };
    step();
};
watch(function () { return themeStore.isRGBMode; }, function (newVal) {
    if (newVal) {
        animatePrimaryColor();
    }
    else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
});
onMounted(function () {
    if (themeStore.isRGBMode) {
        animatePrimaryColor();
    }
});
onUnmounted(function () {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
});
; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_fnComponent = (await Promise.resolve().then(function () { return __importStar(require('vue')); })).defineComponent({});
;
var __VLS_functionalComponentProps;
function __VLS_template() {
    var __VLS_ctx = {};
    var __VLS_localComponents = __assign(__assign(__assign({}, {}), {}), __VLS_ctx);
    var __VLS_components;
    var __VLS_localDirectives = __assign(__assign({}, {}), __VLS_ctx);
    var __VLS_directives;
    var __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    var __VLS_resolvedLocalAndGlobalComponents;
    var __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NConfigProvider;
    /** @type { [typeof __VLS_components.NConfigProvider, typeof __VLS_components.nConfigProvider, typeof __VLS_components.NConfigProvider, typeof __VLS_components.nConfigProvider, ] } */
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ hljs: ((__VLS_ctx.hljs)), theme: ((__VLS_ctx.computedTheme)), themeOverrides: ((__VLS_ctx.themeOverrides)), }));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{ hljs: ((__VLS_ctx.hljs)), theme: ((__VLS_ctx.computedTheme)), themeOverrides: ((__VLS_ctx.themeOverrides)), }], __VLS_functionalComponentArgsRest(__VLS_1), false));
    var __VLS_6 = {};
    var __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.NLoadingBarProvider;
    /** @type { [typeof __VLS_components.NLoadingBarProvider, typeof __VLS_components.nLoadingBarProvider, typeof __VLS_components.NLoadingBarProvider, typeof __VLS_components.nLoadingBarProvider, ] } */
    // @ts-ignore
    var __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    var __VLS_9 = __VLS_8.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_8), false));
    var __VLS_13 = __VLS_resolvedLocalAndGlobalComponents.NMessageProvider;
    /** @type { [typeof __VLS_components.NMessageProvider, typeof __VLS_components.nMessageProvider, typeof __VLS_components.NMessageProvider, typeof __VLS_components.nMessageProvider, ] } */
    // @ts-ignore
    var __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    var __VLS_15 = __VLS_14.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_14), false));
    var __VLS_19 = __VLS_resolvedLocalAndGlobalComponents.NDialogProvider;
    /** @type { [typeof __VLS_components.NDialogProvider, typeof __VLS_components.nDialogProvider, typeof __VLS_components.NDialogProvider, typeof __VLS_components.nDialogProvider, ] } */
    // @ts-ignore
    var __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
    var __VLS_21 = __VLS_20.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_20), false));
    var __VLS_25 = __VLS_resolvedLocalAndGlobalComponents.ViewComponent;
    /** @type { [typeof __VLS_components.ViewComponent, ] } */
    // @ts-ignore
    var __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_26), false));
    __VLS_nonNullable(__VLS_24.slots).default;
    var __VLS_24;
    __VLS_nonNullable(__VLS_18.slots).default;
    var __VLS_18;
    __VLS_nonNullable(__VLS_12.slots).default;
    var __VLS_12;
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    var __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
var __VLS_self = (await Promise.resolve().then(function () { return __importStar(require('vue')); })).defineComponent({
    setup: function () {
        return {
            hljs: core_1.default,
            NLoadingBarProvider: naive_ui_1.NLoadingBarProvider,
            NMessageProvider: naive_ui_1.NMessageProvider,
            NConfigProvider: naive_ui_1.NConfigProvider,
            NDialogProvider: naive_ui_1.NDialogProvider,
            computedTheme: computedTheme,
            themeOverrides: themeOverrides,
            ViewComponent: ViewComponent,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return __importStar(require('vue')); })).defineComponent({
    setup: function () {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
