import request from '@/utils/request'
import type { RoleData } from '@/api/acl/user/type'
import type { RoleListResponseData, PermissionResponseData } from './type'
enum API {
    ROLELIST_URL = '/admin/acl/role',
    ADDROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update',
    ALLPERMISSIONLIST_URL = '/admin/acl/permission/toAssign',
    SETPERMISSION_URL = '/admin/acl/permission/doAssign',
    DELETEROLE_URL = '/admin/acl/role/remove'
}
export const reqRoleList = (page: number, limit: number, roleName: string = '') => request.get<any, RoleListResponseData>(API.ROLELIST_URL + `/${page}/${limit}${roleName.length ? '?roleName=' : ''}${roleName}`)
export const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEROLE_URL, data)
    } else {
        return request.post<any, any>(API.ADDROLE_URL, data)
    }
}
export const reqAllPermissionList = (roleId: number) => request.get<any, PermissionResponseData>(API.ALLPERMISSIONLIST_URL + `/${roleId}`)
export const reqSetPermission = (roleId: number, permissionId: number[]) => request.post<any, any>(API.SETPERMISSION_URL + `?roleId=${roleId}&permissionId=${permissionId}`)
export const reqDeleteRole = (id: number) => request.delete<any, any>(API.DELETEROLE_URL + `/${id}`)