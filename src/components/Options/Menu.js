"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computedMenuOptions = exports.computedMenuOptionsUser = void 0;
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var naive_ui_1 = require("naive-ui");
var ionicons5_1 = require("@vicons/ionicons5");
// 菜单图标渲染函数
function renderIcon(icon) {
    return function () { return (0, vue_1.h)(naive_ui_1.NIcon, null, { default: function () { return (0, vue_1.h)(icon); } }); };
}
// 基本菜单选项
exports.computedMenuOptionsUser = computed(function () { return [{
        label: function () { return (0, vue_1.h)(vue_router_1.RouterLink, {
            to: { name: '首页' }
        }, { default: function () { return '首页'; } }); },
        key: '首页',
        icon: renderIcon(ionicons5_1.HomeOutline)
    },
    {
        type: 'divider',
        props: {
            style: { marginLeft: '32px' }
        }
    },
    {
        label: function () { return (0, vue_1.h)(vue_router_1.RouterLink, {
            to: { name: '个人资料' }
        }, { default: function () { return '个人资料'; } }); },
        key: '个人资料',
        icon: renderIcon(ionicons5_1.PersonCircleOutline)
    },
    {
        label: 'AI 功能',
        key: 'AI 功能',
        "aria-expanded": true,
        icon: renderIcon(ionicons5_1.ListOutline),
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
                label: function () { return (0, vue_1.h)(vue_router_1.RouterLink, {
                    to: { name: 'AI 对话' }
                }, { default: function () { return 'AI 对话'; } }); },
                key: 'AI 对话',
                icon: renderIcon(ionicons5_1.GridOutline)
            }
        ]
    },
    {
        label: '扩展功能',
        key: '扩展功能',
        icon: renderIcon(ionicons5_1.ExtensionPuzzleOutline),
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
    }]; });
exports.computedMenuOptions = computed(function () {
    return exports.computedMenuOptionsUser.value;
});
