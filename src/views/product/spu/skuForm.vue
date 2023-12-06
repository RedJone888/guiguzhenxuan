<template>
    <el-form label-width="90px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请输入SKU名称" v-model="skuParam.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input type="number" placeholder="请输入价格" v-model="skuParam.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input type="number" placeholder="请输入重量" v-model="skuParam.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input type="textarea" placeholder="请输入SKU描述" v-model="skuParam.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form inline>
                <el-form-item :label="attrInfo.attrName" v-for="attrInfo in attrInfoList" :key="attrInfo.id">
                    <el-select placeholder="请选择" v-model="attrInfo.attrIdAndValueId">
                        <el-option :label="attrValue.valueName" :value="`${attrInfo.id}:${attrValue.id}`"
                            v-for="attrValue in attrInfo.attrValueList" :key="attrValue.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form inline>
                <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
                    <el-select placeholder="请选择" v-model="saleAttr.saleAttrIdAndValueId">
                        <el-option :label="saleValue.saleAttrValueName" :value="`${saleAttr.id}:${saleValue.id}`"
                            v-for="saleValue in saleAttr.spuSaleAttrValueList" :key="saleValue.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table ref="imgTable" border :data="spuImageList" @row-click="rowClick" @select="rowSelect">
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row }">
                        <img :src="row.imgUrl" style="width: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #default>
                        <el-button type="warning" size="small">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="saveSku">保存</el-button>
            <el-button size="default" @click="$emit('changeScene')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { reqAttrInfoList } from '@/api/product/attr'
import type { AttrInfoList, AttrInfoListResponseData } from '@/api/product/attr/type'
import { reqSpuImageList, reqSpuSaleAttrList,reqAddSku } from '@/api/product/spu'
import type { SpuImage, SpuSaleAttr, SpuImageListResponseData, SpuSaleAttrListResponseData, SpuData, SkuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
const $emit = defineEmits(['changeScene'])
const skuParam = reactive<SkuData>({
    category3Id: undefined,
    spuId: undefined,
    tmId: undefined,
    id: undefined,
    skuName: '',
    price: undefined,
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: ''
})
const attrInfoList = ref<AttrInfoList[]>([])
const spuImageList = ref<SpuImage[]>([])
const spuSaleAttrList = ref<SpuSaleAttr[]>([])
const getAttrInfoList = async (category1Id: number, category2Id: number, category3Id: number) => {
    const result: AttrInfoListResponseData = await reqAttrInfoList(category1Id, category2Id, category3Id)
    if (result.code == 200) {
        attrInfoList.value = result.data
    } else {
        ElMessage.error('获取属性信息失败')
    }
}
const getSpuSaleAttrList = async (id: number) => {
    const result: SpuSaleAttrListResponseData = await reqSpuSaleAttrList(id)
    if (result.code == 200) {
        spuSaleAttrList.value = result.data
    } else {
        ElMessage.error('获取SPU销售属性列表失败')
    }
}
const getSpuImageList = async (id: number) => {
    const result: SpuImageListResponseData = await reqSpuImageList(id)
    if (result.code == 200) {
        spuImageList.value = result.data
    } else {
        ElMessage.error('获取SPU图片列表失败')
    }
}
const initSkuData = (spu: SpuData, category1Id: number, category2Id: number) => {
    skuParam.category3Id = spu.category3Id
    skuParam.spuId = spu.id
    skuParam.tmId = spu.tmId
    getAttrInfoList(category1Id, category2Id, spu.category3Id as number)
    getSpuSaleAttrList(spu.id as number)
    getSpuImageList(spu.id as number)
}

const imgTable = ref<any>()
const rowClick = (row: any) => {
    skuParam.skuDefaultImg = row.imgUrl
    spuImageList.value.forEach(item => imgTable.value.toggleRowSelection(item, false))
    imgTable.value.toggleRowSelection(row, true)
}
const rowSelect = (_: any, row: any) => {
    rowClick(row)
}

const saveSku = async () => {
    skuParam.skuAttrValueList = attrInfoList.value.reduce((prev: any[], next: any) => {
        if (next.attrIdAndValueId) {
            const [attrId, valueId] = next.attrIdAndValueId.split(':')
            prev.push({ attrId, valueId })
        }
        return prev
    }, [])
    skuParam.skuSaleAttrValueList = spuSaleAttrList.value.reduce((prev: any[], next: any) => {
        if (next.saleAttrIdAndValueId) {
            const [saleAttrId, saleAttrValueId] = next.saleAttrIdAndValueId.split(':')
            prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
    }, [])
    const result:any=await reqAddSku(skuParam)
    if(result.code==200){
        ElMessage.success('添加SKU成功')
        $emit('changeScene')
    }else{
        ElMessage.error('添加SKU失败')
    }
}
defineExpose({ initSkuData })
</script>

<script lang="ts">
export default {
    name: 'SkuForm'
}
</script>

<style scoped></style>