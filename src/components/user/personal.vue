<template>
    <div class="wu-ps-wrap">
        <mt-cell title="头像" is-link>
            <img :src="'http://useravatarimg.oss-cn-hangzhou.aliyuncs.com/UserAvatar/userDefaultHandImg.jpg'" class="user-avatar" alt="">
        </mt-cell>
        <mt-cell title="昵称">
            <span style="color: grey">这里是元素</span>
        </mt-cell>
        <mt-cell title="性别">
            <span style="color: grey">这里是元素</span>
        </mt-cell>
        <mt-cell title="个性签名" is-link>
            <span style="color: green">这里是元素</span>
        </mt-cell>
        <mt-cell title="账号" is-link>
            <span style="color: green">这里是元素</span>
        </mt-cell>
        <mt-cell title="邮箱" is-link>
            <span style="color: green">这里是元素</span>
        </mt-cell>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                userInfo:this.$store.state.userInfo
            }
        },
        created(){
            console.log(this.userInfo)
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.wu-ps-wrap
    .mint-cell-wrapper
        padding .05rem 0.1rem
    .user-avatar
        width 0.52rem
        height 0.52rem
        border-radius 50%
</style>
