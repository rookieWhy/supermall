<template>
  <div class="toast" v-show="isshow">
     <span>{{message}}</span>
 </div>
</template>

<script>
export default {
  name: 'toast',
  data() { 
    return {
   
    }
  },
  components:{
  },
  methods:{
    show(message,duration){
      this.isshow=true;
      this.message=message
      setTimeout(()=>{
        this.isshow=false
        this.message=''
      },duration)
    }
    
  },
  mounted() {

  },
   props: {
        message:{
            type:String,
            default:''
        },
        isshow:{
          type:Boolean,
          default:false
        }
    }
 }
</script>

<style>
.toast{
  position: fixed;
  height: 35px;
  left: 50%;
  top: 50%;
  color: #fff;
  padding: 8px 10px;
  transform: translate(-50%,-50%);
  background-color: rgb(0,0,0,.7);
}

</style>