import type {SkuData} from '@/api/product/spu/type'
interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface SkuListResponseData extends ResponseData {
    data: {
        records: SkuData[],
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
export interface SkuInfoResponseData extends ResponseData {
    data:SkuData
}