import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

// client
import Client from './views/Client.vue';
import Home from './views/Client/Home.vue';
import About from './views/Client/About.vue';
import Gallery from './views/Client/Gallery.vue';
import Contact from './views/Client/Contact.vue';

// admin
import Admin from './views/Admin.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
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
                    component: Home,
                },
                {
                    path: 'about',
                    name: 'about',
                    component: About,
                },
                {
                    path: 'gallery',
                    name: 'gallery',
                    component: Gallery,
                },
                {
                    path: 'contact',
                    name: 'contact',
                    component: Contact,
                },
            ],
        },
        {
            // admin
            path: '/admin',
            name: 'admin',
            component: Admin,
            children: [],
        },

        // {
        //   path: '/',
        //   name: 'home',
        //   component: Home,
        // },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        // },
    ],
});
