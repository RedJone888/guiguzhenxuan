<template>
    <Category :scene="scene" />
    <el-card class="spuCard">
        <div v-show="scene == 0">
            <el-button @click="addSpu" type="primary" size="default" icon="Plus"
                :disabled="!categoryStore.category3Id">添加SPU</el-button>
            <el-table border :data="spuData" class="spuTable">
                <el-table-column label="序号" align="center" type="index" width="80px"></el-table-column>
                <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row }">
                        <el-button @click="addSku(row)" type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
                        <el-button @click="editSpu(row)" type="warning" size="small" icon="Edit" title="修改SPU"></el-button>
                        <el-button @click="viewSkuList(row.id)" type="info" size="small" icon="View"
                            title="查看SKU列表"></el-button>
                        <el-popconfirm :title="`确定要删除${row.spuName}吗？`" icon="Delete" iconColor="red"
                            @confirm="deleteSpu(row.id)" width="200px">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total"
                @current-change="getHasSpu" @size-change="changeSize" />
        </div>
        <SpuForm ref="spuContent" v-show="scene == 1" @changeScene="changeScene" />
        <SkuForm ref="skuContent" v-show="scene == 2" @changeScene="changeScene" />
    </el-card>
    <el-dialog v-model="dialogTableVisible" title="SKU列表">
        <el-table border :data="skuList">
            <el-table-column prop="skuName" label="SKU名称" />
            <el-table-column prop="price" label="SKU价格" />
            <el-table-column prop="weight" label="SKU重量" />
            <el-table-column label="SKU图片">
                <template #="{ row }">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px;">
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import useCategoryStore from '@/store/modules/category';
import SpuForm from './spuForm.vue';
import SkuForm from './skuForm.vue';
import { reqHasSpu, reqViewSkuList, reqDeleteSpu } from '@/api/product/spu'
import type { SpuData, HasSpuResponseData, SkuData, ViewSkuListResponseData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus';
const categoryStore = useCategoryStore()
const pageNo = ref<number>(1)
const pageSize = ref<number>(3)
const scene = ref<number>(0)
const spuData = ref<SpuData[]>([])
const total = ref<number>(0)
watch(() => categoryStore.category3Id, () => {
    total.value = 0
    spuData.value = []
    if (!categoryStore.category3Id) return
    getHasSpu()
})
const getHasSpu = async (pager = 1) => {
    pageNo.value = pager
    const result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.category3Id)
    if (result.code == 200) {
        spuData.value = result.data.records
        total.value = result.data.total
    } else {
        ElMessage.error('获取SPU失败')
    }
}
const changeSize = () => {
    if (!categoryStore.category3Id) return
    getHasSpu()
}
const changeScene = (type: string) => {
    scene.value = 0
    if (type == 'update') {
        getHasSpu(pageNo.value)
    } else if (type == 'add') {
        getHasSpu()
    }
}
const spuContent = ref<any>()
const addSpu = () => {
    scene.value = 1
    spuContent.value.initAddSpuData(categoryStore.category3Id)
}
const editSpu = (row: SpuData) => {
    scene.value = 1
    spuContent.value.initSpuData(row)
}
const skuContent = ref<any>()
const addSku = (row: SpuData) => {
    scene.value = 2
    const { category1Id, category2Id } = categoryStore
    skuContent.value.initSkuData(row, category1Id, category2Id)
}
const dialogTableVisible = ref<boolean>(false)
const skuList = ref<SkuData[]>([])
const viewSkuList = async (id: number) => {
    const result: ViewSkuListResponseData = await reqViewSkuList(id)
    if (result.code == 200) {
        skuList.value = result.data
        dialogTableVisible.value = true
    } else {
        ElMessage.error('获取SKU列表失败')
    }
}
const deleteSpu = async (id: number) => {
    const result: any = await reqDeleteSpu(id)
    if (result.code == 200) {
        ElMessage.success('删除SPU成功')
        getHasSpu(spuData.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage.error('删除SPU失败')
    }
}
onBeforeUnmount(() => {
    categoryStore.$reset()
})
</script>

<script lang="ts">
export default {
    name: 'Spu'
}
</script>

<style scoped lang="scss">
.spuCard {
    margin: 10px 0;

    .spuTable {
        margin: 10px 0;
    }
}
</style>