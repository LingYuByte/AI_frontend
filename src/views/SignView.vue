<template>
    <NLayout style="height: 100vh">
        <NLayoutContent>
            <NGrid cols="6" item-responsive responsive="screen"
                :class="{ 'register-mode': isRegister, 'mobile-mode': isMobile }">
                <NGridItem span="0 m:4" class="center-content hero-container" :class="{ 'hero-right': isRegister }">
                    <div class="hero" @click="isMobile && toggleRegister">
                        <template v-if="!isRegister">
                            <h1>Sign In to<br>LingYu Byte AI Panel</h1>
                            <p>如果您还没有账号<br>请
                                <NButton text type="primary" @click="toggleRegister">点击这里</NButton>
                                进行注册.
                            </p>
                        </template>
                        <template v-else>
                            <h1>Sign Up to<br>LingYu Byte AI Panel</h1>
                            <p>已经有账号了?<br>请
                                <NButton text type="primary" @click="toggleRegister">点击这里</NButton>
                                进行登录.
                            </p>
                        </template>
                    </div>
                </NGridItem>
                <NGridItem span="6 m:2" class="center-content form-container" :class="{ 'form-left': isRegister }">
                    <NCard style="height: 100vh;">
                        <template v-if="!isRegister">
                            <NForm ref="formRef" :model="model" :rules="loginRules" class="center-form">
                                <NAlert title="隐私策略&服务条款有更新" type="info">
                                    登录即代表您同意更新后的条款。<a href="/readme.html">点我</a> 查看隐私策略&服务条款。
                                </NAlert>
                                <NFormItem path="email">
                                    <NInput v-model:value="model.email" size="large" round placeholder="用户名或邮箱"
                                        maxlength="30" clearable />
                                </NFormItem>
                                <NFormItem path="password">
                                    <NInput v-model:value="model.password" size="large" round placeholder="密码"
                                        type="password" maxlength="64" show-password-on="mousedown" />
                                </NFormItem>
                                <NFlex justify="space-between">
                                    <NCheckBox size="small" v-model:checked="keepLoggedIn" label="保持登录" />
                                    <NButton text color="#9398b3">
                                        重置密码
                                    </NButton>
                                </NFlex>
                                <div style="display: flex; justify-content: flex-end; margin-top: 24px">
                                    <NButton :loading="loginLoading"
                                        :disabled="model.email === null || model.password === null || loginLoading"
                                        round type="primary" style="width: 45%;" size="large"
                                        @click="handleValidateButtonClick">
                                        登录
                                    </NButton>
                                    <NButton :loading="loginLoading"
                                        :disabled="loginLoading"
                                        round type="primary" style="width: 45%;margin-left: 4.5%;margin-right: 4%;" size="large"
                                        @click="()=>{isRegister = true}">
                                        注册
                                    </NButton>
                                </div>
                            </NForm>
                        </template>
                        <template v-else>
                            <NForm ref="formRef" :model="formModel" :rules="registerRules" class="center-form">
                                <NFormItem v-if="currentStep === 1" label="用户名" path="username">
                                    <NInput v-model:value="formModel.username" size="large" round placeholder="用户名"
                                        maxlength="20" clearable />
                                </NFormItem>
                                <NFormItem v-if="currentStep === 1" label="密码" path="password">
                                    <NInput v-model:value="formModel.password" size="large" round placeholder="密码"
                                        type="password" maxlength="48" show-password-on="mousedown" clearable />
                                </NFormItem>

                                <NFormItem v-if="currentStep === 2" label="邮箱" path="email">
                                    <NInput v-model:value="formModel.email" size="large" round placeholder="邮箱"
                                        type="text" maxlength="255" clearable />
                                </NFormItem>
                                <NFormItem v-if="currentStep === 2" label="确认密码" path="confirmPassword">
                                    <NInput v-model:value="formModel.confirmPassword" size="large" round
                                        placeholder="确认密码" type="password" maxlength="48" show-password-on="mousedown"
                                        clearable />
                                </NFormItem>
                                <NFormItem v-if="currentStep === 3" label="图形验证码" path="imgCode">
                                    <NGrid x-gap="12" :cols="5">
                                        <NGridItem :span="3">
                                            <NInput v-model:value="formModel.imgCode" size="large" round
                                                placeholder="图形验证码" maxlength="6" clearable />
                                        </NGridItem>
                                        <NGridItem :span="2">
                                            <img :src="imgcodeURL" @click="getImgCode" style="width: 100%;" />
                                        </NGridItem>
                                    </NGrid>
                                </NFormItem>
                                <NFormItem v-if="currentStep === 3" label="验证码" path="verificationCode">
                                    <NGrid x-gap="12" :cols="5">
                                        <NGridItem :span="3">
                                            <NInput v-model:value="formModel.verificationCode" size="large" round
                                                placeholder="验证码" maxlength="6" clearable />
                                        </NGridItem>
                                        <NGridItem :span="2">
                                            <NButton :loading="loadingCaptcha" @click="sendMailboxVerificationCode"
                                                style="width: 100%;" strong secondary type="primary" round size="large"
                                                :disabled="buttonDisabled">
                                                {{ buttonText }}
                                            </NButton>
                                        </NGridItem>
                                    </NGrid>
                                </NFormItem>
                                <NFormItem v-if="currentStep === 3" label="条款" path="clause">
                                    <NCheckbox size="large" v-model:checked="clause">
                                        我同意LingYu Byte AI的<NButton text tag="a"
                                            href="https://docs.chcat.cn/docs/Term_of_service" target="_blank"
                                            type="primary">
                                            服务条款
                                        </NButton>和<NButton text tag="a" href="https://docs.chcat.cn/docs/The_Privacy"
                                            target="_blank" type="primary">
                                            隐私策略
                                        </NButton>
                                    </NCheckBox>
                                </NFormItem>
                                <NFlex justify="space-between" style="margin-top: 24px">
                                    <NButton v-if="currentStep > 1" @click="prevStep" :loading="RegLoading" round
                                        type="primary" size="large">
                                        上一步
                                    </NButton>
                                    <NButton @click="nextStep" :disabled="isNextStepDisabled" :loading="RegLoading"
                                        round type="primary" size="large">
                                        {{ currentStep === 3 ? '注册' : '下一步' }}
                                    </NButton>
                                </NFlex>
                            </NForm>
                        </template>
                    </NCard>
                </NGridItem>
            </NGrid>
        </NLayoutContent>
    </NLayout>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import {
    FormInst,
    useMessage, NCard,
    NFlex, NGrid, NFormItem, NInput,
    NAlert, NButton, NLayout, NForm,
    FormRules, NGridItem,
    NCheckbox,
    NLayoutContent
} from 'naive-ui'
import { SHA512 } from 'crypto-js';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import request from '@/utils/request';

