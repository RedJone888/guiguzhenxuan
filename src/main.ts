import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import 'virtual:svg-icons-register'

import globalComponent from '@/components'

import '@/styles/index.scss'

import router from './router'

import pinia from './store'

import App from '@/App.vue'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(globalComponent)

app.use(router)
import './permission'
//引入自定义指令
import { isHasButton } from './directive/has'
isHasButton(app)

app.use(pinia)

app.mount('#app')