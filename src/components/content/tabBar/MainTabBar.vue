<template>
   <div id="app">
   <tab-bar>
     <tab-bar-item path="/home" activeColor="red">
     <template #item-icon><img src="@/assets/img/tabbar/home.svg"></template>       
      <template #item-icon-active><img src="@/assets/img/tabbar/home_active.svg"></template>
      <template #item-text>首页</template>    
     </tab-bar-item>
     <tab-bar-item path="/category" activeColor="red">
     <template #item-icon> <img  src="@/assets/img/tabbar/category.svg"></template>
     <template #item-icon-active><img  src="@/assets/img/tabbar/category_active.svg"></template>
      <template #item-text>分类</template>    
     </tab-bar-item>
     <tab-bar-item path="/cart" activeColor="red">
     <template #item-icon> <img src="@/assets/img/tabbar/cart.svg"></template>
     <template #item-icon-active><img src="@/assets/img/tabbar/cart_active.svg"></template>
       <template #item-text>购物车</template>    
     </tab-bar-item>
     <tab-bar-item path="/profile" activeColor="red">
     <template #item-icon><img src="@/assets/img/tabbar/profile.svg"></template>
     <template #item-icon-active> <img src="@/assets/img/tabbar/profile_active.svg"></template>
       <template #item-text>我的</template>    
     </tab-bar-item>
   </tab-bar>
  <!--  <router-view></router-view>  嵌套多了一个--> 
  </div>
</template>

<script>
import TabBar from './TabBar.vue'
import TabBarItem from './TabBarItem.vue'
export default {
  name:'MainTabBar',
    components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style>

</style>