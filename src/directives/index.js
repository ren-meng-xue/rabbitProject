// https://vueuse.org/core/computedAsync/
//定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'//图片懒加载使用到的依赖

export const lazyPlugin = {
  install(app) {
    //懒加载指令逻辑

    app.directive('img-lazy', {
      mounted(el, binding) {
        //el指令绑定的那个元素 img
        // binding binding.value 指令等于号后面绑定的表达式的值 图片url

        // console.log(el, binding);
        // useIntersectionObserver()会存在重复性监听问题，
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }],) => {
            // console.log(isIntersecting, 'isIntersecting');
            // targetIsVisible.value = isIntersecting
            //一旦进入到可视区域
            if (isIntersecting) {
              el.src = binding.value
              stop()
            }
          },
        )

      }
    })
  }
}