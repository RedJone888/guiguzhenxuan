<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <BreadCrumb />
        </div>
        <div class="tabbar_right">
            <Setting />
        </div>
    </div>
</template>

<script setup lang="ts">
import BreadCrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'

</script>

<script lang="ts">
export default {
    name: 'Tabbar'
}
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tabbar_left {
        display: flex;
        align-items: center;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
    }
}</style>