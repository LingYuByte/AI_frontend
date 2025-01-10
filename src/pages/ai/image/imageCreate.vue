<script setup lang="tsx">
import request from '@/utils/request';
import {  NButton, NCard, NFlex, NImage, NInput, NSelect, useNotification } from 'naive-ui';
import { computed, ref } from 'vue';
const notify = useNotification();
const src = ref('');
const size = ref('1024x1024'), prompt = ref('Edit image');
const selectedModel = ref('dall-e-3');
const modelOptions = [
    { label: 'DALL-E-2', value: 'dall-e-2' },
    { label: 'DALL-E-3', value: 'dall-e-3' },
    { label: 'DALL-E-3-HD', value: 'dall-e-3-hd' }];
const sizeOptions = computed(() => {
    switch (selectedModel.value) {
        case 'dall-e-2':
            return [{ label: '256x256', value: '256x256' }, { label: '512x512', value: '512x512' }, { label: '1024x1024', value: '1024x1024' }];
        case 'dall-e-3':
        case 'dall-e-3-hd':
            return [{ label: '1024x1024', value: '1024x1024' }, { label: '1024x1792', value: '1024x1792' }];
        default:
            return [];
    }
});
async function startDraw() {
    try {
        const {data} = await request.post('/api/ai/image/create', {
            prompt: prompt.value,
            size: size.value,
            model: selectedModel.value
        });
        if(data.code === 200)
            src.value = data.data;
        else
            notify.error({
                title: '发生错误',
                content: data.msg
            });
    } catch (error) {
        notify.error({
            title: '发生错误',
            content: `发生错误，请稍后重试或联系管理员。`
        });
    }
}

function downloadImage() {
    const a = document.createElement('a');
    a.href = src.value;
    a.download = 'image.png';
    a.target = '_blank';

    a.click();
}
</script>
<template>
    <NCard title="AI 文生图">
        <NFlex align="center" justify="center" vertical style="margin-top: 5px;">
            <NFlex align="center" justify="center" vertical style="width: 80%;">
                <NFlex align="center" justify="center" style="width: 80%;">
                    <NSelect style="width: 60%;" v-model:value="selectedModel" :options="modelOptions">
                    </NSelect>
                    <NSelect style="width: 60%;" v-model:value="size" :options="sizeOptions">
                    </NSelect>
                </NFlex>
                <NInput show-count :type="`textarea`" :maxlength="1000" v-model:value="prompt"></NInput>
                <NButton type="primary" size="large" @click="startDraw">开始生成</NButton>
            </NFlex>
            <NFlex v-if="src !== ''" justify="center" align="center" style="width: 100%;">
                <NButton type="primary" size="large" @click="downloadImage">下载图片</NButton>
                <NImage :src="src" width="80%"></NImage>
            </NFlex>
        </NFlex>
    </NCard>
</template>
<style lang="scss" scoped></style>