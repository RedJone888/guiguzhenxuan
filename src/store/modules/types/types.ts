import type { RouteRecordRaw } from "vue-router"
import type { CategoryObj} from '@/api/product/attr/type'
export interface UserState {
    token: string | null,
    menuRoutes: RouteRecordRaw[],
    username: string,
    avatar: string,
    buttons:string[]
}

export interface SettingState {
    fold: boolean,
    refresh: boolean
}
export interface CategoryState {
    category1Arr: CategoryObj[],
    category1Id: number | undefined,
    category2Arr: CategoryObj[],
    category2Id: number | undefined,
    category3Arr: CategoryObj[],
    category3Id: number | undefined
}