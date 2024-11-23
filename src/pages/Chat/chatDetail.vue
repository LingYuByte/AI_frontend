<script setup lang="ts">
import { render } from '@/utils/MarkdownIt/markdown'
import { ref, defineProps } from 'vue';
import { NSplit, NGrid, NGridItem, NButton } from 'naive-ui'
export interface IMessages {
    id: string,
    role: "user" | "system" | "ai",
    content: string
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
let onPreview = ref(false);
function handleClick(event: MouseEvent) {
    if ((event.target as HTMLElement).tagName!.toLowerCase() === 'svg') {
        onPreview.value = true;
        setTimeout(() => {
            console.log((document.getElementById(`preview`) as HTMLDivElement));
            let x = (event.target as HTMLElement).cloneNode(true) as HTMLElement;
            (document.getElementById(`preview`) as HTMLDivElement).appendChild(x);
        }, 150);
    }
}
function handleClickClose() {
    onPreview.value = false;
    document.querySelector(`#preview`)!.innerHTML = ``;
}
</script>
<template>
    <div @click="handleClickClose" id="preview" v-if="onPreview">

    </div>
    <div style="height: 100%;">
        <NSplit direction="vertical" default-size="350px" :max="`400px`" :min="`320px`">
            <template #1>
                <div id="messageView"
                    style="overflow-y: auto;border-style:none none groove none;width: 99%;margin-left: auto;margin-right: auto;height: 100%;">
                    <div @click="handleClick" class="message-item" v-for="(item, index) of messages" :key="index">
                        <div :class="item.role == `user` ? `message self` : `message other`">
                            <div style="margin: 0px 5px;" class="message-block">
                                <div :id="`message-${item.id}`" class="message-detail"
                                    v-html="render(item.content, 900, [`#message-${item.id}`])">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="bottom"></div>
                </div>
            </template>
            <template #2>
                <NGrid :cols="24" x-gap="20" style="height: 100%;padding-left: 20px;">
                    <NGridItem span="18">
                        <div id="messageInputer" contenteditable>
                        </div>
                    </NGridItem>
                    <NGridItem span="4">
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
    padding: 6px;
    border-style: solid;
    margin-top: 2px;
    overflow: auto;
}

#sendMessage {
    height: 30%;
    width: 70%;
    margin-left: 15%;
    margin-top: 15%;
    font-size: larger;
    font-weight: 600;
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