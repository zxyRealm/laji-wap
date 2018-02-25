<template>
    <div id="Login">
        <app-load></app-load>
        <div class="title">登录</div>
        <input type="text" class="oInput" placeholder="请输入手机号" v-model.trim="phone">
        <input type="password" class="oInput" placeholder="请输入密码"  v-model.trim="password">
        <div class="re_radio">
            <img src="../assets/images/login.png" class="left_d" v-if="show" @click="handleCheck()">
            <img src="../assets/images/select_login.png" class="left_d" v-if="!show" @click="handleCheck()">
            <p>自动登录</p>
            <div class="right_d" @click="handleRouter({path:'/password'})">忘记密码</div>
        </div>
        <div class="login" @click="loginIn()">登录</div>
        <div class="register" @click="handleRouter({path:'/register'})">快速注册</div>
    </div>
</template>

<script>
    import { Group,XInput } from 'vux'
    import { Post_formData2, Param_Get } from '@/config/services'
    import cookie from '@/config/cookie'
    import AppLoad from '@/components/Load.vue'
    import md5 from 'MD5'
    export default {
        name: 'login',
        components: {
            Group,
            XInput,
            AppLoad
        },
        data () {
            return {
              value:'',
              phone:'',
              password:'',
              show:true
            }
        },
        methods:{
            handleRouter:function(res){
                this.$router.push(res)
            },
            handleLogin:function(){
                this.$vux.toast.text('网络异常，请稍后再试')
            },
            handleCheck:function(){
                this.show = !this.show;
                if(!this.show){
                    cookie.set({
                        name: 'userPhone',
                        value: this.phone,
                        path: '/',
                        day: 7
                    });
                    cookie.set({
                        name: 'userPassword',
                        value: this.password,
                        path: '/',
                        day: 7
                    });
                }else{
                     cookie.delete('userPhone');
                     cookie.delete('userPassword')
                }
            },
            loginIn:function(){
                var self = this;
                let checkPhone=/^1(3|4|5|7|8)\d{9}$/;
                let checkPassword = /^.{6,20}$/;
                    if (checkPhone.test(this.phone)&&checkPassword.test(this.password)) {
                        
                        let options={
                            userName:this.phone,
                            userPassword:md5(this.password),
                            terminal:3
                        };
                        Post_formData2(this,options,'/api/person-login',res=>{
                                if(res.returnCode==200){
                                     weui.toast('登录成功', {//loading
                                        className: 'custom-classname',
                                        duration: 2000,
                                        callback: function(){
                                            self.$router.push({path:'/home/index'})
                                        }
                                    });
                                    
                                }else if(res.returnCode==500){
                                    this.$vux.toast.text(res.msg);
                                }
                        })
                    }else if(!checkPhone.test(this.phone)){
                         this.$vux.toast.text('请输入正确的手机号')
                    }else if(!checkPassword.test(this.password)){
                        this.$vux.toast.text('请输入6-20位的密码')
                    }
            }
        },
        created(){

        },
        mounted(){
            var self =this;
            if(cookie.get().userPhone){
               self.phone = cookie.get().userPhone;
               self.password = cookie.get().userPassword;
               self.show=false;
            }
        }
    }
</script>

<style lang="stylus" scoped type="text/stylus" rel="stylesheet/stylus">
    #Login
        width:100%;
        height:6.67rem;
        background-color: #fff;
        font-family:'PingFangSC-Regular';
        .title
            width:100%;
            height:.6rem;
            border-top:.2px solid #e9e9e9;
            border-bottom:.2px solid #e9e9e9;
            text-align:center;
            line-height:.6rem;
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
        
        .re_radio
            width:100%;
            height:.3rem;
            box-sizing:box-border;
            padding:0 .37rem;
            .left_d
                width:.2rem;
                height:.2rem;
                float:left;
            
            p
                float:left;
                color:#F77583;
                font-size:.16rem;
                margin-left:.1rem;
            
            .right_d
                float:right;
                color:#F77583;
                font-size:.16rem;
        
        .login
            width:3.04rem;
            height:.44rem;
            background:#F77583;
            text-align:center;
            color:#fff;
            font-size:.18rem;
            line-height:.44rem;
            margin:.2rem auto;
            border-radius:4px;
        
        .register
            width:3.04rem;
            height:.44rem;
            border:1px solid #F77583;
            text-align:center;
            color:#F77583;
            font-size:.18rem;
            line-height:.44rem;
            margin:0 auto;
            border-radius:4px;

</style>
