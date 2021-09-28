<template>
  <div>
   <nav-bar class="detailNavBar">
       <template #left>
          <div class="back" @click="backClick">
          <img src="@/assets/img/common/back.svg">
          </div>
       </template>
       <template #center  class="title">
         <span v-for="(item,index) in titles" :key="index" class="title-item" 
           :class="{active:currentIndex===index}" @click="titleClick(index)"> 
             {{item}}
         </span>
       </template>
   </nav-bar>
 </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
  name: 'detailNavBar',
  data() { 
    return {
        titles:['商品','参数','评论','推荐'],
        
        currentIndex:0
    }
  },
  components:{
      NavBar
  },
  methods: {
      titleClick(index){
         this.currentIndex=index
         this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back();
      }
  },
  
  mounted() {

  },
 }
</script>

<style>
.title{
    position: flex;
    margin-left: 30px;
    margin-right: 30px;
     background-color: #fff;
    font-weight: normal;
   
}
.title-item{
   flex: 1;
   padding: 6px;
    
}
.active{
    color: var(--color-high-text);
   
}
.back{
  margin-top: 5px;
}
.detailNavBar{
  position: fixed;
    top:0;
    left: 0;
    right: 0;
   
    
}

</style>