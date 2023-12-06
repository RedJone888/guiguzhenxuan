import type { RoleData } from '@/api/acl/user/type'
interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface RoleListResponseData extends ResponseData {
    data: {
        records: RoleData[],
        total: number,
        size: number,
        current: number,
        orders: any[],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}
export interface PermissionData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    pid: number,
    name: string,
    code: null|string,
    toCode?: null,
    type?: number,
    status?: null,
    level: number,
    children?: PermissionData[],
    select?: boolean
}
export interface PermissionResponseData extends ResponseData {
    data: PermissionData[]
}