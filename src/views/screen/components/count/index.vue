<template>
    <div class="count">
        <div class="top">
            <p>预约渠道数据统计</p>
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
    let option = {
        legend: {
            show: true,
            orient: 'vertical',
            textStyle: {
                color: '#fff',
                fontSize: 16
            },
            icon: 'circle',
            formatter: function (name:string) {
                let data = option.series[0].data
                let value = 0
                data.forEach(element => {
                    if (element.name == name) {
                        value = element.value
                    }
                });
                return `${name}---${value}%`
            },
            top:'center',
            left:10,
            itemGap:20
        },
        series: [
            {
                type: 'pie',
                data: [
                    { name: '智慧文娱平台', value: 40 },
                    { name: '美团', value: 10 },
                    { name: '飞猪', value: 20 },
                    { name: '大众点评', value: 30 }
                ],
                center: ['70%', '50%'],
                radius: ['50%', '80%'],
                itemStyle: {
                    borderWidth: 10,
                    borderColor: '#12144E',
                },
                label: {
                    show: false
                }
            }
        ]
    }
    mychart.setOption(option)
})
</script>

<script lang="ts">
export default {
    name: 'Count'
}
</script>

<style scoped lang="scss">
.count {
    background: url('../../images/dataScreen-main-rb.png') no-repeat;
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
        height: 230px;
        margin-top: 12px;
    }
}
</style>