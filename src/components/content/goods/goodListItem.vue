<template>
  <div class="goodsItem" @click="itemClick">
      <img :src="showImg" @load="imgLoad">         
      <div class="goods-info">
          <p>{{goodItem.title}}</p>
          <span class="price">{{goodItem.price}}</span>
          <span class="collect">
              <img src="../../../assets/img/common/collect.svg">
              {{goodItem.cfav}}
              </span>
      </div>
   
  </div>
</template>

<script>
export default {
    name:'goodListItem',
   props:{
      goodItem:{
          type:Object,
          default(){
              return {}
          }
      }
   },
   methods: {
       //监听goodItem的图片加载
       imgLoad(){
         /*   console.log("加载完成"); */
           this.$bus.$emit('itemImgLoad')   //向事件总线发出一个事件 让其他组件可以接收，$bus不存在需要在vue原型链添加

       },
       //点击跳转进详情页
       itemClick(){
           this.$router.push('/detail/'+this.goodItem.iid)     //此处为动态路由传参
       }
   },
   computed: {
       showImg(){
           return  this.goodItem.image || this.goodItem.show.img || this.img
       }
   }
   
}
</script>

<style>
.goodsItem{
    /* padding-top: 1%;
     padding-bottom:5px;  */
     width:47%;
     margin:1.5%; 
 
}
.goodsItem img{
    width: 100%;
    border-radius: 4px;
   
}
.goods-info{
    font-size: 12px;
    bottom: 5px;
    overflow: hidden;
    text-align: center;
}
.goods-info p{
     overflow: hidden;
     text-overflow:ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
}
.goods-info .collect img{
   width: 7%;
   height: 7%;
  
}

</style>