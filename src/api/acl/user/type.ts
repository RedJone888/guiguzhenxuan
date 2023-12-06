interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface UserInfo {
    id?: number,
    createTime?: string,
    updateTime?: string,
    username: string,
    password: string,
    name: string,
    phone?: null,
    roleName?: string
}
export interface AllUserResponseData extends ResponseData {
    data: {
        records: UserInfo[],
        total: number,
        size: number,
        current: number,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}
export interface RoleData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    roleName: string,
    remark?: null
}
export interface AllRoleResponseData extends ResponseData {
    data: {
        assignRoles: RoleData[],
        allRolesList: RoleData[]
    }
}
export interface AssignRoleData {
    roleIdList: number[],
    userId: number
}