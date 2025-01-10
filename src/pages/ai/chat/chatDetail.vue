<script setup lang="ts">
import { render } from '@/utils/MarkdownIt/markdown'
import { NSplit, NButton, NIcon, NFlex, NInput, NCard, NScrollbar, NButtonGroup } from 'naive-ui'
import { useScreenStore } from '@/stores/useScreen';
import { onMounted, ref, watch } from 'vue';
import popover from '@/components/PopoverComponent.vue'
import request from '@/utils/request';
import { MicCircleOutline } from '@vicons/ionicons5'
import PopCard from '@/components/popCard.vue';
export interface IMessages {
    id: string,
    role: "user" | "system" | "assistant",
    content: string
}
const props = defineProps<{ sendMessage: Function }>()
let messages = defineModel<IMessages[]>('messages', {
    required: true,
    default: () => []
})
setInterval(() => {
    console.log(messages.value);
    }, 5000)
let containerRef = ref(document.body);
onMounted(() => {
    containerRef.value = document.querySelector(`#container .n-scrollbar-container`) as HTMLDivElement;
})
function send() {
    props.sendMessage(message.value);
    message.value = ``;
}
const screenStore = useScreenStore();
const mxLines = ref(2);
watch(screenStore, (val) => {
    mxLines.value = (val.screenHeight * 0.6) / 5;
});


let message = ref(``); // 引用输入框
let isRecording = ref(false);
let isEnCodeing = ref(false);
let mediaRecorder: MediaRecorder;
let stream: MediaStream;
let audioChunks: Blob[] = [];
const audioTime = ref(0);

let audioStartInterval: NodeJS.Timeout;
const startSpeechInput = async () => {
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('您的浏览器不支持录音功能。');
            return;
        }
        document.getElementById('micBtn')?.classList.add('active');
        if (!isRecording.value) {
            audioStartInterval = setInterval(() => {
                audioTime.value += 1;
            }, 1000);
            // 开始录音
            stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 2,
                    sampleRate: 44100
                }
            });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            mediaRecorder.addEventListener('dataavailable', (event) => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', async () => {
                clearInterval(audioStartInterval);
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const formData = new FormData();
                formData.append('file', audioBlob);
                formData.append('extname', 'wav')
                isEnCodeing.value = true;
                const { data: res } = await request.post(`/ai/transcription`, formData);
                isEnCodeing.value = false;
                if (res.code === 200) {
                    const text = await res.data;
                    message.value += text;
                } else {
                    console.error('上传音频文件失败。');
                }
            });

            mediaRecorder.start();
            isRecording.value = true;
            console.log('录音开始...');
        } else {
            // 停止录音
            mediaRecorder?.stop();
            stream.getTracks().forEach(track => track.stop());
            isRecording.value = false;
            console.log('录音结束。');
        }
    } catch (error) {
        console.error('录音失败：', error);
    }
};
</script>

