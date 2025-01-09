<script setup lang="ts">
import { render } from '@/utils/MarkdownIt/markdown'
import { NSplit, NGrid, NGridItem, NButton, NFlex } from 'naive-ui'
import { useLayoutStore } from '@/stores/useLayout';
import { useScreenStore } from '@/stores/useScreen';

export interface IMessages {
    id: string,
    role: "user" | "system" | "assistant",
    content: string
}
const props = defineProps<{
    sendMessage: (value: string) => void
}>()
let messages = defineModel<IMessages[]>('messages', {
    required: true,
    default: () => []
})

function send() {
    props.sendMessage((document.querySelector(`#messageInputer`) as HTMLDivElement).innerText);
    (document.querySelector(`#messageInputer`) as HTMLDivElement).innerHTML = ``;
}
const screenStore = useScreenStore();
</script>
<template>
    <n-split style="height: 99%;" direction="vertical" default-size="300px" :max="`${(screenStore.screenHeight * 0.7 - 150)}px`" min="150px">
        <template #1>
            <n-scrollbar>
                <div id="messageView" class="message-view">
                    <div class="message-item" v-for="(item, index) of messages" :key="index">
                        <n-card :class="['message', item.role === 'user' ? 'self' : 'other']">
                            <div class="message-block">
                                <div :id="`message-${item.id}`" class="message-detail"
                                    v-html="render(item.content, 900, [`#message-${item.id}`])"></div>
                            </div>
                        </n-card>
                    </div>
                </div>
            </n-scrollbar>
        </template>
        <template #2>
            <n-flex justify="center" align="center" :wrap="false" id="footer-flex">
                <div id="messageInputer" contenteditable="plaintext-only" class="message-inputer"></div>
                <n-button type="primary" id="sendMessage" @click="send()">发送</n-button>
            </n-flex>
        </template>
    </n-split>
</template>
<style>
.message {
    width: auto;
    margin: 5px 5px 10px 5px;
    display: inline-block;
    height: auto;
}

.message .message-block {
    max-width: 70%;
}

.message-block .userName {
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-bottom: 5px;
}

.message .message-block .message-detail {
    border-radius: 10px;
    padding: 5px 5px;
    width: auto;
}

.message {
    flex-direction: row;
    display: flex;
    align-items: center;
}

.message-item {
    font-size: 16px !important;
}

.message.self {
    display: flex;
    flex-direction: row-reverse;
}


.message.self .message-block .message-detail {
    background-color: rgb(122, 204, 255);
    padding: 10px;
}

.message.other .message-block .message-detail {
    background-color: rgb(156, 156, 156);
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
</style>
<style scoped>
#header {
    width: calc(100% - 20px);
    text-align: center;
    border-bottom-style: dotted;
    padding: 10px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
}

#operator {
    width: 20px;
    height: 20px;
}

#chatName {
    margin-left: 20px;
    flex: 1 1;
}
</style>
<style>
.message-block a {
    color: red;
}

.message-block a:after {
    content: "\2197";
}

#preview {
    font-size: xx-large;
    position: fixed;
    z-index: 19999;
    background-color: rgba(220, 220, 220, 0.6);
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

<style lang="scss" scoped>
.message-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    overflow-y: auto;

    .message-item {
        margin: 5px 0;
        font-size: 16px;

        .message {
            max-width: 70%;
            word-wrap: break-word;
            border-radius: 10px;
            overflow: hidden;

            &.self {
                align-self: flex-end;
            }

            &.other {
                align-self: flex-start;
            }

            .message-block {
                padding: 10px;

            }
        }
    }
}

.message-inputer {
    width: 80%;
    min-height: 100px;
    padding: 10px;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    overflow: auto;
    font-size: 16px;
    line-height: 1.5;
}
#footer-flex
{
    height: 100%;
}
// 其他样式保持不变，根据需要调整
</style>