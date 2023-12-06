<template>
    <div class="box">
        <img src="../../assets/images/error_images/cloud.png" alt="">
        <img src="../../assets/images/error_images/cloud.png" alt="">
        <el-button type="primary" size="default" @click="goHome" class="btn">返回首页</el-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const $router=useRouter()
const goHome=()=>{
    $router.push('/home')
}
</script>

<script lang="ts">
export default {
    name:'404'
}
</script>

<style scoped lang="scss">
.box{
    width: 100vw;
    height: 100vh;
    background: url('../../assets/images/error_images/404.png') no-repeat;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;
    img{
        width: 100px;
        margin: 20px 400px;
    }
    .btn{
        width: 100px;
        margin: 20px 400px;
    }
}
</style>