import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import FastClick from 'fastclick'
import  { ToastPlugin } from 'vux'

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(Mint);
Vue.use(ToastPlugin);
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
Vue.prototype.$http = axios;

FastClick.attach(document.body);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});
