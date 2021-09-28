<template>
  <div class="goods">
     <good-list-item  v-for="(item,index) in goodList" :key="index" :goodItem="item">
       
     </good-list-item>
  </div>
</template>

<script>
import goodListItem from '@/components/content/goods/goodListItem'

export default {
   name:'goodList',
   props:{
      goodList:{
          type:Array,
          default:()=>{
             return []
          }
      }
   },
   components:{
    goodListItem
   }
}
</script>

<style>
.goods{
   width: 100%;
   display: flex;  
   justify-content: space-around;
   flex-wrap: wrap;
}
</style>