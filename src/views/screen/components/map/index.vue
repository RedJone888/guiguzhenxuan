<template>
    <div class="map">
        <div class="top">景区实时客流量</div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJson from './china.json'
const charts = ref()
echarts.registerMap('china', chinaJson);
onMounted(() => {
    const mychart = echarts.init(charts.value)
    mychart.setOption({
        geo: [{
            map: 'china',
            label: {
                show: true,
                color: '#fff',
                fontSize: 12,
            },
            top: 190,
            left: 200,
            zoom: 1.3,
            itemStyle: {
                areaColor: '#12144E',
                borderColor: '#29fcff',
                borderWidth: 1,
                shadowColor: 'rgba(63, 218, 255, 0.5)',
                shadowBlur: 30,
            },
            emphasis: {
                label: {
                    color: 'rgb(183,185,14)'
                },
                itemStyle: {
                    areaColor: '#2B91B7'
                }
            }
        }],
        series: [
            {
                type: 'lines',
                data: [
                    {
                        coords: [
                            [116.41995,40.18994],
                            [102.693453,30.674545]
                        ]
                    },
                    {
                        coords: [
                            [102.693453,30.674545],
                            [116.41995,40.18994]
                        ]
                    },
                    {
                        coords: [
                            [102.693453,30.674545],
                            [85.294711,41.371801]
                        ]
                    },
                    {
                        coords: [
                            [85.294711,41.371801],
                            [102.693453,30.674545]
                        ]
                    },
                    {
                        coords: [
                            [116.41995,40.18994],
                            [121.438737,31.072559]
                        ]
                    },
                    {
                        coords: [
                            [121.438737,31.072559],
                            [116.41995,40.18994]
                        ]
                    },
                    {
                        coords: [
                            [116.41995,40.18994],
                            [113.429919,23.334643]
                        ]
                    },
                    {
                        coords: [
                            [113.429919,23.334643],
                            [116.41995,40.18994]
                        ]
                    },
                ],
                lineStyle: {
                    color: '#FF4B79',
                    width: 2,
                    curveness: 0.2
                },
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
                    symbolSize: 15
                },
            }
        ]
    })
})
</script>

<script lang="ts">
export default {
    name: 'Map'
}
</script>

<style scoped lang="scss">
.map {
    width: 100%;
    height: 100%;

    .top {
        float: left;
        width: 300px;
        line-height: 35px;
        margin-top: 90px;
        background: url('../../images/map-title-bg.png') no-repeat;
        background-size: 100% 100%;
        font-size: 16px;
        text-indent: 10%;
        letter-spacing: 4px;
    }

    .charts {
        width: 100%;
        height: 100%;
    }
}
</style>