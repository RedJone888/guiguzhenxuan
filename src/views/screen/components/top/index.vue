<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="$router.push('/')">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据展示平台</div>
            <div class="alarm">平台高峰预警信息（2条）</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">当前时间：{{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'
const $router = useRouter()
const time = ref(moment().format('YYYY年MM月DD日 HH:mm:ss'))
const timer = ref(0)
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
    }, 1000)
})
onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<script lang="ts">
export default {
    name: "Top"
}
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 100%;
    display: flex;

    .left {
        flex: 1;
        background: url('../../images/dataScreen-header-left-bg.png') no-repeat;
        background-size: 100% 100%;

        .lbtn {
            float: right;
            width: 150px;
            line-height: 40px;
            background: url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
        }
    }

    .center {
        flex: 1.3;

        .title {
            width: 100%;
            line-height: 74px;
            background: url('../../images/dataScreen-header-center-bg.png') no-repeat;
            background-size: 100% 100%;
            font-size: 30px;
            text-align: center;
        }

        .alarm {
            width: 100%;
            line-height: 44px;
            margin-top: -2px;
            background: url('../../images/dataScreen-header-warn-bg.png') no-repeat;
            background-position: center center;
            text-align: center;
            color: #fff;
            font-size: 16px;
        }
    }

    .right {
        flex: 1;
        background: url('../../images/dataScreen-header-right-bg.png') no-repeat;
        background-size: contain;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .rbtn {
            width: 150px;
            line-height: 40px;
            background: url('../../images/dataScreen-header-btn-bg-r.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
        }

        .time {
            margin-right: 10px
        }
    }
}</style>