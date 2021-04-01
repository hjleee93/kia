import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/main',
        name: 'Main',
        component: () => import('@/views/Main.vue'),
        children: [
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
        alias: '/'
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router
