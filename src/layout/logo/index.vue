<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="">
        <transition name="logo-title">
            <p v-if="!layoutSettingStore.fold">{{setting.title}}</p>
        </transition>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
import useLayoutSettingStore from '@/store/modules/setting'
const layoutSettingStore=useLayoutSettingStore()
</script>

<script lang="ts">
export default {
    name:'Logo'
}
</script>

<style scoped lang="scss">
.logo{
    width: 100%;
    height: $base-menu-logo-height;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 10px;
    img{
        width: 40px;
        height: 40px;
    }
    .logo-title-enter-from,
    .logo-title-leave-to{
        opacity: 0;
    }
    .logo-title-enter-active,
    .logo-title-leave-active{
        transition: all .1s;
        transition-delay: .3s;
    }
    .logo-title-enter-to,
    .logo-title-leave-from{
        opacity: 1;
    }
    p{
        white-space: nowrap;
        font-size: $base-menu-logo-title-fontSize;
        font-weight: 900;
        margin-left: 10px;
    }
}
</style>