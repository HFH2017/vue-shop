
<template>
<div>
  
<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">首页</el-menu-item>
  <el-menu-item index="2"><router-link to="/goodsList">商品列表</router-link></el-menu-item>
  <el-menu-item index="3"><router-link to="/ordersuccess">订单管理</router-link></el-menu-item>
</el-menu>

</div>
  
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>