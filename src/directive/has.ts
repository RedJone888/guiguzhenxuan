import pinia from "@/store"
import useUserStore from "@/store/modules/user"
const userStore = useUserStore(pinia)
export const isHasButton = (app: any) => {
    app.directive('has', {
        mounted(el: any, binding: any) {
            if (!userStore.buttons.includes(binding.value)) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        },
    })
}