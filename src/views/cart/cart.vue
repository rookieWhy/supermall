<template>
  <div class="cart">
    <nav-bar class="nav-bar">
    <template #center>
      <span>购物车（{{cartLength}}）</span>
    </template>
    </nav-bar>
    <cartlist></cartlist>
    <cart-button></cart-button>
    
 </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import cartlist from '@/views/cart/childComps/cartlist'
import cartButton from '@/views/cart/childComps/cartButton'
import {mapGetters}  from 'vuex'

export default {
  name: 'cart',
  data() { 
    return {

    }
  },
  components:{
    NavBar,
     cartlist,
   cartButton
  },
 
  mounted() {

  },
  computed: {
    ...mapGetters(['cartLength','cartList'])
  }
 }
</script>

<style  scoped>
.nav-bar{
  background-color:var(--color-tint);
  color: #fff;
  
}
.cart{
  height: 100vh;
}
</style>>

