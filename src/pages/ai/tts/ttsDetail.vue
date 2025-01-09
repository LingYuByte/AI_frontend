<script setup lang="ts">
import { render } from '@/utils/MarkdownIt/markdown'
import { defineProps } from 'vue';
import { NSplit, NGrid, NGridItem, NButton } from 'naive-ui'
import { useLayoutStore } from '@/stores/useLayout';
export interface IMessages {
    id: string,
    role: "user" | "system" | "ai",
    content: string,
    meta?: { [key: string]: any }
}
const props = defineProps<{
    sendMessage: (value: string) => void
}>()
defineModel<IMessages[]>('messages', {
    required: true,
    default: () => []
})
function send() {
    props.sendMessage((document.querySelector(`#messageInputer`) as HTMLDivElement).innerText);
    (document.querySelector(`#messageInputer`) as HTMLDivElement).innerHTML = ``;
}
let layoutInfo = useLayoutStore();
let audio = new Audio();
function Play(url: string) {
    console.log(url);
    // audio.pause();
    audio.src = url;
    audio.play();
}
function Download(filename: string, url: string) {
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
}
</script>
<template>
    <div style="height: 100%;">
        <NSplit style="height: 99%;" direction="vertical" :default-size="0.65" :max="0.85" :min="0.35">
            <template #1>
                <div id="messageView"
                    style="overflow-y: auto;border-style:none none groove none;width: 99%;margin-left: auto;margin-right: auto;height: 100%;">
                    <div class="message-item" v-for="(item, index) of messages" :key="index">
                        <div :class="item.role == `user` ? `message self` : `message other`">
                            <div style="margin: 0px 5px;" class="message-block">

                                <div v-if="item.role == `user` || item.meta!.finished === false"
                                    :id="`message-${item.id}`" class="message-detail"
                                    v-html="render(item.content, [`#message-${item.id}`])">
                                </div>
                                <div v-else :id="`message-${item.id}`" class="message-detail">
                                    <NButton @click="Play(item.meta!.url)">
                                        播放
                                    </NButton>
                                    <NButton @click="Download(item.meta!.filename,item.meta!.url)">
                                        下载
                                    </NButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ::after
            </template>
            <template #2>
                <NGrid :cols="48" style="height: 100%;padding-left: 20px;padding-top: 1%;">
                    <NGridItem :span="layoutInfo.collapsed ? 37 : 34">
                        <div id="messageInputer" contenteditable="plaintext-only">
                        </div>
                    </NGridItem>
                    <NGridItem :span="layoutInfo.collapsed ? 2 : 4">
                    </NGridItem>
                    <NGridItem :span="layoutInfo.collapsed ? 6 : 9">
                        <NButton type="primary" id="sendMessage" @click="send()">发送</NButton>
                    </NGridItem>
                </NGrid>
                <div class="layui-row">

                    <div class="layui-col-lg10 layui-col-md10 layui-col-sm10" style="height: 100%;">

                    </div>
                    <div id="operators" class="layui-col-lg1 layui-col-md2 layui-col-sm2" style="height: 100%;">
                    </div>
                </div>
            </template>
        </NSplit>
    </div>
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

@media screen and (max-height:600px) {
    #messageInputer {
        height: 60%;
        margin-top: 8%;
    }
}

#sendMessage {
    height: 30%;
    width: 70%;
    margin-left: 15%;
    margin-top: 15%;
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

@media screen and (min-width:1200px) {
    #operators {
        margin-left: 40px;
    }

    #sendMessage {
        height: 30%;
        width: 95%;
        margin-left: 2%;
        margin-top: 15%;
        font-size: larger;
        font-weight: 600;
    }

    #previewMessage {
        height: 30%;
        width: 95%;
        margin-left: 2%;
        margin-top: 10%;
        font-size: larger;
        font-weight: 600;
    }
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