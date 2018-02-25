<template>
    <div id="index">
        <loading :show="isShow"></loading>
        <div class="swiper-container swiper" >
            <div class="swiper-wrapper" >
                <div class="swiper-slide" v-for="item in pictureList">
                    <router-link :to="'/bookDetails/'+item.bookId">
                        <img :src="item.bookImage" style="width:100%;height:.98rem;" >
                    </router-link>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="edit">
            <img src='../assets/images/recommend@3x.png' class="left_img">
            <p class='le_p'>小编推荐</p>
            <div cLass="r_d" @click="handleMore()">
                <p class='ri_p'>更多</p>
                <img src="../assets/images/more@3x.png">
            </div>
        </div>
        <div class="text_con">
            <div class="book" v-for="item in bookList">
                <router-link :to="'/bookDetails/'+item.bookId">
                    <img :src="item.bookImage" style="width:.96rem;height:1.27rem;">
                    <p class="p_one" v-html="item.bookName"></p>
                    <p class="p_two" v-html="item.writerName"></p>
                </router-link>
            </div>
        </div>
        <div class="line">
        </div>
        <div class="edit_d">
            <img src='../assets/images/newbook@3x.png' class="left_img">
            <span class='le_p'>新书推荐</span>
        </div>
         <div class="text_con">
                <div class="book" v-for="item in bookList">
                    <router-link :to="'/bookDetails/'+item.bookId">
                        <img :src="item.bookImage" style="width:.96rem;height:1.27rem;">
                        <p class="p_one" v-html="item.bookName"></p>
                        <p class="p_two" v-html="item.writerName"></p>
                    </router-link>
                </div>
        </div>
        <div class="line">
        </div>
        <div class="edit_d">
            <img src='../assets/images/new@3x.png' class="left_img">
            <span class='le_p'>最新小说</span>
        </div>
        <div class="newBook_d" v-for="i in newList">
            <p class="op"></p>
            <span class="span_one" v-html="i.classificationName"></span>
            <router-link class="span_two" :to="'/bookDetails/'+i.bookId">{{i.bookName}}</router-link>
            <!--<span class="span_two" v-html="i.bookName"></span>-->
            <img src="../assets/images/vip@3x.png">
        </div>
        <div class="bottom_d">
            <ul>
               <li>首页</li>
                <li>书架</li>
                 <li>充值</li>
                  <li>客户端</li>
                   <li>联系我们</li>
            </ul>
            <p style="margin-top:.5rem;margin-bottom:.1rem;">Copyright (C) 华夏天空小说网 2004-2017</p>
            <p>浙ICP备12010638号-1</p>
        </div>
    </div>
</template>

<script>
    import { Loading } from 'vux'
    import { Post_formData2, noParam_Get } from '@/config/services'
    export default {
        name: 'index',
        data () {
            return {
                 bookList:[],
                 page:1,
                 total:10,
                 newList:[],
                 pictureList:[],
                 isShow:false
            }
        },
        components: {
            Loading,
        },
        methods:{
            handleGetbook(){
                this.isShow = true;
                noParam_Get(this,'/api/hot/homePageRecommended',res=>{
                       this.isShow= false;
                        if(res.returnCode==200){
                            this.bookList = res.data.HostXiaoBianRecommend;
                            this.pictureList = res.data.pictureCarousel;
                        }else{
                            this.$vux.toast.text(res.msg);
                        }
                })
            },
            handleNewbook(){
                this.isShow = true;
                 noParam_Get(this,'/api/hot/getbooklistList/'+this.page+'/'+this.total,res=>{
                        this.isShow= false;
                        if(res.returnCode==200){
                            this.newList = res.data.list;
                        }else{
                            this.$vux.toast.text(res.msg);
                        }
                })
            },
            handleMore(){
                this.$router.push({path:"/more"});
            },
            handleGo(id){
                 this.$router.push({path:'/bookDetails',query:{bookId:id}});
            }
        },
        mounted(){
            let self = this;
            self.handleGetbook();
            self.handleNewbook();
            let mySwiper = new Swiper('.swiper-container', {
                autoplay:3000,
                autoplayDisableOnInteraction : false,
                pagination : '.swiper-pagination',
                // paginationClickable:true,
                observer:true,
                observeParents:true,
            });
        }
    }
</script>

<style lang="stylus" scoped type="text/stylus" rel="stylesheet/stylus">
   
    #index
        width:100%;
        box-sizing:border-box;
        font-family:'PingFangSC-Regular';
        .swiper
            width:3.75rem;
            height:0.98rem;
            margin-top:.1rem;
        
        .edit_d
            height:.25rem;
            margin-top:.1rem;
            box-sizing:border-box;
            padding:0 .14rem;
            .left_img
                width:.24rem;
                height:.24rem;
                float:left;
            
            .le_p
                font-size:.18rem;
                color:#333;
                margin-left:.05rem;
         
        .edit
            height:.25rem;
            margin-top:.1rem;
            box-sizing:border-box;
            padding:0 .14rem;
            .left_img
                width:.24rem;
                height:.24rem;
                float:left;
            
            .le_p
                font-size:.18rem;
                color:#333;
                float:left;
            
            .r_d
                 float:right;
                 height:.25rem;
                .ri_p
                    color:#666;
                    font-size:.14rem;
                    float:left;
                    margin-top:.03rem;
                
                img
                    width:.24rem;
                    height:.24rem;
              
        .text_con
            width:100%;
            height:3.6rem;
            margin-top:.1rem;
            box-sizing:border-box;
            font-size:.14rem;
            text-align:center;
            .book
                float:left;
                width:1.25rem;
                height:1.8rem;
            
            .p_one
                color:#333;
                white-space: nowrap;
                text-overflow:ellipsis;
                overflow: hidden;
            
            .p_two
                color:#999;
                white-space: nowrap;
                text-overflow:ellipsis;
                overflow: hidden;
            
            img
                display:block;
                margin:0 auto;
                width:.96rem;
                height:1.27rem;
           
        .line
            height:.06rem;
            background:#e9e9e9;
        
        .newBook_d
            height:.2rem;
            box-sizing:border-box;
            padding-left:.14rem;
            text-align:left;
            margin-top:.1rem;
            .op
                color:#FB5E6F;
                width:.15rem;
                height:.14rem;
                font-size:.14rem;
                border-left:2px solid #FB5E6F;
                float:left;
                margin-top:.02rem;
            
            .span_one
                font-size:.14rem;
                color:#FB5E6F;
                // float:left;
            
            .span_two
                // float:left;
                margin-left:.2rem;
            
            img
                width:.12rem;
                height:.12rem;
                float:right;
                margin-right:.65rem;
           
        .bottom_d
            width:100%;
            height:1.35rem;
            margin-top:.1rem;
            box-sizing:border-box;
            padding-top:.27rem;
            background:#e9e9e9;
            color:#999;
            text-align:center;
            li
                font-size:.14rem;
                float:left;
                margin-left:.3rem;
                // border:2px solid;
                // width:.75rem;
            
            p
                font-size:.12rem;
         
</style>
