<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFixed from './components/LayoutFixed.vue';

//  触发获取导航列表的action
import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';
const { getCategory } = useCategoryStore()
onMounted(() => getCategory())
</script>
<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 添加key，破坏复用机制 强制销毁重建 -->
  <!-- <RouterView :key="$route.fullPath"/> -->
  <RouterView />
  <LayoutFooter />
</template>