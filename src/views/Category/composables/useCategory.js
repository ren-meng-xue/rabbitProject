// 封装分类数据业务相关代码

import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/categorys';
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
export function useCategory() {

  //获取数据
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() =>
    getCategory()
  )

  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}