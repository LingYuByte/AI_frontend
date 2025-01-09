import { ESLint, Linter } from 'eslint';
import vuePlugin from 'eslint-plugin-vue';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
/** @type Linter.Config[] */
const config = [
    {
        // 适用于 Vue 文件
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
            }
        },
        files: ['**/*.vue'],
        plugins: {
            vue: vuePlugin,
            typescript: tsPlugin
        },
        rules: {
            'vue/multi-word-component-names': 'warn',
            'vue/no-v-html': 'off',
            'eqeqeq': 'error',
            'no-unused-vars': 'warn',
            'no-return-assign': 'error',
            'no-trailing-spaces': 'error',
            'indent': 4,
            'camelcase': 'error',
            'no-alert': 'error',
        }
    },
    {
        // 适用于 TypeScript 文件
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json', // 根据实际情况调整
            },
        },
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            'typescript-eslint': tsPlugin,
        },
        rules: {
            // TypeScript 特定规则
            'typescript-eslint/no-explicit-any': 'warn',
            'typescript-eslint/no-unused-vars': 'warn',
            'typescript-eslint/no-non-null-assertion': 'off',
            'eqeqeq': 'error',
            'no-unused-vars': 'warn',
        },
    },
];

export default config;