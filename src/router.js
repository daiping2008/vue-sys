import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Register from '@/views/register'
import Login from '@/views/login'

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
      component: Index
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
