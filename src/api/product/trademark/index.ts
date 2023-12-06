import request from "@/utils/request";
import type { TradeMarkResponseData, TradeMark } from './type'
enum API {
    TRADEMARK_URL = '/admin/product/baseTrademark',
    ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
    UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
    DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove'
}
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `/${page}/${limit}`)
export const reqAddOrUpdateTrademark = (data: TradeMark) => data.id ? request.put<any, any>(API.UPDATE_TRADEMARK_URL, data) : request.post<any, any>(API.ADD_TRADEMARK_URL, data)
export const reqDeleteTrademark=(id:number)=>request.delete<any,any>(API.DELETE_TRADEMARK_URL+`/${id}`)