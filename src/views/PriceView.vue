<template>
    <n-layout style="height: 100vh">
        <n-layout-header round>
            <HeaderComponent />
        </n-layout-header>
        <n-layout :inverted="true" position="absolute" style="top: 60px;" has-sider>
            <n-layout-sider :style="{ display: isHidden ? 'none' : 'flex' }" collapse-mode="width" :collapsed-width="64"
                :width="240" :collapsed="collapsed" show-trigger @collapse="handleCollapse" @expand="handleExpand"
                :native-scrollbar="false">
                <MenuComponent />
            </n-layout-sider>
            <n-layout content-style="padding: 24px;" :native-scrollbar="false">
                <NCard>
                    <p>chat 类型模型扣费计算方法：扣费 = (输入 token 数 <span style="color: red;">* 0.5</span> + 输出 token 数) * 模型单价 / 1000</p>
                </NCard>
                <n-table :bordered="false" :single-line="false" style="margin-top: 1rem;">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>描述</th>
                            <th>价格</th>
                            <th>类型</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of models" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.price }} {{ transPrice(item.type)}}</td>
                            <td>{{ item.type }}</td>
                        </tr>
                    </tbody>
                </n-table>
            </n-layout>
        </n-layout>
    </n-layout>
</template>

<script lang="ts" setup>
import { NCard, NLayout, NLayoutHeader, NLayoutSider, NTable, useMessage } from 'naive-ui';
import MenuComponent from '@/components/MenuComponent.vue';
import { useLayoutStore } from '@/stores/useLayout';
import { useScreenStore } from '@/stores/useScreen';
import { storeToRefs } from 'pinia';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { computed, Ref, ref } from 'vue';
import request from '@/utils/request';
import ip from '@/utils/ip';
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
let message = useMessage();
interface Model {
    id:number
    name: string;
    description: string;
    price: number;
    type: string;
}
function transPrice(type:string)
{
    switch(type)
    {
        case "text":
            return "元 / 1k tokens";
        case "image":
            return "元 / 图片";
        case "stt":
            return "元 / 分钟";
        default:
            return "元 / 1k tokens";
    }
}
let models:Ref<Model[]> = ref([]);
request.post(`${ip}/getModels`).then((res)=>
{
    if(res.data.code == 200)
    {
        models.value = res.data.data;
    }
    else
    {
        message.error(`获取模型价格失败`);
        console.error(res.data);
    }
}).catch((err)=>
{
    message.error(`获取模型价格失败`);
    console.error(err);
})
</script>