<template>
    <div id="feedPepper">
        <div class="page_mcbg" v-show="backpepperShow" @click="handleClosepepper()"></div>
        <div class="container"  v-show="dilogpepperShow">
                <div class="paypepper">打赏辣椒</div>
                <div class='con'>
                    <div class="lajiao">
                        <p class='op'>您的辣椒余额:{{money}}</p>
                        <div class="btn">充值</div>
                    </div>
                    <div class="check">
                        <div class="laNum" v-bind:class="{active:iscode===index}" v-for="(item,index) in pepperList" @click="handleCheck(item.key,index)">
                            <img :src="item.url" >
                            <p v-html="item.name"></p>
                        </div>
                    </div>
                    <div class="obtn">打赏</div>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'feedPepper',
        data () {
            return {
                money:'',
                iscode:0,
                keyNum:'',
                pepperList:[
                    {url: require('../../assets/images/188@2x.png'),name:'188辣椒',key:'188'},
                    {url:require('../../assets/images/288@2x.png'),name:'288辣椒',key:'288'},
                    {url:require('../../assets/images/588@2x.png'),name:'588辣椒',key:'588'},
                    {url:require('../../assets/images/888@2x.png'),name:'888辣椒',key:'888'},
                    {url:require('../../assets/images/1888@2x.png'),name:'1888辣椒',key:'1888'},
                    {url:require('../../assets/images/8888@2x.png'),name:'8888辣椒',key:'8888'},
                ],
                backpepperShow:false,
                dilogpepperShow:false
            }
        },
        components: {
        },
        methods: {
           handleCheck(res,index){
                this.iscode = index;
                this.keyNum = res;
                console.log(this.keyNum);
           },
           handleClosepepper(){
               this.backpepperShow = !this.backpepperShow;
               this.dilogpepperShow = !this.dilogpepperShow;
           }
        }
    }
</script>

<style lang="stylus">
    #feedPepper
        width:100%;
        height:100%;
        .page_mcbg
            width: 3.75rem;
            height:100%;
            position: fixed;
            top: 0px;
            left: 0px;
            background: #000;
            opacity: 0.3;
            z-index: 10;
        
        .container
            width:3.75rem;
            height:3.9rem;
            background:#fff;
            position:absolute;
            top:50%;
            left:50%;
            margin-left:-1.875rem;
            margin-top:-1.95rem;
            z-index:999;
        
        .paypepper
            width:100%;
            height:.4rem;
            border-bottom:1px solid #F77583;
            background:#FFF0F0;
            color:#333;
            font-size:.18rem;
            text-align:center;
            line-height:.36rem;
        
        .con
            box-sizing:border-box;
            .lajiao
                height:.52rem;
                padding:.14rem;
                box-sizing:border-box;
            
            .op
                float:left;
                font-size:.16rem;
                color:#333;
            
            .btn
                width:.6rem;
                height:.3rem;
                border-radius:25px;
                background:#F77583;
                text-align:center;
                line-height:.3rem;
                font-size:.14rem;
                color:#fff;
                float:right;
          
        .check
            margin-top:.1rem;
            height:2.1rem;
            overflow:hidden;
            .laNum
                width:.9rem;
                height:.9rem;
                background:#FAF0F0;
                font-size:.12rem;
                text-align:center;
                color:#333;
                box-sizing:border-box;
                border-radius:4px;
                float:left;
                margin-left:.25rem;
                margin-bottom:.25rem;
                img
                    width:.6rem;
                    height:.56rem;
                    display:block;
                    margin:0 auto;
              
            .active
                background:#fff;
                border:2px solid #F73D51;
                border-radius:4px;
           
        .obtn
            width:1.26rem;
            height:.4rem;
            border-radius:25px;
            background:#F77583;
            text-align:center;
            line-height:.4rem;
            font-size:.18rem;
            color:#fff;
            margin:.15rem auto;
       
</style>
