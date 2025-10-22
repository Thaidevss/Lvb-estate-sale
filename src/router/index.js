// import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '../stores/authAdminLogin'

// import DefaultLayout from '../layouts/DefaultLayout.vue'
// import AdminLayout from '../layouts/AdminLayout.vue'

// const routes = [
//   {
//     path: '/',
//     component: DefaultLayout,
//     children: [
//       {
//         path: '/public',
//         name: 'public',
//         component: () => import('../views/public/PublicPage.vue'),
//         meta: { public: true }
//       },
//       {
//         path: '/detail',
//         name: 'detail',
//         component: () => import('../views/public/SellDetailPage.vue'),
//         meta: { public: true }
//       },
//       {
//         path: '/test',
//         name: 'test',
//         component: () => import('../views/public/Test.vue'),
//         meta: { public: true }
//       },
//       {
//         path: '',
//         name: 'land_webint',
//         component: () => import('../views/public/WebinitPage.vue'),
//         meta: { 
//           public: true, 
//         }
//       },
//     ]
//   },
//   {
//       path: '/admin',
//       component: AdminLayout,
//       meta: { requiresAuth: true },
//       children: [
//         {
//           path: '',
//           name: 'AdminPosts',
//           component: () => import('../views/admin/PostsView.vue'),
//           meta: { title: 'ຈັດການປະກາດ' }
//         },
//         {
//           path: '/settings',
//           name: 'AdminSettings',
//           component: () => import('../views/admin/SettingsView.vue'),
//           meta: { title: 'ຕັ້ງຄ່າລະບົບ' }
//         }
//       ]
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import('../views/admin/AdminLogin.vue'),
//     meta: { public: true, onlyWhenLoggedOut: true }
//   },
//   {
//     path: '/:pathMatch(.*)*',
//     name: 'NotFound',
//     component: () => import('../views/public/NotFoundPage.vue'),
//     meta: { public: true }
//   }
// ]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// })

// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore()
  
//   authStore.initializeAuth()
  
//   const isPublic = to.matched.some(record => record.meta.public)
//   const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  
//   if (!isPublic && !authStore.checkAuth()) {
//     return next({
//       path: '/login',
//       query: { redirect: to.fullPath }
//     })
//   }
  
//   if (onlyWhenLoggedOut && authStore.isAuthenticated) {
//     return next('/admin')
//   }

//   next()
// })


// export default router


// for deploy public url

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
        name: 'public',
        component: () => import('../views/public/PublicPage.vue'),
        meta: { public: true }
      },
      {
        path: '/detail',
        name: 'detail',
        component: () => import('../views/public/SellDetailPage.vue'),
        meta: { public: true }
      },
      {
        path: '/favorites',
        name: 'favorites',
        component: () => import('../views/public/favorite.vue'),
        meta: { public: true }
      },
      {
        path: '/public_detail',
        name: 'publicDetail',
        component: () => import('../views/public/PublicDetailPage.vue'),
        meta: { public: true }
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('../views/public/Test.vue'),
        meta: { public: true }
      },
      {
        path: '/land_webint',
        name: 'home',
        component: () => import('../views/public/WebinitPage.vue'),
        meta: { 
          public: true, 
        }
      },
    ]
  },
  // {
  //     path: '/admin',
  //     component: AdminLayout,
  //     meta: { requiresAuth: true },
  //     children: [
  //       {
  //         path: '',
  //         name: 'AdminPosts',
  //         component: () => import('../views/admin/PostsView.vue'),
  //         meta: { title: 'ຈັດການປະກາດ' }
  //       },
  //       {
  //         path: '/settings',
  //         name: 'AdminSettings',
  //         component: () => import('../views/admin/SettingsView.vue'),
  //         meta: { title: 'ຕັ້ງຄ່າລະບົບ' }
  //       }
  //     ]
  // },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../views/admin/AdminLogin.vue'),
  //   meta: { public: true, onlyWhenLoggedOut: true }
  // },
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
  
  next()
})


export default router