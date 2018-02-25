<template>
    <div id="resetPassword">
        <app-load></app-load>
        <div class="title">重置密码</div>
        <input type="password" class="oInput" placeholder="请输入新密码" v-model.trim="pwd">
        <input type="password" class="oInput" placeholder="请再次输入密码" v-model.trim="repwd">
        <div class="code" @click="handleSubmit()">确定</div>
    </div>
</template>
<script>
    import AppLoad from '@/components/Load.vue'
    import { Post_formData2, noParam_Get } from '@/config/services'
    export default {
        name: 'resetPassword',
        data () {
            return {
                pwd:'',
                repwd:'',
            }
        },
        components: {
            AppLoad
        },
        methods:{
           handleSubmit:function(){
               let checkpwd = /^.{6,20}$/;
               if(checkpwd.test(this.pwd)){
                   if(this.pwd == this.repwd){
                        let options ={
                            newPwd:this.repwd,
                            code:this.$store.state.code,
                            phoneId:this.$store.state.phone,
                        };
                        Post_formData2(this,options,'/api/person-pwdRetrieval',res=>{
                            if(res.returnCode==200){
                                this.$vux.toast.text('密码重置成功');
                                this.$router.push({path:'/home'});
                            }else{
                                this.$vux.toast.text(res.msg);
                            }
                        })
                   }else{
                      this.$vux.toast.text('两次输入的密码不相同');
                   }
               }else{
                   this.$vux.toast.text('请输入6-20位的密码');
               }
           }
        }
    }
</script>
<style lang="stylus" scoped type="text/stylus" rel="stylesheet/stylus">
   #resetPassword
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
    
       .code
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
