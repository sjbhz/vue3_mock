import { defineStore } from 'pinia'

export default defineStore('user', {
    state() {
        return {
            user: {
                loginId: ''
            }
        }
    },
    actions: {
        setUser(user: object) {
            this.user = user
        },
        clearUser() {
            sessionStorage.clear()
            this.user = {
                loginId: ''
            }
        }
    },

},
    // {
    //     // 添加配置开启 state/ref 持久化存储
    //     // 插件默认存储全部 state/ref
    //     persist: true
    // }
)


