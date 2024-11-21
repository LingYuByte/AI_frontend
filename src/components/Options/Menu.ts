import { h, Component } from 'vue';
import { RouterLink } from 'vue-router';
import { NIcon } from 'naive-ui';
import { useUserStore } from '@/stores/user';
import {
    StatsChartOutline,
    DocumentTextOutline,
    CloudDownloadOutline,
    GridOutline,
    ListOutline,
    HomeOutline,
    PersonCircleOutline,
    DocumentsOutline,
    ExtensionPuzzleOutline,
    InformationCircleOutline,
    EllipsisHorizontalCircleOutline,
    LinkOutline,
    PrismOutline,
    PricetagOutline,
    PlanetOutline,
    KeyOutline,
    ShieldCheckmarkOutline,
    PieChartOutline,
    BrowsersOutline,
    GiftOutline,
    PeopleOutline,
    ConstructOutline,
    ListCircleOutline,
    ServerOutline,
    BanOutline,
    BagHandleOutline
} from '@vicons/ionicons5';


// 菜单图标渲染函数
function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
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
    label: () => h(
        RouterLink,
        {
            to: { name: '个人资料' }
        },
        { default: () => '个人资料' }
    ),
    key: '个人资料',
    icon: renderIcon(PersonCircleOutline)
},
{
    label: 'AI 功能',
    key: 'AI 功能',
    "aria-expanded" : true,
    icon: renderIcon(ListOutline),
    // children: [
    //     {
    //         label: () => h(
    //             RouterLink,
    //             {
    //                 to: { name: 'AI 对话' }
    //             },
    //             { default: () => 'AI 对话' }
    //         ),
    //         key: 'AI 对话',
    //         icon: renderIcon(GridOutline)
    //     },
    //     {
    //         label: () => h(
    //             RouterLink,
    //             {
    //                 to: { name: '语音转文字' }
    //             },
    //             { default: () => '语音转文字' }
    //         ),
    //         key: '语音转文字',
    //         icon: renderIcon(DocumentTextOutline)
    //     }
    // ]
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
            icon: renderIcon(GridOutline)
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