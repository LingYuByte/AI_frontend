import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {visualizer} from 'rollup-plugin-visualizer'
// 缓存对象
// const cache = new Map();

// function isDepInclude(id: string, depPaths: string[], importChain: string[], getModuleInfo:Function): boolean | undefined {
//     const key = `${id}-${depPaths.join('|')}`;
//     // 出现循环依赖，不考虑
//     if (importChain.includes(id)) {
//         cache.set(key, false);
//         return false;
//     }
//     // 验证缓存
//     if (cache.has(key)) {
//         return cache.get(key);
//     }
//     // 命中依赖列表
//     if (depPaths.includes(id)) {
//         // 引用链中的文件都记录到缓存中
//         importChain.forEach(item => cache.set(`${item}-${depPaths.join('|')}`, true));
//         return true;
//     }
//     const moduleInfo = getModuleInfo(id);
//     if (!moduleInfo || !moduleInfo.importers) {
//         cache.set(key, false);
//         return false;
//     }
//     // 核心逻辑，递归查找上层引用者
//     const isInclude = moduleInfo.importers.some(
//         (importer:string) => isDepInclude(importer, depPaths, importChain.concat(id), getModuleInfo)
//     );
//     // 设置缓存
//     cache.set(key, isInclude);
//     return isInclude;
// };
// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(),
        vueJsx(),
        visualizer()
    ], resolve: {
        alias: {
            // 设置路径 这里resolve和join可自行选用
            '~': path.resolve(__dirname, './'),
            // 设置别名
            '@': path.resolve(__dirname, './src')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    }
})
