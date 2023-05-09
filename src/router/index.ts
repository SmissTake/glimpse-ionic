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
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        next();
      } else {
        //TODO: verify if token is valid
        next('/');
      }
    },   
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
        beforeEnter: async (to, from, next) => {
          const store = usePlaceStore();
          await store.fetchPlaces();
          next();
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
          let isFetchingDone = false;
        
          if (categoriesStore.categories.length > 0 && categoriesStore.accessibilities.length > 0) {
            isFetchingDone = true;
            next();
          }
        
          if (!isFetchingDone) {
            categoriesStore.fetchCategories().then(() => {
              categoriesStore.fetchAccessibilities().then(() => {
                next();
              });
            });
          }
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
        
        beforeEnter: async (to, from, next) => {
          const store = usePlaceStore();
          const userId = to.params.id ? parseInt(`${to.params.id}`) : parseInt(`${localStorage.getItem('userId')}`);
          try {
            const userExists = store.users.find((user) => user.id === userId);
        
            if (userExists) {
              next();
            } else {
              await store.fetchUser(userId);
              next();
            }
          } catch (error) {
            console.error(error);
            next(false);
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

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && to.path !== '/login') {
    next('/login');
  } else {
    next();
  }
});

export default router;