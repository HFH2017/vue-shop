<style>
.wrap{
    width: 80%;
    margin: 0 auto
}
.activity{
    margin: 50px 0;
}
.activity>.img-wrap{
    overflow: hidden
}
.activity h1{
   font-weight: 500
}
.activity img{
    width: 100%;
    transition: all .4s
}
.activity img:hover{
    transform: scale(1.1,1.1)
}
</style>

<template>
    <div>
        <nav-hheader></nav-hheader>
        <carousel></carousel>
        <div class="wrap">
            <div class="activity">
                <h1>每周促销：</h1>
                <div class="img-wrap">
                    <img src="./../../static/img/activity.jpg">
                </div>
            </div>
            <card></card>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import Carousel from './../components/Carousel.vue'
import NavHheader from './../components/NavHheader.vue'
import Card from './../components/Card.vue'
import NavFooter from './../components/NavFooter.vue'
export default {
    data() {
        return {
            msg: 'asdasd'
        }
    },
    components: {
        Carousel,
        NavHheader,
        Card,
        NavFooter
    }
}
</script>
