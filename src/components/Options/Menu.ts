// menu
import { h, Component, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { NIcon } from 'naive-ui';
import {
    ListOutline,
    HomeOutline,
    ChatbubblesOutline,
    CartOutline,
    BagHandleOutline,
    Mic,
    CashOutline,
    ImageOutline, // 假设引入图片图标
    VolumeHighOutline, // 假设引入音频图标
    AddOutline, // 假设引入添加图标
    MicOutline,
    LanguageOutline,
    ImagesOutline, // 假设引入麦克风图标
} from '@vicons/ionicons5';
import { useUserStore } from '@/stores/user';
import { MenuMixedOption } from 'naive-ui/es/menu/src/interface';

export function renderIcon(icon: Component, options?: any) {
    return () => h(NIcon, options ?? null, { default: () => h(icon) });
}

const baseMenuOptions: MenuMixedOption[] = [
    {
        label: () => h(RouterLink, { to: { name: 'home' } }, { default: () => '首页' }),
        key: 'home',
        icon: renderIcon(HomeOutline)
    },
    {
        type: 'divider',
        props: {
            style: { marginLeft: '32px' }
        }
    },
    {
        label: 'AI 功能',
        key: 'ai',
        icon: renderIcon(ListOutline),
        children: [
            {
                label: () => h(RouterLink, { to: { name: 'ai-chat' } }, { default: () => 'AI 对话' }),
                key: 'ai-chat',
                icon: renderIcon(ChatbubblesOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'ai-tts' } }, { default: () => '文本转语音' }),
                key: 'ai-tts',
                icon: renderIcon(Mic)
            },
            {
                label: '图像功能',
                key: 'ai-image',
                icon: renderIcon(ImageOutline),
                children: [
                    {
                        label: () => h(RouterLink, { to: { name: 'ai-image-edit' } }, { default: () => '图片编辑' }),
                        key: 'ai-image-edit',
                        icon: renderIcon(ImageOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'ai-image-create' } }, { default: () => 'AI 文生图' }),
                        key: 'ai-image-create',
                        icon: renderIcon(AddOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'ai-image-redraw' } }, { default: () => 'AI 重绘图' }),
                        key: 'ai-image-redraw',
                        icon: renderIcon(ImagesOutline)
                    }
                ]
            },
            {
                label: '音频功能',
                key: 'ai-audio',
                icon: renderIcon(VolumeHighOutline),
                children: [
                    {
                        label: () => h(RouterLink, { to: { name: 'ai-audio-transcription' } }, { default: () => '音频转录' }),
                        key: 'ai-audio-transcription',
                        icon: renderIcon(MicOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'ai-audio-translation' } }, { default: () => '音频翻译' }),
                        key: 'ai-audio-translation',
                        icon: renderIcon(LanguageOutline)
                    }
                ]
            }
        ]
    },
    {
        label: '商店',
        key: 'shop',
        icon: renderIcon(BagHandleOutline),
        children: [
            {
                label: () => h(RouterLink, { to: { name: 'productList' } }, { default: () => '商品列表' }),
                key: 'productList',
                icon: renderIcon(ListOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cartCheckOut' } }, { default: () => '购物车' }),
                key: 'cartCheckOut',
                icon: renderIcon(CartOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'recharge' } }, { default: () => '充值' }),
                key: 'recharge',
                icon: renderIcon(CashOutline)
            }
        ]
    },
    {
        label: () => h(RouterLink, { to: { name: 'price' } }, { default: () => '价格说明' }),
        key: 'price',
        icon: renderIcon(CashOutline)
    }
];

export const computedMenuOptionsUser = computed(() => baseMenuOptions);
export const computedMenuOptionsAdmin = computed(() => [...baseMenuOptions, /* 管理员菜单项 */]);

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

export const computedMenuOptions = computed(() => {
    if ((!userInfo.value) || userInfo.value.group !== 0) return computedMenuOptionsUser.value;
    return computedMenuOptionsAdmin.value;
});

export default computedMenuOptions;