import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
const home = () =>
    import ('../views/home/home')
const category = () =>
    import ('../views/category/category')
const cart = () =>
    import ('../views/cart/cart')
const profile = () =>
    import ('../views/profile/profile')
const detail = () =>
    import ('@/views/detail/detail')
const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: home,
        meta: {
            keepAlive: true,
            showTabBar: true
        }
    },
    {
        path: '/category',
        component: category,
        meta: {
            keepAlive: true,
            showTabBar: true
        }
    },
    {
        path: '/cart',
        component: cart,
        meta: {
            keepAlive: true,
            showTabBar: true
        }
    },
    {
        path: '/profile',
        component: profile,
        meta: {
            keepAlive: true,
            showTabBar: true
        }
    },
    {
        path: '/detail/:iid',
        component: detail,
        meta: {
            keepAlive: false,
            showTabBar: false
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router