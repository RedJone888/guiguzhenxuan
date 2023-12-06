<template>
    <el-table border :data="allPermission" row-key="id">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="权限值" prop="code"></el-table-column>
        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作">
            <template #="{ row }">
                <el-button :disabled="row.level == 4" @click="addPermission(row)" type="primary" size="small">添加{{
                    row.level == 3 ? '功能' : '菜单' }}</el-button>
                <el-button :disabled="row.level == 1" @click="updataPermission(row)" type="warning" size="small">编辑</el-button>
                <el-popconfirm :title="`确定删除${row.name}吗？`" width="200px" @confirm="deletePermission(row)">
                    <template #reference>
                        <el-button :disabled="row.level == 1" type="danger" size="small">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisiable" :title="`${permissionParam.id?'修改':'添加'}`" width="30%">
        <el-form label-width="60px">
            <el-form-item label="名称">
                <el-input placeholder="请输入名称" v-model="permissionParam.name"></el-input>
            </el-form-item>
            <el-form-item label="权限值">
                <el-input placeholder="请输入权限值" v-model="permissionParam.code"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button size="default" @click="dialogVisiable = false">取消</el-button>
                <el-button type="primary" size="default" @click="savePermission">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { reqAllPermission, reqAddOrUpdatePermission,reqDeletePermission } from '@/api/acl/menu'
import type { AllPermissionResponseData,PermissionParam } from '@/api/acl/menu/type'
import type { PermissionData } from '@/api/acl/role/type'
import { ElMessage } from 'element-plus';
onMounted(() => {
    getAllPermission()
})
const dialogVisiable = ref<boolean>(false)
const allPermission = ref<PermissionData[]>([])
const getAllPermission = async () => {
    const result: AllPermissionResponseData = await reqAllPermission()
    if (result.code == 200) {
        allPermission.value = result.data
    } else {
        ElMessage.error('获取菜单信息失败')
    }
}
const permissionParam = reactive<PermissionParam>({
    code: '',
    level: 0,
    name: '',
    pid: 0
})
const addPermission = (row: PermissionData) => {
    Object.assign(permissionParam,{
        id:undefined,
        pid:row.id,
        level:row.level+1,
        name:'',
        code:''
    })
    dialogVisiable.value = true
}
const updataPermission=(row:PermissionData)=>{
    Object.assign(permissionParam,{
        id:row.id,
        pid:row.pid,
        level:row.level,
        name:row.name,
        code:row.code
    })
    dialogVisiable.value=true
}
const savePermission=async ()=>{
    const result:any= await reqAddOrUpdatePermission(permissionParam)
    if(result.code==200){
        ElMessage.success(`${permissionParam.id?'修改':'添加'}成功`)
        dialogVisiable.value=false
        getAllPermission()
    }else{
        ElMessage.error(`${permissionParam.id?'修改':'添加'}失败`)
    }
}
const deletePermission=async (row:PermissionData)=>{
    const result:any=await reqDeletePermission(row.id as number)
    if(result.code==200){
        ElMessage.success(`删除${row.name}成功`)
        getAllPermission()
    }else{
        ElMessage.error(`删除${row.name}失败`)
    }
}
</script>

<script lang="ts">
export default {
    name: 'Permission'
}
</script>
<style scoped></style>
