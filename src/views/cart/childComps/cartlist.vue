<template>
  <div class="cartList">
<scroll class="content" ref="scroll">
 <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
</scroll>
 </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll.vue'
import cartListItem from '@/views/cart/childComps/cartListItem'
import {mapGetters}  from 'vuex'

export default {
  name: 'cartlist',
  data() { 
    return {

    }
  },
  components:{
    Scroll,
    cartListItem,
   
  },
  methods:{

  },
  mounted() {

  },
  activated () {
      //当吧商品添加进购物车时重新计算可滚动高度
      this.$refs.scroll.refresh()
      console.log(this.cartList)
  },
   computed: {
    ...mapGetters(['cartList'])
  }
 }
</script>

<style scoped>

.cartList{
   height:calc(100vh - 93px - 40px);  
   overflow: hidden; 
}
.content{
    height: 100%;
}
</style>