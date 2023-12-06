<template>
    <el-icon @click="changeIcon">
        <component :is="layoutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item class="routeItem" v-for="item in $route.matched" :key="item.path" v-show="item.meta.title" :to="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{item.meta.title}}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore = useLayoutSettingStore()
const $route=useRoute()
const changeIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold
}
</script>

<script lang="ts">
export default {
    name: 'BreadCrumb'
}
</script>

<style scoped lang="scss">
.el-icon {
    margin: 0 10px 0 20px;
}

:deep(.el-breadcrumb__inner) {
    display: flex;
    align-items: center;

    .el-icon {
        margin: 0 4px 0 0;
    }
}
</style>