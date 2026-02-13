import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register.vue'),
    meta: { title: '注册' }
  },

  // ========== C端商城前台 ==========
  {
    path: '/',
    component: () => import('@/views/mall/layout.vue'),
    children: [
      {
        path: '',
        name: 'MallHome',
        component: () => import('@/views/mall/home/index.vue'),
        meta: { title: '瓷韵 - 陶瓷手作平台' }
      },
      {
        path: 'works',
        name: 'WorkList',
        component: () => import('@/views/mall/works/list.vue'),
        meta: { title: '作品列表' }
      },
      {
        path: 'works/:id',
        name: 'WorkDetail',
        component: () => import('@/views/mall/works/detail.vue'),
        meta: { title: '作品详情' }
      },
      {
        path: 'creators',
        name: 'CreatorList',
        component: () => import('@/views/mall/creators/list.vue'),
        meta: { title: '艺术家' }
      },
      {
        path: 'creators/:id',
        name: 'CreatorProfile',
        component: () => import('@/views/mall/creators/profile.vue'),
        meta: { title: '艺术家主页' }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/mall/cart/index.vue'),
        meta: { title: '购物车', requiresAuth: true }
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('@/views/mall/checkout/index.vue'),
        meta: { title: '确认订单', requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'OrderList',
        component: () => import('@/views/mall/orders/list.vue'),
        meta: { title: '我的订单', requiresAuth: true }
      },
      {
        path: 'orders/:id',
        name: 'OrderDetail',
        component: () => import('@/views/mall/orders/detail.vue'),
        meta: { title: '订单详情', requiresAuth: true }
      },
      {
        path: 'user',
        name: 'UserCenter',
        component: () => import('@/views/mall/user/index.vue'),
        meta: { title: '个人中心', requiresAuth: true }
      },
      {
        path: 'user/addresses',
        name: 'UserAddresses',
        component: () => import('@/views/mall/user/addresses.vue'),
        meta: { title: '收货地址', requiresAuth: true }
      },
      {
        path: 'user/favorites',
        name: 'UserFavorites',
        component: () => import('@/views/mall/user/favorites.vue'),
        meta: { title: '我的收藏', requiresAuth: true }
      },
      {
        path: 'messages',
        name: 'Messages',
        component: () => import('@/views/mall/messages/index.vue'),
        meta: { title: '消息中心', requiresAuth: true }
      }
    ]
  },

  // ========== B端创造者中心 ==========
  {
    path: '/creator',
    component: () => import('@/views/layout.vue'),
    redirect: '/creator/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'works',
        name: 'Works',
        component: () => import('@/views/works/list.vue'),
        meta: { title: '作品管理' }
      },
      {
        path: 'works/upload',
        name: 'WorkUpload',
        component: () => import('@/views/works/upload.vue'),
        meta: { title: '上传作品' }
      },
      {
        path: 'works/edit/:id',
        name: 'WorkEdit',
        component: () => import('@/views/works/upload.vue'),
        meta: { title: '编辑作品' }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/orders/list.vue'),
        meta: { title: '订单管理' }
      },
      {
        path: 'finance',
        name: 'Finance',
        component: () => import('@/views/finance/index.vue'),
        meta: { title: '财务中心' }
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('@/views/analytics/index.vue'),
        meta: { title: '数据分析' }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue'),
        meta: { title: '个人中心' }
      }
    ]
  },

  // ========== Admin 管理后台 ==========
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/login.vue'),
    meta: { title: '管理后台登录' }
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/layout.vue'),
    meta: { requiresAdminAuth: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/index.vue'),
        meta: { title: '数据概览' }
      },
      {
        path: 'artists',
        name: 'AdminArtists',
        component: () => import('@/views/admin/artists/list.vue'),
        meta: { title: '艺术家管理' }
      },
      {
        path: 'works',
        name: 'AdminWorks',
        component: () => import('@/views/admin/works/list.vue'),
        meta: { title: '作品管理' }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/admin/orders/list.vue'),
        meta: { title: '订单管理' }
      },
      {
        path: 'finance',
        name: 'AdminFinance',
        component: () => import('@/views/admin/finance/index.vue'),
        meta: { title: '财务管理' }
      },
      {
        path: 'analytics',
        name: 'AdminAnalytics',
        component: () => import('@/views/admin/analytics/index.vue'),
        meta: { title: '数据分析' }
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('@/views/admin/settings/index.vue'),
        meta: { title: '系统设置' }
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to) => {
  document.title = `${to.meta.title || '瓷韵'}`
})

export default router
