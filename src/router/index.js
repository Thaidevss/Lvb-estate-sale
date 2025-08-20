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
    ]
  },
  {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        // {
        //   path: '',
        //   name: 'AdminDashboard',
        //   component: () => import('../views/admin/DashboardView.vue'),
        //   meta: { title: 'ໜ້າຫຼັກ Admin' }
        // },
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
  
  // เรียก initializeAuth เพื่อโหลด token จาก localStorage
  authStore.initializeAuth()
  
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  
  // ถ้า route ต้อง authentication แต่ไม่มี token
  if (!isPublic && !authStore.checkAuth()) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath } // เตรียม redirect กลับหลังจาก login
    })
  }
  
  // ถ้า route อนุญาตเฉพาะเมื่อ logout แต่ยัง login อยู่
  if (onlyWhenLoggedOut && authStore.isAuthenticated) {
    return next('/admin') // หรือ path หลักหลัง login
  }
  
  next()
})

export default router