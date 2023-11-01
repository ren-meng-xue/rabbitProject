
import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'//格式化时间

export const useCountDown = () => {
  // 1. 响应式的数据
  const time = ref(0)
  let timer = null
  // 格式化时间 为 xx分xx秒
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 2. 开启倒计时的函数
  const start = (currentTime) => {
    // 开始倒计时的逻辑
    // 核心逻辑的编写：每隔1s就减一
    time.value = currentTime
    timer = setInterval(() => {
      if (time.value) {
        time.value--
      } else {
        clearInterval(timer)
      }

      console.log(time.value, 'time.value');
    }, 1000);
  }
  onUnmounted(() => timer && clearInterval(timer))
  return {
    start,
    formatTime
  }
}