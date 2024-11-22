import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(),
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
