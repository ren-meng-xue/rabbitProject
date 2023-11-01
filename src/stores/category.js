import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoryApi } from '@/apis/layout';
export const useCategoryStore = defineStore('category', () => {
  // 导航列表的数据管理
  // state 导航列表数据
  const categoryList = ref([])
  const getCategory = async () => {
    const res = await getCategoryApi()
    categoryList.value = res.result
  }
  return {
    categoryList,
    getCategory
  }

})