const loginLoading = ref(false);
const imgcodeURL = ref(``);
const imgcode = ref(``);
const timer = ref(0);
setInterval(() => {
    if (timer.value > 0) {
        timer.value -= 1;
    }
}, 1000)
let message = useMessage();
function getImgCode() {
    if (timer.value > 0) {
        message.warning(`请 ${timer.value} 秒后再重新请求`, {
            duration: 2000
        })
        return;
    }
    timer.value = 10;
    setTimeout(() => { })
    request.post(`/user/getImgCode`).then((res) => {
        if (res.data.code === 200) {
            imgcodeURL.value = res.data.data.url;
            imgcode.value = res.data.data.code;
        }
    })
}

getImgCode();
interface ModelType {
    email: string | null
    password: string | null
}
const keepLoggedIn = ref(false)
const loadingCaptcha = ref(false)
const buttonDisabled = ref(false)
const RegLoading = ref(false)
const buttonText = ref('发送验证码')
const countdown = ref(60)
const userStore = useUserStore();
const clause = ref(false);


const router = useRouter();
const formRef = ref<FormInst | null>(null)
const model = ref<ModelType>({
    email: null,
    password: null
})

const sendMailboxVerificationCode = async () => {
    if (SHA512(formModel.value.imgCode.toLowerCase()).toString().toLowerCase() !== imgcode.value) {
        timer.value = Math.min(timer.value, 3);
        message.error(`图形验证码错误${timer.value === 0 ? '，请重试' : `，${timer.value}秒后重试`}`);
        setTimeout(getImgCode, timer.value * 1000 + 300);
        return;
    }
    try {
        const response = await request.post(`/user/sendAuthEmail`, {
            username: formModel.value.username,
            email: formModel.value.email,
        });
        const data = response.data;
        if (data.code === 200) {
            message.success("邮箱验证码发送成功")
            buttonDisabled.value = true
            startCountdown()
        } else {
            message.error(data.msg);
            console.error('邮件发送失败:', data.msg);
        }
    } catch (error) {
        console.error('邮件发送API调用失败:', error);
    }
    loadingCaptcha.value = false
}
const startCountdown = () => {
    buttonText.value = `重新发送(${countdown.value}s)`
    const interval = setInterval(() => {
        countdown.value -= 1
        buttonText.value = `重新发送(${countdown.value}s)`
        if (countdown.value <= 0) {
            clearInterval(interval)
            buttonDisabled.value = false
            buttonText.value = '发送验证码'
            countdown.value = 60 // 重置倒计时
        }
    }, 1000)
}

