import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../components/NavTabs.vue';
import { usePlaceStore } from '../stores';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: () => import('../views/HomePage.vue'),
        beforeEnter: (to, from, next) => {
          const store = usePlaceStore();
          if (store.places.length > 0) next();
        
          store.fetchPlaces().then(() => {
            next();
          });
        },
      },
      {
        path: 'like',
        component: () => import('../views/LikePage.vue'),
      },
      {
        path: 'add',
        component: () => import('../views/AddPage.vue'),
      },
      {
        path: 'notifications',
        component: () => import('../views/NotificationsPage.vue'),
      },
      {
        path: 'user',
        component: () => import('../views/UserPage.vue'),
      },
      {
        path: 'user/:id',
        component: () => import('../views/UserPage.vue'),
      },
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

export default router;