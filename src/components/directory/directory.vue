<template>
    <div id="directory">
        <loading :show="isShow"></loading>
        <div class="d_top">
              <img src="../../assets/images/back@2x.png" @click="handleBack()">
              <span>目录</span>
        </div>
        <div class="d_text">
            <p class="d_text_p" v-for="item in resultList">
               <span class="d_text_span" v-html="item.chapterTitle"></span>
            </p>
        </div>
        <div class="page">
            <span class="page_l">上一页</span>
            <span class="page_n">下一页</span>
            <input type="text" class="page_i" v-model="pageNum">
            <p class="page_p">跳转</p>
            <span class="page_num">1/20</span>
        </div>
    </div>
</template>
<script>
    import { Loading } from 'vux'
    import { Post_formData2, noParam_Get } from '@/config/services'
    export default {
        name: 'directory',
        data () {
            return {
                pageNum:1,
                id:this.$route.query.bookId,
                resultList:[],
                isShow:false,
            }
        },
        components: {
            Loading,
        },
        methods:{
            handleGo(){
                 this.$router.push({path:'/Home'});
            },
            handleBack(){
                 window.history.go(-1);
            },
            handleInit(){
                this.isShow = true;
                noParam_Get(this,'/api/books-volumeChapterList/'+this.id+'/',res=>{
                        this.isShow = false;
                        if(res.returnCode==200){
                            this.resultList = res.data.chapterInfo[0].resultList;
                        }
                })
            }
        },
        mounted(){
            let self = this;
            self.handleInit();
        }
    }
</script>

<style lang="stylus" scoped type="text/stylus" rel="stylesheet/stylus">
    #directory
        width:100%;
        height:100%;
        box-sizing:border-box;
        font-family:'PingFangSC-Regular';
        .d_top
            height:.43rem;
            line-height:.43rem;
            color:#333;
            font-size:.18rem;
            box-sizing:border-box;
            padding:0 .14rem;
            border-bottom:1px solid #e9e9e9;
            img
                width:.25rem;
                height:.25rem;
                float:left;
                margin-top:.1rem;
            span
                margin-left:1.35rem;
                
        .d_text
             box-sizing:border-box;
             font-size:.14rem;
             color:#333;
             .d_text_p
                 box-sizing:border-box;
                 padding:0 .14rem;
                 height:.41rem;
                 line-height:.41rem;
                 border-bottom:1px solid #e9e9e9;
             .d_text_span
                 margin-left:.1rem;
           
        .page
            width:100%;
            height:.62rem;
            border:1px solid;
            position:absolute;
            bottom:0;
            left:0;
            background:#fff;
            box-sizing:border-box;
            padding:0 .14rem;
            font-size:.16rem;
            line-height:.62rem;
            .page_l
                float:left;
                color:#999;
            .page_n
                float:right;
                color:#F77583;
            .page_i
                width:.28rem;
                height:.28rem;
                color:#666;
                line-height:.28rem;
                text-align:center;
                border:1px solid #F77583;
                margin-left:.48rem;
            .page_p
                display:inline-block;
                width:.53rem;
                height:.28rem;
                line-height:.28rem;
                text-align:center;
                border:1px solid #F77583;
                color:#666;
                margin:0 .23rem;
            .page_num
                color:#999;
           
</style>
