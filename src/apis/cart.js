import httpInstance from "@/utils/http";
// 封装购物车相关接口


//加入购物车
export const insertCartAPI = ({ skuId,
  count }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}
//获取最新购物车列表
export const findNewCartListAPi = () => {
  return httpInstance({
    url: '/member/cart',
    method: 'GET'
  })
}

//删除购物车

export const delCartAPI = (ids) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}


//合并购物车
export const mergeCartAPI = (data) => {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}