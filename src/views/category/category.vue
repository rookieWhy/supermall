<template>
 <div class="category">
     <nav-bar class="category-navbar">
     <template #center>
     <span>商品分类</span>
     </template>
     </nav-bar>
     <div class="tab-content">
       <tab-menu :categories="categories" @itemClick="menuClick"></tab-menu>
       <div class="content-right">
       <tab-control :titles="titles" class="tab-control" @tabclick='itemclick'></tab-control>
       <scroll :pullUpLoad='true' class="content">
       <tab-content :categoryInfo="categoryInfo"></tab-content>
      </scroll>
      </div>
     </div>
     
 </div>
   


</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Scroll from '@/components/common/scroll/Scroll'
import tabMenu from '@/views/category/childComponent/tab-menu'
import tabContent from '@/views/category/childComponent/tab-content'
import tabControl from '@/components/content/tabControl/tabControl'
import{getCategory,getSubcategory,getCategoryDetail } from '@/network/category'
export default {
  name:'category',
  data () {
    return {
       categories:[],
       titles:["综合","新品","销量"],
       categoryDetail:[],
       miniWallkey:"10062603",
       maitKey:"3627",
       categoryInfo:[],
       type:['pop','sell','new']
    }
  },
  components: {
    NavBar,
    Scroll,
    tabMenu,
    tabContent,
    tabControl
  
  },
  created () {
     this._getCategory(),
     this._getCategoryDetail(),
    this._getSubcategory()
  },
  methods: {
       _getCategory(){
          getCategory().then((res)=>{
             console.log(res)
             this.categories=res.data.data.category.list
             this.miniWallkey=this.categories[0].miniWallkey
             this.maitKey=this.categories[0].maitKey
          })
       },

       itemclick(index){
          let type=this.type[index]
           getCategoryDetail(this.miniWallkey,type).then((res)=>{
             console.log(res)
             /* this.categoryInfo=res.data */
          })
       },
       _getCategoryDetail(miniWallkey){
          getCategoryDetail(miniWallkey).then((res)=>{
             console.log(res)
          })
       },
       menuClick(index){
          this.miniWallkey=this.categories[index].miniWallkey
          this.maitKey=this.categories[index].maitKey
          //得到商品的详细数据
           getSubcategory(this.maitKey).then((res)=>{
             console.log(res)
             this.categoryInfo=res.data.data.list
            
          })

       },
       _getCategoryDetail(){
           getCategoryDetail(this.miniWallkey,'new').then((res)=>{
             console.log(res)
          })
       },
       _getSubcategory(){
          getSubcategory(this.maitKey).then((res)=>{
             console.log(res)
             this.categoryInfo=res.data.data.list
            
          })
       }
  }
}
</script>

<style scoped>  
.category{
   height: 100vh;
}
.category-navbar{
   background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
}
.content,.tab-content{
    overflow: hidden;
    height: calc(100% - 92px);
  }
.tab-content{
  display: flex;
}
.content-right{
 width:calc(100vw - 100px);
}
 
 
   </style>