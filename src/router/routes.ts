import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from '@features/cognito/store/index';
import PrimaryLayout from '@layouts/PrimaryLayout.vue';
import SignIn from '@features/cognito/views/auth/SignIn.vue';
import SignUp from '@features/cognito/views/auth/SignUp.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'PrimaryLayout',
    component: PrimaryLayout,
    redirect: { path: '/customer' },
    meta: { requiresAuth: true },
    children: [
      {
        path: '/customer',
        name: 'customer',
        component: () => import('@features/customer/pages/Customer.vue'),
      },
      {
        path: '/baseinfo',
        name: 'baseinfo',
        meta: { requiresAuth: true },
        component: () => import('@features/baseinfo/pages/Baseinfo.vue'),
      },
      {
        path: '/ppon',
        name: 'ppon',
        meta: { requiresAuth: true },
        component: () => import('@features/ppon/pages/Ppon.vue'),
      },
      {
        path: '/gateway',
        name: 'gateway',
        meta: { requiresAuth: true },
        component: () => import('@features/gateway/pages/Gateway.vue'),
      },
      {
        path: '/wireline',
        name: 'wireline',
        meta: { requiresAuth: true },
        component: () => import('@features/wireline/pages/Wireline.vue'),
      },
      {
        path: '/databases',
        name: 'databases',
        meta: { requiresAuth: true },
        component: () => import('@features/databases/pages/Databases.vue'),
      },
      {
        path: '/playground',
        name: 'playground',
        meta: { requiresAuth: true },
        component: () => import('@features/playground/pages/Playground.vue'),
      },
    ],
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: (to, from, next) => {
      if (store.getters.isAuthenticated) {
        next({ name: 'PrimaryLayout' });
      } else {
        next();
      }
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: () => import('@features/cognito/views/auth/ForgotPassword.vue'),
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('@features/cognito/views/auth/Confirm.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@features/cognito/views/auth/Settings.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/NotFoundPage.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;