const formModel = ref({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    verificationCode: '',
    imgCode: ''
});
const loginRules = {
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        },
        {
            pattern: /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,48}$/,
            message: '密码6~48位，且至少包含大写字母、小写字母、数字、特殊符号中任意三种',
            trigger: ['blur', 'input']
        }
    ],
}
const registerRules: FormRules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        },
        {
            pattern: /^[A-Za-z0-9_@./#&+-]{0,20}$/,
            message: '用户名只能包含字母、数字和常用的特殊字符',
            trigger: ['blur', 'input']
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        },
        {
            pattern: /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,48}$/,
            message: '密码6~48位，且至少包含字母、数字、特殊符号中任意两种',
            trigger: ['blur', 'input']
        }
    ],
    email: [
        {
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
        },
        {
            type: 'email',
            message: '请输入有效的邮箱地址',
            trigger: ['blur', 'input']
        }
    ],
    confirmPassword: [
        {
            required: true,
            message: '请确认密码',
            trigger: 'blur'
        }
    ],
    verificationCode: [
        {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
        },
        {
            pattern: /^[0-9]{6}$/,
            message: '验证码必须为6位数字',
            trigger: ['blur', 'input']
        }
    ],
    clause: [
        {
            required: true,
            message: '条款不能不选',
            trigger: 'blur'
        },
    ]
};
const currentStep = ref(1);
const nextStep = async () => {
    if (currentStep.value === 2 && passwordMismatch.value) {
        message.error('密码不匹配，请重新确认。');
    } else if (currentStep.value === 3) {
        RegLoading.value = true;
        try {
            const response = await request.post(`/user/register`, {
                username: formModel.value.username,
                password: SHA512((formModel.value.password ?? ``).toString().toLowerCase()).toString().toLowerCase(),
                email: formModel.value.email,
                verCode: formModel.value.verificationCode
            });
            const data = response.data;
            if (data.code === 200) {
                message.success("注册成功，请登录")
                toggleRegister()
            } else {
                message.error(data.message);
                console.error('注册失败:', data.message);
            }
        } catch (error) {
            console.error('注册API调用失败:', error);
        }
        RegLoading.value = false;
    } else {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const passwordMismatch = computed(() => {
    return currentStep.value === 2 && formModel.value.password !== formModel.value.confirmPassword;
});

const isNextStepDisabled = computed(() => {
    if (currentStep.value === 1) {
        return !formModel.value.username || !formModel.value.password;
    }
    if (currentStep.value === 2) {
        return !formModel.value.email || !formModel.value.confirmPassword;
    }
    if (currentStep.value === 3) {
        return !formModel.value.verificationCode || !clause.value || RegLoading.value === true
    }
    return false;
});

const handleValidateButtonClick = async () => {
    loginLoading.value = true //登录按钮状态设置为加载中
    try {
        await formRef.value?.validate();

        const response = await request.post(`/user/login`, {
            username: model.value.email,
            password: SHA512(model.value.password ?? ``).toString().toLowerCase()
        });
        if (response.data.code === 200) {
            const userInfo = response.data.data;

            const storageDuration = keepLoggedIn.value ? 'permanent' : '1d';
            userStore.setUser(userInfo, storageDuration);
            message.success(`登录成功，欢迎您，${userInfo?.username}！`)
            router.push('/home')
        } else {
            message.error('登录失败，请检查用户名或密码。')
        }
    } catch (error) {
        console.error('表单验证或登录失败', error);
        message.error('表单验证或登录失败，请重试。')
    }
    loginLoading.value = false
};

const isRegister = ref(false)
const isMobile = ref(false)

const toggleRegister = () => {
    isRegister.value = !isRegister.value
}

// 检测窗口大小以确定是否为手机端
const handleResize = () => {
    isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

h1 {
    font-size: 4em;
    font-weight: 700;
    line-height: normal;
}

.hero-container {
    transition: transform 0.75s cubic-bezier(0.25, 0.1, 0.25, 1), text-align 0.75s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.hero-container.hero-right {
    transform: translateX(50%);
    text-align: right;
}

.form-container {
    transition: transform 0.75s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.form-container.form-left {
    transform: translateX(-200%);
}

@media (max-width: 1023.5px) {
    .form-container.form-left {
        transform: none;
    }
}

.center-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.center-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

.hero {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 70px 0;
    cursor: pointer;

    p {
        font-size: 1.2em;
        font-weight: 500;
    }

    .n-button {
        font-size: 1em;
    }
}

@keyframes moveGradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.hero::before {
    content: '';
    position: absolute;
    top: 15%;
    left: 0;
    width: 280px;
    height: 100px;
    background: linear-gradient(to right, #4460f1, #c471ed, #f64f59);
    background-size: 200% 200%;
    animation: moveGradient 5s ease infinite;
    z-index: 1;
    filter: blur(70px);
}

/* 手机端样式 */
@media (max-width: 768px) {

    .hero-container,
    .form-container {
        transform: none !important;
        text-align: center;
    }

    .register-mode .hero-container {
        order: 2;
    }

    .register-mode .form-container {
        order: 1;
    }

    .n-grid.register-mode {
        flex-direction: column-reverse;
    }

    .center-content {
        flex: 1;
    }

    .hero {
        padding: 20px;
    }
}
</style>