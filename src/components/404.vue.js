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
exports.default = defineComponent({
    name: 'NotFound'
}); /* PartiallyEnd: #3632/script.vue */
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
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: ("w-full h-full flex items-center justify-center") }));
    var __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NResult;
    /** @type { [typeof __VLS_components.NResult, typeof __VLS_components.nResult, typeof __VLS_components.NResult, typeof __VLS_components.nResult, ] } */
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ status: ("404"), title: ("404 你什么也找不到"), description: ("生活总归带点荒谬"), }));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{ status: ("404"), title: ("404 你什么也找不到"), description: ("生活总归带点荒谬"), }], __VLS_functionalComponentArgsRest(__VLS_1), false));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        var __VLS_thisSlot = __VLS_nonNullable(__VLS_5.slots).footer;
        var __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.NButton;
        /** @type { [typeof __VLS_components.NButton, typeof __VLS_components.nButton, typeof __VLS_components.NButton, typeof __VLS_components.nButton, ] } */
        // @ts-ignore
        var __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6(__assign({ 'onClick': {} })));
        var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ 'onClick': {} })], __VLS_functionalComponentArgsRest(__VLS_7), false));
        var __VLS_12 = void 0;
        var __VLS_13 = {
            onClick: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                __VLS_ctx.$router.replace('/');
            }
        };
        var __VLS_9 = void 0;
        var __VLS_10 = void 0;
        __VLS_nonNullable(__VLS_11.slots).default;
        var __VLS_11;
    }
    var __VLS_5;
    __VLS_styleScopedClasses['w-full'];
    __VLS_styleScopedClasses['h-full'];
    __VLS_styleScopedClasses['flex'];
    __VLS_styleScopedClasses['items-center'];
    __VLS_styleScopedClasses['justify-center'];
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
var __VLS_self;
