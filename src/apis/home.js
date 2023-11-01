import httpInstance from "@/utils/http";

//获取banner
export function getBannerApi(params = {}) {
  //默认为1，商品的话传2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}
//新鲜好物
export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new'
  })
}
//人气推荐
export const getHotAPI = () => {
  return httpInstance({
    url: '/home/hot'
  })
}

//productList
export const getGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods'
  })
}