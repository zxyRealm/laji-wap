<template>
    <div id="bookDetails">
           <loading :show="isShow"></loading>
            <app-feed  ref="child"  @click="handleClosefeed()"></app-feed>
            <app-feedpepper  ref="childfeedpepper" @click="handleClosefeedpepper()"></app-feedpepper>
          <div class="top">
              <img src="../../assets/images/back@2x.png" @click="handleBack()">
              <span class="detail">书籍详情</span>
              <span class="index"  @click="handleGo({path:'/Home/index'})">首页</span>
          </div>
          <div class="text">
              <img :src="infoList.bookImage" class="oImg">
              <div class="con">
                 <p class="p_one"><span v-html="infoList.bookName"></span></p>
                 <p class="p_two"><span>作者:</span><span class="l_d" v-html="infoList.writerName"></span></p>
                 <p class="p_two"><span>字数:</span><span  class="l_d" v-html="infoList.bookWorldCount">wwww</span></p>
                 <div class="p_two">
                    <span>分类:</span>
                    <span  class="l_d" v-html="infoList.classificationName"></span>
                    <p></p>
                    <span v-if="infoList.bookStatus==0">连载中</span>
                    <span v-if="infoList.bookStatus==1">已完结</span>
                 </div>
                 <div class="p_two">
                    <span class="title"  v-for="item in labelList" v-html="item.bookLableName" :style="{color:item.bookColor}"></span>
                 </div>
              </div>
          </div>
          <div class="check_d">
              <div class="reader" v-for="(item,index) in cate" :class="{addCate:isActive===index}" @click="handleRead(index)"><span v-html="item.name"></span></div>
          </div>
          <div class="pepper">
             <div class="feed" @click="handleClosefeed()">
                <img src="../../assets/images/d_18@3x.png">
                <p>投喂金椒</p>
             </div>
             <div class="feed" @click="handleClosefeedpepper()">
                 <img src="../../assets/images/d-28@3x.png">
                 <p>打赏辣椒</p>
             </div>
             <div class="feed" style="border:none;">
                 <img src="../../assets/images/d-48@3x.png">
                 <p>投喂小米椒</p>
             </div>
          </div>
          <div class="evaluation">
              <div class="text_d"  @click="handleLook()">
                  <span v-html="infoList.bookIntroduction" :class="{'add':isAdd}"></span>
              </div>
              <div style="height:.2rem;margin-top:.1rem;" v-if="lookShow">
                    <div class="expand"  @click="handleLook()">
                        <img src="../../assets/images/d-38@3x.png">
                        <span>展开</span>
                    </div>
              </div>
          </div>
          <div class="directory">
             <span>目录</span>
             <span style="margin-left:.5rem;">共章</span>
             <img src="../../assets/images/d-58@3x.png"  @click="handleGo({path:'/directory',query:{bookId:infoList.bookId}})">
          </div>
          <div class="comments">
              <p class="top_p">评论区</p>
              <div class="comments_d" v-for="i in commentList">
                  <div style="overflow:hidden;height:100%;margin-top:.1rem;">
                        <img :src="i.userHeadPortraitURL" class="oImg">
                        <img src="../../assets/images/crown@3x.png" class="t-img">
                        <div class="con_r">
                            <div style="">
                                <span class="name" v-html="i.pseudonym"></span>
                                <img src="../../assets/images/sex-02_03@3x.png" class="sex" v-if="i.userSex==0">
                                <img src="../../assets/images/sex-03@3x.png" class="sex" v-if="i.userSex==1">
                                <p class="grade">lv{{i.userGrade}}</p>
                            </div>
                            <div class="text_con" v-html="i.commentContext">
                            
                            </div>
                            <div style="height:.2rem;color:#999;">
                               <p class="r_p">
                               <span>回复</span>
                               <span v-html="i.replyCount"></span>
                               <span style="margin-left:.5rem;">赞</span>
                               <span v-html="i.thumbsCount"></span>
                               </p>
                            </div>
                        </div>
                  </div>
              </div>
              <div class="more">
                  <p>更多书评</p>
              </div>
          </div>
          <div class="similar">
             <div class="similar-text">
                <span>同类热门书籍</span>
             </div>
             <div class="similar-swiper">
                  <div class="swiper-container spots-list">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide swiperdiv" v-for="item in swiperList">
                           <img :src="item.bookImage">
                        </div>
                    </div>
                  </div>
             </div>
          </div>
    </div>
