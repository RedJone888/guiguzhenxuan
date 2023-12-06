<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="form">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/store/modules/user'
import type { LoginFormData } from '@/api/user/type';
import { getTime } from '@/utils/time'
const userStore = useUserStore()
const $router = useRouter()
const $route = useRoute()
const loading = ref(false)
const validatorUsername = (_: any, value: any, callback: any) => {
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('用户名长度至少五位'))
    }
}
const validatorPassword = (_: any, value: any, callback: any) => {
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('密码长度至少5位'))
    }
}
const rules = {
    username: [
        { validator: validatorUsername, trigger: 'change' }
    ],
    password: [
        { validator: validatorPassword, trigger: 'change' }
    ]
}
const form = ref()
const loginForm = reactive<LoginFormData>({
    username: 'admin',
    password: 'atguigu123'
})
const login = async () => {
    await form.value.validate()
    loading.value = true
    try {
        await userStore.userLogin(loginForm)
        const redirect=$route.query.redirect
        $router.push({path:redirect as string||'/'})
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `Hi，${getTime()}好！`
        })
        loading.value = false
    } catch (error) {
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
        loading.value = false
    }
}
</script>
<script lang="ts">
export default {
    name:'Login'
}
</script>
<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        top: 30vh;
        width: 80%;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>