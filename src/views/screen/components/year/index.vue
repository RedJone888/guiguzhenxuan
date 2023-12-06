<template>
    <div class="year">
        <div class="top">
            <p>年度游客量对比</p>
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
        xAxis: {
            type:'category',
            axisLabel:{
                formatter:function(index:number){
                    return index+1
                },
                textStyle:{
                    color:'#fff',
                    fontSize:16
                }
            },
            boundaryGap: false
        },
        yAxis: {
            name:'(人数)',
            nameTextStyle:{
                color:'#fff',
                fontSize:16,
                padding:[0,40,0,0]
            },
            axisLabel:{
                textStyle:{
                    color:'#fff',
                    fontSize:16
                }
            },
            splitLine:{
                show:false
            }
        },
        legend:{
            show:true,
            icon:'rect',
            width:260,
            itemWidth:20,
            itemHeight:10,
            right:10,
            textStyle:{
                color:'#fff',
                fontSize:14
            }
        },
        series: [
            {
                name:'2021年',
                type: 'line',
                data:[200,100,150,0,50,150,100,80,20,500,400,250],
                smooth:true,
                showSymbol:false,
                lineStyle:{
                    color:'rgba(255, 214, 62, 1)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                            offset: 0,
                            color: 'rgba(255, 214, 62, 1)'
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
            },
            {
                name:'2022年',
                type: 'line',
                data:[0,500,400,200,400,150,300,200,300,500,200,50],
                smooth:true,
                showSymbol:false,
                lineStyle:{
                    color:'rgba(1, 96, 200, 1)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                            offset: 0,
                            color: 'rgba(1, 96, 200, 1)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(1, 96, 200, 0.10)'
                        }],
                        false
                    ),
                    shadowColor: 'rgba(1, 96, 200, 0.10)',
                    shadowBlur: 10
                }
            },
            {
                name:'2023年',
                type: 'line',
                data:[550,300,120,110,80,500,20,40,30,400,300,200],
                smooth:true,
                showSymbol:false,
                lineStyle:{
                    color:'rgba(176, 80, 123, 1)'
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                            offset: 0,
                            color: 'rgba(176, 80, 123, 1)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(176, 80, 123, 0.10)'
                        }],
                        false
                    ),
                    shadowColor: 'rgba(176, 80, 123, 0.10)',
                    shadowBlur: 10
                }
            }
        ],
        grid:{
            left:10,
            bottom:10,
            right:20,
            top:60,
            containLabel:true
        }
    })
})
</script>

<script lang="ts">
export default {
    name: "Year"
}
</script>

<style scoped lang="scss">
.year {
    background: url('../../images/dataScreen-main-rc.png') no-repeat;
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
        height: 234px;
        margin-top: 10px;
    }
}
</style>