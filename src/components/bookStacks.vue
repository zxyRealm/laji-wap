<template>
    <div id="bookStacks">
        <loading :show="isShow"></loading>
        <p class="op"></p>
        
        <div class="select" style="height:1.4rem;">
           <ul>
              <li style="font-size:.18rem;color:#333;width:.73rem;">作品类型</li>
              <li v-for="(item,index) in classList" :class="{ red:changeRed == index}" @click="getData(item.id,index)"><span v-html="item.classificationName"></span></li>
           </ul>
        </div>
        <div class="select" style="height:.8rem;">
           <ul>
              <li style="font-size:.18rem;color:#333;">作品字数</li>
              <li v-for="(item,index) in words" :class="{ red:numRed == index}" @click="getWords(item.key,index)"><span v-html="item.name"></span></li>
           </ul>
        </div>
        <div class="select" style="height:.5rem;">
           <ul>
              <li style="font-size:.18rem;color:#333;">作品状态</li>
              <li v-for="(item,index) in status" :class="{ red:statusRed == index}" @click="getStutas(item.key,index)"><span v-html="item.name"></span></li>
           </ul>
        </div>
        <div class="select" style="height:.8rem;">
           <ul>
              <li style="font-size:.18rem;color:#333;">更新时间</li>
              <li v-for="(item,index) in time" :class="{ red:timeRed == index}" @click="getTime(item.key,index)"><span v-html="item.name"></span></li>
           </ul>
        </div>
        <div class="select" style="height:1.1rem;">
           <ul>
              <li style="font-size:.18rem;color:#333;width:.73rem;">排行榜</li>
              <li v-for = '(item,index) in category' :class="{ red:categoryRed == index}" @click="getCategor(item.key,index)"><span v-html="item.name"></span></li>
           </ul>
        </div>
        <div class="line">
        </div>
        <div class="book_text" v-for="item in filterList">
            <img :src="item.bookImage">
            <div class="con-text">
               <p class="p_one" v-html="item.bookName"></p>
               <p class="p_two"><span>作者 : </span><span  v-html="item.writerName" style="margin-left:.05rem;margin-right:.15rem;"></span><span v-html="item.classificationName"></span></p>
               <p class="p_three" v-html="item.bookIntroduction"></p>
            </div>
        </div>
    </div>
</template>

