import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/Main.vue'),
        redirect: '/hive',
        children: [
            {
                path: '/hive',
                name: 'Hive',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Hive.vue'),


            },
            {
                path: '/tag',
                name: 'Tag',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Tag.vue')

            },
            {
                path: '/rank',
                name: 'Rank',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/Rank.vue')

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
        component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue'),
    },

    {
        path: '/mastodon/*',
        name: 'mastodon',
        component: () => import(/* webpackChunkName: "about" */ '@/views/Mastodon.vue'),
    },


]

const router = new VueRouter({
    mode: 'hash',
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
