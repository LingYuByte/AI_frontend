<template>
    <n-layout style="height: 100vh">
        <n-layout-content>
            <n-grid cols="6" item-responsive responsive="screen"
                :class="{ 'register-mode': isRegister, 'mobile-mode': isMobile }">
                <n-grid-item span="0 m:4" class="center-content hero-container" :class="{ 'hero-right': isRegister }">
                    <div class="hero" @click="isMobile && toggleRegister">
                        <h1>Sign In to<br>LingYu Byte AI</h1>
                        <p>如果您还没有账号<br>&emsp;&emsp;请联系管理员创建账号。
                        </p>
                    </div>
                </n-grid-item>
                <n-grid-item span="6 m:2" class="center-content form-container" :class="{ 'form-left': isRegister }">
                    <n-card style="height: 100vh;">
                        <template>
                            <n-form ref="formRef" :model="model" :rules="loginRules" class="center-form">
                                <n-alert title="隐私策略&服务条款有更新" type="info">
                                    登录即代表您同意更新后的条款。<a href="/readme.html">点我</a> 查看隐私策略&服务条款。
                                </n-alert>
                                <n-form-item path="email">
                                    <n-input v-model:value="model.email" size="large" round placeholder="用户名或邮箱"
                                        maxlength="30" clearable />
                                </n-form-item>
                                <n-form-item path="password">
                                    <n-input v-model:value="model.password" size="large" round placeholder="密码"
                                        type="password" maxlength="64" show-password-on="mousedown" />
                                </n-form-item>
                                <n-flex justify="space-between">
                                    <n-checkbox size="small" v-model:checked="keepLoggedIn" label="保持登录" />
                                    <n-button text color="#9398b3">
                                        重置密码
                                    </n-button>
                                </n-flex>
                                <div style="display: flex; justify-content: flex-end; margin-top: 24px">
                                    <n-button :loading="loginLoading"
                                        :disabled="model.email === null || model.password === null || loginLoading"
                                        round type="primary" style="width: 100%;" size="large"
                                        @click="handleValidateButtonClick">
                                        登录
                                    </n-button>
                                </div>
                            </n-form>
                        </template>
                    </n-card>
                </n-grid-item>
            </n-grid>
        </n-layout-content>
    </n-layout>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import {
    FormInst,
    useMessage, NCard, NGridItem, 
    NFlex, NGrid, NFormItem, NInput, 
    NAlert, NCheckbox, NButton,NLayout,NLayoutContent,NGi,NForm
} from 'naive-ui'
import ip from '@/utils/ip';
import { SHA512 } from 'crypto-js';
import { ref, onMounted, onUnmounted } from 'vue';

const loginLoading = ref(false);

interface ModelType {
    email: string | null
    password: string | null
}
const keepLoggedIn = ref(false)
const userStore = useUserStore();


const message = useMessage();


const router = useRouter();
const formRef = ref<FormInst | null>(null)
const model = ref<ModelType>({
    email: null,
    password: null
})

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

const handleValidateButtonClick = async () => {
    loginLoading.value = true //登录按钮状态设置为加载中
    try {
        await formRef.value?.validate();

        const response = await axios.post(`${ip}/login`, {
            username: model.value.email,
            password: SHA512(model.value.password ?? ``).toString().toLowerCase()
        });
        if (response.data.code === 200) {
            const userInfo = {
                id: response.data.data.id,
                username: response.data.data.username,
                password: response.data.data.password,
                userimg: response.data.data.userimg
            };

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

<style lang="scss">
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