</template>
<script>
    import AppFeed from '@/components/feed/feed.vue'
    import AppFeedpepper from '@/components/feed/feedPepper.vue'
    import { Loading } from 'vux'
    import { Post_formData2, noParam_Get } from '@/config/services'
    export default {
        name: 'bookDetails',
        data () {
            return {
                id:this.$route.params.bid,
                isShow:false,
                isActive:0,
                cate:[
                    {name:'立即阅读'},
                    {name:'订阅全本'},
                    {name:'放入书架'}
                ],
                labelList:[],
                infoList:[],
                lookShow:true,
                isAdd:true,
                commentList:[],
                classId:'',
                swiperList:[],
            }
        },
        components: {
            Loading,
            AppFeed,
            AppFeedpepper
        },
        methods:{
            handleRead(index){
                 this.isActive = index;
            },
            handleClosefeed(){
                this.$refs.child.handleClose();
            },
            handleClosefeedpepper(){
               this.$refs.childfeedpepper.handleClosepepper();
            },
            handleGo(res){
                 this.$router.push(res);
            },
            handleInit(){
                this.isShow = true;
                Post_formData2(this,{bookid:this.id},'/api/book-bookInfo',res=>{
                    this.isShow = false;
                    if(res.returnCode==200){
                        this.infoList = res.data.bookListInfo;
                        this.classId = res.data.bookListInfo.bookClassificationId;
                        this.labelList = res.data.bookLable;
                        this.handleSwiper();
                    }else{
                        this.$vux.toast.text(res.msg);
                    }
                })
            },
            handleBack(){
                 window.history.go(-1);
            },
            handleLook(){
                this.isAdd = !this.isAdd;
                this.lookShow = !this.lookShow;
            },
            handleComments(){
                this.isShow = true;
                Post_formData2(this,{bookid:this.id},'/api/comm-HotCommentInfo',res=>{
                    this.isShow = false;
                    if(res.returnCode==200){
                         this.commentList = res.data;
                    }else{
                        this.$vux.toast.text(res.msg);
                    }
                })
            },
            handleSwiper(){
                console.log(this.classId);
                // this.isShow = true;
                let options ={
                     startpage:1,
                     classid:this.classId
                }
                Post_formData2(this,options,'/api/book-similarrecommendation',res=>{
                    // this.isShow = false;
                    if(res.returnCode==200){
                        this.swiperList = res.data.list;
                    }else{
                        this.$vux.toast.text(res.msg);
                    }
                })
            }
        },
        created(){
            this.handleInit();
        },
        mounted(){
            let self = this;
//            self.handleInit();
            self.handleComments();
            let  mySwiper = new Swiper('.swiper-container', {
                // spaceBetween:5,
                slidesPerView : 4,
                slidesOffsetAfter : 15,
                slidesOffsetBefore : 15,
                observer:true,
                observeParents:true,
            });
            setTimeout(()=>{
                document.getElementsByClassName('swiper-wrapper')[0].style.transform = "translate3d(0px,0px,0px)";
            },500);
        }
    }
</script>

