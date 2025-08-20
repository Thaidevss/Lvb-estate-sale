import { createRouter, createWebHistory } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'

const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('../views/admin/DashboardView.vue'),
        meta: { title: 'ໜ້າຫຼັກ Admin' }
      },
      {
        path: 'posts',
        name: 'AdminPosts',
        component: () => import('../views/admin/PostsView.vue'),
        meta: { title: 'ຈັດການປະກາດ' }
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('../views/admin/SettingsView.vue'),
        meta: { title: 'ຕັ້ງຄ່າລະບົບ' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ตั้งค่าชื่อหน้า
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | ລະບົບຈັດການ` : 'ລະບົບຈັດການ'
  next()
})

export default router