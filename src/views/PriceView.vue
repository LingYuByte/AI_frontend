<template>
    <NLayout style="height: 100vh">
        <NLayout-header round>
            <HeaderComponent />
        </NLayout-header>
        <NLayout :inverted="true" position="absolute" style="top: 60px;" has-sider>
            <NLayoutSider :style="{ display: isHidden ? 'none' : 'flex' }" collapse-mode="width" :collapsed-width="64"
                :width="240" :collapsed="collapsed" show-trigger @collapse="handleCollapse" @expand="handleExpand"
                :native-scrollbar="false">
                <MenuComponent />
            </NLayoutSider>
            <NLayout content-style="padding: 24px;" :native-scrollbar="false">
                <NCard>
                    <p>chat 类型模型扣费计算方法：扣费 = (输入 token 数 <span style="color: red;">* 0.5</span> + 输出 token 数) * 模型单价 /
                        1000</p>
                </NCard>
                <NTable :bordered="false" :single-line="false" style="margin-top: 1rem;">
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>描述</th>
                            <th>价格</th>
                            <th>类型</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="item of models" :key="item.id"
                            :style="{ '--n-td-color': item.available ? 'white' : 'rgba(161,161,161,0.25)',
                                '--n-td-text-color': item.available ? 'black' : 'rgba(111,111,111,.7)',
                            }">
                            <NPopover v-if="!item.available">
                                <template #trigger>
                                    <td>
                                        {{ item.name }}
                                    </td>
                                </template>
                                该模型需要升级 vip 才能使用 <a href="/shop/list" style="color: rgb(54 145 255 / 82%);">去购买？</a>
                            </NPopover>
                            <td v-else>{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.price }} {{ transPrice(item.type) }}</td>
                            <td>{{ item.type }}</td>
                        </tr>
                    </tbody>
                </NTable>
            </NLayout>
        </NLayout>
    </NLayout>
</template>

<script lang="ts" setup>
import { NCard, NLayout, NLayoutSider, NPopover, NTable, useMessage } from 'naive-ui';
import MenuComponent from '@/components/MenuComponent.vue';
import { useLayoutStore } from '@/stores/useLayout';
import { useScreenStore } from '@/stores/useScreen';
import { storeToRefs } from 'pinia';
import HeaderComponent from '@/components/HeaderComponent.vue';
import { computed, Ref, ref } from 'vue';
import request from '@/utils/request';
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
    id: number
    name: string;
    description: string;
    price: number;
    type: string;
    available?: boolean;
}
function transPrice(type: string) {
    switch (type) {
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
let models: Ref<Model[]> = ref([]);
request.get(`/model/user`).then((res) => {
    if (res.data.code == 200) {
        models.value = res.data.data.map((e) => {
            return {
                ...e.dataValues,
                available: e.available
            }
        }).sort((a, b) => {
            if (a.type === b.type)
                return a.price - b.price;
            else
                return a.type.localeCompare(b.type);
        });
        console.log(models.value);
    }
    else {
        message.error(`获取模型价格失败`);
        console.error(res.data);
    }
}).catch((err) => {
    message.error(`获取模型价格失败`);
    console.error(err);
})
</script>