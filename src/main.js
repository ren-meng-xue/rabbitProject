import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//引入初始化样式
import '@/styles/common.scss'
//引入懒加载指令插件并进行注册
import { lazyPlugin } from '@/directives'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


// 引入全局组件插件
import { componentPlugin } from '@/components'

// //测试接口函数
// import { getCategory } from './apis/testApi'

// getCategory().then(res => {
//   console.log(res, 'res');
// })

const app = createApp(App)
const pinia = createPinia()
//注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.mount('#app')

app.use(componentPlugin)


