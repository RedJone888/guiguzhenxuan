import router from "./router";
//@ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({showSpinner:false})

import pinia from "./store";
import useUserStore from "./store/modules/user";

import { ElMessage } from "element-plus";

import setting from './setting'

const userStore = useUserStore(pinia)
router.beforeEach(async (to: any, _: any, next: any) => {
    document.title=`${setting.title}-${to.meta.title}`
    NProgress.start()
    if (userStore.token) {
        if (to.path == '/login') {
            next('/')
        } else {
            if (userStore.username) {
                next()
            }else{
                try {
                    await userStore.userInfo()
                    next({...to})
                } catch (error) {
                    ElMessage({
                        type:'error',
                        message:(error as Error).message
                    })
                    await userStore.userLogout()
                    next({path:'/login',query:{redirect:to.path}})
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})
router.afterEach((_: any, __: any) => {
    NProgress.done()
})