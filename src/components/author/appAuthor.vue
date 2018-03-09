<template>
    <div id="appAuthor">
        <mt-header class="com-header" :title="$route.meta.des">
            <a href="javascript:window.history.go(-1);" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <input type="text" class='oInput'  placeholder="昵称">
        <input type="text" class='oInput'  placeholder="姓名">
        <input type="text" class='oInput'  placeholder="笔名">
        <input type="text" class='oInput'  placeholder="身份证">
        <input type="text" class='oInput'  placeholder="手机号">
        <input type="text" class='oInput'  placeholder="QQ号码">
        <input type="text" class='oInput'  placeholder="邮箱">
        <input type="text" class='oInput'  placeholder="详细地址">
         <box  gap="10px 10px">
            <x-button  show-loading  class="btn">申请</x-button>
         </box>
       
    </div>
</template>
<script>
    import { XButton, Box,XInput, Group,} from 'vux'
    export default {
        name: 'home',
        components:{
          XButton,
          Box,
          XInput,
          Group,
        },
        data () {
            return {}
        },
        methods:{

        }
    }
</script>

<style lang="stylus" scoped>
    #appAuthor
        width:3.75rem;
        height:100%rem;
        box-sizing:border-box;
        font-family:'PingFangSC-Regular';
        .backImg
            display:block;
            width:.2rem;
            height:.2rem;
            float:left;
            margin-left:.14rem;
            margin-top:.2rem;
        
        .top_div
            width:100%;
            height:.64rem;
            border:1px solid #e9e9e9;
            margin-bottom:.3rem;
            p
                margin-left:.34rem;
                font-size:.18rem;
                color:#333;
                padding-left:1.08rem;
                box-sizing:border-box;
                line-height:.64rem;
                
        .oInput
            width:3.04rem;
            height:.44rem;
            display:block;
            margin:.18rem auto;
            border:1px solid #979797;
            border-radius:4px;
            color:#999;
            font-size:.18rem;
            box-sizing:border-box;
            padding-left:.19rem;
        
        .btn
            width:2.4rem;
            height:.5rem;
            border-radius:25px;
            background:#F77583;
            text-align:center;
            line-height:.5rem;
            font-size:.18rem;
            color:#fff;
            margin:.3rem auto;
    
</style>
