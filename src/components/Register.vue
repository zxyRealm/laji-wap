<template>
   <div id="register">
        <app-load></app-load>
        <div class="title">注册</div>
       
        <input type="text" class="oInput" placeholder="请输入手机号" v-model.trim="phone">
        <div class="oInput">
             <input type="text" class="codeInput" placeholder="请输入验证码" v-model.trim="verificationCode">
             <p v-bind:class="{code:iscode}" @click="getCode()">{{word}}</p>
        </div>
        <input type="text" class="oInput" placeholder="请输入密码" v-model.trim="pwd">
        <input type="text" class="oInput" placeholder="请输入昵称" v-model.trim="name">
        <div class="sex">
           <div class="sex_img_l">
             <img src="../assets/images/w.png" class="oImg" v-if="women" @click="handleWomen()">
             <img src="../assets/images/w_select.png" class="oImg" v-if="!women" @click="handleWomen()">
             <span>女</span>
           </div>
           <div class="sex_img_r">
             <img src="../assets/images/m.png" class="oImg" v-if="man" @click="handleMan()">
             <img src="../assets/images/m_select.png" class="oImg" v-if="!man" @click="handleMan()">
             <span>男</span>
           </div>
        </div>
        <div class="register" @click="handleRegister()">快速注册</div>
   </div>
</template>
<script>
    import AppLoad from '@/components/Load.vue'
    import { Post_formData2, noParam_Get } from '@/config/services'
    export default {
        name: 'register',
        data () {
            return {
               phone:'',
               pwd:'',
               name:'',
               women:true,
               man:true,
               checkName:false,
               checkPhone:false,
               sex:'',
               word:'获取验证码',
               isOvertime: false,
               verificationCode:'',
               iscode:false
            }
        },
        components: {
            AppLoad
        },
        methods:{
            handleWomen:function(){
                this.women = !this.women;
                if(!this.women){
                   this.man = true;
                   this.sex = 1;
                }
            },
            handleMan:function(){
                this.man =!this.man;
                if(!this.man){
                   this.women = true;
                   this.sex = 0;
                }
            },
            handleRegister:function(){
                let checkPhone = /^1(3|4|5|7|8)\d{9}$/;
                let checkPassword = /^.{6,20}$/;
                let checkName = /^.{1,20}$/;
                    if(checkPhone.test(this.phone)&&checkPassword.test(this.pwd)&&checkName.test(this.name)&&this.sex!=''){
                            noParam_Get(this,'/api/person-checkNickPhone/'+this.phone,res=>{
                                if(res.returnCode==200){
                                    this.handleCheckname();
                                }else{
                                    this.$vux.toast.text(res.msg);
                                }
                            })
                    }else if(!checkPhone.test(this.phone)){
                        this.$vux.toast.text('请输入正确手机号码');
                    }else if(!checkPassword.test(this.pwd)){
                        this.$vux.toast.text('请输入6-20位的密码');
                    }else if(!checkName.test(this.name)){
                        this.$vux.toast.text('请输入小于20位的昵称');
                    }else if(this.sex ==''){
                        this.$vux.toast.text('请选择性别');
                    }
            },
            handleCheckname:function(){
                    noParam_Get(this,'/api/person-checkNickName/'+this.name,res=>{
                        if(res.returnCode==200){
                            this.handleCheckRegister();
                        }else{
                            this.$vux.toast.text(res.msg);
                        }
                    })
            },
            handleCheckRegister:function(){
                let options ={
                    code:this.verificationCode,
                    pseudonym:this.name,
                    userPassword:this.pwd,
                    userSex:this.sex,
                    userPhone:this.phone
                }
                Post_formData2(this,options,'/api/person-regInfo',res=>{
                        this.$vux.toast.text(res.msg);
                            if(res.returnCode==200){
                                this.$router.push({path:'/home'});
                            }else{
                                this.$vux.toast.text(res.msg);
                            }
                })
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
            getCode:function(){
                let checkPhone = /^1(3|4|5|7|8)\d{9}$/;
                if(checkPhone.test(this.phone)){
                     noParam_Get(this,'/api/person-checkNickPhone/'+this.phone,res=>{
                         if(res.returnCode==200){
                                this.sendMessage();
                                this.setCode();
                         }else{
                            this.$vux.toast.text(res.msg);
                         }
                     })
                }else{
                    this.$vux.toast.text('请输入正确手机号');
                }
            },
            setCode:function(){
                if(!this.isOvertime){
                    let options={
                        userMob:this.phone,
                        type:'RegisterPwd'
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
        }
    }
</script>
<style lang="stylus" scoped type="text/stylus" rel="stylesheet/stylus">
 #register
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
    .sex
        width:3.04rem;
        margin:0 auto;
        height:1rem;
        padding:.2rem .25rem;
        box-sizing:border-box;
        .sex_img_l
           float:left;
           text-align:center;
           font-size:.16rem;
           color:#FB5E6F;
        .sex_img_r
           float:right;
           text-align:center;
           font-size:.16rem;
           color:#FB5E6F;
        .oImg
            display:block;
            width:.454rem;
            height:.474rem;
            margin-bottom:.05rem;
    .register
        margin:.2rem auto;
        width:3.04rem;
        height:.44rem;
        background:#F77583;
        border-radius:4px;
        text-align:center;
        color:#fff;
        line-height:.44rem;
        font-size:.18rem;
</style>
