<template>
    <div class="rank">
        <div class="top">
            <p>热门景区排行</p>
            <p class="bg"></p>
        </div>
        <div class="title">
            <span class="first">排名</span>
            <span class="second">景区</span>
            <span class="third">预约数量</span>
        </div>
        <div class="bottom">
            <div class="left">
                <div style="background-color: #FF8D77;">NO.1</div>
                <div style="background-color: #FDBA4A;">NO.2</div>
                <div style="background-color: #008EFA;">NO.3</div>
                <div style="background-color: #ccc;">NO.4</div>
                <div style="background-color: #aaa;">NO.5</div>
            </div>
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const charts = ref()
onMounted(() => {
    const mychart = echarts.init(charts.value)
    mychart.setOption({
        xAxis: {
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
            type: 'category',
            data: ['峨眉山', '泰山', '九寨沟', '万里长城', '北京故宫'],
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                },
                margin: 30,
                align: 'center',
                padding: [0, 0, 0, -40]
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        series: [
            {
                type: 'bar',
                data: [30000, 40000, 50000, 60000, 80000],
                z: 100,
                barWidth: 15,
                itemStyle: {
                    color: function (data:any) {
                        let color = ['#008EFA', '#FF8D77', '#55CDEA', '#FDBA4A', '#988BF9']
                        return color[data.dataIndex]
                    },
                    borderRadius: 20,
                },
                label: {
                    show: true,
                    position: 'insideLeft',
                    formatter: function ({ value }:any) {
                        return value / 1000 + '%'
                    },
                    color: '#fff',
                    offset: [20, 0]
                }
            },
            {
                type: 'bar',
                data: [100000, 100000, 100000, 100000, 100000],
                barGap: '-116%',
                barWidth: 20,
                itemStyle: {
                    color: 'transparent',
                    borderColor: '#29fcff',
                    borderRadius: 20,
                    borderWidth: 1,
                    shadowColor: 'rgba(63, 218, 255, 0.5)',
                    shadowBlur: 30
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: function ({ dataIndex }:any) {
                        let value = [30000, 40000, 50000, 60000, 80000]
                        return (value[dataIndex] / 10000).toFixed(2) + 'w'
                    },
                    color: '#fff',
                    offset: [10, 0]
                }
            }
        ],
        grid: {
            top: 10,
            bottom: 10,
            left: 0,
            right: 70,
            containLabel: true
        }
    })
})
</script>

<script lang="ts">
export default {
    name: 'Rank'
}
</script>

<style scoped lang="scss">
.rank {
    background: url('../../images/dataScreen-main-rt.png') no-repeat;
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

    .title {
        margin: 15px auto;
        width: 95%;
        height: 40px;
        background: url('../../images/rankingChart-bg.png') no-repeat;
        background-size: 100% 100%;
        display: flex;

        span {
            color: orange;
            font-size: 16px;
            line-height: 40px;
            text-align: center;

            &.first {
                width: 90px;
            }

            &.second {
                width: 90px;
            }

            &.third {
                width: calc(100% - 240px);
            }
        }
    }

    .bottom {
        width: 100%;
        height: 230px;
        display: flex;

        .left {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content:center;
            div {
                width: 80px;
                line-height: 30px;
                border-radius:10px;
                text-align: center;
                font-size: 16px;
                margin:5px 0 5px 10px;
            }
        }

        .charts {
            flex: 3;
            height: 100%;
        }
    }
}</style>