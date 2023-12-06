<template>
    <div class="sex">
        <div class="top">
            <p>男女比例</p>
            <p class="bg"></p>
        </div>
        <div class="center">
            <div class="man">
                <p>男士</p>
                <img src="../../images/man.png" alt="">
            </div>
            <div class="woman">
                <p>女士</p>
                <img src="../../images/woman.png" alt="">
            </div>
        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import * as echarts from 'echarts'
const charts=ref()
onMounted(()=>{
    const mycharts=echarts.init(charts.value)
    mycharts.setOption({
        xAxis:{
            show:false,
            min:0,
            max:100
        },
        yAxis:{
            show:false,
            type:'category'
        },
        series:[
            {
                type:'bar',
                data:[58],
                z:9, 
                barMaxWidth:'40%',
                itemStyle:{
                    color:'#007AFD',
                    borderRadius:20
                }
            },
            {
                type:'bar',
                data:[100],
                barMaxWidth:'40%',
                barGap:'-100%',
                itemStyle:{
                    color:'#FF4B79',
                    borderRadius:20
                }
            }
        ],
        grid:{
            left:0,
            right:0,
            top:0,
            bottom:0
        }
    })
})
</script>

<script lang="ts">
export default {
    name:'Sex'
}
</script>

<style scoped lang="scss">
.sex{
    background: url('../../images/dataScreen-main-lc.png') no-repeat;
    background-size: 100% 100%;
    .top{
        .bg{
            width: 68px;
            height: 7px;
            background: url('../../images/dataScreen-title.png') no-repeat;
            background-size: 100% 100%;
            margin-top: 15px;
        }
    }
    .center{
        display:flex;
        align-items:center;
        justify-content:center;
        margin:20px 0 0;
        div{
            width:111px;
            height:115px;
            margin:20px;
            display:flex;
            flex-direction:column;
            align-items:center;
            p{
                font-size:16px;
                margin-bottom:25px;
            }
        }
        .man{
            background: url('../../images/man-bg.png') no-repeat;
            background-size: 100% 100%;
        }
        .woman{
            background: url('../../images/woman-bg.png') no-repeat;
            background-size: 100% 100%;
        }

    }
    .rate{
        display:flex;
        font-size:16px;
        justify-content:space-around;
    }
    .charts{
        margin:-10px auto 0;
        width: 68%;
        height: 47px;
    }
}
</style>