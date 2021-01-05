import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Signup from '../views/Accounts/Signup.vue';
import Login from '../views/Accounts/Login.vue';
import Profile from '../views/Accounts/Profile.vue';
import Weather from '../views/Weather.vue';
import Stock from '../views/Stock.vue';
import Group from '../views/Group.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/group',
    name: 'Group',
    component: Group,
  },
  {
    path: '/weather',
    name: 'Weather',
    component: Weather,
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
