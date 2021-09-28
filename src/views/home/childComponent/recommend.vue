<template>
   <div class="recommend">
      <div v-for="(item,index) in recommend" :key="index" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image">
              <div>{{item.title}}</div>
        </a>
      </div>
   </div>
</template>

<script>
export default {
   name:'recommend',

   props:{
       recommend:{
           type:Array,
           default:[]
       }
   }
}
</script>

<style>
.recommend{
    display: flex;
    width:100%;
    text-align: center;
    font-size: 14px;
    padding: 7px 0 15px;
    border-bottom:8px solid #eee;
}
.recommend-item{
    flex: 1;
    
}
.recommend-item img{
    width: 72px;
    height: 72px;
    margin-bottom: 10px;
}
</style>