import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Register from '@/components/admin/Register'
import Login from '@/components/admin/Login'
import Genres from '@/components/admin/Genres'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin/genres',
      name: 'genres',
      component: Genres
    }
  ]
})
