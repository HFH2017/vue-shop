<template>
  <el-carousel id="top-carousel" :interval="4000" type="card"  trigger="click">
    <el-carousel-item v-for="item in posterList">
      <router-link to="/goodsList">
      <img :src='"./../../static/" + item.poster'>
      </router-link>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
  export default{
    data(){
      return{
        posterList:[
          {poster:'poster1.jpg'},
          {poster:'poster2.jpg'},
          {poster:'poster3.jpg'},
          {poster:'poster4.jpg'}
        ]
      }
    }
  }
</script>
<style>
 #top-carousel{
   margin: 50px 0
 }
 #top-carousel img{
   width: 100%
 }
  #top-carousel .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  #top-carousel .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
 #top-carousel .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>