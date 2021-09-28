<template>
 <div id="app" >
   <keep-alive exclude="detail,categoty">
      <router-view ></router-view>
    </keep-alive>
      <main-tab-bar v-if="this.$route.meta.showTabBar"></main-tab-bar>
   
 </div>
</template>

<script>
import MainTabBar from './components/content/tabBar/MainTabBar.vue'

export default{
  name:'App',
  components: {
    MainTabBar,

  
   },
   data () {
     return {
     
     }
   }
 
 
}  
</script>

<style>
 @import "assets/css/base.css";
 body{
   margin: 0px;
   padding: 0px;
   
 }
 
</style>
