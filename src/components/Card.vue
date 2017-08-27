<style>
ul,
li {
    margin: 0;
    padding: 0;
    list-style: none
}
#card-carousel{
    margin: 20px 0
}
#card-carousel .card {
    display: flex;
    justify-content: space-around
}

#card-carousel .card li {
    width: 23%;
    margin: 10px 0px
}

#card-carousel .card li img {
    width: 100%;
    transform: translate(0,0) scale(1,1);
    transition: all .5s
}
#card-carousel .card li img:hover{
    transform: translate(0,0) scale(1.02,1.02)
}
 #card-carousel .el-carousel__item{
    background-color: #f1f1f1;
  }
</style>
<template>
    <el-carousel id="card-carousel" arrow="always" indicator-position="none" :autoplay=false height="270px">
        <el-carousel-item v-for="item in cardList">
            <router-link to='/goodsList'>
            <ul class="card">
                <li>
                    <img v-bind:src='"./../../static/" + item.jpg1'> 
                </li>
                <li>
                    <img v-bind:src='"./../../static/" + item.jpg2'> 
                </li>
                <li>
                    <img v-bind:src='"./../../static/" + item.jpg3'> 
                </li>
                <li>
                    <img v-bind:src='"./../../static/" + item.jpg4'> 
                </li>
            </ul>
            </router-link>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
  export default {
    data() {
      return {
        cardList:[
                    {jpg1:'shubao.jpg',jpg2:'tuoxie.jpg',jpg3:'dianfanbao.jpg',jpg4:'shafa.jpg'},
                    {jpg1:'buxie.jpg',jpg2:'chuifeng.jpg',jpg3:'shoubiao.jpg',jpg4:'youpan.jpg'}
                ]
      };
    }
  }
</script>


