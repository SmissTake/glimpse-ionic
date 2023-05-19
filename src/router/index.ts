import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../components/NavTabs.vue';
import { usePlaceStore } from '../stores';
import { checkToken, logout } from '@/utils/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: () => import('../views/LoginPage.vue'),
    beforeEnter: async (to, from, next) => {
      const isValidToken = await checkToken();
      if (isValidToken) {
        next('/home');
      } else {
        next();
      }
    }
  },
  {
    path: '/signin',
    component: () => import('../views/SigninPage.vue'),
    beforeEnter: async (to, from, next) => {
      const isValidToken = await checkToken();
      if (isValidToken) {
        next('/home');
      } else {
        next();
      }
    }
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
          await store.fetchCategories();
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

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login' && to.path !== '/signin') {
    const isValidToken = await checkToken();
    if (!isValidToken) {
      logout();
      next('/login');
    } else {
      next();
    }
  }
  else {
    next();
  }
});

export default router;