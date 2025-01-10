<script setup lang="tsx">
import ImageEditor from '@/components/ImageEditor.vue';
import request from '@/utils/request';
import { NAlert, NButton, NCard, NFlex, NImage, NInput, NSelect, useNotification } from 'naive-ui';
import { ref } from 'vue';
const notify = useNotification();
const src = ref('');
const size = ref('1024x1024'), prompt = ref('Edit image');
async function makeEdit(data: [Blob, Blob | null]) {
    if (!data) {
        return;
    }
    const form = new FormData();
    form.append('files', data[0]);
    form.append('files', data[1]!);
    form.append('size', size.value);
    form.append('model',`dall-e-2`);
    form.append('prompt', prompt.value);
    try {
        const { data: res } = await request.post(`/ai/image/edit`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (res.code !== 200) {
            notify.create({
                type: 'error',
                content: res.msg ?? `未知错误，请联系管理员`,
                duration: 3000,
                closable: true
            });
        }
        else {
            src.value = res.data;
            
        }
    }
    catch (err) {
        console.log(err);
        notify.create({
            type: 'error',
            content: `发生错误，请稍后再试`,
            duration: 3000,
            closable: true
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
    <NCard title="AI 图片编辑">
        <NAlert type="warning">
            <p>请注意，AI 图片编辑返回图片固定比例为 1:1，为了避免比例失调，建议仅上传正方形图片。</p>
        </NAlert>
        <NFlex align="center" justify="center" vertical style="margin-top: 5px;">
            <NFlex vertical align="center" justify="center" style="width: 40%;">
                <NSelect style="width: 60%;" v-model:value="size" :options="[{label: '256x256', value: '256x256'}, {label: '512x512', value: '512x512'}, {label: '1024x1024', value: '1024x1024'}]"></NSelect>
                <NInput show-count :type="`textarea`" :maxlength="1000" v-model:value="prompt"></NInput>
            </NFlex>
            <NFlex v-if="src !== ''" justify="center" align="center" style="width: 100%;">
                <NImage :src="src" width="80%"></NImage>
                <NButton type="primary" size="large" @click="downloadImage">下载图片</NButton>
            </NFlex>
        </NFlex>
        <ImageEditor :route-able="false" :resizAble="false" :export-func="makeEdit" style="margin-top: 15px;"></ImageEditor>
    </NCard>
</template>
<style lang="scss" scoped></style>