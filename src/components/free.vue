<template>
    <div id="free">
        <loading :show="isShow"></loading>
        <div class="text_d" v-for="item in freeList" @click="handleGo(item.bookId)">
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
        <infinite-loading @infinite="onInfinite" ref="infiniteLoading">
          <span slot="no-more">
            加载完
          </span>
          <span slot="no-results">
            暂无评论
          </span>
        </infinite-loading>
    </div>
</template>
<script>
    import { Loading } from 'vux'
    import InfiniteLoading from 'vue-infinite-loading';
    import { Post_formData2, noParam_Get } from '@/config/services'
    export default {
        name: 'free',
        data () {
            return {
               isShow:false,
               freeList:[],
            }
        },
        components: {
            Loading,
            InfiniteLoading,
        },
        methods:{
            handleMore(){
            //    this.isShow = true;
                noParam_Get(this,'/api/sys-freetimelimit',res=>{
                    // this.isShow = false;
                    if(res.returnCode==200){
                           this.freeList = res.data.data?res.data.data:{};
                    }else{
                        this.$vux.toast.text(res.msg);
                    }
                })
            },
            handleGo(id){
                this.$router.push({path:'/bookdetails',query:{bookId:id}})
            },
            onInfinite($state){
                 let self = this;
                 function load(){
                    noParam_Get(self,'/api/sys-freetimelimit',res=>{
                        let lists = res.data?res.data:[];
                        self.freeList = self.freeList.concat(lists);
                        if(res.data && res.data.length>0){
                            $state.loaded();
                        }else {
                            $state.complete()
                        }
                    })
                 }
                setTimeout(() => {
                    load();
                },500);
                
            }
        },
        mounted(){
            let self = this;
            // self.handleMore();
        }
    }
</script>

<style lang="stylus" scoped type="text/stylus" rel="stylesheet/stylus">
    #free
        width:100%;
        box-sizing:border-box;
        padding-top:.17rem;
        font-family:'PingFangSC-Regular';
        .text_d
            box-sizing:border-box;
            padding:0 .15rem;
            height:1.05rem;
            margin-bottom:.17rem;
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