<template>
    <NSplit style="height: 99%;" direction="vertical" :default-size="`${(screenStore.screenHeight * 0.7 - 150)}px`"
        :max="screenStore.screenHeight > 600 ? `${(screenStore.screenHeight * 0.7 - 150)}px` : `350px`" min="150px">
        <template #1>
            <div id="messageView" class="message-view">
                <NScrollbar id="container">
                    <div class="message-item" :sender="item.role" v-for="(item, index) of messages" :key="index">
                        <div class="message-block">
                            <popover :container="containerRef" :position="item.role === 'user' ? 'left' : 'right'">
                                <template #target>
                                    <NCard hoverable>
                                        <div :id="`message-${item.id}`" class="message-detail"
                                            v-html="render(item.content, [`#message-${item.id}`])"></div>
                                    </NCard>
                                </template>
                                <template>
                                    <div>
                                        <NButtonGroup>
                                            <NButton ghost>
                                                <template #icon>
                                                    <NIcon>
                                                        <LogInIcon />
                                                    </NIcon>
                                                </template>
                                            </NButton>
                                            <NButton ghost>
                                                <template #icon>
                                                    <NIcon>
                                                        <LogInIcon />
                                                    </NIcon>
                                                </template>
                                            </NButton>
                                            <NButton round>
                                                <template #icon>
                                                    <NIcon>
                                                        <LogInIcon />
                                                    </NIcon>
                                                </template>
                                            </NButton>
                                        </NButtonGroup>
                                    </div>
                                </template>
                            </popover>
                        </div>
                    </div>
                </NScrollbar>
            </div>
        </template>
        <template #2>
            <NFlex justify="center" align="center" :wrap="false" id="footer-flex">
                <NInput v-model:value="message" ref="messageInputRef" type="textarea" :resizable="false"
                    :autosize="{ minRows: 3, maxRows: 6 }">
                </NInput>
                <PopCard>
                    <template #target>
                        <NButton>awa</NButton>
                    </template>
                    <template #default>
                        <NFlex vertical justify="center" align="center">
                            <NButton text style="font-size: 16px;">
                                <NIcon @click="startSpeechInput" id="micBtn" style="width: 10rem;height: 10rem;">
                                    <MicCircleOutline />
                                </NIcon>
                            </NButton>
                            <div>
                                <span>录音时间：{{ audioTime }}s</span>
                                <br />
                                <span>{{ isRecording ? '正在录音...' : isEnCodeing ? 'AI 解析中...' : '点击后讲话' }}</span>
                            </div>

                        </NFlex>
                    </template>
                </PopCard>
                <NButton type="primary" id="sendMessage" @click="send()">发送</NButton>
            </NFlex>
        </template>
    </NSplit>
</template>

<style lang="scss">
.message {
    width: auto;
    margin: 5px 5px 10px 5px;
    display: inline-block;
    height: auto;
    flex-direction: row;
    align-items: center;
}

.message-block {
    max-width: 70%;
}

.message .message-block .userName {
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-bottom: 5px;
}

.message .message-block .message-detail {
    border-radius: 10px;
    padding: 5px 5px;
    width: auto;
}

.message-item {
    font-size: 16px !important;
}

.message.self {
    display: flex;
    flex-direction: row-reverse;
}

.message-block img {
    max-width: 30vh;
    display: block;
}

#messageInputer {
    display: inline-block;
    position: relative;
    width: calc(100% - 14px);
    height: 80%;
    padding: 2px;
    border-style: solid;
    margin-top: 2px;
    margin: 0px;
    overflow: auto;
}

#sendMessage {
    flex: 1 1 4rem;
    font-size: larger;
    font-weight: 600;
    max-height: 60px;
    min-height: 45px;
}

#previewMessage {
    height: 30%;
    width: 70%;
    margin-left: 15%;
    margin-top: 10%;
    font-size: larger;
    font-weight: 600;
}

.message-block a {
    color: red;
}


.v-binder-follower-content {
    position: sticky;
    top: 5%;
    width: 10rem;
}
</style>

<style lang="scss" scoped>
#header {
    width: calc(100% - 20px);
    text-align: center;
    border-bottom-style: dotted;
    padding: 10px;
    display: flex;
    justify-content: center;
}

#operator {
    width: 20px;
    height: 20px;
}

#chatName {
    margin-left: 20px;
    flex: 1 1;
}
2
.message-view {
    width: 98%;
    height: 98%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow-y: auto;

    .message-item {
        margin: 5px 0;
        font-size: 16px;
        display: flex;

        &[sender="user"] {
            flex-direction: row-reverse;
        }

        .message-block {
            width: auto;
            max-width: 70%;
        }
    }

    .message-block {
        align-items: center;

    }

    .message-item {
        margin: 5px 0;
        font-size: 16px;

        .n-card {
            background-color: rgb(255, 208, 251);
        }

        .message {
            max-width: 70%;
            word-wrap: break-word;
            border-radius: 10px;
            overflow: hidden;
        }
    }
}

.message-inputer {
    width: 80%;
    min-height: 200px;
    padding: 10px;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    overflow: auto;
    font-size: 16px;
    line-height: 1.5;
}

#footer-flex {
    height: 100%;
}

#micBtn {
    svg {
        width: 10rem;
        height: 10rem;
    }
}
</style>
