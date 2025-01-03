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

} from '@vicons/ionicons5';
import { useUserStore } from '@/stores/user';
import { MenuMixedOption } from 'naive-ui/es/menu/src/interface';


/**
 * 渲染图标组件。
 * @param icon - 要渲染的图标组件。
 * @returns 返回一个渲染函数，该函数使用 h 函数创建并返回一个 NIcon 组件实例，其中包含传入的图标组件。
 */
export function renderIcon(icon: Component, options?: any) {
    return () => h(NIcon, options ?? null, { default: () => h(icon) });
}
const baseMenuOptions: MenuMixedOption[] = [{
    label: () => h(
        RouterLink,
        {
            to: { name: 'home' }
        },
        { default: () => '首页' }
    ),
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
            label: () => h(
                RouterLink,
                {
                    to: { name: 'ai-chat' }
                },
                { default: () => 'AI 对话' }
            ),
            key: 'ai-chat',
            icon: renderIcon(ChatbubblesOutline)
        },
        {
            label: () => h(
                RouterLink,
                {
                    to: { name: 'ai-tts' }
                },
                { default: () => '文本转语音' }
            ),
            key: 'ai-tts',
            icon: renderIcon(Mic)
        }
    ]
},
{
    label: '商店',
    key: 'shop',
    icon: renderIcon(BagHandleOutline),
    children: [
        {
            label: () => h(
                RouterLink,
                {
                    to: { name: 'productList' }
                },
                { default: () => '商品列表' }
            ),
            key: 'productList',
            icon: renderIcon(ChatbubblesOutline)
        },
        {
            label: () => h(
                RouterLink,
                {
                    to: { name: 'cartCheckOut' }
                },
                { default: () => '购物车' }
            ),
            key: 'cartCheckOut',
            icon: renderIcon(CartOutline)
        }
    ]
},
{
    label: ()=>h(RouterLink, {
        to: { name: 'price' }
    }, { default: () => '价格说明' }),
    key: 'price',
    icon: renderIcon(CashOutline)
}
];
// 基本菜单选项
export const computedMenuOptionsUser = computed(() => baseMenuOptions);
export const computedMenuOptionsAdmin = computed(() => [...baseMenuOptions, {
}]);
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);


export const computedMenuOptions = computed(() => {
    if ((!userInfo.value) || userInfo.value.group !== 0) return computedMenuOptionsUser.value;
    return computedMenuOptionsAdmin.value;
});

export default computedMenuOptions;