<style lang="stylus" scoped type="text/stylus" rel="stylesheet/stylus">
    #bookDetails
        width:100%;
        height:100%;
        box-sizing:border-box;
        font-family:'PingFangSC-Regular';
        .top
            margin-top:.1rem;
            margin-bottom:.14rem;
            height:.25rem;
            text-align:center;
            box-sizing:border-box;
            padding:0 .14rem;
            img
                width:.25rem;
                height:.25rem;
                float:left;
            
            .detail
                font-size:.18rem;
                color:#333;
            
            .index
                float:right;
                color:#F77583;
                font-size:.16rem;
        .text
            box-sizing:border-box;
            padding:0 .14rem;
            width:100%;
            height:1.32rem;
            overflow:hidden;
            .oImg
                width:.96rem;
                height:1.32rem;
                float:left;
            .con
                width:100%;
                height:100%;
                margin-left:1.1rem;
            
            .p_one
                font-size:.16rem;
                color:#333;
                width:100%;
            
            .p_two
                margin-top:.06rem;
                color:#666;
                font-size:.12rem;
                width:100%;
                height:.2rem;
                span
                    float:left;
                .l_d
                    margin-left:.1rem;
                .title
                    border:1px solid;
                    margin-right:.1rem;
                    padding:0 .05rem;
                    border-radius:.2rem;
                p
                   float:left;
                   width:.01rem;
                   height:.12rem;
                   background:#666;
                   margin:.03rem .1rem 0;
                   
        .check_d
            box-sizing:border-box;
            padding:0 .14rem;
            display:flex;
            justify-content:space-between;
            margin-top:.15rem;
            .reader
                width:.96rem;
                height:.34rem;
                border:1px solid #F77583;
                border-radius:.04rem;
                font-size:.16rem;
                line-height:.32rem;
                text-align:center;
                color:#F77583;
            .addCate
                color:#fff;
                background:#F77583;
                
        .pepper
            height:.5rem;
            margin-top:.1rem;
            border-top:1px solid #e9e9e9;
            border-bottom:1px solid #e9e9e9;
            box-sizing:border-box;
            padding:.06rem .14rem;
            display:flex;
            justify-content:space-between;
            .feed
                width:1.23rem;
                height:100%;
                border-right:2px solid #F77583;
                color:#333;
                font-size:.12rem;
                text-align:center;
                img
                    width:.22rem;
                    height:.22rem;
                    margin-top:.05rem;
                    float:left;
                    margin-left:.1rem;
                p
                    float:left;
                    margin-top:.08rem;
                    margin-left:.06rem;
                    
        .evaluation
            box-sizing:border-box;
            padding:.1rem .14rem;
            border-bottom:1px solid #e9e9e9;
            .text_d
                font-size:.14rem;
                color:#333;
            .add
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            .expand
                width:.7rem;
                height:.2rem;
                float:right;
                img
                    width:.2rem;
                    height:.2rem;
                    float:right;
                    margin-left:.13rem;
                span
                    color:#FB5E6F;
                    font-size:.14rem;
                    float:right;
                    
        .directory
            height:.5rem;
            box-sizing:border-box;
            padding:0 .14rem;
            border-bottom:1px solid #e9e9e9;
            color:#333;
            font-size:.14rem;
            line-height:.5rem;
            img
                width:.2rem;
                height:.2rem;
                float:right;
                margin-top:.14rem;
           
        .comments
            .top_p
                box-sizing:border-box;
                padding:0 .14rem;
                color:#666;
                font-size:.16rem;
                margin-top:.14rem;
            .comments_d
                box-sizing:border-box;
                padding:0 .14rem;
                height:1rem;
                border-bottom:1px solid #e9e9e9;
                .oImg
                    width:.38rem;
                    height:.38rem;
                    border-radius:50%;
                    margin-top:.1rem;
                .t-img
                    width:.22rem;
                    height:.22rem;
                    position:absolute;
                    left:.3rem;
                    // top:0rem;
                    z-index:9999;
                .con_r
                    float:right;
                    width:2.92rem;
                    height:100%;
                    .grade
                        display:inline-block;
                        font-size:8px;
                        background:#7FFFD4;
                        color:#fff;
                        height:.14rem;
                        line-height:.14rem;
                        border-radius:4px;
                        padding:0  .02rem;
                        font-family:"MT-Extra";
                        margin-left:.05rem;
                        margin-top:-.05rem;
                .name
                    color:#666;
                    font-size:.16rem;
                    margin-right:.05rem;
                .sex
                    width:.12rem;
                    height:.12rem;
                .text_con
                    height:.5rem;
                    color:#333;
                    font-size:.12rem;
                    overflow : hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                .r_p
                    float:right;
            .more
                height:.44rem;
                box-sizing:border-box;
                border-bottom:1px solid #e9e9e9;
                padding-top:.12rem;
                p
                    width:.77rem;
                    height:.19rem;
                    color:#fff;
                    background:#F77583;
                    border-radius:18px;
                    text-align:center;
                    line-height:.19rem;
                    margin:0 auto;
              
        .similar-text
            height:.48rem;
            padding:0 .14rem;
            box-sizing:border-box;
            font-size:.16rem;
            color:#666;
            line-height:.48rem;
        .similar-swiper
            width:100%;
            height:1.28rem;
            margin-bottom:.3rem;
            .spots-list
                width:100%;
                height:100%;
                overflow:hidden;
            .swiperdiv
                float:left;
                margin-right:.1rem;
            img
                width:.96rem;
                height:1.28rem;
</style>
