import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useProviderStore } from '../stores/provider'
import { useUserStore } from '../stores/user';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/sign',
        name: `sign`,
        component: () => import('@/views/SignView.vue'),
    },
    {
        path: `/price`,
        name: 'price',
        component: () => import('@/views/PriceView.vue'),
        meta: {
            title: '价格 - LingYu Byte AI',
            keywords: 'LingYu Byte AI, 价格',
            description: 'LingYu Byte AI价格，您可以在这里查看LingYu Byte AI的价格',
            requiresAuth: false
        }
    },
    {
        path: '/ai',
        name: 'ai',
        component: () => import('@/views/ChatView.vue'),
        children: [
            {
                path: 'chat',
                name: 'ai-chat',
                component: () => import('@/pages/ai/chat/ChatMain.vue'),
                meta: {
                    title: 'AI对话 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI, ChatGPT, AI, AI对话',
                    requiresAuth: true,
                },
            },
            {
                path: "tts",
                name: "ai-tts",
                component: () => import('@/pages/ai/tts/ttsMain.vue'),
                meta: {
                    title: '文本转语音 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI, TTS, Text to Speech, 文本转语音',
                    requiresAuth: true,
                },
            },
            {
                path: "image/edit",
                name: "ai-image-edit",
                component: () => import('@/pages/ai/image/imageEdit.vue'),
                meta: {
                    title: '图片编辑 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI, 图片, 图片编辑, Pictures, Pictures Edit',
                    requiresAuth: true,
                },
            },
            {
                path: "image/create",
                name: "ai-image-create",
                component: () => import('@/pages/ai/image/imageEdit.vue'),
                meta: {
                    title: 'AI 文生图 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI, 图片, 文生图, AI 文生图, AI Art',
                    requiresAuth: true,
                },
            },
            {
                path: "image/redraw",
                name: "ai-image-redraw",
                component: () => import('@/pages/ai/image/imageEdit.vue'),
                meta: {
                    title: 'AI 重绘图 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI, 图片, 图片重绘, AI redraw, AI Art',
                    requiresAuth: true,
                },
            },
            {
                path: "audio/transcription",
                name: "ai-audio-transcription",
                component: () => import('@/pages/ai/audio/transcription.vue'),
            },
            {
                path: "audio/translation",
                name: "ai-audio-translation",
                component: () => import('@/pages/ai/audio/translation.vue'),
            }
        ]
    },
    {
        path: '/shop',
        name: 'shop',
        component: () => import('@/views/ShopView.vue'),
        children: [
            {
                path: 'recharge',
                name: 'recharge',
                component: () => import('@/pages/shop/rechargeBalance.vue'),
                meta: {
                    title: '充值 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI, 充值',
                    requiresAuth: true,
                },
            },
            {
                path: 'list',
                name: 'productList',
                component: () => import('@/pages/shop/productList.vue'),
                meta: {
                    title: 'AI对话 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI, ChatGPT, AI, AI对话',
                    requiresAuth: false,
                },
            },
            {
                path: "checkout",
                name: "cartCheckOut",
                component: () => import('@/pages/shop/cartCheckOut.vue'),
                meta: {
                    title: '商品结算 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI',
                    requiresAuth: true,
                },
            },
            {
                path: "detail/:id",
                name: "productDetail",
                component: () => import('@/pages/shop/productDetail.vue'),
                meta: {
                    title: '商品详情 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI, shop, 商品详情, 商店',
                    requiresAuth: true,
                },
            },
        ]
    }, 
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/views/HomeView.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/pages/HomePage.vue'),
                meta: {
                    title: '控制台首页 - LingYu Byte AI',
                    keywords: 'LingYu Byte AI',
                    description: 'LingYu Byte AI控制台首页，您可以在这里查看您的LingYu Byte AI 账户预览',
                    requiresAuth: false,
                }
            }
        ]
    },
]

const router = createRouter({
    history: createWebHistory(`/`),
    routes,
});

router.beforeEach((to, _from, next) => {
    useProviderStore().loadingBar?.start();

    const userStore = useUserStore();
    userStore.loadUser();
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