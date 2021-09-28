<template>
  <div>
   <good-list :goodList="categoryInfo"></good-list>
 </div>
</template>

<script>
import goodList from '@/components/content/goods/goodList'
export default {
  name: 'tab-content',
  data() { 
    return {

    }   
  },
  components:{
    goodList
  },
  methods:{

  },
  mounted() {

  },
  props: {
    categoryInfo:{
      type:Array,
      default(){
        return []
      }
    }
  }
 }
</script>

<style>
</style>