<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import './assets/css/common.styl'
export default {
  name: 'app'
}
</script>
<style>
  #app {
    width: 100%;
    height:100%;
    background:#fff;
  }
</style>
