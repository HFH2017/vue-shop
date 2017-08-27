<template>
  <header class="header">
    <div class="navbar">
      <div class="navbar-left-container">
      </div>
      <div class="navbar-right-container" style="display: flex;">
        <div class="navbar-menu-container">
          <!--<a href="/" class="navbar-link">我的账户</a>-->
          <span class="navbar-link"></span>
          <a href="javascript:void(0)" class="navbar-link" v-show="loged">你好，{{userName}}</a>
          <a href="javascript:void(0)" class="navbar-link" @click="showLogin" v-show="!loged">登陆</a>
          <a href="javascript:void(0)" class="navbar-link" v-show="loged" @click="logout">登出</a>
          <div class="navbar-cart-container">
            <span class="navbar-cart-count" v-if="cartNum">{{cartNum}}</span>
            <a class="navbar-link navbar-cart-link" href="/#/cart">
            <router-link class="shopping-svg" to="/cart" href="javascript:;" v-show="loged" style="border:none;">
              <img src="./../../static/shopping-cart.svg" alt="">
            </router-link>
              
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':loginModel}">
      <div class="md-modal-inner">
        <div class="md-top">
          <div class="md-title">Login in</div>
          <button class="md-close" @click="closeLogin">Close</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <div class="error-wrap">
              <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
            </div>
            <ul>
              <li class="regi_form_input">
                <i class="icon IconPeople"></i>
                <input type="text" tabindex="1" v-model="userName" name="loginname" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
              </li>
              <li class="regi_form_input noMargin">
                <i class="icon IconPwd"></i>
                <input type="password" tabindex="2" v-model="userPwd" name="password" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password">
              </li>
            </ul>
          </div>
          <div class="login-wrap">
            <a href="javascript:;" class="btn-login" @click="login">登 录</a>
          </div>
        </div>
      </div>
    </div>
    <div :class="{'md-overlay':loginModel}" @click="closeLogin()"></div>
  </header>
</template>
<style>
.shopping-svg img{
  width: 30px;
  height: 30px;
}

  .header {
    width: 100%;
    background-color: white;
    font-family: "moderat", sans-serif;
    font-size: 16px;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 70px;
    max-width: 1280px;
    margin: 0 auto;
    padding: 5px 20px 10px 20px;
  }

  .navbar-left-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: -20px;
  }

  .header a,
  .footer a {
    color: #666;
    text-decoration: none;
  }

  a {
    -webkit-transition: color .3s ease-out;
    transition: color .3s ease-out;
  }

  .navbar-right-container {
    display: none;
    justify-content: flex-start;
    align-items: center;
  }

  .navbar-menu-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 10px;
  }

  .navbar-link {
    padding-left: 15px;
  }

  .navbar-cart-container {
    position: relative;
  }

  .navbar-cart-count {
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -9px;
    right: -11px;
    width: 20px;
    border-radius: 10px;
    color: white;
    background-color: #eb767d;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }

  .navbar-cart-logo {
    width: 25px;
    height: 25px;
    transform: scaleX(-1);
  }
</style>

<script>
import axios from 'axios';
export default {
  data: function () {
    return {
      loginModel: false,
      userName:'admin',
      userPwd:'123456',
      errorTip:false,
      loged:false
    }
  },
  computed:{
    cartNum(){
      return this.$store.state.cartCount
    }
  },
  mounted:function(){
    this.checkLogin();
    
  },
  methods: {
    showLogin() {
      this.loginModel = true
    },
    closeLogin(){
      this.loginModel = false
    },
    login() {
       if(!this.userName || !this.userPwd){
         this.errorTip = true;
         return
       }
       axios.post('/users/login',{'userName':this.userName,'userPwd':this.userPwd}).then((res)=>{
        var result = res.data;
        console.log(result)
        if(result.msg==='ok'){
          this.loginModel = false
          this.loged = true
          this.getCartCount()
        }else{
          this.errorTip=true
        }
      }) 
    },
    logout(){
      axios.post('/users/logout').then((res)=>{
        var result = res.data;
        console.log(result)
        this.loged = false
        this.$store.commit("setCartCount",0)
      })
    },
    checkLogin(){
      axios.get('/users/checklogin').then((res)=>{
        if(res.data.status==='0'){
          this.userName=res.data.result;
          this.loged = true;
          this.getCartCount()
        }
      })
    },
     getCartCount(){
      axios.get('/users/getcartcount').then((res)=>{
        console.log(res.data)
        let count = res.data.result;
        this.$store.commit("setCartCount",count)
      })
    }
  }
}
</script>
