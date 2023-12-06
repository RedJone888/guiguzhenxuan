import type { PermissionData } from '@/api/acl/role/type'
interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface AllPermissionResponseData extends ResponseData {
    data: PermissionData[]
}
export interface PermissionParam {
    id?: number,
    pid: number,
    level: number,
    name: string,
    code: string
}