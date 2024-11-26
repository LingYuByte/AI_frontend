<template>
    <NCard style="margin-bottom: 20px;height: 80vh" title="文本转语音">
        <template #header-extra>
            <NSelect style="width: 10rem;" :options="voiceOptions" v-model:value="voice" :render-option="renderLabel">
            </NSelect>
        </template>
        <TtsDetail v-model:messages="messages" :send-message="sendMessage" />
    </NCard>
</template>

<script lang="tsx" setup>
import { NCard, NSelect, NTooltip, SelectOption } from 'naive-ui'
// 获取登录信息
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import ip from '@/utils/ip';
import * as uuid from 'uuid'
import { h, Ref, ref, VNode } from 'vue';
import { renderIcon } from '@/components/Options/Menu';
import { PlayCircleOutline } from '@vicons/ionicons5';
import { MD5 } from 'crypto-js';
import TtsDetail,{IMessages} from './ttsDetail.vue';
let userStore = useUserStore();
let messages: Ref<IMessages[]> = ref([]);
function sendMessage(value: string) {
    if (value === ``) {
        return;
    }
    let password = userStore.userInfo?.password;

    messages.value.push({
        id: uuid.v7(),
        role: "user",
        content: value
    });
    messages.value.push({
        id: uuid.v7(),
        role: "ai",
        content: `正在生成中`,
        meta: {
            finished: false
        }
    })
    let x = document.querySelector(`#messageView`)!;
    let cnt = 0;
    function intervalHandel() {
        x.scroll({
            top: x.scrollTop + 5, left: 0,
            behavior: "smooth"
        })
        if (cnt == 5) {
            cnt = 0;
            messages.value[messages.value.length - 1].content = messages.value[messages.value.length - 1].content.substring(0, 6);
        }
        else {
            ++cnt;
            messages.value[messages.value.length - 1].content += `.`;
        }
    }
    let interval = setInterval(intervalHandel, 300);
    if (password) {
        axios({
            method: 'post',
            url: `${ip}/tts`,
            data: {
                content: value,
                voice: voice.value
            },
            headers: {
                Authorization: password
            },
            
        }).then((res) => {
            console.log(res.data.data);
            clearInterval(interval);
            const blob = new Blob([new Uint8Array(res.data.data.data).buffer], {
                type: `audio/mpeg`
            });
            const filename = MD5(res.data.data.content).toString() + `.mp3`;            // a.click();
            messages.value[messages.value.length - 1].meta = {
                url: window.URL.createObjectURL(blob),
                filename: filename,
                finished: true
            }

        }).catch((err) => {
            console.error(err);
        })
    } else {
        console.error('User password is not set');
    }
}
// alloy, echo, fable, onyx, nova, shimmer
let voice = ref(`alloy`);
let voiceOptions = ref([
    {
        label: 'alloy',
        value: 'alloy',
        url: `/assets/voice/alloy.mp3`
    },
    {
        label: 'echo',
        value: 'echo',
        url: `/assets/voice/echo.mp3`
    },
    {
        label: 'fable',
        value: 'fable',
        url: `/assets/voice/fable.mp3`
    },
    {
        label: 'onyx',
        value: 'onyx',
        url: `/assets/voice/onyx.mp3`
    },
    {
        label: 'nova',
        value: 'nova',
        url: `/assets/voice/nova.mp3`
    },
    {
        label: 'shimmer',
        value: 'shimmer',
        url: `/assets/voice/shimmer.mp3`
    }
])
function renderLabel({ node, option }: { node: VNode, option: SelectOption }) {
    return h(NTooltip, null, {
        trigger: () => node,

        default: () => {
            return [
                h('div', {
                    style: `height: 15px;padding:3px;font-size:large;`
                },
                    [
                        (renderIcon(PlayCircleOutline, {
                            onclick: `javascript:playAudio("${option.label}")`
                        }))()
                    ])
            ]
        }
    }
    )
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