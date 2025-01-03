<script setup lang="ts">
import { Ref, ref } from 'vue';
import {
    NLayout,
    NLayoutSider,
    NCarousel,
    NButton,
    NCollapse,
    NCollapseItem,
    NCard,
    NFlex,
    useDialog
} from 'naive-ui';
import useCartStore from '@/stores/cart';
import router from '@/router';
import request from '@/utils/request';

const product: Ref<IProduct> = ref<IProduct>({
    id: 0,
    name: '',
    price: 0,
    originalPrice: 0,
    description: '',
    afterSale: '',
    images: []
});
request.get(`/products/${router.currentRoute.value.params.id}`).then((res) => {
    product.value = res.data;
    product.value.originalPrice = product.value.price;
});
const cartState = useCartStore();
const dialog = useDialog();
const addToCart = () => {
    const cartItem = {
        ...product.value,
        quantity: 1
    };
    cartState.addToCart(cartItem);
    dialog.create({
        title: `去结算`,
        content: `您的商品已加入购物车，现在去结算？`,
        positiveText: `去结算`,
        negativeText: `继续浏览`,
        onPositiveClick: ()=>{router.push('cart')}
    })
};
</script>

<template>
    <n-card :title="product.name + `  商品详情`">
        <n-layout class="product-detail">
            <n-layout has-sider>
                <n-layout-sider bordered>
                    <n-carousel indicator-placement="outside" show-arrow autoplay style="height: 35vh;">
                        <img v-for="(image, index) in product.images" :key="index" :src="image"
                            class="carousel-image" />
                    </n-carousel>
                </n-layout-sider>
                <n-layout content-style="padding: 0 40px;">
                    <NFlex vertical justify="space-between">
                        <p class="price">
                            <span class="discount-price">¥{{ product.price }}</span>
                            <span class="original-price">¥{{ product.originalPrice }}</span>
                        </p>
                        <n-button type="primary" @click="addToCart" style="width: 15%;" size="large">购买</n-button>
                        <n-collapse default-expanded-names="商品详情">
                            <n-collapse-item title="商品详情" name="商品详情">
                                <p>{{ product.description }}</p>
                            </n-collapse-item>
                            <n-collapse-item title="售后说明" name="售后说明">
                                <p>{{ product.afterSale }}</p>
                            </n-collapse-item>
                        </n-collapse>
                    </NFlex>
                </n-layout>
            </n-layout>
        </n-layout>
    </n-card>

</template>

<style lang="scss" scoped>
.product-detail {
    font-family: 'Arial', sans-serif;
}

.n-layout-header {
    padding: 20px;
}

.price {
    font-size: 24px;
    color: #e4393c;
}

.discount-price {
    font-size: 24px;
    color: #e4393c;
}

.original-price {
    font-size: 16px;
    color: #a9a9a9;
    text-decoration: line-through;
    margin-left: 5px;
}

.n-space {
    margin-bottom: 20px;
}

.carousel-image {
    width: 100%;
    height: auto;
}

.n-layout {
    --n-color: #fff !important;
}

@media (max-width: 768px) {
    .n-layout-sider {
        display: none;
    }

    .n-layout {
        width: 100%;
    }
}
</style>