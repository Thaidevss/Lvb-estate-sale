import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authAdminLogin'

import DefaultLayout from '../layouts/DefaultLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/public/HomePage.vue'),
        meta: { public: true }
      },
      {
        path: '/detail',
        name: 'detail',
        component: () => import('../views/public/SellDetailPage.vue'),
        meta: { public: true }
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('../views/public/Test.vue'),
        meta: { public: true }
      },
      {
        path: '/index/land',
        name: 'land_webint',
        component: () => import('../views/public/WebinitPage.vue'),
        meta: { 
          public: true, 
          lockToIndex: true // เพิ่ม Meta Field นี้
        }
      },
    ]
  },
  {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'AdminPosts',
          component: () => import('../views/admin/PostsView.vue'),
          meta: { title: 'ຈັດການປະກາດ' }
        },
        {
          path: '/settings',
          name: 'AdminSettings',
          component: () => import('../views/admin/SettingsView.vue'),
          meta: { title: 'ຕັ້ງຄ່າລະບົບ' }
        }
      ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/admin/AdminLogin.vue'),
    meta: { public: true, onlyWhenLoggedOut: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/public/NotFoundPage.vue'),
    meta: { public: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  authStore.initializeAuth()
  
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  
  if (!isPublic && !authStore.checkAuth()) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  
  if (onlyWhenLoggedOut && authStore.isAuthenticated) {
    return next('/admin')
  }

  const fromLockIndex = from.matched.some(record => record.meta.lockToIndex);

  // ตรวจสอบ referrer URL
  const referrer = document.referrer;
  const isFromIndex = referrer.includes('/index');

  if (isFromIndex && to.path === '/') {
    // ถ้ามาจาก URL ที่มี /index และกำลังจะไปหน้า /
    return next({ name: 'land_webint' });
  }

  // สำหรับการนำทางภายในแอปตามปกติ
  if (fromLockIndex && to.path === '/') {
    return next({ name: 'land_webint' });
  }


  next()
})

export default router