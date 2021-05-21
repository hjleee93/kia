import store from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Main',
        component: () => import('@/views/Main.vue'),
        redirect: '/mastodon/web/timelines/public',
        children: [
            {
                path: '/hive',
                name: 'Hive',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/TootPage.vue'),


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
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/TootPage.vue'),


            },
            {
                path: '/inspiration',
                name: 'Inspiration',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/TootPage.vue'),


            },
            {
                path: '/exhibition',
                name: 'Exhibition',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/TootPage.vue'),


            },
            {
                path: '/project',
                name: 'Project',
                component: () => import(/* webpackChunkName: "about" */ '@/components/pages/TootPage.vue'),


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
    mode: 'history',
    routes,
})


router.beforeEach((to, from, next) => {

    if (to.path.includes('mastodon/') === true && store.getters.userToken === null) {
        next()
    }
    else if (to.path !== '/login' && store.getters.userToken === null) {

        next('/login');
    }
    else {
        next()
    }
})


export default router
