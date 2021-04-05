import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/Main.vue'),
        redirect:'/hive',
        children: [
            {
                path: '/INS',
                name: 'INS',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/INS.vue'),


            },
            {
                path: '/hive',
                name: 'Hive',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Hive.vue'),
                

            },
            {
                path: '/myTag',
                name: 'MyTag',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/MyTag.vue')

            },
            {
                path: '/rank',
                name: 'Rank',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Rank.vue')

            },
            {
                path: '/sample',
                name: 'Sample',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Sample.vue'),


            },
            {
                path: '/posting',
                name: 'Posting',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Posting.vue'),


            },
            {
                path: '/inspiration',
                name: 'Inspiration',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Inspiration.vue'),


            },
            {
                path: '/exhibition',
                name: 'Exhibition',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Exhibition.vue'),


            },
            {
                path: '/project',
                name: 'Project',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Project.vue'),


            },



        ]
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Login.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
})


router.beforeEach((to, from, next) => {
    if (to.path !== '/login' && localStorage.getItem("token") === null) {
        next('/login');
    } 
    // if (to.path=== '/login' && localStorage.getItem("token") !== null) {
    //     next('/hive')
    // }    
        else {
        next()
    }
})


export default router
