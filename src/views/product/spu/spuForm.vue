<template>
    <el-form label-width="100px" label-position="right">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" v-model="spuParam.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select placeholder="请选择SPU品牌" v-model="spuParam.tmId">
                <el-option :label="item.tmName" :value="item.id" v-for="item in tradeMarkList" :key="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input autosize type="textarea" placeholder="请输入SPU描述" v-model="spuParam.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU照片">
            <el-upload v-model:file-list="spuImageList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :before-upload="handleBeforeUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select v-model="selectSaleAttrAndId" :disabled="unSelectSaleAttrList.length == 0"
                :placeholder="unSelectSaleAttrList.length ? `还有${unSelectSaleAttrList.length}项未选择` : '暂无数据可选择'">
                <el-option :label="item.name" :value="`${item.id}:${item.name}`" v-for="item in unSelectSaleAttrList"
                    :key="item.id"></el-option>
            </el-select>
            <el-button @click="addSaleAttr" :disabled="!selectSaleAttrAndId" type="primary" size="default" icon="Plus"
                class="spuButton">添加销售属性</el-button>
            <el-table border :data="spuParam.spuSaleAttrList" class="sputable">
                <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
                <el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="属性值">
                    <template #="{ row, $index }">
                        <el-tag @close="row.spuSaleAttrValueList.splice(index, 1)" style="margin: 0 5px;" closable
                            type="success" v-for="(saleAttrValue, index) in row.spuSaleAttrValueList"
                            :key="saleAttrValue.id">{{
                                saleAttrValue.saleAttrValueName }}</el-tag>
                        <el-button type="success" size="small" icon="Plus" v-show="!row.flag"
                            @click="addSaleAttrValueToEdit(row, $index)"></el-button>
                        <el-input v-model="row.attrValue" :ref="(ele: any) => attrValueInputArr[$index] = ele"
                            v-show="row.flag" placeholder="请输入属性值" @blur="addSaleAttrValueToPlus(row)" size="small"
                            style="width: 100px;"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ $index }">
                        <el-button type="danger" size="small" icon="Delete"
                            @click="spuParam.spuSaleAttrList?.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="saveAttr">保存</el-button>
            <el-button size="default" @click="$emit('changeScene')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { reqTradeMarkList, reqSpuImageList, reqSpuSaleAttrList, reqBaseSaleAttrList, reqAddOrUpdateSpu } from '@/api/product/spu'
