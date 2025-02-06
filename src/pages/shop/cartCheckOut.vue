<template>
    <NCard class="cart-card" title="购物车结算">
        <NList>
            <NListItem v-for="product in shopCart" :key="product.id">
                <NGrid :cols="12" responsive="screen">
                    <NGridItem span="1">
                        <NCheckBox v-on:update:checked="(e) => updateSelected(product.id, e)"
                            default-checked></NCheckBox>
                    </NGridItem>
                    <NGridItem span="2">
                        <NImage width="100" :src="product.images[0]"></NImage>
                    </NGridItem>
                    <NGridItem span="7">
                        <NFlex vertical justify="space-between">
                            <span class="product-name">{{ product.name }}</span>
                            <span class="product-description">{{ product.description }}</span>
                            <span class="product-price">单价：{{ product.price }} 元</span>
                        </NFlex>
                    </NGridItem>
                    <NGridItem span="2">
                        <NFlex justify="center">
                            <NButton round size="small" @click="cartState.decrement(product.id)"
                                :disabled="product.quantity <= 1">-</NButton>
                            <span class="product-quantity">{{ product.quantity }}</span>
                            <NButton round size="small" @click="cartState.increment(product.id)">+</NButton>
                        </NFlex>
                    </NGridItem>
                </NGrid>
            </NListItem>
        </NList>
        <NDivider />
        <span class="total-price">总价：{{ total }} 元</span>
        <NForm ref="formRef" :model="formValue">
            <NFormItem label="支付方式" path="payment">
                <NRadioGroup v-model:value="formValue.payment">
                    <NRadio :disabled="true" value="wxpay">微信支付</NRadio>
                    <NRadio value="alipay">支付宝支付</NRadio>
                    <NRadio :disabled="true" value="qqpay">QQ支付</NRadio>
                </NRadioGroup>
            </NFormItem>
            <!-- <NFormItem label="备注" path="remark">
                <NInput v-model:value="formValue.remark" type="textarea" placeholder="请输入您的备注，建议先与管理员协商" />
            </NFormItem> -->
            <NFormItem>
                <NButton type="primary" @click="createOrder">确认购买</NButton>
            </NFormItem>
        </NForm>
    </NCard>
</template>

<script setup lang="tsx">
import { ref, computed } from 'vue';
import { NCard, NListItem, NList, NGrid, NGridItem, NImage, NFlex, NDivider, NForm, NFormItem, NRadioGroup, NRadio, NButton, useDialog, NProgress } from 'naive-ui';
import { FormInst } from 'naive-ui';
import useCartStore from '@/stores/cart';
import request from '@/utils/request';
const cartState = useCartStore();
const shopCart = computed(() => cartState.products);
const selectedProducts = ref(new Set<number>(shopCart.value.map((e) => e.id)));
const formRef = ref<FormInst | null>(null);
const formValue = ref({
    payment: 'alipay',
    remark: ''
});
const dialog = useDialog()
function updateSelected(productId: number, state: boolean) {
    if (state)
        selectedProducts.value.add(productId);
    else
        selectedProducts.value.delete(productId);
}
const total = computed(() => {
    return Array.from(selectedProducts.value)
        .map(id => shopCart.value.find(p => p.id === id)!)
        .reduce((sum, product) => sum + product.price * product.quantity, 0);
});
const percentage = ref(0);
const offset = ref(0);
let det = 2, det2 = 2;
function createOrder() {
    percentage.value = 0;
    dialog.create({
        title: '订单支付',
        content: () => {
            return <NFlex align='center' vertical justify='center'>
                <div id="status"><span>正在创建订单，请等待</span></div>
                <div id='progress' style={{ width: `115px` }}>
                    <NProgress style={{ width: `115px` }} offsetDegree={offset.value} type="circle" status="info" percentage={percentage.value}></NProgress>
                </div>
                <div id="url"></div>
                <div id='warning' style="display:none;color: red">
                    <p>为了识别订单，<b>请务必按照上方金额支付，多付、少付均不能完成订单。</b></p>
                    <p>如您发现上方金额与购物车显示金额差距 &le; 0.5 元，请按金额支付，多余资金会返还至您的余额。</p>
                    <p>若金额差距较大，请等待一段时间后重试。</p>
                </div>
            </NFlex>
        }
    })
    let flag = false;
    const interval = setInterval(() => {
        det2 += 0.1
        if (det2 >= 3.5 && !flag) {
            flag = true;
            for (let i = 1; i <= 5; i++) {
                ((time) => {
                    setTimeout(() => {
                        det2 -= 0.28;
                        if (time === 500) {
                            flag = false;
                        }
                    }, time)
                })(i * 100);
            }
        }

        if (percentage.value >= 65) {
            det = -0.2;
        }

        if (percentage.value <= 22) {
            det = 1;
        }

        percentage.value += det;
        offset.value += det2;

        if (offset.value >= 360) {
            offset.value = 0;
        }
    }, 50);
    request.post(`/order/create`, {
        products: shopCart.value.filter(p => selectedProducts.value.has(p.id)),
        payType: formValue.value.payment
    }).then((res) => {
        clearInterval(interval);
        console.log(res.data);
        // let res = { data: { payment: { price: 100, qrimg: `` } } };
        document.getElementById('status')!.innerHTML = `<h3>请支付 ${res.data.payment.price} 元</h3>
            <p>二维码剩余有效期 <span id="countdown" style="color:red">290</span><span style="color:red">请在超时前完成支付。</span></p>`;
        let countdown = 290;
        const countInterval = setInterval(() => {
            countdown -= 1;
            if (countdown <= 0) {
                clearInterval(countInterval);
                dialog.error({
                    title: '支付超时',
                    content: '请重新下单',
                    positiveText: `确认`,
                    onPositiveClick: () => {
                        dialog.destroyAll();
                    }
                });
                return;
            }
            document.getElementById('countdown')!.innerHTML = `${countdown} 秒`;
        }, 1000);
        document.getElementById('progress')!.style.display = 'none';
        document.getElementById('warning')!.style.display = 'block';
        document.getElementById('url')!.innerHTML = `<img src="data:image/png;base64,${res.data.payment.qrimg}" />`
        const getStatusInterval = setInterval(() => {
            request.post(`/order/${res.data.order.id}/status`).then((res) => {
                if ((res.data.status as string).toLowerCase() === 'success') {
                    clearInterval(getStatusInterval);
                    dialog.success({
                        title: '支付成功',
                        content: '订单已支付成功',
                        positiveText: `确认`,
                        onPositiveClick: () => {
                            dialog.destroyAll();
                        }
                    });
                }
                else if ((res.data.status as string).toLowerCase() === 'failed') {
                    clearInterval(getStatusInterval);
                    dialog.error({
                        title: '支付失败',
                        content: '订单可能已超时，请重新下单。如果您已支付，请联系管理员提供支付订单号'
                    });
                }
            }).catch((err) => {
                console.error(err);
            })
        }, 3000);
    }).catch((err) => {
        console.error(err);
        dialog.error({
            title: '创建订单失败',
            content: '请联系管理员'
        });
    })
}
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