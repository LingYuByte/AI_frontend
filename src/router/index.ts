import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useProviderStore } from '../stores/provider'
import { useUserStore } from '../stores/user';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/sign',
        name: `登录`,
        component: () => import('@/views/SignView.vue'),
    },
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/views/HomeView.vue'),
        children: [
            {
                path: '/home',
                name: '首页',
                component: () => import('@/pages/HomePage.vue'),
                meta: {
                    title: '控制台首页 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI',
                    description: 'LingYu Byte AI控制台首页，您可以在这里查看您的LingYu Byte AI 账户预览',
                    requiresAuth: true,
                }
            }
        ]
    },

    {
        path: '/',
        name: 'AI 功能',
        component: () => import('@/views/ChatView.vue'),
        children: [
            {
                path: '/chat',
                name: 'AI 对话',
                component: () => import('@/pages/Chat/ChatMain.vue'),
                meta: {
                    title: 'AI对话 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI, ChatGPT, AI, AI对话',
                    requiresAuth: true,
                },
            },
            {
                path: "tts",
                name: "文本转语音",
                component: () => import('@/pages/Chat/ttsMain.vue'),
                meta: {
                    title: '文本转语音 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI, TTS, Text to Speech, 文本转语音',
                    requiresAuth: true,
                },
            }
        ]

    }
]

const router = createRouter({
    history: createWebHistory(`/`),
    routes,
});

router.beforeEach((to, _from, next) => {
    useProviderStore().loadingBar?.start();

    const userStore = useUserStore();
    const isAuthenticated = !!userStore.userInfo; // 检查是否存在用户信息

    if (to.meta.requiresAuth && !isAuthenticated) {
        // 如果路由需要认证且用户未登录
        next({ path: '/sign' });
    } else {
        next();
    }
});

router.afterEach(() => {
    useProviderStore().loadingBar?.finish();
});

export default router;