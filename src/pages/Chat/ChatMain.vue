<template>
    <n-back-top :right="100" />
    <n-card style="margin-bottom: 20px;height: 80vh" title="在线AI">
        <NGrid :cols="24" style="height: 95%;margin-top: 2%;">
            <NGridItem span="5">
                <div>
                    <h4>模型</h4>
                    <n-select v-model:value="model" :options="modelOptions" :render-option="renderModelLabel" />
                </div>
            </NGridItem>
            <NGridItem span="1" style="height: 100%;">
                <n-divider vertical style="width: 2.5px;height: 100%;--n-color:rgba(52,52,52,0.8);margin-left: 40%" />
            </NGridItem>
            <NGridItem span="15">
                <ChatDetail v-model:messages="messages" :send-message="sendMessage" />
                <!-- <n-split direction="vertical" style="height: 100%" max="400px" default-size="60%">
                    <template #1>

                    </template>
<template #2>
                        <div
                            style="display: flex;width: 100%;height: 100%;justify-content: end;flex-direction: column;">
                            <n-input @keydown.enter.native="Enter" id="inputer" style="flex: 1 1 0"
                                v-model:value="userInput" type="textarea" placeholder="" />
                            <span style="font-size: 12px;margin-left: auto;color: rgba(180,180,170,0.9);">
                                按 Ctrl 键换行
                                按 Ctrl+Enter 键发送</span>
                        </div>
                    </template>
</n-split>
<div>
</div> -->
            </NGridItem>>
        </NGrid>
    </n-card>
</template>

<script lang="tsx" setup>
import {  NGrid, NGridItem, NSelect, SelectOption,  NTooltip } from 'naive-ui'
// 获取登录信息
import { useUserStore } from '@/stores/user';
import ChatDetail, { IMessages } from './chatDetail.vue';
import axios from 'axios';
import ip from '@/utils/ip';
import * as uuid from 'uuid'
import { Ref, ref, VNode, h } from 'vue';
let userStore = useUserStore();
let messages: Ref<IMessages[]> = ref([]);

function sendMessage(value: string) {
    let password = userStore.userInfo?.password;

    messages.value.push({
        id: uuid.v7(),
        role: "user",
        content: value
    });
    messages.value.push({
        id: uuid.v7(),
        role: "ai",
        content: ``
    })
    let s_queue = ``;
    let endHandel = false;
    let x = document.querySelector(`#messageView`)!;
    function intervalHandel() {
        x.scroll({
            top: x.scrollTop + 5, left: 0,
            behavior: "smooth"
        })
        if (s_queue !== ``) {
            setTimeout(() => {
                messages.value[messages.value.length - 1].content += s_queue[0];
                s_queue = s_queue.substring(1);
            }, Math.floor(Math.random() * 25))
        }
        else if (endHandel) {
            clearInterval(interval);
        }
    }
    let interval = setInterval(intervalHandel, 40);
    if (password) {
        let offset = 0;
        axios({
            method: 'post',
            url: `${ip}/chat`,
            data: {
                model: model.value,
                content: value
            },
            headers: {
                Authorization: password
            },
            responseType: 'stream', onDownloadProgress: ({ event: xhr }) => {
                // responseText 包含了从一开始到此刻的全部响应内容，所以我们需要从上次结束的位置截取，获得新增的内容
                const { responseText } = xhr.target;
                const chunk = responseText.substring(offset);
                // 记录这一次的结束位置
                offset = responseText.length;
                s_queue += chunk;
            }
        }).then((res) => {
            console.log(res.data);
            endHandel = true;
            console.log(111);
        }).catch((err) => {
            console.error(err);
        })
    } else {
        console.error('User password is not set');
    }
}
let model = ref(`gpt-3.5-turbo-ca`);
let modelOptions = ref([
    {
        label: 'gpt-3.5-turbo-ca',
        value: 'gpt-3.5-turbo-ca',
        explain: `使用微软转发`
    },
    {
        label: 'gpt-3.5-turbo',
        value: 'gpt-3.5-turbo',
        explain: `比 -ca 更快但是贵`
    },
    {
        label: 'gpt-4o-ca',
        value: 'gpt-4o-ca',
        explain: `比 gpt3.5 贵，能用图片，质量略高于3.5`
    }
])
function renderModelLabel({ node, option }: { node: VNode, option: SelectOption }) {
    return h(NTooltip, {
        delay: 500
    }, {
        trigger: () => node,
        default: () => `${option.explain ?? option.label}`
    })
}
</script>
<style>
#inputer .n-input-wrapper {
    resize: none;
    height: 100%;
    width: 100%;
    padding: 0;
}

#inputer textarea {
    height: 100%;
    width: 100%;
    font-size: 14px;
    font-family: "Microsoft YaHei";
    padding: 8px 10px;
}
</style>