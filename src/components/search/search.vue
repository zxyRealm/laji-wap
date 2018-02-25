<template>
   <div id="search">
        <loading :show="isShow"></loading>
        <div class="search_top">
           <input type="text" placeholder="搜索作者或者作品" v-model="keyword" >
           <img src="../../assets/images/search@2x.png">
           <span @click="handleBack()">取消</span>
        </div>
        <div v-if="hotLabel">
                <div class="label">
                    <p class="label_p">大家热搜</p>
                    <div class="label_text">
                        <span v-for="item in labelList" v-html="item.bookLableName" :style="{color:item.bookColor}"></span>
                    </div>
                </div>
                <div class="line">
                </div>
                <div class="hostroy" >
                    <div class="hostroy_p">历史搜索</div>

                    <div class="hostroy_text" v-for="item in hotwordList" >
                       <img src="../../assets/images/copy@2x.png">
                       <span v-html="item.hotWords"></span>
                    </div>
                </div>
        </div>
        <div v-if="!hotLabel" class="search_list">
             <div v-if="message">
                    <div class="line_img"></div>
                    <div class="text_d" v-for="item in searchList" @click="handleGo(item.bookId)">
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
             <div v-if="!message">暂无相关数据</div>
        </div>
       
   </div>
</template>
<script>
    import { Loading } from 'vux'
    import { Post_formData2, noParam_Get } from '@/config/services'
   export default {
        name: 'search',
        data () {
            return {
                 labelList:[],
                 isShow:false,
                 keyword:'',
                 searchList:[],
                 message:true,
                 hotLabel:true,
                 hotwordList:[]
            }
        },
         components: {
            Loading,
        },
        methods:{
            handleDownload(){
                 this.$router.push({path:"/download"});
            },
            handleBack(){
                 this.$router.push({path:"/home/index"});
            },
            handleGo(id){
                 this.$router.push({path:'/bookDetails',query:{bookId:id}});
            },
            handleInit(){
                 this.isShow = true;
                 setTimeout(() => {
                     this.isShow = false;
                 },5000);
                 noParam_Get(this,'/api/stacks-hotLable',res=>{
                        if(res.returnCode==200){
                            this.isShow= false;
                            this.labelList = res.data;
                        }
                })
            },
            handleHostry(){
                 this.isShow = true;
                 setTimeout(() => {
                     this.isShow = false;
                 },5000);
                 noParam_Get(this,'/api/sys-hotwords',res=>{
                        if(res.returnCode==200){
                            this.isShow= false;
                            this.hotwordList = res.data;
                        }
                })
            },
            handleSearch(){
                if(this.keyword !==''){
                     this.hotLabel = false;
                }else{
                    this.hotLabel = true;
                }
                let options = {
                    keyWord:this.keyword,
                    startPage:1,
                    isHotWorld:1
                }
                Post_formData2(this,options,'/api/stacks-search',res=>{
                    if(res.returnCode==200){
                          if(res.data.list.length>0){
                              this.message = true;
                              this.searchList = res.data.list;
                          }else{
                              this.message = false;
                          }
                    }
                })
            }
        },
        watch:{
            keyword(){
                this.handleSearch();
            }
        },
        mounted(){
             let self = this;
             self.handleInit();
             self.handleHostry();
        }
   }
</script>
<style lang="stylus" scoped>
   #search
        width:100%;
        height:100%;
        box-sizing:border-box;
        font-family:'PingFangSC-Regular';
        padding-top:.14rem;
        .search_top
            width:100%;
            height:.36rem;
            box-sizing:border-box;
            padding: 0 .14rem;
            img
                width:.2rem;
                height:.2rem;
                position:absolute;
                top:.22rem;
                left:.25rem;
            
            input
                width:3rem;
                height:.36rem;
                border-radius:18.5px;
                border:1px solid #979797;
                outline:none;
                box-sizing:border-box;
                padding-left:.4rem;
                color:#999;
                font-size:.16rem;
            
            span
                font-size:.18rem;
                color:#F77583;
                margin-left:.05rem;
            
        
        .label
            margin-top:.2rem;
            box-sizing:border-box;
            padding: 0 .14rem;
        
        .label_p
            font-size:.16rem;
            color:#999;
        
        .label_text
            margin-top:.14rem;
            span
                display:inline-block;
                border:1px solid;
                font-size:.14rem;
                color:#333;
                padding:0 .18rem;
                margin-right:.15rem;
                border-radius:22px;
                height:.3rem;
                line-height:.29rem;
                text-align:center;
                margin-bottom:.22rem;
           
        .line
            height:.06rem;
            background:#e9e9e9;
        
        .hostroy
            margin-top:.14rem;
            margin-bottom:.5rem;
            .hostroy_p
                font-size:.16rem;
                color:#999;
                box-sizing:border-box;
                padding: 0 .14rem;
                margin-bottom:.06rem;
            
            .hostroy_text
                height:.54rem;
                border-bottom:1px solid #e9e9e9;
                line-height:.54rem;
                box-sizing:border-box;
                padding: 0 .14rem;
                font-size:.16rem;
                img
                    width:.2rem;
                    height:.2rem;
                    margin-top:.17rem;
                    float:left;
                    margin-right:.2rem;
              
        .search_list
            width:100%;
            height:100%;
            box-sizing:border-box;
            .line_img
                width:100%;
                height:.04rem;
                background:#e9e9e9;
                margin-top:.11rem;
            
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
                    margin-left:.14rem;
                
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
