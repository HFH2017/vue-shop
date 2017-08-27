<style>
#goodsList {
    width: 80%;
    margin: 20px auto
}

.banner {
    height:30px;
    line-height:30px;
    background: #f1f1f1;
    cursor: pointer;
}

.banner>p {
    float: right;
    margin-right: 20px;
    color: red;
    font-size: 14px
}

.banner:after {
    content: '';
    display: block;
    clear: both
}

#goodsList .goods {

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between
}

#goodsList .goods li {
    border: 2px solid #ccc;
    box-shadow: 1px 1px 4px #ccc;
    width: 23%;
    margin: 10px 0px;
    text-align: center;
    transition: all .3s
}

.price {
    margin: 10px 0;
    color: red
}

.name {
    margin: 0
}

#goodsList .goods li img {
    width: 100%;
    transform: translate(0, 0) scale(1, 1);
    transition: all .5s
}

#goodsList .goods li:hover {

    border: 2px solid red
}
.loading-img{
    text-align: center;
}
.bread{
    height:30px
}
</style>

<template>
<div>
    <nav-header></nav-header>
    <div id="goodsList">
        <div class="bread">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="banner">
            <p @click="changeSort">
                排序：价格
            </p>
        </div>
        <ul class="goods">
            <li @click="go(item.productId)" v-for="item in goodsList">
                <img v-bind:src='"./../../static/" + item.productImage'>
                <p class="name">{{item.productName}}</p>
                <p class="price">{{item.salePrice}}元</p>
            </li>
        </ul>
        <div class="loading-img" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <img src="./../loading/myloading.svg" v-show="loading">
        </div>
    </div>
</div>
    
</template>
<script>
import NavHeader from './../components/Header.vue'
import Modal from './../components/Modal.vue'
import axios from "axios"
import infiniteScroll from 'vue-infinite-scroll'
export default {
    directives: { infiniteScroll },
    data() {
        return {
            
            goodsList: [],
            filterPrice: [
                { startPrice: '0.00', endPrice: '100.00' },
                { startPrice: '100.00', endPrice: '500.00' },
                { startPrice: '500.00', endPrice: '1000.00' },
                { startPrice: '1000.00', endPrice: '5000.00' }
            ],
            priceCheck: 'all',
            isPopFilter: false,
            isHideOverlay: true,
            page: 1,
            pageSize: 8,
            sortFlag: true,
            busy: true,
            loading: true,
            showModal: false,
            showCartModal: false
        }
    },
    components: {
        NavHeader,
        Modal
    },
    mounted: function () {
        this.getGoodsList()
    },
    methods: {
        go(id) {
            this.$router.push({
                path: '/detail?productId=' + id
            })
        },
        getGoodsList(flag) {
            var param = {
                page: this.page,
                pagesize: this.pageSize,
                sort: this.sortFlag ? 1 : -1,
                pricelevel: this.priceCheck
            };
            this.loading = true;
            axios.get("/goods/list", { params: param }).then((result) => {
                this.loading = false
                var res = result.data;
                if (flag) {
                    this.goodsList = this.goodsList.concat(res.results)
                    if (res.results.length <= 0) {
                        this.busy = true
                    } else {
                        this.busy = false
                    }
                } else {
                    this.goodsList = res.results
                    this.busy = false
                }
                console.log(this.goodsList)
            }).catch(function (err) {
                console.log(err)
            })
        },
        changeSort() {
            this.page = 1;
            this.sortFlag = !this.sortFlag
            this.getGoodsList()
        },
        setPriceFilter(index) {
            if (typeof (index) == 'number') {
                this.priceCheck = index;
            } else {
                this.priceCheck = 'all';
            }
            this.page = 1;
            this.getGoodsList()
        },
        filterPop() {
            this.isPopFilter = true;
            this.isHideOverlay = false;
        },
        closePopFilter() {
            this.isPopFilter = false;
            this.isHideOverlay = true;
        },
        addCart(productId) {
            axios.post('/goods/addCart', { productId: productId }).then((res) => {
                if (res.data.status === '0') {
                    this.showCartModal = true;
                    this.$store.commit("updateCartCount", 1)
                } else { this.showModal = true }
            }).catch((err) => {
                alert(err)
            })
        },
        loadMore: function () {
            this.busy = true;
            setTimeout(() => {
                this.page++
                this.getGoodsList(true)
            }, 500);
        },
        closeModal() {
            this.showModal = false
            this.showCartModal = false
        }
    }
}
</script>