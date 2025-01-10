<template>
    <NCard title="AI 转录">
        <NFlex vertical align="center" justify="center">
            <NFlex align="center" justify="center">
                <NSelect v-model:value="language" :options="languageOptions" style="width: 12rem;" />
                <NButton type="primary" @click="translate" style="margin-left: 12px">翻译</NButton>
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
import { NButton, NCard, NFlex, NIcon, NInput, NP, NSelect, NUpload, NUploadDragger, UploadFileInfo, useNotification } from 'naive-ui';
import { Ref, ref } from 'vue';
const res = ref('请上传音频');
const filelist: Ref<UploadFileInfo[]> = ref([]);
const languageOptions = [
    { label: '中文', value: 'chinese' },
    { label: '英文', value: 'english' },
    { label: '日语', value: 'japanese' },
    { label: '韩语', value: 'korean' },
    { label: '法语', value: 'french' },
    { label: '德语', value: 'german' },
    { label: '俄语', value: 'russian' },
    { label: '西班牙语', value:'spanish' },
    { label: '泰语', value: 'thai' },
    { label: '印尼语', value: 'indonesian' },
    { label: '阿拉伯语', value: 'arabic' },
    { label: '葡萄牙语', value: 'portuguese' },
    { label: '越南语', value: 'vietnamese' },
    { label: '马来语', value:'malay' },
    { label: '泰米尔语', value: 'tamil' },
    { label: '希伯来语', value: 'hebrew' },
    { label: '阿塞拜疆语', value: 'azerbaijani' },
    { label: '土耳其语', value: 'turkish' },
    { label: '希腊语', value: 'greek' },
    { label: '保加利亚语', value: 'bulgarian' },
    { label: '波兰语', value: 'polish' },
    { label: '捷克语', value: 'czech' },
    { label: '斯洛伐克语', value:'slovak' },
    { label: '匈牙利语', value: 'hungarian' },
    { label: '瑞典语', value:'swedish' },
    { label: '丹麦语', value: 'danish' },
    { label: '芬兰语', value: 'finnish' },
    { label: '捷克语', value: 'czech' },
    { label: '罗马尼亚语', value: 'romanian' },
    { label: '斯洛文尼亚语', value:'slovenian' },
    { label: '乌克兰语', value: 'ukrainian' },
    { label: '保加利亚语', value: 'bulgarian' },
    { label: '阿塞拜疆语', value: 'azerbaijani' },
    { label: '土耳其语', value: 'turkish' },
    { label: '希腊语', value: 'greek' },
    { label: '保加利亚语', value: 'bulgarian' },
    { label: '波兰语', value: 'polish' },
    { label: '捷克语', value: 'czech' },
    { label: '斯洛伐克语', value:'slovak' },
    { label: '匈牙利语', value: 'hungarian' },
    { label: '瑞典语', value:'swedish' }
];
const notify = useNotification();
// 选中的模型
const selectedModel = ref('whisper-1');
const language = ref('chinese');

async function translate() {
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
    formData.append('language', language.value);
    try {
        res.value = '正在翻译...';
        const { data } = await request.post(`/ai/audio/translation`, formData);
        if (data.code === 200) {
            res.value = data.data;
        }
        else {
            res.value = '翻译失败' + data.msg;
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