<template>
    <NCard title="AI 转录">
        <NFlex vertical align="center" justify="center">
            <NFlex align="center" justify="center">
                <NSelect v-model:value="selectedModel" :options="modelOptions" style="width: 12rem;" />
                <NPopover>
                    <template #trigger>
                        <NCheckbox v-model:checked="useRectify">AI 修正</NCheckbox>
                    </template>
                    <p>
                        直接转录可能出现不准确情况。
                    </p>
                    <p>
                        使用高级模型修复可大幅度增加准确度，但也会增加响应时间和花费。
                    </p>
                </NPopover>
                <NSelect v-model:value="rectifyModel" :options="models" prompt="选择修正模型" style="width: 12rem;"
                    v-if="useRectify">
                </NSelect>
                <NButton type="primary" @click="transcribe" style="margin-left: 12px">转录</NButton>

            </NFlex>
            <br />
            <NUpload v-model:file-list="filelist" accept="audio/*" style="width: 60%;">
                <NUploadDragger :multiple="false">
                    <div style="margin-bottom: 12px">
                        <NIcon size="48" :depth="3">
                            <Archive />
                        </NIcon>
                    </div>
                    <NP style="font-size: 16px">
                        点击或者拖动文件到该区域来上传
                    </NP>
                </NUploadDragger>
            </NUpload>
            <NInput type="textarea" readonly v-model:value="res" width="60%"></NInput>
        </NFlex>
    </NCard>
</template>

<script setup lang="ts">
import request from '@/utils/request';
import { Archive } from '@vicons/ionicons5';
import { NButton, NCard, NCheckbox, NFlex, NIcon, NInput, NP, NPopover, NSelect, NUpload, NUploadDragger, UploadFileInfo, useNotification } from 'naive-ui';
import { Ref, ref } from 'vue';
const res = ref('请上传音频');
const filelist: Ref<UploadFileInfo[]> = ref([]);
const modelOptions = [
    { label: 'whisper-1', value: 'whisper-1' }
];
const notify = useNotification();
// 选中的模型
const selectedModel = ref('whisper-1');
const useRectify = ref(true);
const rectifyModel = ref('gpt-3.5-turbo-ca');
const models = ref([]);
request.get(`/model/user`).then((res) => {
    models.value = res.data.data.map((e) => {
        return { ...e.dataValues, available: e.available }
    }).filter((e) => {
        return e.type === 'chat' && e.available
    }).map((e) => {
        return { label: e.name, value: e.name, explain: e.description }
    })
})
async function transcribe() {
    if (filelist.value.length === 0) {
        notify.error({
            title: '错误',
            content: '请选择音频'
        });
        return;
    }
    if (filelist.value.length > 1) {
        notify.error({
            title: '错误',
            content: '一次只能上传一个音频'
        });
        return;
    }
    const file = filelist.value[0].file as File;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', selectedModel.value);
    formData.append('rectify', useRectify.value ? rectifyModel.value : 'none');
    try {
        res.value = '正在转录...';
        const { data } = await request.post(`/ai/audio/transcription`, formData);
        if (data.code === 200) {
            res.value = data.data;
        }
        else {
            res.value = '转录失败' + data.msg;
            notify.error({
                title: '错误',
                content: data.msg,
                duration: 3000,
                closable: true
            });
        }
    }
    catch (e) {
        notify.error({
            title: '错误',
            content: '发生错误，请稍后重试或联系管理员',
            duration: 3000,
            closable: true
        });
        return;
    }

}
</script>