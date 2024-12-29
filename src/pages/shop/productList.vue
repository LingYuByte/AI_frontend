<template>
    <div class="product-list">
        <n-card v-for="product in products" :key="product.id" :title="product.name" :bordered="false"
            class="product-card">
            <template #header-extra>
                <n-tag>{{ product.stock }} 库存</n-tag>
            </template>
            <n-image width="100%" :src="product.image" />
            <n-p>价格：{{ product.price }} 元</n-p>
            <n-button type="primary" @click="goToDetail(product.id)">立即购买</n-button>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NCard, NTag, NImage, NP, NButton } from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const products = ref([
    {
        price: 10,
        image: `https://tse2-mm.cn.bing.net/th/id/OIP-C.3hBgFtrc4-d0daxwmH7cnwHaE8?rs=1&pid=ImgDetMain`,
        stock: 10,
        id: `0`,
        name: `会员`
    },
    {
        price: 10,
        image: `https://tse2-mm.cn.bing.net/th/id/OIP-C.3hBgFtrc4-d0daxwmH7cnwHaE8?rs=1&pid=ImgDetMain`,
        stock: 10,
        id: `1`,
        name: `会员`
    }
]);

const goToDetail = (id: string) => {
    router.push({ name: 'productDetail', params: { id } });
    useRoute("productDetail").params.id
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