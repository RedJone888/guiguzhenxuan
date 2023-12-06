import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponent = { SvgIcon, Category }
export default {
    install(app: any) {
        for (const [key, component] of Object.entries(allGlobalComponent)) {
            app.component(key, component)
        }
        // Object.keys(allGlobalComponent).forEach(key => app.component(key, allGlobalComponent[key]))
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}