<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <Top />
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourist class="tourist" />
                    <Sex class="sex" />
                    <Age class="age" />
                </div>
                <div class="center">
                    <Map class="map" />
                    <Line class="line" />
                </div>
                <div class="right">
                    <Rank class="rank" />
                    <Year class="year" />
                    <Count class="count" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Count from './components/count/index.vue'
const screen = ref<any>()
onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww < wh ? ww : wh
}
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<script lang="ts">
export default {
    name: 'Screen'
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;
    font-size: 20px;

    .screen {
        position: fixed;
        left: 50%;
        top: 50%;
        width: 1920px;
        height: 1080px;
        transform-origin: left top;
        transform: scale(1) translate(-50%, -50%);

        .top {
            color: #29fcff;
            width: 100%;
            height: 40px;
        }

        .bottom {
            display: flex;
            height: 1040px;
            color: white;

            .left {
                flex: 1;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;

                div {
                    margin: 20px 0;
                    width: 85%;
                    height: 100%;
                }

                .tourist {
                    flex: 1.2;
                }

                .sex {
                    flex: 1;
                }

                .age {
                    flex: 1;
                }
            }

            .center {
                flex: 2;
                display: flex;
                flex-direction: column;

                .map {
                    flex: 3;
                }

                .line {
                    flex: 1;
                }
            }

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;

                div {
                    margin: 20px 0;
                    width: 85%;
                    height: 100%;
                }

                .rank {
                    flex: 1.2;
                }

                .year {
                    flex: 1;
                }

                .count {
                    flex: 1;
                }
            }
        }
    }
}</style>