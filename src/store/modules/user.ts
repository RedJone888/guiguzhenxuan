import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user';
import type { LoginFormData, LoginResponseData, UserInfoResponseData } from '@/api/user/type';
import type { UserState } from './types/types';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes';
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router';
function filterAsyncRoute(asyncRoute: any[], routes: string[]) {
    return asyncRoute.filter(item => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, routes)
            }
            return true
        }
    })
}
const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoute,
            username: '',
            avatar: '',
            buttons:[]
        }
    },
    actions: {
        async userLogin(data: LoginFormData) {
            const result: LoginResponseData = await reqLogin(data)
            if (result.code == 200) {
                this.token = result.data
                SET_TOKEN(this.token)
                return result.message
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
        async userInfo() {
            const result: UserInfoResponseData = await reqUserInfo()
            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                this.buttons=result.data.buttons
                let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes)
                this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
                [...userAsyncRoute, anyRoute].forEach(item => router.addRoute(item))
                return result.message
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        async userLogout() {
            const result: any = await reqLogout()
            if (result.code == 200) {
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN()

                //退出登录时，将动态路由全部清除，恢复到初始状态，解决切换用户后，需要刷新网页才可以获取正确的路由权限问题
                // location.reload()
                const hasRouter = router.getRoutes()
                function getWhiteList(constantRoute:any[],white:string[]){
                    constantRoute.forEach(item => {
                        white.push(item.name)
                        if(item.children && item.children.length>0){
                            getWhiteList(item.children,white)
                        }
                    })
                    return white
                }
                let whiteList:string[]=getWhiteList(constantRoute,[])
                hasRouter.forEach((item: any) => {
                    if (!whiteList.includes(item.name))
                        router.removeRoute(item.name)
                })

                return result.message
            } else {
                return Promise.reject(new Error(result.message))
            }
        }
    },
    getters: {

    }
})
export default useUserStore