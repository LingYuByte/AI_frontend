/// <reference types="../../../node_modules/.vue-global-types/vue_3.5_false.d.ts" />
import { NGrid, NGridItem, NSelect, NTooltip } from 'naive-ui';
// 获取登录信息
import { useUserStore } from '@/stores/user';
import ChatDetail from './chatDetail.vue';
import axios from 'axios';
import ip from '@/utils/ip';
import * as uuid from 'uuid';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let userStore = useUserStore();
let messages = ref([]);
function encode(s) {
    return s.replace(/\\/g, `\\\\`);
}
function sendMessage(value) {
    let password = userStore.userInfo?.password;
    messages.value.push({
        id: uuid.v7(),
        role: "user",
        content: value
    });
    messages.value.push({
        id: uuid.v7(),
        role: "ai",
        content: ``
    });
    let s_queue = ``;
    let endHandel = false;
    let x = document.querySelector(`#messageView`);
    function intervalHandel() {
        x.scroll({
            top: x.scrollTop + 5, left: 0,
            behavior: "smooth"
        });
        if (s_queue !== ``) {
            setTimeout(() => {
                messages.value[messages.value.length - 1].content += s_queue[0];
                s_queue = s_queue.substring(1);
            }, Math.floor(Math.random() * 25));
        }
        else if (endHandel) {
            clearInterval(interval);
        }
    }
    let interval = setInterval(intervalHandel, 40);
    if (password) {
        let offset = 0;
        axios({
            method: 'post',
            url: `${ip}/chat`,
            data: {
                model: model.value,
                content: value
            },
            headers: {
                Authorization: password
            },
            responseType: 'stream', onDownloadProgress: ({ event: xhr }) => {
                // responseText 包含了从一开始到此刻的全部响应内容，所以我们需要从上次结束的位置截取，获得新增的内容
                const { responseText } = xhr.target;
                const chunk = responseText.substring(offset);
                // 记录这一次的结束位置
                offset = responseText.length;
                s_queue += chunk;
            }
        }).then((res) => {
            console.log(res.data);
            endHandel = true;
            console.log(111);
        }).catch((err) => {
            console.error(err);
        });
    }
    else {
        console.error('User password is not set');
    }
}
let model = ref(`gpt-3.5-turbo-ca`);
let modelOptions = ref([
    {
        label: 'gpt-3.5-turbo-ca',
        value: 'gpt-3.5-turbo-ca',
        explain: `使用微软转发`
    },
    {
        label: 'gpt-3.5-turbo',
        value: 'gpt-3.5-turbo',
        explain: `比 -ca 更快但是贵`
    },
    {
        label: 'gpt-4o-ca',
        value: 'gpt-4o-ca',
        explain: `比 gpt3.5 贵，能用图片，质量略高于3.5`
    }
]);
function renderModelLabel({ node, option }) {
    return h(NTooltip, {
        delay: 500
    }, {
        trigger: () => node,
        default: () => `${option.explain ?? option.label}`
    });
}
; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_fnComponent = (await import('vue')).defineComponent({});
;
let __VLS_functionalComponentProps;
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NBackTop;
    /** @type { [typeof __VLS_components.NBackTop, typeof __VLS_components.nBackTop, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ right: ((100)), }));
    const __VLS_2 = __VLS_1({ right: ((100)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = __VLS_resolvedLocalAndGlobalComponents.NCard;
    /** @type { [typeof __VLS_components.NCard, typeof __VLS_components.nCard, typeof __VLS_components.NCard, typeof __VLS_components.nCard, ] } */
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ style: ({}) }, title: ("在线AI"), }));
    const __VLS_8 = __VLS_7({ ...{ style: ({}) }, title: ("在线AI"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const __VLS_12 = __VLS_resolvedLocalAndGlobalComponents.NGrid;
    /** @type { [typeof __VLS_components.NGrid, typeof __VLS_components.NGrid, ] } */
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ cols: ((24)), ...{ style: ({}) }, }));
    const __VLS_14 = __VLS_13({ cols: ((24)), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = __VLS_resolvedLocalAndGlobalComponents.NGridItem;
    /** @type { [typeof __VLS_components.NGridItem, typeof __VLS_components.NGridItem, ] } */
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({ span: ("5"), }));
    const __VLS_20 = __VLS_19({ span: ("5"), }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({});
    const __VLS_24 = __VLS_resolvedLocalAndGlobalComponents.NSelect;
    /** @type { [typeof __VLS_components.NSelect, typeof __VLS_components.nSelect, ] } */
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ value: ((__VLS_ctx.model)), options: ((__VLS_ctx.modelOptions)), renderOption: ((__VLS_ctx.renderModelLabel)), }));
    const __VLS_26 = __VLS_25({ value: ((__VLS_ctx.model)), options: ((__VLS_ctx.modelOptions)), renderOption: ((__VLS_ctx.renderModelLabel)), }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_nonNullable(__VLS_23.slots).default;
    var __VLS_23;
    const __VLS_30 = __VLS_resolvedLocalAndGlobalComponents.NGridItem;
    /** @type { [typeof __VLS_components.NGridItem, typeof __VLS_components.NGridItem, ] } */
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({ span: ("1"), ...{ style: ({}) }, }));
    const __VLS_32 = __VLS_31({ span: ("1"), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    const __VLS_36 = __VLS_resolvedLocalAndGlobalComponents.NDivider;
    /** @type { [typeof __VLS_components.NDivider, typeof __VLS_components.nDivider, ] } */
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({ vertical: (true), ...{ style: ({}) }, }));
    const __VLS_38 = __VLS_37({ vertical: (true), ...{ style: ({}) }, }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_nonNullable(__VLS_35.slots).default;
    var __VLS_35;
    const __VLS_42 = __VLS_resolvedLocalAndGlobalComponents.NGridItem;
    /** @type { [typeof __VLS_components.NGridItem, typeof __VLS_components.NGridItem, ] } */
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({ span: ("15"), }));
    const __VLS_44 = __VLS_43({ span: ("15"), }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    // @ts-ignore
    [ChatDetail,];
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(ChatDetail, new ChatDetail({ messages: ((__VLS_ctx.messages)), sendMessage: ((__VLS_ctx.sendMessage)), }));
    const __VLS_49 = __VLS_48({ messages: ((__VLS_ctx.messages)), sendMessage: ((__VLS_ctx.sendMessage)), }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    __VLS_nonNullable(__VLS_47.slots).default;
    var __VLS_47;
    __VLS_nonNullable(__VLS_17.slots).default;
    var __VLS_17;
    __VLS_nonNullable(__VLS_11.slots).default;
    var __VLS_11;
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
            NGrid: NGrid,
            NGridItem: NGridItem,
            NSelect: NSelect,
            ChatDetail: ChatDetail,
            messages: messages,
            sendMessage: sendMessage,
            model: model,
            modelOptions: modelOptions,
            renderModelLabel: renderModelLabel,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ChatMain.vue.js.map