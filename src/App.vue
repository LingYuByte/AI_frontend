<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { RouterView } from 'vue-router';
import { useProviderStore } from './stores/provider';
import { useUserStore } from '@/stores/user';
import hljs from 'highlight.js/lib/core'
import ini from 'highlight.js/lib/languages/ini'
import nginx from 'highlight.js/lib/languages/nginx'
import powershell from 'highlight.js/lib/languages/powershell'
import { NLoadingBarProvider, NMessageProvider, NConfigProvider, NDialogProvider, darkTheme, lightTheme, useLoadingBar, useMessage, NNotificationProvider } from 'naive-ui';
import { computed, defineComponent, h, onMounted, onUnmounted, watch } from 'vue';

hljs.registerLanguage('ini', ini)
hljs.registerLanguage('nginx', nginx)
hljs.registerLanguage('powershell', powershell)

const userStore = useUserStore();

onMounted(() => {
    userStore.loadUser();
    userStore.checkUser(true).then((res) => {
        if (res === false) {
            useMessage().error("登录验证失败，请重新登录");
        }
    }).catch(() => {
        useMessage().error("登录验证失败，请重新登录");
    });
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

let animationFrameId: number | null = null;
let isRGBRunning = false;

const animatePrimaryColor = () => {
    if (isRGBRunning) return;
    isRGBRunning = true;

    let r = 255, g = 0, b = 0;
    let dr = -5, dg = 5, db = 0;

    const step = () => {
        if (!themeStore.isRGBMode) {
            isRGBRunning = false;
            return;
        }
        if (r <= 0 && g >= 255) { dr = 0; dg = -5; db = 5; }
        if (g <= 0 && b >= 255) { dr = 5; dg = 0; db = -5; }
        if (b <= 0 && r >= 255) { dr = -5; dg = 5; db = 0; }
        r += dr; g += dg; b += db;

        themeStore.primaryColor = `rgb(${r}, ${g}, ${b})`;
        animationFrameId = requestAnimationFrame(step);
    };

    step();
};

watch(() => themeStore.isRGBMode, (newVal) => {
    if (newVal) {
        animatePrimaryColor();
    } else if (animationFrameId) {
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
</script>

<style lang="scss">
#app {
    font-family: 'Lato', 'Fira Code', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
<template>
    <NConfigProvider :hljs="hljs" :theme="computedTheme" :theme-overrides="themeOverrides">
        <!-- 加载条 -->
        <NLoadingBarProvider>
            <!-- 顶部信息 -->
            <NMessageProvider>
                <!-- 对话框 -->
                <NDialogProvider>
                    <NNotificationProvider>
                        <ViewComponent />
                    </NNotificationProvider>
                </NDialogProvider>
            </NMessageProvider>
        </NLoadingBarProvider>
    </NConfigProvider>
</template>
