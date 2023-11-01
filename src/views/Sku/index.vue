<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
// 商品数据
const goods = ref({})
const getGoods = async () => {
  // 1135076  初始化就有无库存的规格
  // 1369155859933827074 更新之后有无库存项（蓝色-20cm-中国）
  const res = await axios.get('http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074')
  goods.value = res.data.result
}
onMounted(() => getGoods())
//核心思路：
// 1如果当前已经激活了，就取消激活
// 2如果当前未激活，就把和自己同排的其他规格取消激活，再把自己激活
const changeSelectedStatus = (item,val)=>{

   //当点击了文字的时候，如果文字是true 的状态把她改为false
   if(val.selected){
    val.selected=false
   }else{
    //遍历整排数据，都变为false
    item.values.forEach((val)=>val.selected=false)
    //变为true 实现排他性
     val.selected=true
   }
}
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img :class="{selected:val.selected}" v-if="val.picture" :src="val.picture" :title="val.name">
          <!-- 文字类型规格 -->
          <span v-else :class="{selected:val.selected}" @click="changeSelectedStatus(item,val)">{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: #27ba9b;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>