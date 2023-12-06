<template>
    <el-card>
        <el-form inline>
            <el-form-item label="一级分类">
                <el-select :disabled="scene!=0" v-model="categoryStore.category1Id" @change="handleC1">
                    <el-option :label="c1.name" v-for="c1 in categoryStore.category1Arr" :key="c1.id"
                        :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select :disabled="scene!=0" v-model="categoryStore.category2Id" @change="handleC2">
                    <el-option :label="c2.name" v-for="c2 in categoryStore.category2Arr" :key="c2.id"
                        :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select :disabled="scene!=0" v-model="categoryStore.category3Id">
                    <el-option :label="c3.name" v-for="c3 in categoryStore.category3Arr" :key="c3.id"
                        :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
defineProps(['scene'])
onMounted(() => {
    getCategory1()
})
const getCategory1 = () => {
    categoryStore.getCategory1()
}
const handleC1 = () => {
    Object.assign(categoryStore.$state, {
        category2Id: undefined,
        category3Arr: [],
        category3Id: undefined
    })
    categoryStore.getCategory2()
}
const handleC2 = () => {
    categoryStore.category3Id=undefined
    categoryStore.getCategory3()
}
</script>

<script lang="ts">
export default {
    name: 'Category'
}
</script>
<style scoped></style>