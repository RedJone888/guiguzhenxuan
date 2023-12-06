<template>
    <Category :scene="scene" />
    <el-card class="attrCard">
        <div v-show="scene == 0">
            <el-button @click="addAttr" type="primary" size="default" icon="Plus"
                :disabled="!categoryStore.category3Id">添加属性</el-button>
            <el-table border class="attrTable" :data="attrInfoList">
                <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
                <el-table-column label="属性名称" width="120px" align="center" prop="attrName"></el-table-column>
                <el-table-column label="属性值" align="center">
                    <template #="{ row }">
                        <el-tag class="attrTag" type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id">{{
                            attrValue.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px" align="center">
                    <template #="{ row }">
                        <el-button type="warning" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
                        <el-popconfirm width="200px" :title="`你确定要删除${row.attrName}吗？`" icon="Delete" icon-color="red"
                            @confirm="deleteAttr(row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="scene == 1">
            <el-form inline>
                <el-form-item label="属性名称">
                    <el-input placeholder="请输入属性名称" v-model="addOrUpdateAttrParam.attrName"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="addAttrValue" type="primary" size="default" icon="Plus"
                :disabled="!addOrUpdateAttrParam.attrName">添加属性值</el-button>
            <el-button size="default" @click="scene = 0">取消</el-button>
            <el-table border class="attrTable" :data="addOrUpdateAttrParam.attrValueList">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性值">
                    <template #="{ row, $index }">
                        <el-input :ref="(ele: any) => attrValueInputArr[$index] = ele" v-if="row.flag" size="small"
                            placeholder="请输入属性值" v-model="row.valueName" @blur="toLook(row, $index)"></el-input>
                        <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template #="{ $index }">
                        <el-button type="danger" size="small" icon="Delete"
                            @click="addOrUpdateAttrParam.attrValueList.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" size="default" @click="saveAttr"
                :disabled="addOrUpdateAttrParam.attrValueList.length == 0">保存</el-button>
            <el-button size="default" @click="scene = 0">取消</el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick,onBeforeUnmount } from 'vue';
import { reqAttrInfoList, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
import type { AttrValueList, AttrInfoList, AttrInfoListResponseData } from '@/api/product/attr/type'
import useCategoryStore from '@/store/modules/category';
import { ElMessage } from 'element-plus';
const categoryStore = useCategoryStore()
const attrInfoList = ref<AttrInfoList[]>([])
const scene = ref<number>(0)
watch(() => categoryStore.category3Id, (value) => {
    attrInfoList.value = []
    if (!value) return
    getAttrInfoList()
})
const getAttrInfoList = async () => {
    const { category1Id, category2Id, category3Id } = categoryStore
    const result: AttrInfoListResponseData = await reqAttrInfoList(category1Id, category2Id, category3Id)
    if (result.code == 200) {
        attrInfoList.value = result.data
    } else {
        ElMessage.error('获取属性信息失败')
    }
}
const addOrUpdateAttrParam = reactive<AttrInfoList>({
    attrName: '',
    categoryId: -1,
    categoryLevel: 3,
    attrValueList: [],
})
const attrValueInputArr = ref<any>([])
const addAttr = () => {
    Object.assign(addOrUpdateAttrParam, {
        id: null,
        attrName: '',
        categoryId: categoryStore.category3Id,
        categoryLevel: 3,
        attrValueList: [],
    })
    scene.value = 1
}
const updateAttr = (row: AttrInfoList) => {
    //浅拷贝会导致取消更新但页面仍然出现更新的bug
    // Object.assign(addOrUpdateAttrParam, row)
    //深拷贝
    Object.assign(addOrUpdateAttrParam, JSON.parse(JSON.stringify(row)))
    scene.value = 1
}
const deleteAttr = async (id: number) => {
    const result:any = await reqDeleteAttr(id)
    if (result.code == 200) {
        ElMessage.success('删除属性成功')
        getAttrInfoList()
    } else {
        ElMessage.error('删除属性失败')
    }
}
const addAttrValue = () => {
    addOrUpdateAttrParam.attrValueList.push({
        valueName: '',
        flag: true
    })
    nextTick(() => {
        attrValueInputArr.value[addOrUpdateAttrParam.attrValueList.length - 1].focus()
    })
}
const toLook = (row: AttrValueList, $index: number) => {
    if (!row.valueName.trim()) {
        ElMessage.error('属性值不能为空')
        addOrUpdateAttrParam.attrValueList.splice($index, 1)
        return
    }
    const repeat = addOrUpdateAttrParam.attrValueList.find(item => {
        if (item != row) {
            return item.valueName.trim() == row.valueName.trim()
        }
    })
    if (repeat) {
        ElMessage.error('属性值不能重复')
        addOrUpdateAttrParam.attrValueList.splice($index, 1)
        return
    }
    row.flag = false
}
const toEdit = (row: AttrValueList, $index: number) => {
    row.flag = true
    nextTick(() => {
        attrValueInputArr.value[$index].focus();
    })
}
const saveAttr = async () => {
    const result:any = await reqAddOrUpdateAttr(addOrUpdateAttrParam)
    if (result.code == 200) {
        ElMessage.success(`${addOrUpdateAttrParam.id ? '修改' : '添加'}成功`)
        scene.value = 0
        getAttrInfoList()
    } else {
        ElMessage.error(`${addOrUpdateAttrParam.id ? '修改' : '添加'}失败`)
    }
}
onBeforeUnmount(()=>{
    categoryStore.$reset()
})
</script>

<script lang="ts">
export default {
    name: 'Attr'
}
</script>

<style scoped lang="scss">
.attrCard {
    margin: 10px 0;

    .attrTable {
        margin: 10px 0;

        .attrTag {
            margin: 5px;
        }
    }
}
</style>