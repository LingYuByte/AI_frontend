<template>
    <div class="product-list">
        <n-card v-for="product in products" :key="product.id" :title="product.name" :bordered="false"
            class="product-card">
            <template #header-extra>
                <n-tag>{{ product.stock }} 库存</n-tag>
            </template>
            <n-image width="100%" :src="(product.images??[])[0]" />
            <n-p>价格：{{ product.price }} 元</n-p>
            <n-button type="primary" @click="goToDetail(product.id)">立即购买</n-button>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { NCard, NTag, NImage, NP, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';
import request from '@/utils/request';

const router = useRouter();

const products:Ref<IProduct[]> = ref([]);
request.get(`/products`).then((res) => {
    products.value = res.data;
})

const goToDetail = (id: number) => {
    router.push({ name: 'productDetail', params: { id } });
};
</script>

<style lang="scss" scoped>
.product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.product-card {
    width: calc(33% - 20px);
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .n-card__content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .n-button {
        margin-top: 16px;
    }
}
</style>