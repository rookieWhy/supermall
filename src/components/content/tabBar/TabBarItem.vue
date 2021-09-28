<template>
    <div class="tab-bar-item" @click="itemClick()"   :path="path" :style="activeStyle" :activeStyle="activeStyle">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else> <slot name="item-icon-active"></slot></div>
    <div class="item-text" ><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
     name:'TabBarItem',
      data () {
        return {
         /*  isActive:true, */
         clolr:"red",
        }
      },
      props:{
        path:{
          type:String
        },
        activeColor:{
          type:String,
          default:"red"
        }
   },
      methods: {
        itemClick(){
           this.$router.push(this.path);
           console.log(111)   
        }
      },
      computed: {
        isActive(){
          return this.$route.path.indexOf(this.path)!=-1
        },
        activeStyle(){
          return this.isActive==true?{color:this.activeColor}:{}
        }
      }
}
</script>

<style>
 .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  /*  .item-icon img, .item-active-icon img {
    width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  } */

  
  .tab-bar-item img{
      width: 24px;
    height: 24px;
    margin-top: 5px;
    vertical-align: middle;
  }
</style>