import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Home from '@/views/index/home'
import InfoShow from '@/views/index/info-show'
import Register from '@/views/register'
import Login from '@/views/login'
import NotFound from '@/views/404'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/infoshow',
          name: 'infoshow',
          component: InfoShow
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!window.localStorage.getItem('token')
  if (to.path === '/login' || to.path === '/register') next()
  else {
    isLogin ? next() : next({ name: 'login' })
  }
})
export default router
