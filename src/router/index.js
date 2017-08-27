import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList1'
import Cart from './../views/Cart'
import Address from './../views/Address'
import OrderConfirm from './../views/OrderConfirm'
import OrderSuccess from './../views/OrderSuccess'
import Home from './../views/Home'
import Detail from './../views/Detail'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      component:Home
    },
    {
      path:'/goodsList',
      component:GoodsList
    },
    {
      path:'/detail',
      component:Detail
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/address',
      component:Address
    },
    {
      path:'/orderconfirm',
      component:OrderConfirm
    },
    {
      path:'/ordersuccess',
      component:OrderSuccess
    }
  ]
})
