<template>
   <div id="load">
        <div class="div_top">
            <img src="../assets/images/u0.jpg" class="logo_one">
            <img src="../assets/images/u0.jpg" class="logo_two">
            <div class="btn_top"  @click="handleDownload()">下载APP</div>
        </div>
   </div>
</template>
<script>
   export default {
        name: 'load',
        data () {
            return {
            }
        },
        methods:{
            handleDownload(){
                 this.$router.push({path:"/download"});
            }
        }
   }
</script>
<style lang="stylus" scoped type="text/stylus" rel="stylesheet/stylus">
    #load
        width:100%;
        background-color: #fff;
        .div_top
            width:100%;
            height:.6rem;
            .logo_one
                width:.24rem;
                height:.24rem;
                margin-top:.2rem;
                margin-left:.14rem;
                float:left;
            
            .logo_two
                width:.64rem;
                height:.16rem;
                margin-top:.24rem;
                float:left;
                margin-left:.1rem;
            
            .btn_top
                width:.66rem;
                height:.24rem;
                border-radius:5px;
                background:#FB5E6F;
                font-size:.14rem;
                color:#fff;
                text-align:center;
                line-height:.24rem;
                float:right;
                margin-right:.14rem;
                margin-top:.2rem;
    
</style>
