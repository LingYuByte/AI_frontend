import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(),
        AutoImport({
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
        Components({
            resolvers: [NaiveUiResolver()]
        }),
        vueJsx()
    ], resolve: {
        alias: {
            // 设置路径 这里resolve和join可自行选用
            '~': path.resolve(__dirname, './'),
            // 设置别名
            '@': path.resolve(__dirname, './src')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    build: {
        target: ['edge90', 'chrome90', 'firefox90', 'safari15']
    }
})
