<template>
    <el-card class="userTopCard">
        <el-form inline class="userTopForm">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名" v-model="searchKeyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="searchUser" type="primary" size="default"
                    :disabled="!searchKeyWord.trim().length">搜索</el-button>
                <el-button @click="layoutSettingStore.refresh = !layoutSettingStore.refresh" type="primary" size="default"
                    >重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="userMainCard">
        <el-button type="primary" size="default" @click="addUser" v-has="'btn.User.add'">添加</el-button>
        <el-button :disabled="!selectUserIdArr.length" type="danger" size="default"
            @click="batchDeleteUser">批量删除</el-button>
        <el-table border :data="allUserList" class="userMaintable" @selection-change="changeSelection">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="#" type="index" align="center"></el-table-column>
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="用户名字" prop="username" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" prop="name" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row }">
                    <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
                    <el-button type="warning" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
                    <el-popconfirm :title="`确定要删除${row.username}吗？`" width="200px" @confirm="deleteOneUser(row)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]" background
            layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @current-change="getHasUser"
            @size-change="changeSize" />

    </el-card>
    <el-drawer v-model="drawerVisible">
        <template #header>
            <h4>{{ userInfoParam.id ? '修改' : '添加' }}用户</h4>
        </template>
        <template #default>
            <el-form ref="addOrUpadteUserForm" :model="userInfoParam" :rules="rules">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请输入用户姓名" v-model="userInfoParam.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请输入用户昵称" v-model="userInfoParam.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-show="!userInfoParam.id">
                    <el-input placeholder="请输入用户密码" v-model="userInfoParam.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawerVisible = false">取消</el-button>
                <el-button @click="saveUser" type="primary">确定</el-button>
            </div>
        </template>
    </el-drawer>
    <el-drawer v-model="drawerVisible2">
        <template #header>
            <h4>分配用户角色</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input disabled :value="userInfoParam.username"></el-input>
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRolesChange">
                        <el-checkbox v-for="(role, index) in allRoles" :key="index" :label="role">{{ role.roleName
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawerVisible2 = false">取消</el-button>
                <el-button @click="saveAssignRole" type="primary">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqAllUser, reqAddOrUpdateUser, reqAllRole, reqAssignRole, reqDeleteOneUser, reqBatchDeleteUser } from '@/api/acl/user'
import type { UserInfo, AllUserResponseData, AllRoleResponseData, RoleData, AssignRoleData } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus';
import useLayoutSettingStore from '@/store/modules/setting';
const layoutSettingStore = useLayoutSettingStore()
const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const allUserList = ref<UserInfo[]>([])
const total = ref<number>(0)
const searchKeyWord = ref<string>('')
const getHasUser = async (pager = 1) => {
    pageNo.value = pager
    allUserList.value = []
    const result: AllUserResponseData = await reqAllUser(pageNo.value, pageSize.value, searchKeyWord.value.trim())
    if (result.code == 200) {
        allUserList.value = result.data.records
        total.value = result.data.total
    } else {
        ElMessage.error('获取用户列表失败')
    }
}
onMounted(() => {
    getHasUser()
})
const changeSize = () => {
    getHasUser()
}
const drawerVisible = ref<boolean>(false)
const userInfoParam = reactive<UserInfo>({
    username: '',
    name: '',
    password: ''
})
const validatorUsername = (_: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户名字至少5位'))
    }
}
const validatorName = (_: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户昵称至少5位'))
    }
}
const validatorPassword = (_: any, value: any, callBack: any) => {
    if (value.trim().length >= 6) {
        callBack()
    } else {
        callBack(new Error('用户密码至少6位'))
    }
}
const rules = {
    username: [{ required: true, validator: validatorUsername, trigger: 'blur' }],
    name: [{ required: true, validator: validatorName, trigger: 'blur' }],
    password: [{ required: true, validator: validatorPassword, trigger: 'blur' }]
}
const addOrUpadteUserForm = ref<any>()
const addUser = () => {
    Object.assign(userInfoParam, {
        id: undefined,
        username: '',
        name: '',
        password: ''
    })
    drawerVisible.value = true
    nextTick(() => {
        addOrUpadteUserForm.value.clearValidate()
    })
}
const updateUser = (row: UserInfo) => {
    Object.assign(userInfoParam, row)
    drawerVisible.value = true
    nextTick(() => {
        addOrUpadteUserForm.value.clearValidate()
    })
}
const saveUser = async () => {
    await addOrUpadteUserForm.value.validate()
    const result: any = await reqAddOrUpdateUser(userInfoParam)
    if (result.code == 200) {
        ElMessage.success(`${userInfoParam.id ? '修改' : '新增'}用户成功`)
        drawerVisible.value = false
        location.reload()
    } else {
        ElMessage.error(`${userInfoParam.id ? '修改' : '新增'}用户失败`)
    }
}

const checkedRoles = ref<RoleData[]>([])
let allRoles: RoleData[] = []
const drawerVisible2 = ref<boolean>(false)
const checkAll = ref<boolean>(false)
const isIndeterminate = ref<boolean>(true)
const handleCheckAllChange = (checked: boolean) => {
    checkedRoles.value = checked ? allRoles : []
    isIndeterminate.value = false
}
const handleCheckedRolesChange = (checkedArr: RoleData[]) => {
    const checkedCount = checkedArr.length
    checkAll.value = checkedCount === allRoles.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRoles.length
}
const setRole = async (row: UserInfo) => {
    Object.assign(userInfoParam, row)
    const result: AllRoleResponseData = await reqAllRole(userInfoParam.id as number)
    if (result.code == 200) {
        allRoles = result.data.allRolesList
        checkedRoles.value = result.data.assignRoles
        const checkedCount = checkedRoles.value.length
        checkAll.value = checkedCount === allRoles.length
        isIndeterminate.value = checkedCount > 0 && checkedCount < allRoles.length
        drawerVisible2.value = true
    } else {
        ElMessage.error('获取职位信息失败')
    }
}
const saveAssignRole = async () => {
    const assignRoleParam: AssignRoleData = {
        userId: userInfoParam.id as number,
        roleIdList: checkedRoles.value.map(item => item.id as number)
    }
    const result: any = await reqAssignRole(assignRoleParam)
    if (result.code == 200) {
        ElMessage.success(`给${userInfoParam.username}分配角色成功`)
        drawerVisible2.value = false
        getHasUser(pageNo.value)
    } else {
        ElMessage.error(`给${userInfoParam.username}分配角色失败`)
    }
}
const deleteOneUser = async (row: UserInfo) => {
    const result: any = await reqDeleteOneUser(row.id as number)
    if (result.code == 200) {
        ElMessage.success(`删除${row.username}成功`)
        getHasUser(allUserList.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage.error(`删除${row.username}失败`)
    }
}
const selectUserIdArr = ref<number[]>([])
const changeSelection = (selection: any) => {
    selectUserIdArr.value = selection.map((item: any) => item.id)
}
const batchDeleteUser = async () => {
    const result: any = await reqBatchDeleteUser(selectUserIdArr.value)
    if (result.code == 200) {
        ElMessage.success('批量删除用户成功')
        getHasUser(allUserList.value.length > 1 ? pageNo.value : 1)
    } else {
        ElMessage.error('批量删除用户失败')
    }
}
const searchUser = () => {
    getHasUser()
    searchKeyWord.value = ''
}
</script>

<script lang="ts">
export default {
    name: 'AclUser'
}
</script>

<style scoped lang="scss">
.userTopCard {
    height: 80px;

    .userTopForm {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.userMainCard {
    margin: 10px 0;

    .userMaintable {
        margin: 10px 0;
    }
}
</style>