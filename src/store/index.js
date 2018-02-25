import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        subName: '首',
        itemName: '页',
        showConnect:false,
        token:'',
        userInfo:{}
    },
    mutations: {
        changeMenuName (state, name) {
            state.subName=name.subName;
            state.itemName=name.itemName
        },
        changeConnect(state){
            state.showConnect=true
        },
        checkToken(state,token){
            state.token=token;
        },
        setUserPhone(state,phone){
            state.phone=phone;
        },
        setUserCode(state,code){
            state.code=code;
        }
    }
})
export default store
