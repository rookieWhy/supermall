<template>
<div id="home">
    <nav-bar class="home-nav">
    <template #left></template>
    <template #center>购物街</template>
    <template #right></template>
    </nav-bar>
     <tab-control class="tabControl2" ref="tabControl2" :titles="titles" @tabclick="tabclick"  v-show="isTabFixed" ></tab-control>

     <scroll class="content" ref="scroll" :probeType="3" 
        :pullUpLoad="true"  @pullingUp="loadMore"  @scroll="contentScroll" :class="{'content-tabcontrol':isContent2}">   <!-- 滚动区域 -->
    <swiper :banner="banner" @swiperImgLoad="swiperImgLoad">
    </swiper>
    <recommend :recommend="recommend"></recommend>
    <feature-view></feature-view>
    <tab-control class="tab-control" ref="tabControl" :titles="titles" @tabclick="tabclick" :class="{'disabled':isTabFixed}"></tab-control>
    <good-list :goodList="goods[currentType].list" ></good-list >
    </scroll>
    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>  <!-- 返回顶部组件，@click只能监听DOM元素，监听组件的原生事件需要加.native修饰符 -->
    

</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue"
import {getHomedata,getHomeGoods} from "@/network/home.js"
import swiper from '../../components/content/swiper/swiper.vue'
import recommend from './childComponent/recommend.vue'
import featureView from './childComponent/featureView.vue'
import tabControl from '../../components/content/tabControl/tabControl.vue'
import goodList from '../../components/content/goods/goodList.vue'  //商品展示
import Scroll from '../../components/common/scroll/Scroll.vue'   //滚动封装组件
import backTop from '@/components/content/backTop/backTop' //返回最顶端组件
import {debounce} from '@/common/utils'   //图片加载的防抖动函数

export default {
  name:'home',
  data () {
    return {
      banner:[],
      recommend:[],
      titles:['流行','新款','精选'],
      titlesIndex:['pop','new','sell'],  //保存titles的请求数据参数
      currentType:"pop", //保存当前点击的tabContorl,默认为pop
      goods:{
        pop:{page:0,list:[]},
        new:{page:0,list:[]},
        sell:{page:0,list:[]}
      },
      isShowBackTop:false,
      tabOffsetTop:541,
      isTabFixed:false,   //判断是否固定tabcontrol
      isContent2:false , //当tabcontrol固定时，改变原有的content高度
      saveY:0
    }
  },
  components: {
      NavBar,
      swiper,
      recommend,
     featureView,
     tabControl,
     goodList,
     Scroll, //滚动封装组件
     backTop //返回最顶端组件,
    },
    
  created() {
   this.getHomedata();
   this.getHomeGoods('pop');
   this.getHomeGoods('new');
   this.getHomeGoods('sell');
   //组件创建后就监听item中图片加载完成,处理发送共来的itemImageLoad，$bus在vue的原型链新建
  },
  mounted () {  //页面加载完成后，拿到$refs更合理
  //为刷新添加防抖动(不需要一次加载30次图片刷新)
   const refresh=debounce(this.$refs.scroll.refresh,300);
    this.$bus.$on('itemImgLoad',()=>{
       /* console.log("加载完成-------------") */
      /*  this.$refs.scroll.refresh() */
      refresh()
   })
   //写在mounted(必须等到页面渲染完成后才能获取元素的dom，组件并没有offsetTop属性，用$el获得组件的元素)
   
  
  },
   methods: {
      //请求数据
    getHomedata(){
    getHomedata().then(res=>{
      /*  console.log(res); */
       this.banner=res.data.data.banner.list;
       this.recommend=res.data.data.recommend.list;
       
    })
    },
    getHomeGoods(currentType){
      const page=this.goods[currentType]+1  //定义页码数每次调用自动+1
       getHomeGoods(currentType,page).then(res=>{
        console.log(res);
        this.goods[currentType].list.push(...res.data.data.list);  //将新加载的数据加入该商品分类的数组
        this.goods[currentType].page+1;    //将data保存的页+1
        this.$refs.scroll.finishPullUp()    //调用scroll组件的finishPullUp结束本次刷新用于多次获得数据
    })
    },
    //（tabControl）子组件传来的事件,当点击时获取不同的数据
     tabclick(index){
           this.currentType=this.titlesIndex[index];
           this.$refs.tabControl2.currentIndex=index
           this.$refs.tabControl.currentIndex=index
         /*   console.log(this.currentType) */
     },
     //返回最顶部事件
     backclick(){
         this.$refs.scroll.scrollTo(0,0,500)   //返回最顶部  调用scroll组件的scollto方法
       
     },
     //上拉加载更多
     loadMore(){
      /*  console.log("加载更多") */
       this.getHomeGoods(this.currentType)
     },
     //防抖动函数 抽离再utils里
     /* debounce(func,delay){
       let timer=null
       return function(...args){
         if(timer) clearTimeout(timer)
         timer=setTimeout((timer) => {
           func.apply(this,args);
         }, delay);
       }
     } */
     //监听scroll的滚动条
    contentScroll(position){
      //1.判断backtop是否显示
       this.isShowBackTop=position.y<-1000?true:false    //根据scroll的y值判断是否显示backtop
      //2.决定tabControl是否吸顶(position:fixed),重新设置scroll组件包裹（class：content）的高度
      this.isTabFixed=position.y<-(this.tabOffsetTop+40)
      this.isContent2=this.isTabFixed
     },
     //轮播图加载后获得图片的高度后 在计算tabcontrol的相对高度
     swiperImgLoad(){ 
      console.log(this.$refs.tabControl.$el.offsetTop)
    }
   },
   destroyed () {
     console.log("首页销毁了")
   },
   //组件在keepalive激活时让页面滚动到保存的位置
   activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()

   },
   //组件不活动时让页面（离开时）保存当前位置
   deactivated () {
    this.saveY= this.$refs.scroll.getScrollY()
    
   }
  
}
</script>

<style scoped>
#home {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .content{
    overflow: hidden;
    height: calc(100% - 92px);
  }
  /* 当tabcontrol需要固定时，在原有基础上再减去一个navbar的高度 */
  .content-tabcontrol{
    overflow: hidden;
    height: calc(100% - 132px);
  }
  

  .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
  /* .fixed{
    position:fixed;
    left: 0px;
    right: 0px;
    top: 44px;
  } */

  .disabled{
    display:none;
  }

</style>