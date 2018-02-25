<template>
    <div id="feed">
        <div class="page_mcbg" @click="handleClose()" v-show="backShow"></div>
       
        <div class="glod_div"  v-show="dilogShow">
            <div class='goldpepper'>投喂金椒</div>
            <p class='computerd'>您的金椒余额:{{num}}</p>
            <div class="oDiv">
            <p class="op"  @click="subtract()" :class="{off:number==1}">—</p>
            <p class='pan'>{{number}}</p>
            <p class="op"  @click='handleAdd()'>＋</p>
            <p class="op" style="margin-left:.15rem;">ALL</p>
            <button class="btn">申请</button>
            </div>
        </div>
      
    </div>
</template>

<script>
    import { Group, XNumber,XButton, Box} from 'vux'
    export default {
        name: 'feed',
        data () {
            return {
                num:'',
                number:1,
                backShow:false,
                dilogShow:false
            }
        },
        components: {
            XNumber,
            Group,
            XButton,
            Box,
        },
        methods: {
            change (val) {
                console.log('change', val)
            },
            subtract(){
                let self=this;
                if(self.number==1){
                    return false
                }
                self.number--;
            },
            handleAdd(){
                let self=this;
                if(self.number==99){
                return false
                }
                self.number++;
            },
            handleClose(){
                this.backShow = !this.backShow;
                this.dilogShow = !this.dilogShow;
            }
        }
    }
</script>

<style lang="stylus">
    #feed
        width:3.75rem;
        height:100%;
        .page_mcbg
            width: 3.75rem;
            height:100%;
            position:fixed;
            top: 0px;
            left: 0px;
            background:#000;
            opacity: 0.3;
            z-index: 10;
        
            .glod_div
                width:100%;
                height:1.5rem;
                background:#fff;
                box-sizing:border-box;
                position:absolute;
                top:50%;
                left:50%;
                margin-left:-1.875rem;
                margin-top:-.75rem;
                z-index: 99;
                .oDiv
                    width:100%;
                    padding:.18rem ;
                    box-sizing:border-box;
                    .op
                        width:.26rem;
                        height:.26rem;
                        border:1px solid #F77583;
                        color:#F77583;
                        font-size:.11rem;
                        line-height:.26rem;
                        text-align:center;
                        border-radius:4px;
                        float:left;
                    
                    .off
                        border:1px solid #ddd;
                        color:#ddd;
                    
                    .pan
                        display:block;
                        width:.5rem;
                        height:.26rem;
                        border:1px solid #F77583;
                        border-radius:4px;
                        float:left;
                        margin:0 .1rem;
                        color:#333;
                        font-size:.16rem;
                        text-align:center;
                    
                    .btn
                        width:.6rem;
                        height:.3rem;
                        border:none;
                        border-radius:25px;
                        background:#F77583;
                        text-align:center;
                        line-height:.3rem;
                        font-size:.14rem;
                        color:#fff;
                        float:right;
                  
            .goldpepper
                height:.36rem;
                border-bottom:1px solid #F77583;
                background:#FFF0F0;
                color:#333;
                font-size:.18rem;
                text-align:center;
                line-height:.36rem;
            
            .computerd
                margin-left:.15rem;
                margin-top:.15rem;
                font-size:.18rem;
                color:#333;
    
</style>
