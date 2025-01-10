<template>
    <div ref="targetRef" @click="showPanel">
        <slot name="target"></slot>
    </div>
    <transition name="panel-fade">
        <div v-if="isOpen" class="panel" :style="{
            left: panelPosition.left,
            top: panelPosition.top
        }" ref="panelRef" @mousedown.stop>
            <div class="header" @mousedown="startDrag">
                <div class="user-header">
                    <slot name="header"></slot>
                </div>
                <button class="close-btn" @click="closePanel">X</button>
            </div>
            <div class="content">
                <slot></slot>
            </div>
            <div class="footer" v-if="$slots['footer']">
                <slot name="footer"></slot>
            </div>
            <div class="extra-operation" v-if="$slots['extra-operation']">
                <slot name="extra-operation"></slot>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue';

const isOpen = ref(false);
const targetRef = ref<HTMLDivElement | null>(null);
const panelRef = ref<HTMLDivElement | null>(null);
const panelPosition = ref({ left: '0px', top: '0px' });

const showPanel = async () => {
    isOpen.value = true;
    await nextTick();
    if (targetRef.value && panelRef.value) {
        const { left, top, width } = targetRef.value.getBoundingClientRect();
        const { offsetWidth: panelWidth, offsetHeight: panelHeight } = panelRef.value;
        panelPosition.value.left = `${left - (panelWidth - width) / 2}px`;
        panelPosition.value.top = `${top - panelHeight - 10}px`; // 10是间距
    }
};

const closePanel = () => {
    isOpen.value = false;
};

// 拖动相关
const isDragging = ref(false);
const initialMouseX = ref(0);
const initialMouseY = ref(0);
const initialPanelLeft = ref(0);
const initialPanelTop = ref(0);

const startDrag = (e: MouseEvent) => {
    if (panelRef.value) {
        initialMouseX.value = e.clientX;
        initialMouseY.value = e.clientY;
        initialPanelLeft.value = parseFloat(panelPosition.value.left);
        initialPanelTop.value = parseFloat(panelPosition.value.top);
        isDragging.value = true;
    }
};

const dragPanel = (e: MouseEvent) => {
    if (isDragging.value) {
        panelPosition.value.left = `${e.clientX - initialMouseX.value + initialPanelLeft.value}px`;
        panelPosition.value.top = `${initialPanelTop.value + e.clientY - initialMouseY.value}px`;
    }
};

const endDrag = () => {
    isDragging.value = false;
};

onMounted(() => {
    window.addEventListener('mousemove', dragPanel);
    window.addEventListener('mouseup', endDrag);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', dragPanel);
    window.removeEventListener('mouseup', endDrag);
});
</script>

<style lang="scss" scoped>
.panel {
    position: fixed;
    background-color: white;
    border: 1px solid #ccc;
    z-index: 1000;
    min-width: 200px;
    min-height: 120px;

    * {
        user-select: none;
    }
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    .user-header {
        flex: 1 1;
    }
    &:hover
    {
        cursor: move;
    }
}
.close-btn {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #e2e0e0;
    float: right;
}

.content {
    padding: 10px;
}

.footer {
    padding: 10px;
    border-top: 1px solid #ccc;
}

.extra-operation {
    padding: 10px;
    border-top: 1px solid #ccc;
}

.panel-fade-enter-active,
.panel-fade-leave-active {
    transition: opacity 0.5s;
}

.panel-fade-enter,
.panel-fade-leave-to {
    opacity: 0;
}
</style>