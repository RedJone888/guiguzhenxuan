import {defineStore} from 'pinia'
import type {SettingState} from './types/types'
const useLayoutSettingStore=defineStore('Setting',{
    state:():SettingState=>{
        return {
            fold:false,
            refresh:false
        }
    },
    actions:{

    },
    getters:{

    }
})
export default useLayoutSettingStore