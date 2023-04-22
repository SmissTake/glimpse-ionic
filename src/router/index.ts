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
        beforeEnter: (to, from, next) => {
          const categoriesStore = usePlaceStore();
          if (categoriesStore.categories.length > 0 && categoriesStore.accessibilities.length > 0) next();
          
          categoriesStore.fetchCategories().then(() => {
            categoriesStore.fetchAccessibilities().then(() => {
              next();
            });
          });
        },
      },
      {
        path: 'notifications',
        component: () => import('../views/NotificationsPage.vue'),
      },
      {
        path: 'user/:id?',
        name: 'user',
        component: () => import('../views/UserPage.vue'),
        beforeEnter: (to, from, next) => {
          const store = usePlaceStore();

          if (to.params.id) {
            if (store.users.find((user) => user.id === parseInt(`${to.params.id}`))) next();
            store.fetchUser(parseInt(`${to.params.id}`)).then(() => {
              next();
            });
          } else {
            if (store.users.find((user) => user.id === parseInt(`${process.env.VUE_APP_USER_ID}`))) next();
            store.fetchUser(parseInt(`${process.env.VUE_APP_USER_ID}`)).then(() => {
              next();
            });
          }
        }
      }
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

export default router;