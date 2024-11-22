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
var theme_1 = require("@/stores/theme");
var ionicons5_1 = require("@vicons/ionicons5");
var _a = await Promise.resolve().then(function () { return __importStar(require('vue')); }), defineProps = _a.defineProps, defineSlots = _a.defineSlots, defineEmits = _a.defineEmits, defineExpose = _a.defineExpose, defineModel = _a.defineModel, defineOptions = _a.defineOptions, withDefaults = _a.withDefaults;
var themeStore = (0, theme_1.useThemeStore)();
var isDarkTheme = ref(themeStore.theme === 'dark');
var primaryColor = ref(themeStore.primaryColor);
var isAutoTheme = ref(themeStore.isAutoTheme);
var isRGBMode = ref(themeStore.isRGBMode);
var isDialogBoxHairGlass = ref(themeStore.isDialogBoxHairGlass);
var presetColors = [
    '#18a058', '#2080f0', '#f5222d', '#fa541c', '#faad14', '#13c2c2', '#52c41a', '#eb2f96', '#722ed1', '#2f54eb'
];
var changeTheme = function (isDark) {
    var theme = isDark ? 'dark' : 'light';
    themeStore.setTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
};
var changePrimaryColor = function (color) {
    themeStore.setPrimaryColor(color);
};
var setPresetColor = function (color) {
    primaryColor.value = color;
    changePrimaryColor(color);
};
var setAutoTheme = function (isAuto) {
    isAutoTheme.value = isAuto;
    themeStore.setAutoTheme(isAuto);
};
var setRGBMode = function (isRGB) {
    isRGBMode.value = isRGB;
    themeStore.setRGBMode(isRGB);
};
var setDialogBoxHairGlass = function (isDBH) {
    isDialogBoxHairGlass.value = isDBH;
    themeStore.setDialogBoxHairGlass(isDBH);
};
watch(isDialogBoxHairGlass, function (newVal) {
    setDialogBoxHairGlass(newVal);
    if (newVal) {
        document.documentElement.style.setProperty('--modal-filter', '10px');
    }
    else {
        document.documentElement.style.setProperty('--modal-filter', '0px');
    }
});
watch(isDarkTheme, function (newIsDark) {
    if (!isAutoTheme.value) {
        changeTheme(newIsDark);
    }
});
watch(primaryColor, function (newColor) {
    changePrimaryColor(newColor);
});
watch(isAutoTheme, function (newVal) {
    setAutoTheme(newVal);
    if (newVal) {
        var systemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
        isDarkTheme.value = systemDarkTheme.matches;
        changeTheme(isDarkTheme.value);
        systemDarkTheme.addEventListener('change', handleSystemThemeChange);
    }
    else {
        var systemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
        systemDarkTheme.removeEventListener('change', handleSystemThemeChange);
    }
});
watch(isRGBMode, function (newVal) {
    setRGBMode(newVal);
});
var railStyle = function (_a) {
    var focused = _a.focused, checked = _a.checked;
    var style = {};
    if (checked) {
        style.background = '#000000';
        if (focused) {
            style.boxShadow = '0 0 0 2px #00000040';
        }
    }
    return style;
};
var handleSystemThemeChange = function (e) {
    isDarkTheme.value = e.matches;
    changeTheme(isDarkTheme.value);
};
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("container") }));
    var __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NDivider;
    /** @type { [typeof __VLS_components.NDivider, typeof __VLS_components.nDivider, typeof __VLS_components.NDivider, typeof __VLS_components.nDivider, ] } */
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_1), false));
    __VLS_nonNullable(__VLS_5.slots).default;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("theme-switch") }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ style: ({}) }));
    var __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.NSwitch;
    /** @type { [typeof __VLS_components.NSwitch, typeof __VLS_components.nSwitch, typeof __VLS_components.NSwitch, typeof __VLS_components.nSwitch, ] } */
    // @ts-ignore
    var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ size: ("large"), value: ((__VLS_ctx.isAutoTheme)), checkedValue: ((true)), uncheckedValue: ((false)), }));
    var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([{ size: ("large"), value: ((__VLS_ctx.isAutoTheme)), checkedValue: ((true)), uncheckedValue: ((false)), }], __VLS_functionalComponentArgsRest(__VLS_7), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        var __VLS_thisSlot = __VLS_nonNullable(__VLS_11.slots).checked;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        var __VLS_thisSlot = __VLS_nonNullable(__VLS_11.slots).unchecked;
    }
    var __VLS_11;
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ style: ({}) }));
    if (!__VLS_ctx.isAutoTheme) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("theme-switch") }, { style: ({}) }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ style: ({}) }));
        var __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.NSwitch;
        /** @type { [typeof __VLS_components.NSwitch, typeof __VLS_components.nSwitch, typeof __VLS_components.NSwitch, typeof __VLS_components.nSwitch, ] } */
        // @ts-ignore
        var __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ size: ("large"), value: ((__VLS_ctx.isDarkTheme)), railStyle: ((__VLS_ctx.railStyle)), checkedValue: ((true)), uncheckedValue: ((false)), }));
        var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{ size: ("large"), value: ((__VLS_ctx.isDarkTheme)), railStyle: ((__VLS_ctx.railStyle)), checkedValue: ((true)), uncheckedValue: ((false)), }], __VLS_functionalComponentArgsRest(__VLS_13), false));
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            var __VLS_thisSlot = __VLS_nonNullable(__VLS_17.slots)["checked-icon"];
            var __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.NIcon;
            /** @type { [typeof __VLS_components.NIcon, typeof __VLS_components.nIcon, ] } */
            // @ts-ignore
            var __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ component: ((__VLS_ctx.Sparkles)), color: ("#9f9f9c"), }));
            var __VLS_20 = __VLS_19.apply(void 0, __spreadArray([{ component: ((__VLS_ctx.Sparkles)), color: ("#9f9f9c"), }], __VLS_functionalComponentArgsRest(__VLS_19), false));
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            var __VLS_thisSlot = __VLS_nonNullable(__VLS_17.slots)["unchecked-icon"];
            var __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.NIcon;
            /** @type { [typeof __VLS_components.NIcon, typeof __VLS_components.nIcon, ] } */
            // @ts-ignore
            var __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ component: ((__VLS_ctx.Sunny)), color: ("#E6A23C"), }));
            var __VLS_26 = __VLS_25.apply(void 0, __spreadArray([{ component: ((__VLS_ctx.Sunny)), color: ("#E6A23C"), }], __VLS_functionalComponentArgsRest(__VLS_25), false));
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            var __VLS_thisSlot = __VLS_nonNullable(__VLS_17.slots).checked;
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
        {
            var __VLS_thisSlot = __VLS_nonNullable(__VLS_17.slots).unchecked;
        }
        var __VLS_17;
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(__assign({ style: ({}) }));
    }
    var __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.NDivider;
    /** @type { [typeof __VLS_components.NDivider, typeof __VLS_components.nDivider, typeof __VLS_components.NDivider, typeof __VLS_components.nDivider, ] } */
    // @ts-ignore
    var __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
    var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_31), false));
    __VLS_nonNullable(__VLS_35.slots).default;
    var __VLS_35;
    var __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.NColorPicker;
    /** @type { [typeof __VLS_components.NColorPicker, typeof __VLS_components.nColorPicker, ] } */
    // @ts-ignore
    var __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ value: ((__VLS_ctx.primaryColor)), showPreview: ((true)), }));
    var __VLS_38 = __VLS_37.apply(void 0, __spreadArray([{ value: ((__VLS_ctx.primaryColor)), showPreview: ((true)), }], __VLS_functionalComponentArgsRest(__VLS_37), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("preset-colors") }));
    var _loop_1 = function (color) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign(__assign(__assign({ onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.setPresetColor(color);
            } }, { key: ((color)) }), { style: (({ backgroundColor: color })) }), { class: ("preset-color") }));
    };
    for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.presetColors)); _i < _a.length; _i++) {
        var color = _a[_i][0];
        _loop_1(color);
    }
    var __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.NFlex;
    /** @type { [typeof __VLS_components.NFlex, typeof __VLS_components.nFlex, typeof __VLS_components.NFlex, typeof __VLS_components.nFlex, ] } */
    // @ts-ignore
    var __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42(__assign({ vertical: (true) }, { style: ({}) })));
    var __VLS_44 = __VLS_43.apply(void 0, __spreadArray([__assign({ vertical: (true) }, { style: ({}) })], __VLS_functionalComponentArgsRest(__VLS_43), false));
    var __VLS_48 = __VLS_resolvedLocalAndGlobalComponents.NFlex;
    /** @type { [typeof __VLS_components.NFlex, typeof __VLS_components.nFlex, typeof __VLS_components.NFlex, typeof __VLS_components.nFlex, ] } */
    // @ts-ignore
    var __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48(__assign({ justify: ("space-between") }, { style: ({}) })));
    var __VLS_50 = __VLS_49.apply(void 0, __spreadArray([__assign({ justify: ("space-between") }, { style: ({}) })], __VLS_functionalComponentArgsRest(__VLS_49), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    var __VLS_54 = __VLS_resolvedLocalAndGlobalComponents.NSwitch;
    /** @type { [typeof __VLS_components.NSwitch, typeof __VLS_components.nSwitch, ] } */
    // @ts-ignore
    var __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({ size: ("large"), value: ((__VLS_ctx.isRGBMode)), checkedValue: ((true)), uncheckedValue: ((false)), }));
    var __VLS_56 = __VLS_55.apply(void 0, __spreadArray([{ size: ("large"), value: ((__VLS_ctx.isRGBMode)), checkedValue: ((true)), uncheckedValue: ((false)), }], __VLS_functionalComponentArgsRest(__VLS_55), false));
    __VLS_nonNullable(__VLS_53.slots).default;
    var __VLS_53;
    var __VLS_60 = __VLS_resolvedLocalAndGlobalComponents.NFlex;
    /** @type { [typeof __VLS_components.NFlex, typeof __VLS_components.nFlex, typeof __VLS_components.NFlex, typeof __VLS_components.nFlex, ] } */
    // @ts-ignore
    var __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({ justify: ("space-between"), }));
    var __VLS_62 = __VLS_61.apply(void 0, __spreadArray([{ justify: ("space-between"), }], __VLS_functionalComponentArgsRest(__VLS_61), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    var __VLS_66 = __VLS_resolvedLocalAndGlobalComponents.NSwitch;
    /** @type { [typeof __VLS_components.NSwitch, typeof __VLS_components.nSwitch, ] } */
    // @ts-ignore
    var __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({ size: ("large"), value: ((__VLS_ctx.isDialogBoxHairGlass)), checkedValue: ((true)), uncheckedValue: ((false)), }));
    var __VLS_68 = __VLS_67.apply(void 0, __spreadArray([{ size: ("large"), value: ((__VLS_ctx.isDialogBoxHairGlass)), checkedValue: ((true)), uncheckedValue: ((false)), }], __VLS_functionalComponentArgsRest(__VLS_67), false));
    __VLS_nonNullable(__VLS_65.slots).default;
    var __VLS_65;
    __VLS_nonNullable(__VLS_47.slots).default;
    var __VLS_47;
    __VLS_styleScopedClasses['container'];
    __VLS_styleScopedClasses['theme-switch'];
    __VLS_styleScopedClasses['theme-switch'];
    __VLS_styleScopedClasses['preset-colors'];
    __VLS_styleScopedClasses['preset-color'];
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
            Sparkles: ionicons5_1.Sparkles,
            Sunny: ionicons5_1.Sunny,
            isDarkTheme: isDarkTheme,
            primaryColor: primaryColor,
            isAutoTheme: isAutoTheme,
            isRGBMode: isRGBMode,
            isDialogBoxHairGlass: isDialogBoxHairGlass,
            presetColors: presetColors,
            setPresetColor: setPresetColor,
            railStyle: railStyle,
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
