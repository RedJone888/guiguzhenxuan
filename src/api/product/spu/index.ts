import request from "@/utils/request";
import type {
    HasSpuResponseData,
    TradeMarkListResponseData,
    SpuImageListResponseData,
    SpuSaleAttrListResponseData,
    BaseSaleAttrListResponseData,
    SpuData,
    SkuData,
    ViewSkuListResponseData
} from './type'
enum API {
    HASSPU_URL = '/admin/product',
    TRADEMARKLIST_URL = '/admin/product/baseTrademark/getTrademarkList',
    SPUIMAGELIST_URL = '/admin/product/spuImageList',
    SPUSALEATTRLIST_URL = '/admin/product/spuSaleAttrList',
    BASESALEATTRLIST_URL = '/admin/product/baseSaleAttrList',
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    UPDATESPU_URL = '/admin/product/updateSpuInfo',
    ADDSKU_URL = '/admin/product/saveSkuInfo',
    VIEWSKULIST_URL = '/admin/product/findBySpuId',
    DELETESPU_URL='/admin/product/deleteSpu'
}
export const reqHasSpu = (page: number, limit: number, category3Id: number | undefined) => request.get<any, HasSpuResponseData>(API.HASSPU_URL + `/${page}/${limit}?category3Id=${category3Id}`)
export const reqTradeMarkList = () => request.get<any, TradeMarkListResponseData>(API.TRADEMARKLIST_URL)
export const reqSpuImageList = (spuId: number) => request.get<any, SpuImageListResponseData>(API.SPUIMAGELIST_URL + `/${spuId}`)
export const reqSpuSaleAttrList = (spuId: number) => request.get<any, SpuSaleAttrListResponseData>(API.SPUSALEATTRLIST_URL + `/${spuId}`)
export const reqBaseSaleAttrList = () => request.get<any, BaseSaleAttrListResponseData>(API.BASESALEATTRLIST_URL)
export const reqAddOrUpdateSpu = (data: SpuData) => {
    if (data.id) {
        return request.post<any, any>(API.UPDATESPU_URL, data)
    } else {
        return request.post<any, any>(API.ADDSPU_URL, data)
    }
}
export const reqAddSku = (data: SkuData) => request.post<any, any>(API.ADDSKU_URL, data)
export const reqViewSkuList = (spuId: number) => request.get<any, ViewSkuListResponseData>(API.VIEWSKULIST_URL + `/${spuId}`)
export const reqDeleteSpu=(spuId:number)=>request.delete<any,any>(API.DELETESPU_URL+`/${spuId}`)