import request from "@/utils/request";
import type { SkuListResponseData ,SkuInfoResponseData} from './type'
enum API {
    SKULIST_URL = '/admin/product/list',
    CANCELSALE_URL = '/admin/product/cancelSale',
    ONSALE_URL = '/admin/product/onSale',
    SKUINFO_URL='/admin/product/getSkuInfo',
    DELETESKU_URL='/admin/product/deleteSku'
}
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuListResponseData>(API.SKULIST_URL + `/${page}/${limit}`)
export const reqCancelSale = (skuId: number) => request.get<any, any>(API.CANCELSALE_URL + `/${skuId}`)
export const reqOnSale = (skuId: number) => request.get<any, any>(API.ONSALE_URL + `/${skuId}`)
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoResponseData>(API.SKUINFO_URL + `/${skuId}`)
export const reqDeleteSku = (skuId: number) => request.delete<any, any>(API.DELETESKU_URL + `/${skuId}`)