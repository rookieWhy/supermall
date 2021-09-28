<template>
   <div class="swiper-container">
        <swiper :options="swiperOption" class="czp">
          <swiper-slide v-for="(item,index) in topImages" :key="index">
           <!--  <a :href="item.link"> -->
              <img :src="item" @load="imgLoad">
          <!--  </a> -->
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name:'Swiper',
 data () {
    return {
      // Some Swiper option/callback...
      swiperOption: { 
        // 所有的参数同 swiper 官方 api 参数
        direction: 'horizontal',
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 1500,
          stopOnLastSlide: false,
          disableOnInteraction: true
        }// 可选选项，自动滑动  
      },
       isLoad:true
    }  
  },
  components: {
    swiper,
    swiperSlide
  },
  props:{
       topImages:{
           type:Array,
           default:()=>{

           }
       }
   },
   methods: {
      imgLoad(){
        if(this.isLoad){
          this.$emit('swiperImgLoad')
          this.isLoad=false           //加载四张轮播图图片 只需要发送一次事件就可以
        }
      }
   }
}
</script>

<style scoped>
.swiper-container {
      width: 100%;
      height: 310px;
      /* background: #3399ff; */
      overflow: hidden;
     
     /*  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); */
    }
    .swiper-container img{
         width: 100%;
    
    }
    .czp{
        height: 100%;
    }
    
</style>