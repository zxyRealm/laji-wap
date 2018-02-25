<template>
    <div id="home">
         <div class="top">
            <router-link to="/">
                <img src="../assets/images/wap-logo-icon.png" alt="" class="logo_icon">
            </router-link>
            
            <div class="btn_top" @click="handleDownload()">下载APP</div>
            <div class="user-state">
                <router-link class="rank-btn" to="">排行榜</router-link>
                <router-link to="/user/index">
                    <img src="../assets/images/u@2x.png" class="logo_three">
                </router-link>
            </div>
         </div>
         <div class="bottom">
             <input type="text" class='search' @focus="handleSearch()"/>
             <img src="../assets/images/search@2x.png" class="logo_four">
             <button>搜索</button>
         </div>
         <div class="tap">
             <router-link class="btn" to="/home/index">首页</router-link>
             <router-link class="btn" to="/home/bookStacks">书库</router-link>
             <router-link class="btn" to="/home/free">限免</router-link>
         </div>
           <router-view style='width:100%;height:100%;'></router-view>
    </div>
</template>
<script>
    export default {
        name: 'home',
        data () {
            return {
               userId:'未知身份'
            }
        },
        methods:{
            handleDownload(){
                 this.$router.push({path:"/download"});
            },
            handleSearch(){
                this.$router.push({path:"/search"});
            }
        },
        computed:{
        
        }
    }
</script>

<style lang="stylus" scoped type="text/stylus" rel="stylesheet/stylus">
    #home
        width:100%;
        height:1rem;
        box-sizing:border-box;
        font-family:'PingFangSC-Regular';
        .top
            display flex
            justify-content space-between
            align-items center
            box-sizing:border-box;
            padding:0.1rem .14rem;
            height:.5rem;
            background #fff
            color #333
            .logo_icon
                height:.24rem;
            .btn_top
                padding 0.07rem 0.05rem
                border-radius:5px;
                background:#FB5E6F;
                font-size 14px
                line-height 1em
                color:#fff;
            .user-state
                display flex
                align-items center
                a
                    display inline-flex
                .rank-btn
                    font-size:.16rem;
                    color:#FB5E6F;
                .logo_three
                    
                    width:.34rem;
                    height:.33rem;
                    margin-left .05rem
                    
        .bottom
            box-sizing:border-box;
            padding:0 .14rem;
            height:.5rem;
            position:relative;
            .search
                float:left;
                width:2.5rem;
                height:.36rem;
                border:1px solid #979797;
                border-radius:4px;
                padding-left:.35rem;
                font-size:.16rem;
                color:#999;
                outline:none;
            
            .logo_four
                position:absolute;
                top:.09rem;
                left:.2rem;
                width:.2rem;
                height:.2rem;
            
            button
                width:.74rem;
                height:.36rem;
                border:none;
                background:#F77583;
                color:#fff;
                font-size:.18rem;
                text-align:center;
                line-height:.36rem;
                border-radius:4px;
                float:right;
                
        .tap
            box-sizing:border-box;
            padding:0 .14rem;
            display: flex;
            justify-content:space-between;
            .btn
                font-size:18px;
                color:#333;
                padding 0.01rem 0.09rem
              
            .active-link
                color:#fff;
                background:#FB5E6F;
                border-radius:4px;
        
</style>
