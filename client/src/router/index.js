import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Register from '@/components/admin/Register'
import Login from '@/components/admin/Login'

import Admin from '@/components/Admin'

import Genres from '@/components/admin/Genres'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // client
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
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [{
        path: 'genres',
        name: 'genres',
        component: Genres
      }]
    }
  ]
})
