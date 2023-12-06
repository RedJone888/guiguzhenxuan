<template>
    <div class="line">
        <div class="top">
            <p>未来30天游客量趋势图</p>
            <p class="bg"></p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import moment from 'moment'
const charts = ref()
const time = ref<string[]>([])
onMounted(() => {
    for (let i = 1; i < 31; i++) {
        time.value.push(moment().add(i, 'days').format('MM/DD'))
    }
    const mychart = echarts.init(charts.value)
    mychart.setOption({
        xAxis: {
            type: 'category',
            data: time.value,
            axisLabel: {
                color: "#fff",
                fontSize: 16
            },
            axisLine: {
                show: true,
                symbol: ['none', 'arrow'],
                symbolOffset: [0, 20],
            },
            boundaryGap: false
        },
        yAxis: {
            name: '(访问量)',
            nameTextStyle: {
                color: "#fff",
                fontSize: 16,
                padding: [0, 40, 0, 0]
            },
            type: 'value',
            axisLabel: {
                color: "#fff",
                fontSize: 16,
                formatter: function (value:number) {
                    if(value>=10000){
                        return (value/10000).toFixed(1) + 'w';
                    }else{
                        return value
                    }
                }
            },
            splitLine: {
                show: false
            },
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            },
            axisPointer: {
                show: true
            }
        },
        series: [
            {
                type: 'line',
                data: [12000, 4000, 8000, 18000, 15000, 10000, 12000, 2000, 16000, 14000, 17000, 13000, 20000, 1500, 10000, 1000, 4000, 6000, 9000, 15000, 13000, 14000, 5000, 4900, 2000, 13000, 3000, 5000, 4000, 17000],
                lineStyle: {
                    color: '#FFD000',
                },
                itemStyle: {
                    color: '#FFD000'
                },
                smooth: true,
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                            offset: 0,
                            color: 'rgba(255, 214, 62, 0.70)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(255, 214, 62, 0.10)'
                        }],
                        false
                    ),
                    shadowColor: 'rgba(255, 214, 62, 0.10)',
                    shadowBlur: 10
                }
            }
        ],
        grid: {
            left: 10,
            right: 30,
            top: 30,
            bottom: 10,
            containLabel: true
        }
    })
})
</script>

<script lang="ts">
export default {
    name: 'Line'
}
</script>

<style scoped lang="scss">
.line {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 20px;

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
        height: 197px;
        margin-top: 14px;
    }
}
</style>