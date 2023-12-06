import request from "@/utils/request";
import type { AllPermissionResponseData, PermissionParam } from './type'
enum API {
    ALLPERMISSION_URL = '/admin/acl/permission',
    ADDPERIMISSION_URL = '/admin/acl/permission/save',
    UPDATEPERMISSION_URL = '/admin/acl/permission/update',
    DELETEPERMISSION_URL = '/admin/acl/permission/remove'
}
export const reqAllPermission = () => request.get<any, AllPermissionResponseData>(API.ALLPERMISSION_URL)
export const reqAddOrUpdatePermission = (data: PermissionParam) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEPERMISSION_URL, data)
    } else {
        return request.post<any, any>(API.ADDPERIMISSION_URL, data)
    }
}
export const reqDeletePermission = (id: number) => request.delete<any, any>(API.DELETEPERMISSION_URL + `/${id}`)
