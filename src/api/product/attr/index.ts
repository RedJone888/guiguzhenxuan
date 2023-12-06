import request from "@/utils/request";
import type { CategoryResponseData, AttrInfoListResponseData,AttrInfoList } from './type'
enum API {
    CATEGORY1_URL = '/admin/product/getCategory1',
    CATEGORY2_URL = '/admin/product/getCategory2',
    CATEGORY3_URL = '/admin/product/getCategory3',
    ATTRINFOLIST_URL = '/admin/product/attrInfoList',
    ADDORUPDATEATTR_URL='/admin/product/saveAttrInfo',
    DELETEATTR_URL='/admin/product/deleteAttr'
}
export const reqCategory1 = () => request.get<any, CategoryResponseData>(API.CATEGORY1_URL)
export const reqCategory2 = (category1Id: number | undefined) => request.get<any, CategoryResponseData>(API.CATEGORY2_URL + `/${category1Id}`)
export const reqCategory3 = (category2Id: number | undefined) => request.get<any, CategoryResponseData>(API.CATEGORY3_URL + `/${category2Id}`)
export const reqAttrInfoList = (category1Id: number | undefined, category2Id: number | undefined, category3Id: number | undefined) => request.get<any, AttrInfoListResponseData>(API.ATTRINFOLIST_URL + `/${category1Id}/${category2Id}/${category3Id}`)
export const reqAddOrUpdateAttr=(data:AttrInfoList)=>request.post<any,any>(API.ADDORUPDATEATTR_URL,data)
export const reqDeleteAttr=(attrId:number)=>request.delete<any,any>(API.DELETEATTR_URL+`/${attrId}`)