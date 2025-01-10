<template>
    <NBackTop :right="100" />
    <NCard style="margin-bottom: 20px;height: 80vh;min-height: 500px;" title="在线AI" :header-style="{
        padding: `10px 30px 5px`,
        fontSize: `larger`,
        fontWeight: `bold`,
        backgroundColor: themeStore.getTransparentColor(`0.3`),
        borderRadius: `10px 10px 0 0`
    }">
        <NGrid :cols="48" style="height: 99%;margin-top: 0.3%;">
            <NGridItem :span="screenInfo.isHidden ? 0 : (MenuOn.collapsed ? 9 : 11)" style="max-height: 70vh;">
                <NFlex vertical align="center" justify="center" >
                    <NFlex style="width: 90%;" vertical justify="center">
                        <span style="font-size: larger;font-weight: 800;">选择模型：</span>
                        <NSelect style="width: 100%;" v-model:value="model" :options="modelOptions"
                            :render-option="renderModelLabel" />
                    </NFlex>
                    <NFlex style="margin-top: 5px;">
                        <NTooltip>
                            <template #trigger>
                                <NButton>
                                    <NCheckBox v-model:checked="useContext">使用上下文</NCheckBox>
                                </NButton>
                            </template>
                            使用上下文后 ChatGPT 会分析以上全部消息，可能导致token消耗极快，请谨慎选择。
                        </NTooltip>
                        <NButton @click="clearContext">清空上下文</NButton>
                    </NFlex>
                </NFlex>
            </NGridItem>
            <NGridItem v-if="!screenInfo.isHidden" span="1" style="height: 100%;">
                <NDivider vertical style="width: 2.5px;height: 100%;--n-color:rgba(52,52,52,0.8);margin-left: 40%" />
            </NGridItem>
            <NGridItem :span="screenInfo.isHidden ? 47 : (MenuOn.collapsed ? 38 : 36)" style="max-height: 70vh;">
                <ChatDetail v-model:messages="messages" v-model:use-context="useContext" :send-message="sendMessage" />
            </NGridItem>
        </NGrid>
    </NCard>
</template>

<script lang="tsx" setup>
import { NButton,NCard, NGrid, NGridItem, NSelect, SelectOption, NTooltip, NBackTop, NDivider, useDialog, NFlex } from 'naive-ui'
import { useUserStore } from '@/stores/user';
import ChatDetail, { IMessages } from './chatDetail.vue';
import * as uuid from 'uuid'
import { Ref, ref, VNode, h } from 'vue';
import { useLayoutStore } from '@/stores/useLayout';
import { useThemeStore } from '@/stores/theme';
import { useScreenStore } from '@/stores/useScreen';
import request from '@/utils/request';
const userStore = useUserStore();
const MenuOn = useLayoutStore();
const messages: Ref<IMessages[]> = ref([]);
const themeStore = useThemeStore();
const screenInfo = useScreenStore();
const useContext = ref(false);
const dialog = useDialog();
if (screenInfo.screenHeight < 600) {
    dialog.error({
        title: `屏幕尺寸过小`,
        content: `屏幕尺寸过小，可能无法正常显示，建议调整`
    })
}

const pmt = ref(`你是一个学识渊博的专家，请回答用户的问题`);
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
                const { responseText } = xhr.target;
                const chunk = responseText.substring(offset);
                offset = responseText.length;
                s_queue += chunk;
            }
        }).then(() => {
            endHandel = true;
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

function clearContext() {
    dialog.warning({
        title: `清空上下文`,
        content: () => h(`span`, {
            innerHTML: `确定清空上下文吗？清空后不可恢复`, style: `color:red`
        }
        ),
        positiveText: `确定`,
        negativeText: `取消`,
        onPositiveClick: () => {
            messages.value = [];
        }
    });
}
</script>
<style lang="scss">
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