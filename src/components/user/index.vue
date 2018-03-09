<template>
    <div class="wu-center">
        <mt-header class="com-header" :title="$route.meta.des">
            <a href="javascript:window.history.go(-1);" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.wu-center
    .mint-cell
        border-bottom 1px solid #ddd
        .mint-cell-value
            &.is-link
                margin-right 20px
        .mint-cell-allow-right
            &:after
                border-color #999
                height 0.12rem
                width 0.12rem
                right 15px
</style>
