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
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var useLayout_1 = require("@/stores/useLayout");
var Menu_1 = require("@/components/Options/Menu");
var _a = await Promise.resolve().then(function () { return __importStar(require('vue')); }), defineProps = _a.defineProps, defineSlots = _a.defineSlots, defineEmits = _a.defineEmits, defineExpose = _a.defineExpose, defineModel = _a.defineModel, defineOptions = _a.defineOptions, withDefaults = _a.withDefaults;
var layoutStore = (0, useLayout_1.useLayoutStore)();
var collapsed = (0, vue_1.computed)(function () { return layoutStore.collapsed; });
var route = (0, vue_router_1.useRoute)();
var router = (0, vue_router_1.useRouter)();
var activeKey = (0, vue_1.ref)(route.name);
var handleUpdateValue = function (key) {
    activeKey.value = key;
    var targetOption = Menu_1.computedMenuOptions.value.find(function (option) { return option.key === key; });
    if (targetOption && typeof targetOption.label === 'function') {
        var labelVNode = targetOption.label();
        var props = labelVNode.props;
        if (props.to) {
            router.push(props.to);
        }
    }
};
(0, vue_1.watch)(route, function () {
    activeKey.value = route.name;
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
    var __VLS_resolvedLocalAndGlobalComponents;
    var __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NMenu;
    /** @type { [typeof __VLS_components.NMenu, typeof __VLS_components.nMenu, ] } */
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(__assign(__assign({ 'onUpdate:value': {} }, { style: ({}) }), { value: ((__VLS_ctx.activeKey)), collapsed: ((__VLS_ctx.collapsed)), collapsedWidth: ((64)), collapsedIconSize: ((22)), options: ((__VLS_ctx.computedMenuOptions)) })));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ 'onUpdate:value': {} }, { style: ({}) }), { value: ((__VLS_ctx.activeKey)), collapsed: ((__VLS_ctx.collapsed)), collapsedWidth: ((64)), collapsedIconSize: ((22)), options: ((__VLS_ctx.computedMenuOptions)) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
    var __VLS_6 = {};
    var __VLS_7;
    var __VLS_8 = {
        'onUpdate:value': (__VLS_ctx.handleUpdateValue)
    };
    var __VLS_3;
    var __VLS_4;
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
            computedMenuOptions: Menu_1.computedMenuOptions,
            collapsed: collapsed,
            activeKey: activeKey,
            handleUpdateValue: handleUpdateValue,
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
