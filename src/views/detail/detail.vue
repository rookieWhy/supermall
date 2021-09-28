<template>
  <div class="detail">
     <detail-nav-bar @titleClick="titleClick" ref="nav" ></detail-nav-bar>
     <scroll class="content" ref="scroll" :probeType="3" @scroll="cScroll" :pullUpLoad="true">
     <detail-swiper :topImages="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
    <detail-params-info :goodsParam="goodsParam" ref="params"></detail-params-info>
    <detail-coment-info :commentInfo="commentInfo" ref="comment"></detail-coment-info>
    <good-list :goodList="recommend" ref="recommend"></good-list>
    </scroll>
    <detail-bottom-bar  @addToCart='addToCart'></detail-bottom-bar>
     <toast ></toast>
  </div>
 
</template>

<script>
import detailNavBar from '@/views/detail/childComps/detailNavBar'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '@/network/detail'
import detailSwiper from '@/views/detail/childComps/detailSwiper'//详情页轮播图
import detailBaseInfo from '@/views/detail/childComps/detailBaseInfo'
import detailShopInfo from '@/views/detail/childComps/detailShopInfo'
import Scroll from '@/components/common/scroll/Scroll'
import detailGoodsInfo from '@/views/detail/childComps/detailGoodsInfo'
import detailParamsInfo from '@/views/detail/childComps/detailParamsInfo'
import { debounce} from '@/common/utils'
import detailComentInfo from '@/views/detail/childComps/detailComentInfo'
import goodList from '@/components/content/goods/goodList'
import detailBottomBar from '@/views/detail/childComps/detailBottomBar'
import toast from '@/components/common/toast/toast'
export default {
   name:'detail',
   data () {
     return {
       iid:{},
       topImages:[],
       goods:{},
       shop:{},
       detailInfo:{},
       goodsParam:{},
        commentInfo: {},
        recommend:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
      
     }
   },
    created () {
      //保存推荐信息
      getRecommend().then((res)=>{
       console.log(res);
       this.recommend=res.data.data.list
      })
      //保存传入的iid
       this.iid=this.$route.params.iid
      //根据iid请求详情数据
       getDetail(this.iid).then(res=>{
         console.log(res);
         this.detailInfo=res.data.result.detailInfo
         //保存轮播图的图片
         this.topImages=res.data.result.itemInfo.topImages
         //获取商品信息
         const itemInfo=res.data.result.itemInfo
         const columns=res.data.result.columns
         const services=res.data.result.shopInfo.services
         this.goods=new Goods(itemInfo,columns,services)
         //获取店铺信息
         this.shop=new Shop(res.data.result.shopInfo)
         //获取详情页参数信息
         const info=res.data.result.itemParams.info
         const rule=res.data.result.itemParams.rule
         this.goodsParam=new GoodsParam(info,rule)
         //评论信息
         // 2.7.保存评论信息
          if (res.data.result.rate.list) {
            this.commentInfo = res.data.result.rate.list[0];
          }
       })
       //获取头部导航栏各部分的offsetTop(对给this.themeTopYs赋值的操作进行防抖)
       this.getThemeTopY=debounce(()=>{
         this.themeTopYs=[]
         this.themeTopYs.push(0)
         this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
           this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
           console.log(this.themeTopYs)
       }),300
     },
     components: {
       detailNavBar,
       detailSwiper,
       detailBaseInfo,
      detailShopInfo,
       Scroll,
      detailGoodsInfo,
      detailParamsInfo,
      detailComentInfo,
      goodList,
      detailBottomBar,
     toast
         
     },

    mounted () {
       //为刷新添加防抖动(不需要一次加载30次图片刷新)
   const refresh=debounce(this.$refs.scroll.refresh,300);
    this.$bus.$on('itemImgLoad',()=>{
       /* console.log("加载完成-------------") */
      /*  this.$refs.scroll.refresh() */
      refresh()
      //图片加载完成后获取各部分的offsetTop
      this.getThemeTopY()
   })
  
   
     },
    methods: {
      addToCart() {
        //获取购物车需要展示的数据
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.newPrice
        product.iid=this.iid
        this.$store.dispatch('addCart',product).then(
          res=>{
            /*  this.message=res
             this.show=true
            console.log(res)
             setTimeout(()=>{
             this.show=false
            },1500) */
            console.log(this.$toast)
            this.$toast.show(res,1500)
            }
           
        )
      },
      titleClick(index){
           this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
     cScroll(position){
        let positionY=-(position.y)
        for(let i=0;i<=this.themeTopYs.length;i++){
          //分1-3  和 4两种情况，数组长度不能超
            if((i<this.themeTopYs.length-1 && positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) 
               || positionY>this.themeTopYs[i]){
              this.currentIndex=i
              this.$refs.nav.currentIndex=this.currentIndex
            }
        }
      }
    }
         
}
</script>

<style scoped>
.detail{
  height: 100vh;
  overflow: hidden;
}
.content{
  height: calc(100% - 88px);
  overflow: hidden;
  margin-top:44px;
}
</style>