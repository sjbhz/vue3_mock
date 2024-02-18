import { createApp } from 'vue'
import './style.css' // 定义全局样式
import App from './App.vue' // 引入整个项目入口文件
import router from './router' //导入路由器
// import './mock/index'  //导入mock
import echarts from './utils/echarts' // 引入 echarts
import ElementPlus from 'element-plus' //导入element-plus
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 导入element-plus的Icons

// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// 导入jsplumb 
// import jsPlumb from 'jsplumb'
// Vue.prototype.$jsPlumb = jsPlumb.jsPlumb

import { createPinia } from 'pinia'
// 引入pinia持久化插件
import piniaPluginPersist from 'pinia-plugin-persist'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersist)
// pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

// 注册 Element-plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// echarts 挂载到 Vue实例中
// 注意：app.config.globalProperties 和 app.provide('$echarts', echarts) 二选一即可
// Vue.prototype.$echarts = echarts; // vue2的挂载方式
app.config.globalProperties.$echarts = echarts; // vue3的全局挂载 echarts 方式（一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。）
// app.provide('$echarts', echarts); // vue3采用provide, inject方式使用


app
  .use(ElementPlus)
  .use(router)
  .use(pinia)
  .mount('#app')
