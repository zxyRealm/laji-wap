<template>
    <div id="noAuthor">
         <img src='../../assets/images/back@2x.png' class="backImg">
         <img src='../../assets/images/au@2x.png' class="oImg">
         <div class="btn">已阅读，开始申请作者</div>
         <p>《辣鸡小说网作者协议》</p>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {}
        }
    }
</script>

<style lang="stylus" scoped>
    #noAuthor
        width:3.75rem;
        height:6.67rem;
        box-sizing:border-box;
        padding:.28rem .14rem;
        .backImg
            display:block;
            width:.2rem;
            height:.2rem;
        
        .oImg
            display:block;
            width:3.25rem;
            height:3.88rem;
            margin:.325rem auto;
        
        .btn
            width:2.4rem;
            height:.5rem;
            border-radius:25px;
            background:#F77583;
            text-align:center;
            line-height:.5rem;
            font-size:.18rem;
            color:#fff;
            margin:.1rem auto;
        
        p
            font-size:.14rem;
            color:#F77583;
            text-align:center;
</style>
