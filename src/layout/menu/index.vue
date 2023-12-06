<template>
    <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.meta.hidden">
            <el-menu-item v-if="!item.children" :index="item.path" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
            <el-menu-item v-else-if="item.children && item.children.length == 1" :index="item.children[0].path" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
            <el-sub-menu v-else :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>
    </template>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
defineProps(['menuList'])
const $router = useRouter()
const goRoute=(vc:any)=>{
    $router.push(vc.index);
    
}
</script>

<script lang="ts">
export default {
    name:'Menu'
}
</script>

<style scoped></style>