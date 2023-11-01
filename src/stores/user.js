//管理用户数据相关
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user.js'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'
export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  //  1定义管理用户数据的state
  const userInfo = ref({})
  // 2定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    //合并购物车的操作
    await mergeCartAPI(cartStore.cartList.map((item) => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    //调用最新列表赋值
    cartStore.updateNewList()
  }
  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    //执行清楚购物车的action 
    cartStore.clearCart()
  }

  // 3以对象的格式把state和action return 
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},
  {
    persist: true,
  }
)