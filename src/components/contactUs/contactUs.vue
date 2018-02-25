<template>
    <div id="contactUs">
         <app-load></app-load>
         <div class="title">联系我们</div>
         <div class="text">
            <img src='../../assets/images/us@3x.png' class="oImg">
            <p>工作时间：9:00-18:00</p>
            <p>咨询热线：0571-85120280</p>
            <p>客服：1659930228</p>
         </div>
    </div>
</template>

<script>
    import AppLoad from '@/components/Load.vue'
    export default {
        name: 'contactUs',
        data () {
            return {}
        },
        components: {
            AppLoad
        },
    }
</script>

<style lang="stylus">
    #contactUs
        width:100%;
        height:100%;
        font-family:'PingFangSC-Regular';
        span
            display: block;
            font-size:30px;
            margin:40px;
        
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
        
        .text
            width:3.04rem;
            height:1.47rem;
            margin:.5rem auto;
            border-radius:7px;
            border:1px solid #FB5E6F;
            font-size:.16rem;
            color:#333;
            box-sizing:box-border;
            padding:.25rem  .17rem;
            position:relative;
            p
                line-height:.3rem;
            
            .oImg
                position:absolute;
                top:-.5rem;
                left:2.11rem;
                width:1.07rem;
                height:1.1rem;
        
</style>
