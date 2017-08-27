<style>
.detail {
  font-size: 19px;
}
.detail>main{
  display:flex;
  align-items:flex-start
}
.detail .img {
  width: 25%;
  margin:40px 100px 0 200px;
}

.detail .img:after {
  content: '';
  display: block;
  clear: both;
}

.detail .img>img {
  width: 100%
}

.detail-select {
  width: 30%;
  float: left;
  margin: 30px;
  margin-bottom:0
}

.detail-select:after {
  content: '';
  display: block;
  clear: both;
}

.detail-name {
  font-weight: 500;
  margin:50px 0
}
.detail-price{
  margin:30px 0;
  color:red;
  font-size:18px;
}
.btn-addCart {
  width: 100%
}
.detail-info{
  margin:30px 0
}
.preview-img>img{
  float:left;
  width:calc((100% - 20px) / 3)
}
 .preview-img>img{
  margin-right:10px
} 
.preview-img>img:last-child{
  margin:0
}
</style>
<template>
  <div class="detail">
    <nav-header></nav-header>
    <nav-bread>
      <span>商品详情</span>
    </nav-bread>
    <main>
      <div class="img">
        <img :src="imgSrc">
        <div class="preview-img" @mouseover="changeImage">
          <img :src="'./../../static/' + curProduct.productImage">
          <img src="https://placehold.it/300x300/ffffff?text=img1">
          <img src="https://placehold.it/300x300/ffffff?text=img2">
        </div>
      </div>
      <div class="detail-select">
        <h1 class="detail-name">{{curProduct.productName}}</h1>
        <p class="detail-price">{{curProduct.salePrice}}元</p>
        <p class="detail-info" v-text="curProduct.describe">
        </p>
        <p>
          <el-button size="large" type="primary" class="btn-addCart" @click="addCart(curProduct.productId)">加入购物车</el-button>
        </p>
      </div>
    </main>

    <div class="md-overlay" v-bind:class="{'overlay-hide':isHideOverlay}" @click="closePopFilter"></div>
    <modal v-bind:showModal="showModal" v-on:close="closeModal">
      <p slot="message">请先登录</p>
      <div slot="btn">
        <a href="javascript:; " class="btn btn--m">关闭</a>
      </div>
    </modal>
    <modal v-bind:showModal="showCartModal" v-on:close="closeModal">
      <p slot="message">加入购物车成功</p>
      <div slot="btn">
        <router-link class="btn btn--m" to="/goodsList" @click="showCartModal=false" href="javascript:;"> 继续购物</router-link>
        <router-link class="btn btn--m" to="/cart" href="javascript:;">查看购物车</router-link>
      </div>
    </modal>





      <modal v-bind:showModal="confirm" v-on:close="closeModal">
          <p slot="message">
             请先登录,否则无法加入到购物车中!
          </p>
          <div slot="btn">
              <a class="btn btn--m" href="javascript:;" @click="confirm = false">关闭</a>
          </div>
      </modal>
  </div>
</template>
<script>
import axios from "axios"
import NavHeader from './../components/Header.vue'
import NavBread from './../components/NavBread.vue'
import NavFooter from './../components/NavFooter.vue'
import Modal from './../components/Modal.vue'
export default {
  data() {
    return {
      curProduct: '',
      imgSrc:'',
      isPopFilter: false,
      isHideOverlay: true,
      showModal: false,
      showCartModal: false,
      confirm:false
    }
  },
  mounted() {
    this.init()
  },
  components:{
    NavHeader,
    NavBread,
    Modal
  },
  methods: {
    changeImage(event){
      this.imgSrc=event.target.src
    },
    closeModal() {
            this.showModal = false
            this.showCartModal = false
            this.confirm = false
        },
    init() {
      var productId = this.$route.query.productId
      axios.get('/goods/detail', { params: { productId: productId } }).then((result) => {
        this.curProduct = result.data.results
        this.imgSrc='./../../static/' + this.curProduct.productImage
      })
    },
    addCart(productId) {
       axios.post('/goods/addCart', { productId: productId }).then((res) => {
        if (res.data.status === '0') {
          this.showCartModal = true;
          this.$store.commit("updateCartCount", 1)
        } else { this.confirm = true }
      }).catch((err) => {
        alert(err)
      })
    },
  }
}
</script>

