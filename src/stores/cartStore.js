import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user.js'
import { insertCartAPI, findNewCartListAPi, delCartAPI } from '@/apis/cart.js'
export const useCartStore = defineStore('car', () => {
  const userStore = useUserStore(
  )
  const isLogin = computed(() => userStore.userInfo.token)
  //  1定义state-carList
  const cartList = ref([])
  // 2定义action-addCart
  const addCart = async (goods) => {


    if (isLogin.value) {
      //登录之后的加入购物车逻辑
      await insertCartAPI({ skuId: goods.skuId, count: goods.count })
      updateNewList()
    } else {
      const item = cartList.value.find((item) => goods.skuId == item.skuId)
      if (item) {
        //找到了
        item.count++
      } else {
        //没有找到push当前这一项
        cartList.value.push(goods)
      }
    }
    //添加购物车操作
    // 添加过的话count+1
    // 没有添加过直接push

  }

  // 删除购物车
  const delCart = async (skuId) => {
    // 思路：
    // 1. 找到要删除项的下标值 - splice
    // 2. 使用数组的过滤方法 - filter
    if (isLogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      updateNewList()
    } else {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }


  //清除购物车
  const clearCart = () => {
    cartList.value = []
  }
  //获取最新购物车列表action
  const updateNewList = async () => {
    const res = await findNewCartListAPi()
    cartList.value = res.result
  }

  //全选功能
  const allCheck = (selected) => {
    // 把cartList中的每一个selected都设置为当前的全选框状态
    cartList.value.forEach((item) => item.selected = selected)
  }

  //计算属性
  // 1总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

  // 3已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count, 0))
  // 4已选择商品价钱合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((a, c) => a + c.count * c.price, 0))

  //单选功能
  const singleCheck = (skuId, selected) => {
    //通过skuId找到要修改的那个选项，把找到的slected修改为传递过来的slected
    const item = cartList.value.find((item) => item.skuId == skuId)
    item.selected = selected
  }

  //是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart,
    updateNewList
  }
},
  {
    persist: true,
  })