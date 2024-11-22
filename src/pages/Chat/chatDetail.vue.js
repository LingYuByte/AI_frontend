/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { render } from '@/utils/MarkdownIt/markdown';
import { ref, defineProps } from 'vue';
import { NSplit, NGrid, NGridItem, NButton } from 'naive-ui';
const { defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps();
const model = defineModel('messages', {
    required: true,
    default: () => []
});
function send() {
    props.sendMessage(document.querySelector(`#messageInputer`).innerText);
    document.querySelector(`#messageInputer`).innerHTML = ``;
}
let onPreview = ref(false);
function handleClick(event) {
    if (event.target.tagName.toLowerCase() === 'svg') {
        onPreview.value = true;
        setTimeout(() => {
            console.log(document.getElementById(`preview`));
            let x = event.target.cloneNode(true);
            document.getElementById(`preview`).appendChild(x);
        }, 150);
    }
}
function handleClickClose() {
    onPreview.value = false;
    document.querySelector(`#preview`).innerHTML = ``;
}
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({
    __typeEmits: {},
});
;
let __VLS_functionalComponentProps;
const __VLS_defaults = {
    messages: () => [],
};
const __VLS_modelEmit = defineEmits();
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    if (__VLS_ctx.onPreview) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.handleClickClose) }, id: ("preview"), });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, });
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NSplit;
    /** @type { [typeof __VLS_components.NSplit, typeof __VLS_components.NSplit, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ direction: ("vertical"), defaultSize: ("350px"), max: ((`400px`)), min: ((`320px`)), }));
    const __VLS_2 = __VLS_1({ direction: ("vertical"), defaultSize: ("350px"), max: ((`400px`)), min: ((`320px`)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { "1": __VLS_thisSlot } = __VLS_nonNullable(__VLS_5.slots);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("messageView"), ...{ style: ({}) }, });
        for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (__VLS_ctx.handleClick) }, ...{ class: ("message-item") }, key: ((index)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ((item.role == `user` ? `message self` : `message other`)) }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ style: ({}) }, ...{ class: ("message-block") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ((`message-${item.id}`)), ...{ class: ("message-detail") }, });
            __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, modifiers: {}, value: (__VLS_ctx.render(item.content, 900, [`#message-${item.id}`])) }, null, null);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("bottom"), });
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { "2": __VLS_thisSlot } = __VLS_nonNullable(__VLS_5.slots);
        const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.NGrid;
        /** @type { [typeof __VLS_components.NGrid, typeof __VLS_components.NGrid, ] } */
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ cols: ((24)), xGap: ("20"), ...{ style: ({}) }, }));
        const __VLS_8 = __VLS_7({ cols: ((24)), xGap: ("20"), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.NGridItem;
        /** @type { [typeof __VLS_components.NGridItem, typeof __VLS_components.NGridItem, ] } */
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ span: ("18"), }));
        const __VLS_14 = __VLS_13({ span: ("18"), }, ...__VLS_functionalComponentArgsRest(__VLS_13));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("messageInputer"), contenteditable: (true), });
        __VLS_nonNullable(__VLS_17.slots).default;
        var __VLS_17;
        const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.NGridItem;
        /** @type { [typeof __VLS_components.NGridItem, typeof __VLS_components.NGridItem, ] } */
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ span: ("4"), }));
        const __VLS_20 = __VLS_19({ span: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.NButton;
        /** @type { [typeof __VLS_components.NButton, typeof __VLS_components.NButton, ] } */
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{ 'onClick': {} }, type: ("primary"), id: ("sendMessage"), }));
        const __VLS_26 = __VLS_25({ ...{ 'onClick': {} }, type: ("primary"), id: ("sendMessage"), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        let __VLS_30;
        const __VLS_31 = {
            onClick: (...[$event]) => {
                __VLS_ctx.send();
            }
        };
        let __VLS_27;
        let __VLS_28;
        __VLS_nonNullable(__VLS_29.slots).default;
        var __VLS_29;
        __VLS_nonNullable(__VLS_23.slots).default;
        var __VLS_23;
        __VLS_nonNullable(__VLS_11.slots).default;
        var __VLS_11;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("layui-row") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("layui-col-lg10 layui-col-md10 layui-col-sm10") }, ...{ style: ({}) }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("operators"), ...{ class: ("layui-col-lg1 layui-col-md2 layui-col-sm2") }, ...{ style: ({}) }, });
    }
    var __VLS_5;
    __VLS_styleScopedClasses['message-item'];
    __VLS_styleScopedClasses['message-block'];
    __VLS_styleScopedClasses['message-detail'];
    __VLS_styleScopedClasses['layui-row'];
    __VLS_styleScopedClasses['layui-col-lg10'];
    __VLS_styleScopedClasses['layui-col-md10'];
    __VLS_styleScopedClasses['layui-col-sm10'];
    __VLS_styleScopedClasses['layui-col-lg1'];
    __VLS_styleScopedClasses['layui-col-md2'];
    __VLS_styleScopedClasses['layui-col-sm2'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
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
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            render: render,
            NSplit: NSplit,
            NGrid: NGrid,
            NGridItem: NGridItem,
            NButton: NButton,
            send: send,
            onPreview: onPreview,
            handleClick: handleClick,
            handleClickClose: handleClickClose,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=chatDetail.vue.js.map