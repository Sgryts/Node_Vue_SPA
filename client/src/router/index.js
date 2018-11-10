import Vue from 'vue'
import Router from 'vue-router'

import Client from '@/components/Client'
import Home from '@/components/client/Home'
import About from '@/components/client/About'
import Gallery from '@/components/client/Gallery'
import Contact from '@/components/client/Contact'

import Register from '@/components/admin/Register'
import Login from '@/components/admin/Login'
import Admin from '@/components/Admin'
import Genres from '@/components/admin/Genres'
import Photos from '@/components/admin/Photos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // client
      path: '/',
      name: 'client',
      component: Client,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'about',
          name: 'about',
          component: About
        },
        {
          path: 'gallery',
          name: 'gallery',
          component: Gallery
        },
        {
          path: 'contact',
          name: 'contact',
          component: Contact
        }
      ]
    },
    // admin
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
      children: [
        {
          path: 'genres',
          name: 'genres',
          component: Genres
        },
        {
          path: 'photos',
          name: 'photos',
          component: Photos
        }
      ]
    }
  ]
})
