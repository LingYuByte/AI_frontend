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
Object.defineProperty(exports, "__esModule", { value: true });
var ionicons5_1 = require("@vicons/ionicons5");
var theme_1 = require("@/stores/theme");
var useScreen_1 = require("@/stores/useScreen");
var pinia_1 = require("pinia");
var naive_ui_1 = require("naive-ui");
var vue_router_1 = require("vue-router");
var Menu_1 = require("./Options/Menu");
var ionicons5_2 = require("@vicons/ionicons5");
// 获取登录信息
var user_1 = require("@/stores/user");
var _a = await Promise.resolve().then(function () { return __importStar(require('vue')); }), defineProps = _a.defineProps, defineSlots = _a.defineSlots, defineEmits = _a.defineEmits, defineExpose = _a.defineExpose, defineModel = _a.defineModel, defineOptions = _a.defineOptions, withDefaults = _a.withDefaults;
var userStore = (0, user_1.useUserStore)();
var userInfo = userStore.userInfo;
// UserDropdown图标函数
var renderIcon = function (icon, color) {
    return function () {
        return h(naive_ui_1.NIcon, { size: '24', color: color }, { default: function () { return h(icon); } });
    };
};
// 纯内容渲染-用户基本资料
function renderCustomHeader() {
    return h('div', {
        style: 'display: flex; align-items: center; padding: 8px 12px;'
    }, [
        h(naive_ui_1.NAvatar, {
            round: true,
            style: 'margin-right: 12px;',
            src: "https://www.loliapi.com/acg/pp/"
        }),
        h('div', null, [
            h('div', null, [h(naive_ui_1.NText, { depth: 2 }, { default: function () { return (userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) || '您尚未登录'; } })]),
            h('div', { style: 'font-size: 12px;' }, [
                h(naive_ui_1.NText, { depth: 3 }, { default: function () { return ''; } })
            ])
        ])
    ]);
}
// Router
var router = (0, vue_router_1.useRouter)();
// 顶部消息
var message = useMessage();
// 基础的手机端适配
var screenStore = (0, useScreen_1.useScreenStore)();
var isHidden = (0, pinia_1.storeToRefs)(screenStore).isHidden;
var themeSwitcherDrawer = ref(false);
var placement = ref('right');
var themeStore = (0, theme_1.useThemeStore)(); // 使用useThemeStore获取主题色
var ThemeSwitcherDrawer = function (place) {
    themeSwitcherDrawer.value = true;
    placement.value = place;
};
var userDropdownOptions = ref([]);
var updateUserDropdownOptions = function () {
    if (userInfo) {
        userDropdownOptions.value = [
            {
                key: 'header',
                type: 'render',
                render: renderCustomHeader
            },
            {
                label: '用户资料',
                key: 'profile',
                icon: renderIcon(ionicons5_2.PersonCircleOutline),
                props: {
                    onClick: function () {
                        router.push('/user');
                    }
                }
            },
            {
                label: '退出登录',
                key: 'logout',
                icon: renderIcon(ionicons5_2.LogOutOutline, '#f5222d'),
                props: {
                    onClick: function () {
                        userStore.clearUser();
                        message.success('成功退出登陆，用户信息已清空');
                        router.push('/sign');
                    },
                },
            }
        ];
    }
    else {
        userDropdownOptions.value = [
            {
                key: 'header',
                type: 'render',
                render: renderCustomHeader
            },
            {
                label: '登录',
                key: 'login',
                icon: renderIcon(ionicons5_2.LogInOutline, '#529b2e'),
                props: {
                    onClick: function () {
                        router.push('/sign');
                    },
                },
            }
        ];
    }
};
// 初始化菜单项
updateUserDropdownOptions();
; /* PartiallyEnd: #3632/scriptSetup.vue */
var __VLS_fnComponent = (await Promise.resolve().then(function () { return __importStar(require('vue')); })).defineComponent({});
;
var __VLS_functionalComponentProps;
function __VLS_template() {
    var _a;
    var __VLS_ctx = {};
    var __VLS_localComponents = __assign(__assign(__assign({}, {}), {}), __VLS_ctx);
    var __VLS_components;
    var __VLS_localDirectives = __assign(__assign({}, {}), __VLS_ctx);
    var __VLS_directives;
    var __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    var __VLS_resolvedLocalAndGlobalComponents;
    var __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NSpace;
    /** @type { [typeof __VLS_components.NSpace, typeof __VLS_components.nSpace, typeof __VLS_components.NSpace, typeof __VLS_components.nSpace, ] } */
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign({ justify: ("space-between") }, { class: ("center-aligned") })));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ justify: ("space-between") }, { class: ("center-aligned") })], __VLS_functionalComponentArgsRest(__VLS_1), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ style: (({ display: __VLS_ctx.isHidden ? 'none' : 'flex', color: __VLS_ctx.themeStore.primaryColor, marginLeft: '24px', fontSize: '26px', transition: 'color 0.2s' })) }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ style: (({ display: __VLS_ctx.isHidden ? 'flex' : 'none' })) }));
    var __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.NDropdown;
    /** @type { [typeof __VLS_components.NDropdown, typeof __VLS_components.nDropdown, typeof __VLS_components.NDropdown, typeof __VLS_components.nDropdown, ] } */
    // @ts-ignore
    var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ size: ("large"), options: ((__VLS_ctx.computedMenuOptions)), }));
    var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([{ size: ("large"), options: ((__VLS_ctx.computedMenuOptions)), }], __VLS_functionalComponentArgsRest(__VLS_7), false));
    var __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.NButton;
    /** @type { [typeof __VLS_components.NButton, typeof __VLS_components.nButton, typeof __VLS_components.NButton, typeof __VLS_components.nButton, ] } */
    // @ts-ignore
    var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12(__assign({ quaternary: (true) }, { style: ({}) })));
    var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([__assign({ quaternary: (true) }, { style: ({}) })], __VLS_functionalComponentArgsRest(__VLS_13), false));
    var __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.NIcon;
    /** @type { [typeof __VLS_components.NIcon, typeof __VLS_components.nIcon, typeof __VLS_components.NIcon, typeof __VLS_components.nIcon, ] } */
    // @ts-ignore
    var __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18(__assign({ component: ((__VLS_ctx.MenuOutline)) }, { style: ({}) })));
    var __VLS_20 = __VLS_19.apply(void 0, __spreadArray([__assign({ component: ((__VLS_ctx.MenuOutline)) }, { style: ({}) })], __VLS_functionalComponentArgsRest(__VLS_19), false));
    __VLS_nonNullable(__VLS_17.slots).default;
    var __VLS_17;
    __VLS_nonNullable(__VLS_11.slots).default;
    var __VLS_11;
    var __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.NSpace;
    /** @type { [typeof __VLS_components.NSpace, typeof __VLS_components.nSpace, typeof __VLS_components.NSpace, typeof __VLS_components.nSpace, ] } */
    // @ts-ignore
    var __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24(__assign({ class: ("center-aligned") }, { justify: ("space-between") })));
    var __VLS_26 = __VLS_25.apply(void 0, __spreadArray([__assign({ class: ("center-aligned") }, { justify: ("space-between") })], __VLS_functionalComponentArgsRest(__VLS_25), false));
    var __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.NPopover;
    /** @type { [typeof __VLS_components.NPopover, typeof __VLS_components.nPopover, typeof __VLS_components.NPopover, typeof __VLS_components.nPopover, ] } */
    // @ts-ignore
    var __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30(__assign({ trigger: ("hover") }, { style: ({}) })));
    var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([__assign({ trigger: ("hover") }, { style: ({}) })], __VLS_functionalComponentArgsRest(__VLS_31), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        var __VLS_thisSlot = __VLS_nonNullable(__VLS_35.slots).trigger;
        var __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.NButton;
        /** @type { [typeof __VLS_components.NButton, typeof __VLS_components.nButton, typeof __VLS_components.NButton, typeof __VLS_components.nButton, ] } */
        // @ts-ignore
        var __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36(__assign(__assign({ 'onClick': {} }, { quaternary: (true) }), { style: ({}) })));
        var __VLS_38 = __VLS_37.apply(void 0, __spreadArray([__assign(__assign({ 'onClick': {} }, { quaternary: (true) }), { style: ({}) })], __VLS_functionalComponentArgsRest(__VLS_37), false));
        var __VLS_42 = void 0;
        var __VLS_43 = {
            onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.ThemeSwitcherDrawer('right');
            }
        };
        var __VLS_39 = void 0;
        var __VLS_40 = void 0;
        var __VLS_44 = __VLS_resolvedLocalAndGlobalComponents.NIcon;
        /** @type { [typeof __VLS_components.NIcon, typeof __VLS_components.nIcon, typeof __VLS_components.NIcon, typeof __VLS_components.nIcon, ] } */
        // @ts-ignore
        var __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44(__assign({ component: ((__VLS_ctx.SettingsOutline)) }, { style: ({}) })));
        var __VLS_46 = __VLS_45.apply(void 0, __spreadArray([__assign({ component: ((__VLS_ctx.SettingsOutline)) }, { style: ({}) })], __VLS_functionalComponentArgsRest(__VLS_45), false));
        __VLS_nonNullable(__VLS_41.slots).default;
        var __VLS_41;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    var __VLS_35;
    var __VLS_50 = __VLS_resolvedLocalAndGlobalComponents.NDropdown;
    /** @type { [typeof __VLS_components.NDropdown, typeof __VLS_components.nDropdown, typeof __VLS_components.NDropdown, typeof __VLS_components.nDropdown, ] } */
    // @ts-ignore
    var __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({ trigger: ("hover"), options: ((__VLS_ctx.userDropdownOptions)), }));
    var __VLS_52 = __VLS_51.apply(void 0, __spreadArray([{ trigger: ("hover"), options: ((__VLS_ctx.userDropdownOptions)), }], __VLS_functionalComponentArgsRest(__VLS_51), false));
    var __VLS_56 = __VLS_resolvedLocalAndGlobalComponents.NButton;
    /** @type { [typeof __VLS_components.NButton, typeof __VLS_components.nButton, typeof __VLS_components.NButton, typeof __VLS_components.nButton, ] } */
    // @ts-ignore
    var __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56(__assign({ quaternary: (true), size: ("large") }, { class: ("avatar-container") })));
    var __VLS_58 = __VLS_57.apply(void 0, __spreadArray([__assign({ quaternary: (true), size: ("large") }, { class: ("avatar-container") })], __VLS_functionalComponentArgsRest(__VLS_57), false));
    var __VLS_62 = __VLS_resolvedLocalAndGlobalComponents.NAvatar;
    /** @type { [typeof __VLS_components.NAvatar, typeof __VLS_components.nAvatar, typeof __VLS_components.NAvatar, typeof __VLS_components.nAvatar, ] } */
    // @ts-ignore
    var __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62(__assign({ round: (true), size: ("large"), src: ("https://www.loliapi.com/acg/pp/") }, { style: ({}) })));
    var __VLS_64 = __VLS_63.apply(void 0, __spreadArray([__assign({ round: (true), size: ("large"), src: ("https://www.loliapi.com/acg/pp/") }, { style: ({}) })], __VLS_functionalComponentArgsRest(__VLS_63), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("text-container") }));
    var __VLS_68 = __VLS_resolvedLocalAndGlobalComponents.NPerformantEllipsis;
    /** @type { [typeof __VLS_components.NPerformantEllipsis, typeof __VLS_components.nPerformantEllipsis, typeof __VLS_components.NPerformantEllipsis, typeof __VLS_components.nPerformantEllipsis, ] } */
    // @ts-ignore
    var __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68(__assign({ style: ({}) })));
    var __VLS_70 = __VLS_69.apply(void 0, __spreadArray([__assign({ style: ({}) })], __VLS_functionalComponentArgsRest(__VLS_69), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("text-top") }));
    (((_a = __VLS_ctx.userInfo) === null || _a === void 0 ? void 0 : _a.username) || '尚未登陆');
    __VLS_nonNullable(__VLS_73.slots).default;
    var __VLS_73;
    __VLS_nonNullable(__VLS_61.slots).default;
    var __VLS_61;
    __VLS_nonNullable(__VLS_55.slots).default;
    var __VLS_55;
    __VLS_nonNullable(__VLS_29.slots).default;
    var __VLS_29;
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    var __VLS_74 = __VLS_resolvedLocalAndGlobalComponents.NDrawer;
    /** @type { [typeof __VLS_components.NDrawer, typeof __VLS_components.nDrawer, typeof __VLS_components.NDrawer, typeof __VLS_components.nDrawer, ] } */
    // @ts-ignore
    var __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({ show: ((__VLS_ctx.themeSwitcherDrawer)), placement: ((__VLS_ctx.placement)), defaultWidth: ((251)), resizable: (true), }));
    var __VLS_76 = __VLS_75.apply(void 0, __spreadArray([{ show: ((__VLS_ctx.themeSwitcherDrawer)), placement: ((__VLS_ctx.placement)), defaultWidth: ((251)), resizable: (true), }], __VLS_functionalComponentArgsRest(__VLS_75), false));
    var __VLS_80 = __VLS_resolvedLocalAndGlobalComponents.NDrawerContent;
    /** @type { [typeof __VLS_components.NDrawerContent, typeof __VLS_components.nDrawerContent, typeof __VLS_components.NDrawerContent, typeof __VLS_components.nDrawerContent, ] } */
    // @ts-ignore
    var __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({ title: ("面板配置"), }));
    var __VLS_82 = __VLS_81.apply(void 0, __spreadArray([{ title: ("面板配置"), }], __VLS_functionalComponentArgsRest(__VLS_81), false));
    var __VLS_86 = __VLS_resolvedLocalAndGlobalComponents.ThemeSwitcher;
    /** @type { [typeof __VLS_components.ThemeSwitcher, ] } */
    // @ts-ignore
    var __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({}));
    var __VLS_88 = __VLS_87.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_87), false));
    __VLS_nonNullable(__VLS_85.slots).default;
    var __VLS_85;
    __VLS_nonNullable(__VLS_79.slots).default;
    var __VLS_79;
    __VLS_styleScopedClasses['center-aligned'];
    __VLS_styleScopedClasses['center-aligned'];
    __VLS_styleScopedClasses['avatar-container'];
    __VLS_styleScopedClasses['text-container'];
    __VLS_styleScopedClasses['text-top'];
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
            SettingsOutline: ionicons5_1.SettingsOutline,
            NAvatar: naive_ui_1.NAvatar,
            NIcon: naive_ui_1.NIcon,
            computedMenuOptions: Menu_1.computedMenuOptions,
            MenuOutline: ionicons5_2.MenuOutline,
            userInfo: userInfo,
            isHidden: isHidden,
            themeSwitcherDrawer: themeSwitcherDrawer,
            placement: placement,
            themeStore: themeStore,
            ThemeSwitcherDrawer: ThemeSwitcherDrawer,
            userDropdownOptions: userDropdownOptions,
        };
    },
});
exports.default = (await Promise.resolve().then(function () { return __importStar(require('vue')); })).defineComponent({
    setup: function () {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
