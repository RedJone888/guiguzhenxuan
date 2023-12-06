import request from "@/utils/request";
import type { AllUserResponseData, UserInfo, AllRoleResponseData, AssignRoleData } from './type'
enum API {
    ALLUSER_URL = '/admin/acl/user',
    ADDUSER_URL = '/admin/acl/user/save',
    UPDATEUSER_URL = '/admin/acl/user/update',
    ALLROLE_URL = '/admin/acl/user/toAssign',
    ASSIGNROLE_URL = '/admin/acl/user/doAssignRole',
    DELETEONEUSER_URL = '/admin/acl/user/remove',
    BATCHDELETEUSER_URL = '/admin/acl/user/batchRemove'
}
export const reqAllUser = (page: number, limit: number, username: string = '') => request.get<any, AllUserResponseData>(API.ALLUSER_URL + `/${page}/${limit}${username.length ? '?username=' : ''}${username}`)
export const reqAddOrUpdateUser = (data: UserInfo) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}
export const reqAllRole = (userId: number) => request.get<any, AllRoleResponseData>(API.ALLROLE_URL + `/${userId}`)
export const reqAssignRole = (data: AssignRoleData) => request.post<any, any>(API.ASSIGNROLE_URL, data)
export const reqDeleteOneUser = (id: number) => request.delete<any, any>(API.DELETEONEUSER_URL + `/${id}`)
export const reqBatchDeleteUser = (data: number[]) => request.delete<any, any>(API.BATCHDELETEUSER_URL, { data })