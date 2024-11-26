import { h, Component, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { NIcon } from 'naive-ui';
import {
    ListOutline,
    HomeOutline,
    ChatbubblesOutline,
    ExtensionPuzzleOutline,
    Mic,

} from '@vicons/ionicons5';


/**
 * 渲染图标组件。
 * @param icon - 要渲染的图标组件。
 * @returns 返回一个渲染函数，该函数使用 h 函数创建并返回一个 NIcon 组件实例，其中包含传入的图标组件。
 */
export function renderIcon(icon: Component,options?: any) {
    return () => h(NIcon, options??null, { default: () => h(icon) });
}

// 基本菜单选项
export const computedMenuOptionsUser = computed(() => [{
    label: () => h(
        RouterLink,
        {
            to: { name: '首页' }
        },
        { default: () => '首页' }
    ),
    key: '首页',
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
    key: 'AI 功能',
    "aria-expanded" : true,
    icon: renderIcon(ListOutline),
    children: [
        {
            label: () => h(
                RouterLink,
                {
                    to: { name: 'AI 对话' }
                },
                { default: () => 'AI 对话' }
            ),
            key: 'AI 对话',
            icon: renderIcon(ChatbubblesOutline)
        },
        {
            label: () => h(
                RouterLink,
                {
                    to: { name: '文本转语音' }
                },
                { default: () => '文本转语音' }
            ),
            key: '文本转语音',
            icon: renderIcon(Mic)
        }
    ]
},
{
    label: '扩展功能',
    key: '扩展功能',
    icon: renderIcon(ExtensionPuzzleOutline),
    // children: [
    //     {
    //         label: () => h(
    //             RouterLink,
    //             {
    //                 to: { name: '免费域名' }
    //             },
    //             { default: () => '免费域名' }
    //         ),
    //         key: '免费域名',
    //         icon: renderIcon(LinkOutline)
    //     },
    //     {
    //         label: () => h(
    //             RouterLink,
    //             {
    //                 to: { name: '域名过白' }
    //             },
    //             { default: () => '域名过白' }
    //         ),
    //         key: '域名过白',
    //         icon: renderIcon(ShieldCheckmarkOutline)
    //     },
    //     {
    //         label: () => h(
    //             RouterLink,
    //             {
    //                 to: { name: '免费SSL' }
    //             },
    //             { default: () => '免费SSL' }
    //         ),
    //         key: '免费SSL',
    //         icon: renderIcon(KeyOutline)
    //     },
    //     {
    //         label: () => h(
    //             RouterLink,
    //             {
    //                 to: { name: '第三方市场' }
    //             },
    //             { default: () => '第三方市场' }
    //         ),
    //         key: '第三方市场',
    //         icon: renderIcon(BagHandleOutline)
    //     }
    // ]
}
]);

export const computedMenuOptions = computed(() => {
    return computedMenuOptionsUser.value;
});

export default computedMenuOptions;