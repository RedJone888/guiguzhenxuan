<template>
  <div class="box">
    <h1>我是App</h1>
  </div>
</template>

<script setup lang="ts">
for (let i = 0; i < 100; i++) {
  console.log(i)
}
let str="我是祖国的老花骨朵儿";
</script>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background-color: black;
  h1 {
    color: white;
  }
}
</style>
