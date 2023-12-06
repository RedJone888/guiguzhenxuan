<template>
    <div class="age">
        <div class="top">
            <p>年龄比例</p>
            <p class="bg"></p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const charts = ref()
onMounted(() => {
    const mychart = echarts.init(charts.value)
    mychart.setOption({
        title:{
            text:'本日总数',
            top:'45%',
            left:'20%',
            textStyle:{
                color:'#ccc',
                fontSize:16
            }
        },
        legend: {
            top: '15%',
            right: 20,
            orient: 'vertical',
            textStyle: {
                color: '#fff',
                fontSize: 16
            }
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '80%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10
                },
                label: {
                    position: 'inside',
                    color: '#fff',
                    fontSize: 16
                },
                center: ['30%', '50%'],
                data: [
                    { value: 16, name: '10岁以下  16%',label:{formatter:'{c}%'} },
                    { value: 8, name: '10 - 18岁  8%' ,label:{formatter:'{c}%'}},
                    { value: 12, name: '18 - 30岁 12%' ,label:{formatter:'{c}%'}},
                    { value: 24, name: '30 - 40岁 24%' ,label:{formatter:'{c}%'}},
                    { value: 20, name: '40 - 60岁 20%' ,label:{formatter:'{c}%'}},
                    { value: 20, name: '60岁以上  20%' ,label:{formatter:'{c}%'}}
                ]
            }
        ],
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    })
})
</script>

<script lang="ts">
export default {
    name: 'Age'
}
</script>

<style scoped lang="scss">
.age {
    background: url('../../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;

    .top {
        .bg {
            width: 68px;
            height: 7px;
            background: url('../../images/dataScreen-title.png') no-repeat;
            background-size: 100% 100%;
            margin-top: 15px;
        }
    }

    .charts {
        width: 100%;
        height: 228px;
        margin-top: 15px;
    }
}
</style>