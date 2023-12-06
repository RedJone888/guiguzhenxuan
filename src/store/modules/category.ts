import { defineStore } from "pinia";
import type {CategoryState} from './types/types'
import { reqCategory1,reqCategory2,reqCategory3 } from '@/api/product/attr';
import type { CategoryResponseData } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
const useCategoryStore = defineStore('Category', {
    state: ():CategoryState => {
        return {
            category1Arr:[],
            category1Id:undefined,
            category2Arr:[],
            category2Id:undefined,
            category3Arr:[],
            category3Id:undefined
        }
    },
    actions: {
        async getCategory1() {
            const result:CategoryResponseData = await reqCategory1()
            if (result.code == 200) {
                this.category1Arr = result.data
            } else {
                ElMessage.error('获取一级分类失败')
            }
        },
        async getCategory2(){
            const result:CategoryResponseData = await reqCategory2(this.category1Id)
            if (result.code == 200) {
                this.category2Arr = result.data
            } else {
                ElMessage.error('获取二级分类失败')
            }
        },
        async getCategory3(){
            const result:CategoryResponseData = await reqCategory3(this.category2Id)
            if (result.code == 200) {
                this.category3Arr = result.data
            } else {
                ElMessage.error('获取三级分类失败')
            }
        }
    },
    getters: {

    }
})
export default useCategoryStore