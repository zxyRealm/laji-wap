import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Password from '@/components/password'
import resetPassword from '@/components/resetPassword'
import noAuthor from '@/components/author/noAuthor'
import appAuthor from '@/components/author/appAuthor'
import contactUs from '@/components/contactUs/contactUs'
import feed from '@/components/feed/feed'
import cookie from '@/config/cookie'
import index from '@/components/index'
import bookStacks from '@/components/bookStacks'
import free from '@/components/free'
import more from '@/components/more/more'
import bookDetails from '@/components/bookDetail/bookDetails'
import directory from '@/components/directory/directory'
import download from '@/components/download/download'
import search from '@/components/search/search'
import feedPepper from '@/components/feed/feedPepper'



Vue.use(Router);
let routers=[
    {path: '/', redirect:'/home/index'},
    {path: '/login', name: 'Login', component: Login},
    {path: '/register', name: 'Register', component: Register},
    {path: '/password', name: 'Password', component: Password},
    {path: '/resetPassword', name: 'resetPassword', component: resetPassword},
    {path: '/noAuthor', name: 'noAuthor', component: noAuthor},
    {path: '/appAuthor', name: 'appAuthor', component: appAuthor},
    {path: '/contactUs', name: 'contactUs', component: contactUs},
    {path: '/feed', name: 'feed', component:feed},
    {path: '/more', name: 'more', component: more},
    {path: '/bookDetails/:bid', name: 'bookDetails', component: bookDetails},
    {path: '/home', name: 'Home', component: Home,
        children:[//子路由
            {path:'index',component:index},
            {path:'bookStacks',component:bookStacks},
            {path:'free',component:free}
        ]
    },
    {path:'/user',redirect:'/user/index'},
    {path:'/user',component:require('@/components/user/index.vue'),
        children:[
            { path:'index',name:'userCenter',meta:{des:'个人资料'},component:require('@/components/user/personal.vue') }
        ]
    },
    {path: '/directory', name: 'directory', component: directory},
    {path: '/download', name: 'download', component: download},
    {path: '/search', name: 'search', component: search},
    {path: '/feedPepper', name: 'feedPepper', component: feedPepper},
];
const router = new Router({
    routes: routers,
    linkActiveClass:'active-link'
});
// router.beforeEach((to, from, next) => {
//     if (cookie.get().token) {
//         next()
//     } else {
//         if (from.path!='/') {
//             next({path:'/'})
//         }
//     }
// })
router.afterEach(()=>{
    window.scrollTo(0,0)
});
export default router
