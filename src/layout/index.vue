<template>
    <div class="layout_container" :class="{ fold: layoutSettingStore.fold }">
        <div class="layout_slider">
            <Logo />
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" text-color="#fff" :collapse="layoutSettingStore.fold"
                    :default-active="$route.path">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar">
            <Tabbar />
        </div>
        <div class="layout_main">
            <Main />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Tabbar from './tabbar/index.vue'
import Main from './main/index.vue'

import useUserStore from '@/store/modules/user'
import useLayoutSettingStore from '@/store/modules/setting'
const $route = useRoute()
const userStore = useUserStore()
const layoutSettingStore = useLayoutSettingStore()
</script>

<script lang="ts">
export default {
    name: 'Layout'
}
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    &.fold {
        .layout_slider {
            width: $base-menu-min-width;
        }

        .layout_tabbar,
        .layout_main {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout_slider {
        position: fixed;
        top: 0;
        left: 0;
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        transition: all .3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        transition: all .3s;
        border-bottom: 1px solid #ccc;
    }

    .layout_main {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        padding: 20px;
        overflow: auto;
        transition: all .3s;
    }
}
</style>