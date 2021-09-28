<template>
  <div class="wrapper" ref="wrapper">
   <div class="content">
    <slot></slot>
   </div>
  </div>
</template>

<script>
 import BScroll from "better-scroll"
export default {
  name:'Scroll',
  props:{
     probeType:{
       type:Number,
       default:0
     },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data () {
      return {
          scroll:null
      }
  },
  mounted () {
      this.scroll=new BScroll(this.$refs.wrapper,{
           click: true,
           pullUpLoad: this.pullUpLoad,
          /*   probeType: 3,  */     //必要时打开(否则影响性能) 
            probeTybe:this.probeType,
                
      }),
     /*  this.scroll.scrollTo(0,0)   //返回最顶部 */ 
     //实时监听滚动的位置
    this.scroll.on('scroll',(positon) => {
    /*   console.log(positon); */
    this.$emit('scroll',positon)    //向外发送scroll 传递positon参数
    })
    //监听上拉事件
    this.scroll.on('pullingUp', () => {
      this.$emit("pullingUp")
      console.log("底部")
    })

  },
  methods: {
       scrollTo(x,y,time=300){ 
              this.scroll && this.scroll.scrollTo(x,y,time); //先判断scroll实例创建后再调用
            /*  console.log(this.probeType) */
       },
        /*  手动结束上拉加载 */  
       finishPullUp(){ 
        this.scroll && this.scroll.finishPullUp()
       },
       refresh(){
       /*   console.log('----') */
         this.scroll && this.scroll.refresh()
       },
       getScrollY(){
        return this.scroll ? this.scroll.y:0
       }
  } 
}
</script>

<style >

</style>