<script setup>

import { useRoute } from 'vue-router';
import {ref,onMounted} from 'vue'
import { getCategoryFilterAPI,getSubCategoryAPI } from '@/apis/categorys.js'
import GoodsItem from '../Home/components/GoodsItem.vue'

// 获取面包屑导航数据
const filterData = ref({})
const route = useRoute()
const getFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  filterData.value = res.result
}
onMounted(()=>getFilterData())



// getSubCategoryAPI
const reqData = ref({
  categoryId:route.params.id,
  page:1,
  pageSize:20,
  sortField:'publishTime'
})
//获取基础列表数据渲染
const goodsList = ref([])
const getGoodsList =async ()=>{
  const res = await getSubCategoryAPI(reqData.value)
  goodsList.value =res.result.items
}
onMounted(()=>getGoodsList())

const tabChange = (val)=>{
  console.log(val);   
  //初始化页数为1
  reqData.value.page=1
  reqData.value.sortField = val        
    getGoodsList()
}

//无限滚动
const disabled = ref(false)
disabled.value=false
const load = async() => {
  console.log('我被滚动了');
   reqData.value.page++
const res  = await getGoodsList()
goodsList.value =[...goodsList.value,...res.result.items]
//如果没有数据了
if(res.result.items.length==0){
  //停止滚动
  disabled.value=true
}

}
</script>


<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页1</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${filterData.parentId}` }">{{ filterData.parentName }}
        </el-breadcrumb-item>
       <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs  v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load"  :infinite-scroll-disabled="disabled">
         <!-- 商品列表-->
         <GoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods"/>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>