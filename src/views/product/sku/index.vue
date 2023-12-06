<template>
    <el-card>
        <el-table border :data="skuList">
            <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column label="名称" show-overflow-tooltip prop="skuName" width="150px"></el-table-column>
            <el-table-column label="描述" show-overflow-tooltip prop="skuDesc" width="150px"></el-table-column>
            <el-table-column label="默认图片" width="150px">
                <template #="{ row }">
                    <img :src="row.skuDefaultImg" alt="" style="width: 120px;">
                </template>
            </el-table-column>
            <el-table-column label="重量(g)" prop="weight" width="150px"></el-table-column>
            <el-table-column label="价格(元)" prop="price" width="150px"></el-table-column>
            <el-table-column label="操作" fixed="right" width="220px">
                <template #="{ row }">
                    <el-button @click="updateSale(row)" :type="row.isSale == 0 ? 'success' : 'info'" size="small"
                        :icon="row.isSale == 0 ? 'Top' : 'Bottom'" v-show="!row.a"></el-button>
                    <el-button type="primary" size="small" icon="Edit"
                        @click="ElMessage.success('程序员在努力更新中....')"></el-button>
                    <el-button @click="viewDetail(row)" type="info" size="small" icon="InfoFilled"></el-button>
                    <el-popconfirm @confirm="deleteSku(row.id)" :title="`确定要删除${row.skuName}吗？`" icon="Delete"
                        iconColor="red" width="200px">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="skuPagination" v-model:current-page="pageNo" v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]" :background="true" layout="prev, pager, next, jumper, ->, sizes, total"
            :total="total" @current-change="getSkuList" @size-change="changeSize" />
        <el-drawer v-model="drawerVisiable">
            <template #header>
                <h4>查看商品详情</h4>
            </template>
            <template #default>
                <el-row class="drawerRow">
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ drawerSkuData?.skuName }}</el-col>
                </el-row>
                <el-row class="drawerRow">
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ drawerSkuData?.skuDesc }}</el-col>
                </el-row>
                <el-row class="drawerRow">
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ drawerSkuData?.price }}</el-col>
                </el-row>
                <el-row class="drawerRow">
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag type="danger" class="drawerTag" v-for="item in drawerSkuData?.skuAttrValueList"
                            :key="item.id">{{ item.attrName }}:{{ item.valueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row class="drawerRow">
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag type="success" class="drawerTag" v-for="item in drawerSkuData?.skuSaleAttrValueList"
                            :key="item.id">{{ item.saleAttrName }}:{{ item.saleAttrValueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row class="drawerRow">
                    <el-col :span="6">商品图片</el-col>
                    <el-col :span="18">
                        <el-carousel autoplay :interval="1000" indicator-position="none" type="card" height="200px">
                            <el-carousel-item v-for="item in drawerSkuData?.skuImageList" :key="item.id">
                                <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqSkuList, reqCancelSale, reqOnSale, reqSkuInfo, reqDeleteSku } from '@/api/product/sku'
import type { SkuListResponseData, SkuInfoResponseData } from '@/api/product/sku/type'
import type { SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus';
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const skuList = ref<SkuData[]>([])
const total = ref<number>(0)
const getSkuList = async (pager = 1) => {
    pageNo.value = pager
    const result: SkuListResponseData = await reqSkuList(pageNo.value, pageSize.value)
    if (result.code == 200) {
        skuList.value = result.data.records
        total.value = result.data.total
    } else {
        ElMessage.error('获取SKU列表失败')
    }
}
onMounted(() => {
    getSkuList()
})
const changeSize = () => {
    getSkuList()
}
const updateSale = async (row: SkuData) => {
    if (row.isSale == 0) {
        const result: any = await reqOnSale(row.id as number)
        if (result.code == 200) {
            ElMessage.success('上架成功')
            getSkuList(pageNo.value)
        } else {
            ElMessage.error('上架失败')
        }
    } else {
        const result: any = await reqCancelSale(row.id as number)
        if (result.code == 200) {
            ElMessage.info('下架成功')
            getSkuList(pageNo.value)
        } else {
            ElMessage.error('下架失败')
        }
    }
}
const drawerVisiable = ref<boolean>(false)
const drawerSkuData = ref<SkuData>()
const viewDetail = async (row: SkuData) => {
    drawerVisiable.value = true
    const result: SkuInfoResponseData = await reqSkuInfo(row.id as number)
    if (result.code == 200) {
        drawerSkuData.value = result.data
    } else {
        ElMessage.error('获取商品详情失败')
    }
}
const deleteSku = async (id: number) => {
    const result: any = await reqDeleteSku(id)
    if (result.code == 200) {
        ElMessage.success('删除SKU成功')
        getSkuList(skuList.value.length>1?pageNo.value:pageNo.value-1)
    } else {
        ElMessage.error('删除SKU失败')
    }
}
</script>

<script lang="ts">
export default {
    name: 'Sku'
}
</script>

<style scoped lang="scss">
.skuPagination {
    margin: 10px 0;
}

:deep(.el-drawer__body) {
    border-top: 1px solid #ccc;
}

.drawerRow {
    margin: 10px 0;

    .drawerTag {
        margin: 5px;
    }
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>