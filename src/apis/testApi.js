import httpInstance from "@/utils/http";

export const getCategory = () => {
  return httpInstance({
    //得到一个promise的对象
    url: 'home/category/head'
  })
}