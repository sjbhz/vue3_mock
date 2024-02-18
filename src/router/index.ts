import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: "login",
            component: () => import('../views/Login.vue'),
            meta: {
                title: "登录"
            }
        },
        {
            path: '/login',
            redirect: '/'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/Home.vue'),
            meta: {
                title: "首页"
            },
            children: [
                {
                    path: '/overview',
                    name: 'overview',
                    component: () => import('../views/overview/Index.vue'),
                    meta: {
                        title: "实时总览"
                    }
                },
                {
                    path: '/mine',
                    name: 'mine',
                    component: () => import('../views/overview/Mine.vue'),
                    meta: {
                        title: "个人管理"
                    }
                },
                {
                    path: '/userManage',
                    name: 'userManage',
                    component: () => import('../views/user/Index.vue'),
                    meta: {
                        title: "用户管理"
                    }
                },
                {
                    path: '/setpwd',
                    name: 'setpwd',
                    component: () => import('../views/user/SetPwd.vue'),
                    meta: {
                        title: "修改密码"
                    }
                },
                {
                    path: '/role',
                    name: 'role',
                    component: () => import('../views/user/Role.vue'),
                    meta: {
                        title: "角色管理"
                    }
                },
                {
                    path: '/roomManage',
                    name: 'roomManage',
                    component: () => import('../views/room/Index.vue'),
                    meta: {
                        title: "房间管理"
                    }
                },
                {
                    path: '/roomType',
                    name: 'roomType',
                    component: () => import('../views/room/RoomType.vue'),
                    meta: {
                        title: "房型管理"
                    }
                },

                {
                    path: '/system',
                    name: 'system',
                    component: () => import('../views/system/Menu.vue'),
                    meta: {
                        title: "菜单管理"
                    }
                },
                {
                    path: '/dictionary',
                    name: 'dictionary',
                    component: () => import('../views/system/Dictionary.vue'),
                    meta: {
                        title: "字典管理"
                    }
                },
                {
                    path: '/mail',
                    name: 'mail',
                    component: () => import('../views/Mail.vue'),
                    meta: {
                        title: "邮箱管理"
                    }
                },
                {
                    path: '/message',
                    name: 'message',
                    component: () => import('../views/Message.vue'),
                    meta: {
                        title: "信息管理"
                    }
                },
                {
                    path: '/basic',
                    name: 'basic',
                    component: () => import('../views/Comp/Basic.vue'),
                    meta: {
                        title: "组件管理"
                    }
                },
                {
                    path: '/x6',
                    name: 'x6',
                    component: () => import('../views/Comp/Draw/Shapx6/x6.vue'),
                    meta: {
                        title: "x6流程图"
                    }
                },
                {
                    path: '/jsplumb',
                    name: 'jsplumb',
                    component: () => import('../views/Comp/Draw/JsPlumb/jsplumb.vue'),
                    meta: {
                        title: "jsplumb流程图"
                    }
                },
                {
                    path: '/bpmnjs',
                    name: 'bpmnjs',
                    component: () => import('../views/Comp/Draw/Bpmnjs/bpmnjs.vue'),
                    meta: {
                        title: "bpmnjs流程图"
                    }
                },
                {
                    path: '/logicflow',
                    name: 'logicflow',
                    component: () => import('../views/Comp/Draw/LogicFlow/index.vue'),
                    meta: {
                        title: "logicflow流程图"
                    }
                },
                {
                    path: '/vueflow',
                    name: 'vueflow',
                    component: () => import('../views/Comp/Draw/VueFlow/index.vue'),
                    meta: {
                        title: "vueflow流程图"
                    }
                },
            ]
        },



    ]
})

router.beforeEach((to, from, next) => {
    // NProgress.start()
    next()
})
router.afterEach((to, from) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    // NProgress.done()
})

export default router