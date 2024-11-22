"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_vue_1 = __importDefault(require("@vitejs/plugin-vue"));
var path_1 = __importDefault(require("path"));
var vite_2 = __importDefault(require("unplugin-auto-import/vite"));
var vite_3 = __importDefault(require("unplugin-vue-components/vite"));
var resolvers_1 = require("unplugin-vue-components/resolvers");
var plugin_vue_jsx_1 = __importDefault(require("@vitejs/plugin-vue-jsx"));
// https://vite.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_vue_1.default)(),
        (0, vite_2.default)({
            imports: [
                'vue',
                {
                    'naive-ui': [
                        'useMessage',
                        'useLoadingBar',
                        'lightTheme',
                        'darkTheme',
                        'useDialog',
                        'useNotification'
                    ]
                }
            ],
            dts: 'src/auto-imports.d.ts',
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
        }),
        (0, vite_3.default)({
            resolvers: [(0, resolvers_1.NaiveUiResolver)()]
        }),
        (0, plugin_vue_jsx_1.default)()
    ], resolve: {
        alias: {
            // 设置路径 这里resolve和join可自行选用
            '~': path_1.default.resolve(__dirname, './'),
            // 设置别名
            '@': path_1.default.resolve(__dirname, './src')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    build: {
        target: ['edge90', 'chrome90', 'firefox90', 'safari15']
    }
});
