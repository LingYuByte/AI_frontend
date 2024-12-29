<script setup lang="ts">
import { ref } from 'vue';
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

const product: IProduct = {
    id: 0,
    name: '青铜会员',
    price: 100,
    originalPrice: 120,
    description: '这是一款高质量的商品，描述详细。',
    afterSale: '支持7天无理由退货',
    images: ['https://tse1-mm.cn.bing.net/th/id/OIP-C.kyy9HeivxWo4yodQBk4AFAHaKe?rs=1&pid=ImgDetMain', 'https://ts1.cn.mm.bing.net/th?id=OIP-C.ECd6ITnyLUoyff35MMq6iwHaNK&w=115&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2']
};
const cartState = useCartStore();
const dialog = useDialog();
const addToCart = () => {
    const cartItem = {
        ...product,
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