import type { TradeMark } from '@/api/product/trademark/type'
interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface SpuData {
    category3Id: number | undefined,
    id?: number,
    spuName: string,
    tmId: number | undefined,
    description: string,
    spuImageList: SpuImage[] | null,
    spuSaleAttrList: SpuSaleAttr[] | null
}
export interface HasSpuResponseData extends ResponseData {
    data: {
        records: SpuData[],
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}

export interface TradeMarkListResponseData extends ResponseData {
    data: TradeMark[]
}

export interface SpuImage {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number
    imgName: string,
    imgUrl: string,
}
export interface SpuImageListResponseData extends ResponseData {
    data: SpuImage[]
}

export interface SpuSaleAttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number,
    saleAttrValueName: string | undefined,
    saleAttrName: string,
    isChecked?: null
}
export interface SpuSaleAttr {
    id?: number,
    flag?: boolean,
    attrValue?: string,
    createTime?: null,
    updateTime?: null,
    spuId: number,
    baseSaleAttrId: number,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrValue[],
    saleAttrIdAndValueId?: string
}
export interface SpuSaleAttrListResponseData extends ResponseData {
    data: SpuSaleAttr[]
}

export interface BaseSaleAttr {
    id: number,
    name: string
}
export interface BaseSaleAttrListResponseData extends ResponseData {
    data: BaseSaleAttr[]
}

interface skuAttrValue {
    id?: number
    attrId: number | string,
    valueId: number | string,
    attrName?:string,
    valueName?: string
}
interface skuSaleAttrValue {
    id?: number,
    saleAttrId: number | string,
    saleAttrValueId: number | string,
    saleAttrName?:string,
    saleAttrValueName?: string
}
interface skuImage {
    id: number,
    createTime: string,
    updateTime: string,
    skuId: number,
    imgName: string,
    imgUrl: string,
    spuImgId: number,
    isDefault: string
}
export interface SkuData {
    category3Id: number | undefined,
    spuId: number | undefined,
    tmId: number | undefined,
    id: number | undefined,
    skuName: string,
    price: number | undefined,
    weight: string,
    skuDesc: string,
    skuAttrValueList: skuAttrValue[],
    skuSaleAttrValueList: skuSaleAttrValue[],
    skuDefaultImg: string,
    isSale?: number,
    skuImageList?: skuImage[]
}

export interface ViewSkuListResponseData extends ResponseData {
    data: SkuData[]
}