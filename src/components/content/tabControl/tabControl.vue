<template>
  <div class="tab-control">
   <div v-for="(item,index) in titles" :key="index" class="tab-control-item" 
      :class="{active:index==currentIndex}" @click="itemclick(index)">
       <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
    name:'tabControl',
    data () {
        return {
          currentIndex:0      
        }
    },
    props: {
        titles:{
            type:Array,
            default:()=>{}
        }
    },
    methods: {
        itemclick(index){
         this.currentIndex=index;
         this.$emit('tabclick',index)   //向父组件发送监听传递点击到的下标
      }
       
    }
}
</script>

<style>
.tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
     height: 40px;
    line-height: 40px; 
    width: 100%;
}
.tab-control-item{
    flex: 1;
   padding: 5px;
}
.active{
    color: var(--color-high-text);
   
}
.active span{
 border-bottom:3px solid var(--color-tint);
}

</style>