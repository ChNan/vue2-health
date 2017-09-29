import Vue from 'vue'
import Router from 'vue-router'

// 一级页面
const login = () => import('@/page/login/login')
const preview = () => import('@/page/preview/preview')
const index = () => import('@/page/index/index')

// 二级页面
const publish = () => import('@/page/index/children/publish/publish')

const home = () => import('@/page/index/children/home/home')

const article = () => import('@/page/index/children/article/article')
const own = () => import('@/page/index/children/article/children/own')

const comment = () => import('@/page/index/children/comment/comment')
const newest = () => import('@/page/index/children/comment/children/newest')
const articles = () => import('@/page/index/children/comment/children/articles')

const material = () => import('@/page/index/children/material/material')
const pic = () => import('@/page/index/children/material/children/pic')

Vue.use(Router)

let router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            to.meta.position = savedPosition
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '',
            redirect: '/index'
        },
        {
            name: 'login',
            path: '/login',
            component: login
        },
        {
            name: 'preview',
            path: '/preview_article',
            component: preview,
            meta: { requiresAuth: true }
        },
        {
            name: 'index',
            path: '/index',
            redirect: '/index/home',
            component: index,
            meta: { requiresAuth: true },
            children: [
                {
                    name: 'publish',
                    path: 'publish',
                    component: publish
                },
                {
                    name: 'home',
                    path: 'home',
                    component: home
                },
                {
                    name: 'article',
                    path: 'article',
                    component: article,
                    children: [
                        {
                            path: '',
                            redirect: 'own'
                        },
                        {
                            name: 'own',
                            path: 'own',
                            component: own
                        }
                    ]
                },
                {
                    path: 'comment',
                    component: comment,
                    children: [
                        {
                            path: '',
                            redirect: 'newest'
                        },
                        {
                            path: 'newest',
                            component: newest
                        },
                        {
                            path: 'articles',
                            component: articles
                        }
                    ]
                },
                {
                    path: 'material',
                    component: material,
                    children: [
                        {
                            path: '',
                            redirect: 'pic'
                        },
                        {
                            path: 'pic',
                            component: pic
                        }
                    ]
                }
            ]
        }
    ]
})

export default router
