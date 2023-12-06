<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
        <el-table class="trademarkTable" border :data="trademarkArr">
            <el-table-column label="序号" width="100px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" align="center">
                <template v-slot="{ row }">
                    <pre>{{ row.tmName }}</pre>
                </template>
            </el-table-column>
            <el-table-column label="品牌LOGO" width="400px" align="center">
                <template v-slot="{ row }">
                    <img :src="/^http:\/\//.test(row.logoUrl) ? row.logoUrl : `http://${row.logoUrl}`"
                        class="trademarkLogo">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template v-slot="{ row }">
                    <el-button type="warning" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                    <el-popconfirm width="220" icon="Delete" icon-color="red" :title="`你确定要删除“${row.tmName}”吗？`" @confirm="removeTradeMark(row.id)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
            layout=" prev, pager, next, jumper, ->, sizes, total" :total="total" @current-change="getHasTrademark"
            @size-change="changeLimit" />
    </el-card>

    <el-dialog v-model="dialogFormVisible" :title="`${trademarkParams.id ? '修改' : '添加'}品牌`">
        <el-form class="tradeForm" label-width="100px" label-position="left" :model="trademarkParams" :rules="rules"
            ref="formRef">
            <el-form-item label="品牌名称" prop="tmName">
                <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName" />
            </el-form-item>
            <el-form-item label="品牌LOGO" prop="logoUrl">
                <el-upload class="uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleSuccess" :before-upload="beforeUpload">
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="uploader-img" />
                    <el-icon v-else class="uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogConfirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { reqHasTrademark, reqAddOrUpdateTrademark,reqDeleteTrademark } from '@/api/product/trademark'
import type { TradeMarkResponseData, TradeMark, Records } from '@/api/product/trademark/type'
const pageNo = ref<number>(1)
const limit = ref<number>(3)
const total = ref<number>(0)
const trademarkArr = ref<Records>([])
const getHasTrademark = async (pager = 1) => {
    pageNo.value = pager
    const result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    if (result.code == 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
onMounted(() => {
    getHasTrademark()
})
const changeLimit = () => {
    getHasTrademark()
}

const dialogFormVisible = ref<boolean>(false)
const formRef = ref()
const trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
const addTrademark = () => {
    Object.assign(trademarkParams, {
        id: 0,
        tmName: '',
        logoUrl: ''
    })
    dialogFormVisible.value = true
    // formRef.value?.clearValidate()
    nextTick(() => {
        formRef.value.clearValidate()
    })
}
const updateTrademark = (row: TradeMark) => {
    Object.assign(trademarkParams, row)
    dialogFormVisible.value = true
    nextTick(() => {
        formRef.value.clearValidate()
    })
}
const handleSuccess: UploadProps['onSuccess'] = (response) => {
    trademarkParams.logoUrl = response.data
    formRef.value.clearValidate('logoUrl')
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (!['image/jpeg', 'image/png', 'image/gif'].includes(rawFile.type)) {
        ElMessage.error('请上传JPG或PNG或GIF格式的图片!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 4) {
        ElMessage.error('上传图片的大小不能超过4MB!')
        return false
    }
    return true
}
const dialogConfirm = async () => {
    await formRef.value.validate();
    const result = await reqAddOrUpdateTrademark(trademarkParams)
    if (result.code == 200) {
        ElMessage.success(`${trademarkParams.id ? '修改' : '添加'}品牌成功`)
        getHasTrademark(trademarkParams.id ? pageNo.value : 1)
    } else {
        ElMessage.error(`${trademarkParams.id ? '修改' : '添加'}品牌失败`)
    }
    dialogFormVisible.value = false
}
const validatorTmName = (_: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error('品牌名称长度必须在2位及以上'));
    }
}
const validatorLogoUrl = (_: any, value: any, callBack: any) => {
    if (value) {
        callBack()
    } else {
        callBack(new Error('必须上传品牌LOGO'))
    }
}
const rules = {
    tmName: [
        { required: true, trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, validator: validatorLogoUrl }
    ]
}
const removeTradeMark=async (id:number)=>{
    const result = await reqDeleteTrademark(id)
    if(result.code==200){
        ElMessage.success('删除品牌成功')
        getHasTrademark(trademarkArr.value.length>1?pageNo.value:pageNo.value-1)
    }else{
        ElMessage.error('删除品牌失败')
    }
}
</script>

<script lang="ts">
export default {
    name: 'TradeMark'
}
</script>

<style scoped lang="scss">
.box-card {
    .trademarkTable {
        margin: 10px 0;

        .trademarkLogo {
            // width: 100px;
            height: 50px;
        }
    }
}

.tradeForm {
    width: 80%;

    :deep(.uploader .el-upload) {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    :deep(.uploader .el-upload:hover) {
        border-color: var(--el-color-primary);
    }

    :deep(.uploader-img) {
        width: 178px;
        height: 178px;
    }

    :deep(.el-icon.uploader-icon) {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
}
</style>