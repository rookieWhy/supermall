<template>
  <div class="tab-menu">
    <div class="menu-list">
    <scroll class="content" :pullUpLoad='true'>
     <div class="menu-list-item" v-for="(item,index) in categories" :key="index" @click="itemClick(index)"
        :class="{active:index==currentIndex}">
       {{item.title}}
     </div>
     </scroll>
    </div>
 </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll'
export default {
  name: 'tab-menu',
  data() { 
    return {
         currentIndex:0
    }
  },
  components:{
    Scroll
  },
  methods:{
      itemClick(index){
          this.currentIndex=index,
          this.$emit('itemClick',index)
      }
  },
  mounted() {

  },
  props: {
     categories:{
       type:Array,
       default(){
         return []
       }
     }
  }
 }
</script>

<style scoped>
 .tab-menu{
   background-color: #f6f6f6;
   height: 100vh;
   width: 100px;
   box-sizing: border-box;
 }
 .content{
    overflow: hidden;
    height: 100%;
    
 }
 .menu-list{
    height: calc(100% - 92px);
 }
 .menu-list-item{
   height: 45px;
   line-height: 45px;
   text-align: center;
   font-size: 14px;
 }
 .active{
    color: var(--color-high-text);
}

</style>