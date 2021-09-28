<template>
  <div class="check-button" :class="{'checked':ischecked}">
  <img src="@/assets/img/cart/tick.svg">
 </div>
</template>

<script>
export default {
  name: 'checkButton',
  data() { 
    return {
     
    }
  },
  components:{
  },
  methods:{

  },
  mounted() {

  },
  props:{
       ischecked:{
           type:Boolean,
           default:false
       }
  }
 }
</script>

<style>
.check-button{
   
    border-radius: 50%;
    border: 2px solid #aaa;
}
.checked{
    border-color: red;
    background-color: red;
}
</style>