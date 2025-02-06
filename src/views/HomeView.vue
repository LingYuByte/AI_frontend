<template>
    <NLayout style="height: 100vh">
        <NLayoutHeader round>
            <HeaderComponent />
        </NLayoutHeader>
        <NLayout :inverted="true" position="absolute" style="top: 60px;" has-sider>
            <NLayoutSider :style="{ display: isHidden ? 'none' : 'flex' }" collapse-mode="width" :collapsed-width="64"
                :width="240" :collapsed="collapsed" show-trigger @collapse="handleCollapse" @expand="handleExpand"
                :native-scrollbar="false">
                <MenuComponent />
            </NLayoutSider>
            <NLayout content-style="padding: 24px;" :native-scrollbar="false">
                <router-view></router-view>
            </NLayout>
        </NLayout>
    </NLayout>
</template>

<script lang="ts" setup>
import { NLayout,  NLayoutHeader, NLayoutSider } from 'naive-ui';
import MenuComponent from '@/components/MenuComponent.vue';
import { useLayoutStore } from '@/stores/useLayout';
import { useScreenStore } from '@/stores/useScreen';
import { storeToRefs } from 'pinia';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { computed } from 'vue';
// 菜单适配手机端，自动隐藏sider
const screenStore = useScreenStore();
const { isHidden } = storeToRefs(screenStore);


const layoutStore = useLayoutStore();
const collapsed = computed(() => layoutStore.collapsed);

const handleCollapse = () => {
    layoutStore.setCollapse(true);
};

const handleExpand = () => {
    layoutStore.setCollapse(false);
};
</script>