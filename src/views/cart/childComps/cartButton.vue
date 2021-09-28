<template>
  <div class="cart-button">
   <div class="check-content">
    <check-button class="check-button" :ischecked="isSelectAll" @click.native="selectAll"></check-button>
    <span>全选</span>
   </div>
   <div class="price">
       <span>合计：{{totalPrice}}</span>
   </div>
   <div class="calculate" @click="calcClick">
   <span>去计算:({{checkedlen}})</span> 
   </div>
 </div>
</template>

<script>
import checkButton from '@/components/content/checkButton/checkButton'
import {mapGetters}  from 'vuex'
export default {
  name: 'cartButton',
  data() { 
    return {

    }
  },
  components:{
      checkButton
  },
  methods:{
    selectAll(){
        if(this.isSelectAll){
        for(let item of this.cartList){
           item.checked=false
        }
        }else{
            for(let item of this.cartList){
           item.checked=true
        }
        }
    },
    calcClick(){
        if(!this.isSelectAll){
            this.$toast.show('请选择商品',1500)
        }
         
    }
  },
  mounted() {

  },
  computed: {
      totalPrice(){
          return '￥' + this.$store.state.cartList.filter((item)=>{
              return item.checked
          }).reduce((accumulator,currentValue)=>{
             return accumulator+ currentValue.price*currentValue.count
          },0).toFixed(2)
      },
      checkedlen(){
          return this.$store.state.cartList.filter((item)=>{
              return item.checked
          }).length
      },
      isSelectAll(){
          if(this.$store.state.cartList.length==0){return false}
          return  !this.$store.state.cartList.some((item)=>{
              return !item.checked
          })
      },
       ...mapGetters(['cartLength','cartList'])
  }
 }
</script>

<style scoped>
.cart-button{
    height: 40px;
    line-height: 40px;
    display: flex;
    font-size: 16px;
    background-color: #eee;
}
.check-content{
    display: flex;
    align-items: center;
    width: 70px;
}
.check-button{
    width: 22px;
    height: 22px;
    line-height: 22px;
}
.calculate{
  width: 90px;
  color: #fff;
  background: red;
  text-align: center;
}
.price{
    flex: 1;
}

</style>