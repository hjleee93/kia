import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/Main.vue'),
        children:[
            {
                path:'/hive',
                name: 'Hive',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Hive.vue'),
                alias:'/'
        
            },
            {
                path:'/myTag',
                name: 'MyTag',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/MyTag.vue')
        
            },
            {
                path:'/rank',
                name: 'Rank',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Rank.vue')
        
            },
            {
                path:'/sample',
                name: 'Sample',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Sample.vue'),
        
        
            },

        ]
    },
   
    {
        path: '/loginTest',
        name: 'LoginTest',
        component: () => import(/* webpackChunkName: "about" */ '@/components/pages/LoginTest.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router
