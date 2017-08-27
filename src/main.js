// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import {currency} from './util/currency.js'
import Vuex from 'Vuex'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)



Vue.use(Vuex);
Vue.use(VueLazyLoad,{
  loading:'/static/img/loading/loading-bars.svg'
})
Vue.filter('currency',currency)
Vue.config.productionTip = false

 const store = new Vuex.Store({
  state:{
    cartCount:0
  },mutations:{
    updateCartCount(state,count){
      state.cartCount += count
    },
    setCartCount(state,count){
      state.cartCount = count
    }
  }
}) 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
