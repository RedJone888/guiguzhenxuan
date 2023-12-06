<template>
    <el-card class="roleTopCard">
        <el-form class="roleTopForm" inline>
            <el-form-item label="角色名称">
                <el-input placeholder="请输入角色名称" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="!keyword.trim().length" @click="searchRole" type="primary"
                    size="default">搜索</el-button>
                <el-button @click="layoutSettingStore.refresh = !layoutSettingStore.refresh" type="primary" size="default"
                    >重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="roleMainCard">
        <el-button @click="addRole" type="primary" size="default" icon="Plus">添加角色</el-button>
        <el-table border :data="allRoleList" class="roleMainTable">
            <el-table-column type="index" align="center" width="80px" label="#"></el-table-column>
            <el-table-column align="center" label="ID" prop="id"></el-table-column>
            <el-table-column align="center" label="角色名称" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="操作" width="300px">
                <template #="{ row }">
                    <el-button @click="setPermission(row)" type="primary" size="small" icon="User">分配权限</el-button>
                    <el-button @click="updateRole(row)" type="warning" size="small" icon="Edit">编辑</el-button>
                    <el-popconfirm :title="`确定要删除${row.roleName}吗？`" width="200px" @confirm="deleteRole(row)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next, jumper, ->, sizes, total" v-model:current-page="pageNo"
            v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" background :total="total" @size-change="changeSize"
            @current-change="getHasRoleList" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="`${roleParam.id ? '修改' : '添加'}角色`">
        <el-form ref="addOrUpdateRoleForm" :model="roleParam" :rules="rules">
            <el-form-item label="角色名称" prop="roleName">
                <el-input placeholder="请输入角色名称" v-model="roleParam.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button @click="saveRole" type="primary">确定</el-button>
            </div>
        </template>
    </el-dialog>
    <el-drawer v-model="drawer1">
        <template #header>
            <h4>分配权限</h4>
        </template>
        <template #default>
            <el-tree ref="permissionTree" :data="permissionList" :props="defaultProps" show-checkbox node-key="id"
                default-expand-all :default-checked-keys="checkedPermissionId" />
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer1 = false">取消</el-button>
                <el-button type="primary" @click="savePermission">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus';
import { reqRoleList, reqAddOrUpdateRole, reqAllPermissionList, reqSetPermission, reqDeleteRole } from '@/api/acl/role'
import type { RoleData } from '@/api/acl/user/type'
import type { RoleListResponseData, PermissionData, PermissionResponseData } from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting';
const layoutSettingStore = useLayoutSettingStore()
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const dialogVisible = ref<boolean>(false)
const drawer1 = ref<boolean>(false)
const allRoleList = ref<RoleData[]>([])
const total = ref<number>(0)
const keyword = ref<string>('')
const getHasRoleList = async (pager = 1) => {
    pageNo.value = pager
    allRoleList.value = []
    const result: RoleListResponseData = await reqRoleList(pageNo.value, pageSize.value, keyword.value.trim())
    if (result.code == 200) {
        allRoleList.value = result.data.records
        total.value = result.data.total
    } else {
        ElMessage.error('获取角色列表失败')
    }
}
onMounted(() => {
    getHasRoleList()
})
const changeSize = () => {
    getHasRoleList()
}
const searchRole = () => {
    getHasRoleList()
    keyword.value = ''
}
const roleParam = reactive<RoleData>({
    roleName: ''
})
const validatorRoleName = (_: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error('角色名称至少2位'))
    }
}
const rules = {
    roleName: [{ required: true, validator: validatorRoleName, trigger: 'blur' }]
}
const addOrUpdateRoleForm = ref<any>()
const addRole = () => {
    Object.assign(roleParam, {
        id: undefined,
        roleName: ''
    })
    dialogVisible.value = true
    nextTick(() => {
        addOrUpdateRoleForm.value.clearValidate()
    })
}
const updateRole = (row: RoleData) => {
    Object.assign(roleParam, row)
    dialogVisible.value = true
    nextTick(() => {
        addOrUpdateRoleForm.value.clearValidate()
    })
}
const saveRole = async () => {
    await addOrUpdateRoleForm.value.validate()
    const result = await reqAddOrUpdateRole(roleParam)
    if (result.code == 200) {
        ElMessage.success(`${roleParam.id ? '修改' : '添加'}职位成功`)
        dialogVisible.value = false
        getHasRoleList(roleParam.id ? pageNo.value : 1)
    } else {
        ElMessage.error(`${roleParam.id ? '修改' : '添加'}职位失败`)
    }
}
const permissionList = ref<PermissionData[]>([])
const checkedPermissionId = ref<number[]>([])
const defaultProps = {
    children: 'children',
    label: 'name'
}
const permissionTree = ref<any>()
const filterCheckedPermission = (rawArr: any[], initArr: number[]) => {
    rawArr.forEach(item => {
        if (item.children.length) {
            filterCheckedPermission(item.children, initArr)
        } else if (item.select) {
            initArr.push(item.id)
        }
    })
    return initArr
}
const setPermission = async (row: RoleData) => {
    Object.assign(roleParam, row)
    const result: PermissionResponseData = await reqAllPermissionList(roleParam.id as number)
    if (result.code == 200) {
        permissionList.value = result.data
        drawer1.value = true
        checkedPermissionId.value = filterCheckedPermission(permissionList.value, []);
    } else {
        ElMessage.error('获取权限列表失败')
    }
}
const savePermission = async () => {
    const permissionCheckedId = permissionTree.value.getCheckedKeys()
    const permissionHalfCheckedId = permissionTree.value.getHalfCheckedKeys()
    const result:any = await reqSetPermission(roleParam.id as number, [...permissionCheckedId, ...permissionHalfCheckedId])
    if (result.code == 200) {
        ElMessage.success('设置权限成功')
        drawer1.value = false
        location.reload()
    } else {
        ElMessage.error('设置权限失败')
    }
}
const deleteRole = async (row: RoleData) => {
    const result:any = await reqDeleteRole(row.id as number)
    if (result.code == 200) {
        ElMessage.success(`删除${row.roleName}成功`)
        getHasRoleList(allRoleList.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage.error(`删除${row.roleName}失败`)
    }
}
</script>

<script lang="ts">
export default {
    name: 'Role'
}
</script>

<style scoped lang="scss">
.roleTopCard {
    height: 80px;

    .roleTopForm {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.roleMainCard {
    margin: 10px 0;

    .roleMainTable {
        margin: 10px 0;
    }
}
</style>