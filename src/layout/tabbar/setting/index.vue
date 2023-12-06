<template>
    <el-button icon="Refresh" circle @click="clikRefresh"></el-button>
    <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-popover placement="bottom" title="主题设置" :width="260" trigger="hover">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker @change="setColor" v-model="color" size="small" show-alpha />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark" size="small" inline-prompt active-icon="Moon"
                    inactive-icon="Sunny" />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button icon="Setting" circle></el-button>
        </template>
    </el-popover>
    <img :src="userStore.avatar" alt="">
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import useLayoutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { ElMessage } from 'element-plus';
const $router = useRouter()
const $route = useRoute()
const layoutSettingStore = useLayoutSettingStore()
const userStore = useUserStore()
const color = ref('rgba(255, 69, 0, 0.68)')
const dark = ref<boolean>(false)
const changeDark = () => {
    const html = document.documentElement
    html.className = dark.value ? 'dark' : ''
}
const setColor = () => {
    const html = document.documentElement
    html.style.setProperty('--el-color-primary', color.value)
}
const elButtonBlur = ($event: any) => {
    let target = $event.target
    if (target.nodeName == 'svg') {
        target = $event.target.parentNode.parentNode
    } else if (target.nodeName == 'I') {
        target = $event.target.parentNode
    }
    target.blur()
}
const clikRefresh = ($event: any) => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
    elButtonBlur($event)
}
const fullScreen = ($event: any) => {
    const full = document.fullscreenElement
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
    elButtonBlur($event)
}
const logout = async () => {
    try {
        await userStore.userLogout()
        $router.push({ path: '/login', query: { redirect: $route.path } })
    } catch (error) {
        ElMessage({
            type: 'error',
            message: (error as Error).message
        })
    }
}
</script>

<script lang="ts">
export default {
    name: 'Setting'
}
</script>

<style scoped lang="scss">
img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: 0 10px;
}
</style>