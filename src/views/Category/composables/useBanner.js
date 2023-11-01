// 封装banner轮播图
import { ref, onMounted } from 'vue'
import { getBannerApi } from "@/apis/home";
export function useBanner() {
  const bannerList = ref([])

  const getBanner = async () => {
    const res = await getBannerApi({
      distributionSite: 2
    })

    bannerList.value = res.result
  }

  onMounted(() => {
    getBanner()
  })
  return {
    bannerList
  }
}