<template>
    <el-card>
        <el-row>
            <el-col :span="3">
                <img class="homeAvatar" :src="userStore.avatar" alt="">
            </el-col>
            <el-col :span="21">
                <h3 class="title">{{ getTime() }}好，{{ userStore.username }}！</h3>
                <p class="subtitle">硅谷甄选运营平台</p>
            </el-col>
        </el-row>
    </el-card>
    <div class="bottom">
        <SvgIcon name="welcome" width="500px" height="400px"/>
    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';
const userStore=useUserStore()
</script>

<script lang="ts">
export default {
    name:'Home'
}
</script>

<style scoped lang="scss">
.homeAvatar{
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.title{
    font-size: 28px;
    font-weight: 900;
    margin: 10px 0 30px;
}
.subtitle{
    font-style: italic;
    color: #ccc;
}
.bottom{
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
</style>