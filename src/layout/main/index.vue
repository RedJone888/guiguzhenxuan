<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <div>
                <component :is="Component" v-if="showFlag"/>
            </div>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import {watch,ref,nextTick} from 'vue'
import useLayoutSettingStore from '@/store/modules/setting';
const showFlag=ref(true)
const layoutSettingStore=useLayoutSettingStore()
watch(()=>layoutSettingStore.refresh,()=>{
    showFlag.value=false
    nextTick(()=>{
        showFlag.value=true
    })
})
</script>

<script lang="ts">

export default {
    name: 'Main'
}
</script>

<style scoped lang="scss">
.fade-enter-from{
    opacity: 0;
}
.fade-enter-active{
    transition: all .3s;
}
.fade-enter-to{
    opacity: 1;
}
</style>