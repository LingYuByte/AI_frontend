<template>
    <n-back-top :right="100" />
    <n-card style="margin-bottom: 20px;height: 80vh" title="在线AI" :header-style="{
        padding: `10px 30px 5px`,
        fontSize: `larger`,
        fontWeight: `bold`,
        backgroundColor: themeStore.getTransparentColor(`0.3`),
        borderRadius: `10px 10px 0 0`
    }">
        <NGrid :cols="48" style="height: 99%;margin-top: 0.3%;">
            <NGridItem :span="screenInfo.isHidden ? 0 : (MenuOn.collapsed ? 9 : 11)" style="max-height: 70vh;">
                <div>
                    <h4>模型</h4>
                    <NSelect v-model:value="model" :options="modelOptions" :render-option="renderModelLabel" />
                </div>
            </NGridItem>
            <NGridItem v-if="!screenInfo.isHidden" span="1" style="height: 100%;">
                <NDivider vertical style="width: 2.5px;height: 100%;--n-color:rgba(52,52,52,0.8);margin-left: 40%" />
            </NGridItem>
            <NGridItem :span="screenInfo.isHidden ? 47 : (MenuOn.collapsed ? 38 : 34)" style="max-height: 70vh;">
                <ChatDetail v-model:messages="messages" v-model:use-context="useContext" :send-message="sendMessage" />
            </NGridItem>
        </NGrid>
    </n-card>
</template>

<script lang="tsx" setup>

import { NCard, NGrid, NGridItem, NSelect, SelectOption, NTooltip, NBackTop, NDivider } from 'naive-ui'
// 获取登录信息
import { useUserStore } from '@/stores/user';
import ChatDetail, { IMessages } from './chatDetail.vue';
import * as uuid from 'uuid'
import { Ref, ref, VNode, h } from 'vue';
import { useLayoutStore } from '@/stores/useLayout';
import { useThemeStore } from '@/stores/theme';
import { useScreenStore } from '@/stores/useScreen';
import request from '@/utils/request';
let userStore = useUserStore();
let MenuOn = useLayoutStore();
let messages: Ref<IMessages[]> = ref([]);
let themeStore = useThemeStore();
let screenInfo = useScreenStore();
let useContext = ref(false);
let pmt = ref(`你是一个学识渊博的专家，请回答用户的问题`);
function sendMessage(value: string) {
    let password = userStore.userInfo?.password;

    messages.value.push({
        id: uuid.v7(),
        role: "user",
        content: value
    });


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
            }, Math.floor(Math.random() * 10))
        }
        else if (endHandel) {
            clearInterval(interval);
        }
    }
    let interval = setInterval(intervalHandel, 20);
    let sendMessages: { role: "system" | "assistant" | "user", content: string }[] = [
        {
            role: "system",
            content: pmt.value
        }
    ];
    if (useContext.value) {
        sendMessages = sendMessages.concat(messages.value.map(item => {
            return {
                role: item.role,
                content: item.content
            }
        }))
    }
    else {
        sendMessages.push({
            role: "user",
            content: value
        });
    }
    messages.value.push({
        id: uuid.v7(),
        role: "assistant",
        content: ``
    })
    console.log(sendMessages);
    if (password) {
        let offset = 0;
        request({
            method: 'post',
            url: `/chat`,
            data: {
                model: model.value,
                messages: sendMessages
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
request.post(`/getModels`).then((data) => {
    modelOptions.value = data.data.data.filter((e) => { return e.type === 'chat' && e.available }).map((e) => {
        return { label: e.name, value: e.name, explain: e.description }
    })
})
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