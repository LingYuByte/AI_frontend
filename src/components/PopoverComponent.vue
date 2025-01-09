<script setup lang="ts">
import { NCard } from 'naive-ui';
import { onMounted, watch } from 'vue';
import { CSSProperties, nextTick, ref, useTemplateRef } from 'vue';
const targetRef = useTemplateRef('popover-target');
const popoverStyle = ref<CSSProperties>({});
let timeoutHide: NodeJS.Timeout = setTimeout(() => { });
let timeoutShow: NodeJS.Timeout = setTimeout(() => { });
const isShow = ref<boolean>(false);
let { during = 1000, delay = 100, container: containElem, position = 'right' } = defineProps<{
    during?: number,
    delay?: number,
    container: HTMLElement,
    position?: 'left' | 'right'
}>();
let lst = containElem;
watch(() => containElem, () => {
    lst.removeEventListener(`scroll`, () => {
        setPopoverPosition();
    });
    containElem.addEventListener(`scroll`, () => {
        setPopoverPosition();
    });
    lst = containElem;
})
onMounted(() => {
    containElem.addEventListener(`scroll`, () => {
        setPopoverPosition();
    })
    targetRef.value?.addEventListener(`mouseenter`,showPopover);
    targetRef.value?.addEventListener(`mouseleave`,hidePopover);
});
const showPopover = () => {
    clearTimeout(timeoutHide);
    timeoutShow = setTimeout(() => {
        isShow.value = true;
        nextTick(() => {
            setPopoverPosition();
        });
    }, delay);
};

const hidePopover = () => {
    clearTimeout(timeoutShow);
    setTimeout(() => {
        isShow.value = false;
    }, during);
};

const setPopoverPosition = () => {
    const container = containElem!;
    const cardElement = targetRef.value!;
    const cardRect = cardElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const isTopVisible = cardRect.top >= containerRect.top - 5&& cardRect.top <= containerRect.bottom;
    let top = 0;
    if (isTopVisible) {
        top = cardRect.top - containerRect.top; // 相对于容器的top
    } else {
        top = 5; // 可视区域的上端
    }
    popoverStyle.value = {
        top: `${top}px`,
        position: 'absolute',
        left: position === 'left' ? `${containerRect.width - cardRect.width - document.getElementById(`popover-content`)!.getBoundingClientRect().width - 10}px` : `${cardRect.width + 10}px`, // 容器宽度即card的右侧
        width: `auto`,
        height: `auto`
    };
};
</script>
<template>
    <div id="popover-target" ref="popover-target">
        <slot name="traget"></slot>
    </div>
    <NCard id="popover-content" v-if="isShow" :style="popoverStyle">
        <slot></slot>
    </NCard>
</template>