import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../components/layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('../views/Setting.vue')
      },
      {
        path: '/form',
        name: 'Form',
        component: () => import('../views/form/index.vue')
      },
      {
        path: '/modelForm',
        name: 'ModelForm',
        component: () => import('../views/modelForm/index.vue')
      },
      {
        path: '/wTable',
        name: 'wTable',
        component: () => import('../views/table/index.vue')
      },
      {
        path: '/wTrend',
        name: 'wTrend',
        component: () => import('../views/trend/index.vue')
      },
      {
        path: '/wNotification',
        name: 'wNotification',
        component: () => import('../views/notification/index.vue')
      },
      {
        path: '/wMenu',
        name: 'wMenu',
        component: () => import('../views/menu/index.vue')
      },
      {
        path: '/wProgress',
        name: 'wProgress',
        component: () => import('../views/progress/index.vue')
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
