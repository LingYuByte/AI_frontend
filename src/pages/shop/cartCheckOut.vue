<template>
    <n-card class="cart-card" title="购物车结算">
        <n-list>
            <n-list-item v-for="product in shopCart" :key="product.id">
                <n-grid :cols="12" responsive="screen">
                    <n-grid-item span="1">
                        <n-checkbox v-on:update:checked="(e)=>updateSelected(product.id,e)" default-checked></n-checkbox>
                    </n-grid-item>
                    <n-grid-item span="2">
                        <n-image width="100" :src="product.images[0]"></n-image>
                    </n-grid-item>
                    <n-grid-item span="7">
                        <n-flex vertical justify="space-between">
                            <span class="product-name">{{ product.name }}</span>
                            <span class="product-description">{{ product.description }}</span>
                            <span class="product-price">单价：{{ product.price }} 元</span>
                        </n-flex>
                    </n-grid-item>
                    <n-grid-item span="2">
                        <n-flex justify="center">
                            <n-button round size="small" @click="cartState.decrement(product.id)"
                                :disabled="product.quantity <= 1">-</n-button>
                            <span class="product-quantity">{{ product.quantity }}</span>
                            <n-button round size="small" @click="cartState.increment(product.id)">+</n-button>
                        </n-flex>
                    </n-grid-item>
                </n-grid>
            </n-list-item>
        </n-list>
        <n-divider />
        <span class="total-price">总价：{{ total }} 元</span>
        <n-form ref="formRef" :model="formValue" :rules="rules">
            <n-form-item label="支付方式" path="payment">
                <n-radio-group v-model:value="formValue.payment">
                    <n-radio value="wechat">微信支付</n-radio>
                    <n-radio value="alipay">支付宝支付</n-radio>
                    <n-radio value="qqpay">QQ支付</n-radio>
                </n-radio-group>
            </n-form-item>
            <n-form-item label="备注" path="remark">
                <n-input v-model:value="formValue.remark" type="textarea" placeholder="请输入您的备注，建议先与管理员协商" />
            </n-form-item>
            <n-form-item>
                <n-button type="primary" @click="handleSubmit">确认购买</n-button>
            </n-form-item>
        </n-form>
    </n-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { NCard, NListItem, NList, NGrid, NGridItem, NImage, NCheckbox, NFlex, NDivider, NForm, NFormItem, NInput, NRadioGroup, NRadio, NButton } from 'naive-ui';
import { FormInst, FormRules, useMessage } from 'naive-ui';
import useCartStore from '@/stores/cart';

const cartState = useCartStore();
const shopCart = computed(() => cartState.products);
const message = useMessage();

const selectedProducts = ref(new Set<number>(shopCart.value.map((e)=>e.id)));

const formRef = ref<FormInst | null>(null);
const formValue = ref({
    payment: 'wechat',
    remark: ''
});

const rules: FormRules = {
    payment: {
        required: true, message: '请选择支付方式', trigger: 'blur'
    }
};
function updateSelected(productId:number,state:boolean)
{
    if(state)
    {
        selectedProducts.value.add(productId);
    }
    else
    {
        selectedProducts.value.delete(productId);
    }
}
const total = computed(() => {
    return Array.from(selectedProducts.value)
        .map(id => shopCart.value.find(p => p.id === id)!)
        .reduce((sum, product) => sum + product.price * product.quantity, 0);
});

const handleSubmit = (e: Event) => {
    e.preventDefault();
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            const selectedItems = Array.from(selectedProducts.value)
                .map(id => shopCart.value.find(p => p.id === id)!)
                .map(p => ({ id: p.id, quantity: p.quantity }));
            message.success('提交成功');
            // 处理结算逻辑，使用 selectedItems
        } else {
            message.error('表单验证失败');
        }
    });
};
</script>

<style scoped>
.cart-card {
    max-width: 800px;
    margin: 50px auto;
}

.product-name {
    font-size: 1.2em;
    font-weight: bold;
}

.product-description {
    color: #666;
}

.product-price {
    font-size: 1.1em;
    color: #e44d26;
}

.product-quantity {
    margin: 0 2px;
}

.total-price {
    font-size: 1.5em;
    margin-bottom: 20px;
    display: block;
}

.n-form {
    margin-top: 20px;
}
</style>