interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface CategoryObj {
    id: number,
    name: string,
    category1Id?: number,
    category2Id?: number,
}
export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[]
}
export interface AttrValueList {
    id?: number,
    valueName: string,
    attrId?: number,
    flag?:boolean
}
export interface AttrInfoList {
    id?: number,
    attrName: string,
    categoryId: number,
    categoryLevel: number,
    attrValueList: AttrValueList[],
    attrIdAndValueId?:string
}
export interface AttrInfoListResponseData extends ResponseData {
    data: AttrInfoList[]
}