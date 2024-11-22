import { useThemeStore } from '@/stores/theme';
import { RouterView } from 'vue-router';
import { useProviderStore } from './stores/provider';
import { useUserStore } from '@/stores/user';
import hljs from 'highlight.js/lib/core';
import ini from 'highlight.js/lib/languages/ini';
import nginx from 'highlight.js/lib/languages/nginx';
import powershell from 'highlight.js/lib/languages/powershell';
import { NLoadingBarProvider, NMessageProvider, NConfigProvider, NDialogProvider } from 'naive-ui';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('powershell', powershell);
const userStore = useUserStore();
onMounted(() => {
    userStore.loadUser();
});
// 获取当前年份
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
// 控制台输出版权信息
const LingYu_Byte = "\n#   .----------------.  .----------------.  .-----------------. .----------------.  .----------------.  .----------------.   .----------------.  .----------------.  .----------------.  .----------------. \n#  | .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. | | .--------------. || .--------------. || .--------------. || .--------------. |\n#  | |   _____      | || |     _____    | || | ____  _____  | || |    ______    | || |  ____  ____  | || | _____  _____ | | | |   ______     | || |  ____  ____  | || |  _________   | || |  _________   | |\n#  | |  |_   _|     | || |    |_   _|   | || ||_   \\|_   _| | || |  .' ___  |   | || | |_  _||_  _| | || ||_   _||_   _|| | | |  |_   _ \\    | || | |_  _||_  _| | || | |  _   _  |  | || | |_   ___  |  | |\n#  | |    | |       | || |      | |     | || |  |   \\ | |   | || | / .'   \\_|   | || |   \\ \\  / /   | || |  | |    | |  | | | |    | |_) |   | || |   \\ \\  / /   | || | |_/ | | \\_|  | || |   | |_  \\_|  | |\n#  | |    | |   _   | || |      | |     | || |  | |\\ \\| |   | || | | |    ____  | || |    \\ \\/ /    | || |  | '    ' |  | | | |    |  __'.   | || |    \\ \\/ /    | || |     | |      | || |   |  _|  _   | |\n#  | |   _| |__/ |  | || |     _| |_    | || | _| |_\\   |_  | || | \\ `.___]  _| | || |    _|  |_    | || |   \\ `--' /   | | | |   _| |__) |  | || |    _|  |_    | || |    _| |_     | || |  _| |___/ |  | |\n#  | |  |________|  | || |    |_____|   | || ||_____|\\____| | || |  `._____.'   | || |   |______|   | || |    `.__.'    | | | |  |_______/   | || |   |______|   | || |   |_____|    | || | |_________|  | |\n#  | |              | || |              | || |              | || |              | || |              | || |              | | | |              | || |              | || |              | || |              | |\n#  | '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' | | '--------------' || '--------------' || '--------------' || '--------------' |\n#   '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'   '----------------'  '----------------'  '----------------'  '----------------' \n";
console.info(LingYu_Byte);
console.info(`Copyright 2023 - ${currentYear} LingYu Byte All rights reserved.`);
const themeStore = useThemeStore();
const computedTheme = computed(() => {
    return themeStore.theme === 'dark' ? darkTheme : lightTheme;
});
const themeOverrides = computed(() => {
    const commonColors = {
        primaryColor: themeStore.primaryColor,
        primaryColorHover: themeStore.primaryColor,
        primaryColorPressed: themeStore.primaryColor,
        primaryColorSuppl: themeStore.primaryColor,
    };
    const lightThemeOverrides = {
        bodyColor: '#f5f5f5', // 更改亮色主题下的背景颜色
    };
    return {
        common: {
            ...commonColors,
            ...(themeStore.theme === 'light' ? lightThemeOverrides : {}),
        },
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
const provider = useProviderStore();
const ViewComponent = defineComponent({
    render: () => h(RouterView),
    setup() {
        provider.setLoadingBar(useLoadingBar());
    },
});
let animationFrameId = null;
let isRGBRunning = false;
const animatePrimaryColor = () => {
    if (isRGBRunning)
        return;
    isRGBRunning = true;
    let r = 255, g = 0, b = 0;
    let dr = -5, dg = 5, db = 0;
    const step = () => {
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
        themeStore.primaryColor = `rgb(${r}, ${g}, ${b})`;
        animationFrameId = requestAnimationFrame(step);
    };
    step();
};
watch(() => themeStore.isRGBMode, (newVal) => {
    if (newVal) {
        animatePrimaryColor();
    }
    else if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
});
onMounted(() => {
    if (themeStore.isRGBMode) {
        animatePrimaryColor();
    }
});
onUnmounted(() => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
});
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
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.NConfigProvider;
    /** @type { [typeof __VLS_components.NConfigProvider, typeof __VLS_components.nConfigProvider, typeof __VLS_components.NConfigProvider, typeof __VLS_components.nConfigProvider, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ hljs: ((__VLS_ctx.hljs)), theme: ((__VLS_ctx.computedTheme)), themeOverrides: ((__VLS_ctx.themeOverrides)), }));
    const __VLS_2 = __VLS_1({ hljs: ((__VLS_ctx.hljs)), theme: ((__VLS_ctx.computedTheme)), themeOverrides: ((__VLS_ctx.themeOverrides)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    const __VLS_7 = __VLS_resolvedLocalAndGlobalComponents.NLoadingBarProvider;
    /** @type { [typeof __VLS_components.NLoadingBarProvider, typeof __VLS_components.nLoadingBarProvider, typeof __VLS_components.NLoadingBarProvider, typeof __VLS_components.nLoadingBarProvider, ] } */
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({}));
    const __VLS_9 = __VLS_8({}, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const __VLS_13 = __VLS_resolvedLocalAndGlobalComponents.NMessageProvider;
    /** @type { [typeof __VLS_components.NMessageProvider, typeof __VLS_components.nMessageProvider, typeof __VLS_components.NMessageProvider, typeof __VLS_components.nMessageProvider, ] } */
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    const __VLS_19 = __VLS_resolvedLocalAndGlobalComponents.NDialogProvider;
    /** @type { [typeof __VLS_components.NDialogProvider, typeof __VLS_components.nDialogProvider, typeof __VLS_components.NDialogProvider, typeof __VLS_components.nDialogProvider, ] } */
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({}));
    const __VLS_21 = __VLS_20({}, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const __VLS_25 = __VLS_resolvedLocalAndGlobalComponents.ViewComponent;
    /** @type { [typeof __VLS_components.ViewComponent, ] } */
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
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
            hljs: hljs,
            NLoadingBarProvider: NLoadingBarProvider,
            NMessageProvider: NMessageProvider,
            NConfigProvider: NConfigProvider,
            NDialogProvider: NDialogProvider,
            computedTheme: computedTheme,
            themeOverrides: themeOverrides,
            ViewComponent: ViewComponent,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
