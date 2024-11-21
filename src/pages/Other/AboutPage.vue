<template>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { LogoGithub } from '@vicons/ionicons5';
import { useScreenStore } from '@/stores/useScreen';
import { storeToRefs } from 'pinia';

// 加载状态，默认true
const loading = ref(true)

// 基础的手机端适配
const screenStore = useScreenStore();
const { screenWidth } = storeToRefs(screenStore);

// 获取当前年份
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

// 定义响应式状态
const buildTime = ref<string>('');
const version = ref<string>('');
const dependencies = ref<{ [key: string]: string }>({});
const devDependencies = ref<{ [key: string]: string }>({});

// 在组件挂载时加载 dependencies.json 文件
onMounted(async () => {
  try {
    const response = await fetch('/dependencies.json');
    const data = await response.json();
    buildTime.value = data.buildTime;
    version.value = data.version;
    dependencies.value = data.dependencies;
    devDependencies.value = data.devDependencies;
    loading.value = false;
  } catch (error) {
    console.error('"关于面板"页面 - 未能加载基础信息：', error);
  }
});
</script>
