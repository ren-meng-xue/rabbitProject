// axios基础的封装
import axios from 'axios';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user.js'
import router from '@/router'
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  //1.从pinia里面获取token数据
  const userStore = useUserStore()
  // 2.按照后端要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  //401token失效处理
  // 1清楚本地用户数据
  // 2跳转到登录页
  const userStore = useUserStore()
  if (e.response.status == 401) {
    userStore.clearUserInfo()
    router.push('/login')

  }
  return Promise.reject(e)
})


export default httpInstance