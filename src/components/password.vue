<template>
   <div id="password">
        <app-load></app-load>
        <div class="title">忘记密码</div>
        <input type="text" class="oInput" placeholder="请输入手机号" v-model.trim="phone">
        <div class="oInput">
             <input type="text" class="codeInput" placeholder="请输入验证码" v-model.trim="verificationCode">
             <p v-bind:class="{code:iscode}" @click="getCode()">{{word}}</p>
        </div>
        <div class="submit" @click="handleSubmit()">提交</div>
   </div>
</template>
<script>
    import AppLoad from '@/components/Load.vue'
    import { Post_formData2, noParam_Get } from '@/config/services'
    export default {
        name: 'password',
        data () {
            return {
                phone:'',
                verificationCode:'',
                isOvertime: false,
                word:'获取验证码',
                iscode:false
            }
        },
        components: {
            AppLoad,
        },
        methods:{
            getCode:function(){
                let checkPhone=/^1(3|4|5|7|8)\d{9}$/;
                if (checkPhone.test(this.phone)) {
                    noParam_Get(this,'/api/person-checkNickPhone/'+this.phone,res=>{
                        if(res.returnCode ==200){
                            this.$vux.toast.text('您的手机号未注册');
                        }else{
                            this.$store.commit('setUserPhone',this.phone)
                            this.sendMessage();
                            if(!this.isOvertime){
                                let options={
                                    userMob:this.phone,
                                    type:'findPwd'
                                }
                                Post_formData2(this,options,'/api/verification/sys-getShortMessage',res=>{
                                    // this.showMessage(res,()=>{
                                        if(res.returnCode==200){
                                            this.$vux.toast.text('验证码已发送');
                                        }else{
                                            this.$vux.toast.text(res.msg);
                                        }
                                    // })
                                })
                            }
                        }
                    })
                } else {
                    this.$vux.toast.text('请输入正确手机号')
                }
            },
            sendMessage:function(){
                if(this.isOvertime){
                    return false;
                }
                let that = this,
                    time = 10;
                var sendTimer = setInterval(function(){
                     that.isOvertime = true;
                    that.iscode = true;
                    time--;
                    that.word = "重新发送"+time+"s";
                    if(time < 0){
                        that.isOvertime = false;
                        that.iscode = false;
                        clearInterval(sendTimer);
                        that.word = "获取验证码";
                    }
                },1000)
            },
            handleSubmit:function(){
                let checkPhone=/^1(3|4|5|7|8)\d{9}$/;
                    if (checkPhone.test(this.phone) && this.verificationCode!='') {
                        let options={
                            phoneId:this.phone,
                            checkCode:this.verificationCode
                        }
                        Post_formData2(this,options,'/api/verification/person-checkedCode',res=>{
                         
                                if(res.returnCode==200){
                                    this.$store.commit('setUserCode',this.verificationCode)
                                    this.$router.push({path:'/resetPassword'});
                                }else{
                                    this.$vux.toast.text(res.msg);
                                }
                            
                        })
                    }else if(!checkPhone.test(this.phone) ){
                       this.$vux.toast.text('请输入正确手机号')
                    }else if(this.verificationCode==''){
                        this.$vux.toast.text('请输入验证码')
                    }
            }
        }
    }
</script>
<style lang="stylus" scoped type="text/stylus" rel="stylesheet/stylus">
   #password
       width:100%;
       height:100%;
       background:#fff;
       .title
            width:100%;
            height:.5rem;
            border-top:.2px solid #e9e9e9;
            border-bottom:.2px solid #e9e9e9;
            text-align:center;
            line-height:.5rem;
            font-size:.18rem;
            color:#333;
            margin-bottom:.2rem;
         
       .oInput
            width:3.04rem;
            height:.44rem;
            border-radius:4px;
            border:1px solid #979797;
            display:block;
            margin:.2rem auto;
            color:#999;
            font-size:.18rem;
            padding-left:.14rem;
            .codeInput
               width:2rem;
               height:.42rem;
               float:left;
               border:none;
            
            p
                width:.85rem;
                height:.44rem;
                font-size:.13rem;
                line-height:.44rem;
                text-align:center;
                float:right;
            
            .code
                color:#F77583;
            
       
       .submit
            margin:.89rem auto;
            width:3.04rem;
            height:.44rem;
            background:#F77583;
            border-radius:4px;
            text-align:center;
            color:#fff;
            line-height:.44rem;
            font-size:.18rem;
    
</style>
