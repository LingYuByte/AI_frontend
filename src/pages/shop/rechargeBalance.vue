<template>
    <NCard class="recharge-container" title="充值">
        <NGrid cols="24">
            <NGridItem span="13">
                <n-form ref="formRef" :model="form"  style="width: 70%;">
                    <n-form-item label="充值金额(最少0.1元)" path="amount">
                        <NInputNumber v-model:value="form.amount" placeholder="最少 0.1 元" :precision="2" :min="0.1"/>
                    </n-form-item>
                    <n-form-item label="充值方式" path="paymentMethod">
                        <n-select v-model:value="form.paymentMethod" :options="paymentOptions" placeholder="请选择充值方式" />
                    </n-form-item>
                    <n-form-item>
                        <n-button type="primary" @click="handleRecharge">确认充值</n-button>
                    </n-form-item>
                </n-form>
            </NGridItem>
            <NGridItem span="9">
                <h3>充值说明：</h3>
                <p>本站余额可用于使用 AI 功能、购买会员等，<b color="red">余额支持提现，但需要收取 15% 手续费（向上保留至 0.01 元）。</b>。</p>
                <p>目前自助充值仅支持支付宝，微信、QQ 充值请 <a style="color: aqua;" target="_blank"
                        href="https://qm.qq.com/q/XmmHqszzeC">点击此处联系站长。</a>
                </p>
                <p>如支付后未到账，请保留好付款凭证并 <a style="color: aqua;" href="https://qm.qq.com/q/XmmHqszzeC"
                        target="_blank">点击此处联系站长。</a></p>
            </NGridItem>
        </NGrid>
    </NCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NForm, NFormItem, NSelect, NButton, NCard, NGrid, NGridItem, NInputNumber } from 'naive-ui';

const formRef = ref(null);
const form = ref({
    amount: 1.00,
    paymentMethod: 'alipay'
});

const paymentOptions = [
    {
        label: '微信支付',
        value: 'wxpay',
        disabled: true
    },
    {
        label: '支付宝',
        value: 'alipay',
        disabled: false
    },
    {
        label: 'QQ 支付',
        value: 'qqpay',
        disabled: true
    }
];


const handleRecharge = () => {
    (formRef.value as any).validate((errors: any) => {
        if (!errors) {
            window.alert(`充值金额: ${form.value.amount}, 充值方式: ${form.value.paymentMethod}`);
        } else {
            console.log(errors);
        }
    });
};

</script>

<style scoped lang="scss">
.recharge-container {
    width: 80%;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
}

a {
    text-decoration: none;
    position: relative;
}

a::after {
    content: '➡';
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
}
</style>