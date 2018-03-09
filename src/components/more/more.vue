<template>
    <div id="more">
        <loading :show="isShow"></loading>
        <mt-header class="com-header" :title="$route.meta.des">
            <a href="javascript:window.history.go(-1);" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <!--<div class="top_d">-->
           <!--<img src="../../assets/images/back@2x.png" @click="handleBack()">-->
           <!--<p>小编推荐</p>-->
        <!--</div>-->
        <div class="text_d" v-for="item in moreList" @click="handleGo(item.bookId)">
            <img :src="item.bookImage">
            <div class="con_d">
               <div class="text_one">
                  <span class="one_sp" v-html="item.bookName"></span>
                  <span class="two_sp" >{{item.clickTotal}}万点击</span>
               </div>
               <div class="text_two">
                  <span>作者: </span>
                  <span v-html="item.writerName"></span>
                  <p></p>
                  <span  v-html="item.classificationName">dfggag</span>
                  <p></p>
                  <span class="oSpan" v-if="item.bookStatus===0">连载中</span>
                  <span class="oSpan" v-if="item.bookStatus===1">已完结</span>
               </div>
               <div class="text_three">
                    <span :style="{color:i.bookColor,border:'1px solid'}" v-for="i in item.booklableList" v-html="i.bookLableName"></span>
               </div>
               <div class="text_four" v-html="item.bookIntroduction">
               
               </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Loading } from 'vux'
    import { Post_formData2, noParam_Get } from '@/config/services'
    export default {
        name: 'more',
        data () {
            return {
               isShow:false,
               moreList:[],
            }
        },
        components: {
            Loading,
        },
        methods:{
            handleMore(){
                this.isShow = true;
                Post_formData2(this,{},'/api/book-xiaobiantuijian',res=>{
                    this.isShow = false;
                    if(res.returnCode==200){
                           this.moreList = res.data;
                    }else{
                        this.$vux.toast.text(res.msg);
                    }
                })
            },
            handleGo(id){
                 this.$router.push({path:'/bookDetails',query:{bookId:id}});
            },
            handleBack(){
                 window.history.go(-1);
            }
        },
        mounted(){
            let self = this;
            self.handleMore();
        }
    }
</script>

<style lang="stylus" scoped>
    #more
        width:100%;
        box-sizing:border-box;
        padding-bottom:.27rem;
        font-family:'PingFangSC-Regular';
        .top_d
             height:.8rem;
             border-bottom:1px solid #e9e9e9;
             box-sizing:border-box;
             padding-left:.15rem;
             padding-top:.4rem;
             font-size:.18rem;
             color:#333;
             img
                 float:left;
                 width:.3rem;
                 height:.3rem;
             p
                 float:left;
                 margin-left:1rem;
                 margin-top:.02rem;
                 
        .text_d
            box-sizing:border-box;
            padding:0 .15rem;
            height:1.05rem;
            margin-top:.27rem;
            img
                width:.78rem;
                height:1.05rem;
                float:left;
            .con_d
                float:right;
                width:2.54rem;
                height:1.05rem;
            .text_one
                margin-top:-.02rem;
                .one_sp
                    font-size:.16rem;
                    color:#333;
                .two_sp
                    font-size:.12rem;
                    color:#F73D51;
                    margin-left:.14rem
            .text_two
                font-size:.12rem;
                color:#999;
                border:1px solid #fff;
                height:.2rem;
                span
                    float:left;
                .oSpan
                    color:#2BF6C7;
                p
                    width:.02rem;
                    height:.1rem;
                    background:#FFAAAA;
                    float:left;
                    margin:.05rem .1rem 0;
                    
            .text_three
                height:.2rem;
                font-size:.12rem;
                span
                    float:left;
                    margin-right:.1rem;
                    padding:0 .05rem;
                    border-radius:.2rem;
                    color: #71E281;
                    
            .text_four
                margin-top:.03rem;
                width:2.54rem;
                font-size:.14rem;
                color:#666;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
    
</style>
