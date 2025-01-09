<template>
    <div class="product-list">
        <NCard v-for="product in products" :key="product.id" :title="product.name" :bordered="false"
            class="product-card">
            <template #header-extra>
                <Ntag>{{ product.stock }} 库存</Ntag>
            </template>
            <NImage width="100%" :src="(product.images??[])[0]" />
            <NP>价格：{{ product.price }} 元</NP>
            <NButton type="primary" @click="goToDetail(product.id)">立即购买</NButton>
        </NCard>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { NCard, NImage, NP, NButton } from 'naive-ui';
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