<script>
    import { Loading } from 'vux'
    import { Post_formData2, noParam_Get } from '@/config/services'
    export default {
        name: 'home',
        data () {
            return {
                isShow:false,
                filterList:[],
                classList:[],
                rankList:[],
                worksClass:'',
                worksNum:'',
                worksStatus:'',
                worksTime:'',
                worksCategory:'',
                changeRed:0,
                numRed:0,
                statusRed:0,
                timeRed:0,
                categoryRed:0,
                // 类型
                category:[
                    {name:"不限",key:0},
                    {name:"金椒榜",key:1},
                    {name:"推荐榜",key:2},
                    {name:"点击榜",key:3},
                    {name:"新书榜",key:4},
                    {name:"畅销榜",key:5},
                    {name:"吐槽榜",key:6},
                    {name:"更新榜",key:7},
                    {name:"打赏榜",key:8}
                ],
                // 字数
                words:[
                    {name:"不限",key:0},
                    {name:"30万以下",key:1},
                    {name:"30-50万",key:2},
                    {name:"50-100万",key:3},
                    {name:"100-200万",key:4},
                    {name:"200万",key:5}
                ],
                // 状态
                status:[
                    {name:"不限",key:0},
                    {name:"连载中",key:1},
                    {name:"已完结",key:2},
                ],
                // 时间
                time:[
                    {name:"不限",key:0},
                    {name:"本日",key:1},
                    {name:"三日",key:2},
                    {name:"七日",key:3},
                    {name:"半个月",key:4},
                    {name:"一月内",key:5},
                ]
            }
        },
        components: {
            Loading,
        },
        methods:{
            getData(res,index){
                this.worksClass = res;
                this.changeRed = index;
                console.log(this.worksClass);
                this.handleFilter();
            },
            getWords(res,index){
                this.worksNum = res;
                this.numRed = index;
                console.log(this.worksNum);
                this.handleFilter();
            },
            getStutas(res,index){
                this.worksStatus = res;
                this.statusRed = index;
                console.log(this.worksStatus);
                this.handleFilter();
            },
            getTime(res,index){
                this.worksTime =res;
                this.timeRed = index;
                console.log(this.worksTime);
                this.handleFilter();
            },
            getCategor(res,index){
                this.worksCategory = res;
                this.categoryRed = index;
                console.log(this.worksCategory);
                this.handleFilter();
            },
            handleFilter(){
                this.isShow= true;
                let options={
                    startPage:1
                }
                // 分类
                if (this.worksClass) {
                    options.bookClassificationid = this.worksClass;
                }
                // 字数
                if(this.worksNum){
                   options.bookWorldCount = this.worksNum;
                }
                // 状态
                if(this.worksStatus){
                   options.bookStatus = this.worksStatus;
                }
                // 时间
                if(this.worksTime){
                   options.updateTime = this.worksTime;
                }
                // 排行榜
                if(this.worksCategory){
                   options.order = this.worksCategory;
                }
                Post_formData2(this,options,'/api/stacks-bookFiltering',res=>{
                    if(res.returnCode==200){
                        this.isShow = false;
                        if(res.data.list.length>0){
                            this.filterList = res.data.list;
                        }else{
                            this.filterList = [];
                            this.$vux.toast.text('暂无匹配数据!');
                        }
                       
                    }else{
                        this.$vux.toast.text(res.msg);
                    }
                })
            },
            handleClass(){
                this.isShow= true;
                let cate = {
                    id:0,
                    classificationName:'全部'
                }
                noParam_Get(this,'/api/ranking-classification',res=>{
                        this.isShow= false;
                        if(res.returnCode==200){
                            this.classList = res.data;
                            this.classList.unshift(cate);
                         }else{
                            this.$vux.toast.text(res.msg);
                        }
                })
            },
            handleRank(){
                 this.isShow= true;
                 let options = {
                     type: 1,
                     page: 1
                 }
                 Post_formData2(this,options,'/api/ranking-book',res=>{
                    this.isShow = false;
                    if(res.returnCode==200){
                        // this.rankList = res.data.list;
                    }else{
                        this.$vux.toast.text(res.msg);
                    }
                })
            }
        },
        mounted (){
            let self = this;
            self.handleFilter();
            self.handleClass();
            self.handleRank();
        }
    }
</script>

<style lang="stylus">
    #bookStacks
        width:100%;
        box-sizing:border-box;
        font-family:'PingFangSC-Regular';
        background:#fff;
        .op
            width:100%;
            height:.03rem;
            background:#e9e9e9;
            margin-top:.1rem;
        
        .select
            border-bottom:1px solid #e9e9e9;
            box-sizing:border-box;
            padding:.12rem;
            li
                font-size:.16rem;
                color:#999;
                float:left;
                margin-right:.22rem;
                height:.2rem;
                margin-bottom:.1rem;
            
            .red
                color:#FB5E6F;
          
        .line
            height:.06rem;
            background:#e9e9e9;
        
        .book_text
            height:1.3rem;
            box-sizing:border-box;
            padding:.14rem;
            img
                width:.8rem;
                height:1.02rem;
                margin-right:.16rem;
                float:left;
            
            .con-text
                float:left;
            
            .p_one
                font-size:.16rem;
                color:#333;
                margin-bottom:.1rem;
            
            .p_two
                font-size:.12rem;
                color:#999;
                margin-bottom:.12rem;
            
            .p_three
                width:2.47rem;
                font-size:.14rem;
                color:#666;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
</style>