import type { TradeMark } from '@/api/product/trademark/type'
import type { UploadUserFile } from 'element-plus'
import type {
    SpuData,
    TradeMarkListResponseData,
    SpuImageListResponseData,
    SpuSaleAttrListResponseData,
    SpuSaleAttr,
    BaseSaleAttrListResponseData,
    BaseSaleAttr,
    SpuSaleAttrValue
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
const $emit = defineEmits(['changeScene'])
const spuParam = ref<SpuData>({
    category3Id: undefined,
    spuName: '',
    tmId: undefined,
    description: '',
    spuImageList: [],
    spuSaleAttrList: []
})
const tradeMarkList = ref<TradeMark[]>([])
const spuImageList = ref<UploadUserFile[]>([])
const baseSaleAttrList = ref<BaseSaleAttr[]>([])
const getTradeMarkList = async () => {
    const result: TradeMarkListResponseData = await reqTradeMarkList()
    if (result.code == 200) {
        tradeMarkList.value = result.data
    } else {
        ElMessage.error('获取品牌列表失败')
    }
}
const getSpuImageList = async (id: number) => {
    const result: SpuImageListResponseData = await reqSpuImageList(id)
    if (result.code == 200) {
        spuImageList.value = result.data.map(item => ({
            name: item.imgName,
            url: item.imgUrl
        }))
    } else {
        ElMessage.error('获取SPU图片列表失败')
    }
}
const getSpuSaleAttrList = async (id: number) => {
    const result: SpuSaleAttrListResponseData = await reqSpuSaleAttrList(id)
    if (result.code == 200) {
        spuParam.value.spuSaleAttrList = result.data
        // spuSaleAttrList.value=result.data
    } else {
        ElMessage.error('获取SPU销售属性列表失败')
    }
}
const getBaseSaleAttrList = async () => {
    const result: BaseSaleAttrListResponseData = await reqBaseSaleAttrList()
    if (result.code == 200) {
        baseSaleAttrList.value = result.data
    } else {
        ElMessage.error('获取基础销售属性列表失败')
    }
}
const initSpuData = (row: SpuData) => {
    spuImageList.value = []
    selectSaleAttrAndId.value = ''
    spuParam.value = row
    getTradeMarkList()
    getSpuImageList(row.id as number)
    getSpuSaleAttrList(row.id as number)
    getBaseSaleAttrList()
}
const initAddSpuData = (category3Id: number) => {
    spuImageList.value = []
    selectSaleAttrAndId.value = ''
    Object.assign(spuParam.value, {
        id: undefined,
        category3Id,
        spuName: '',
        tmId: undefined,
        description: '',
        spuImageList: [],
        spuSaleAttrList: []
    })
    getTradeMarkList()
    getBaseSaleAttrList()
}
//照片墙
const dialogImageUrl = ref<string>('')
const dialogVisible = ref<boolean>(false)
const handleBeforeUpload = (rawFile: any) => {
    if (!["image/jpeg", "image/png", "image/gif"].includes(rawFile.type)) {
        ElMessage.error('图片格式必须为JPEG或PNG或GIF')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片大小不能超过2M')
        return false
    }
}
const handlePictureCardPreview = (uploadFile: any) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}
//销售属性
const unSelectSaleAttrList = computed(() => {
    // return baseSaleAttrList.value.filter(item =>spuParam.value.spuSaleAttrList?.every(item2=>item2.saleAttrName!=item.name))

    // return baseSaleAttrList.value.filter(item =>{
    //     return spuParam.value.spuSaleAttrList?.every(item2=>item2.saleAttrName!=item.name)
    // })
    return baseSaleAttrList.value.filter(item => {
        let isExist = spuParam.value.spuSaleAttrList?.find(item2 => item2.saleAttrName == item.name)
        if (!isExist) {
            return item
        }
    })
})
const selectSaleAttrAndId = ref<string>('')
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = selectSaleAttrAndId.value.split(':')
    spuParam.value.spuSaleAttrList?.push({
        baseSaleAttrId: parseInt(baseSaleAttrId),
        saleAttrName,
        spuId: spuParam.value.id as number,
        spuSaleAttrValueList: []
    })
    selectSaleAttrAndId.value = ''
}
const attrValueInputArr = ref<any>([])
const addSaleAttrValueToEdit = (row: SpuSaleAttr, $index: number) => {
    row.flag = true
    row.attrValue = ''
    attrValueInputArr.value[$index].focus()
}
const addSaleAttrValueToPlus = (row: SpuSaleAttr) => {
    row.flag = false
    const { baseSaleAttrId, saleAttrName, attrValue } = row
    if (!attrValue?.trim()) {
        ElMessage.error('属性值不能为空')
        return
    }
    const repeat = row.spuSaleAttrValueList.find(item => item.saleAttrValueName == attrValue)
    if (repeat) {
        ElMessage.error('该属性值已存在')
        return
    }
    const newattrValue: SpuSaleAttrValue = {
        baseSaleAttrId,
        saleAttrName,
        saleAttrValueName: attrValue,
        spuId: spuParam.value.id,
    }
    row.spuSaleAttrValueList.push(newattrValue)
}

const saveAttr = async () => {
    spuParam.value.spuImageList = spuImageList.value.map((item: any) => ({
        spuId: spuParam.value.id,
        imgName: item.name,
        imgUrl: (item.response && item.response.data) || item.url,
    }))
    const result = await reqAddOrUpdateSpu(spuParam.value)
    if (result.code == 200) {
        ElMessage.success(`${spuParam.value.id ? '修改' : '添加'}成功`)
        $emit('changeScene', `${spuParam.value.id ? 'update' : 'add'}`)
    } else {
        ElMessage.error(`${spuParam.value.id ? '修改' : '添加'}失败`)

    }
}

defineExpose({ initSpuData, initAddSpuData })
</script>

<script lang="ts">
export default {
    name: 'SpuForm'
}
</script>

<style scoped lang="scss">
.spuButton {
    margin-left: 10px;
}

.sputable {
    margin: 10px 0;
}
</style>