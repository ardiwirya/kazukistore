import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'KazukiStore — Top Up Game Cepat & Terpercaya' }
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('@/views/GamesListView.vue'),
      meta: { title: 'Semua Game — KazukiStore' }
    },
    {
      path: '/game/:slug',
      name: 'game-detail',
      component: () => import('@/views/GameDetailView.vue'),
      meta: { title: 'Detail Game — KazukiStore' }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
      meta: { title: 'Checkout — KazukiStore' }
    },
    {
      path: '/payment/:invoiceId',
      name: 'payment-simulation',
      component: () => import('@/views/PaymentSimulationView.vue'),
      meta: { title: 'Pembayaran — KazukiStore' }
    },
    {
      path: '/invoice/:invoiceId',
      name: 'invoice-detail',
      component: () => import('@/views/InvoiceDetailView.vue'),
      meta: { title: 'Invoice — KazukiStore' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { title: 'Masuk — KazukiStore' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { title: 'Daftar — KazukiStore' }
    },
    {
      path: '/cek-invoice',
      name: 'check-invoice',
      component: () => import('@/views/CheckInvoiceView.vue'),
      meta: { title: 'Cek Invoice — KazukiStore' }
    },
    {
      path: '/riwayat',
      name: 'history',
      component: () => import('@/views/TransactionHistoryView.vue'),
      meta: { title: 'Riwayat Transaksi — KazukiStore' }
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('@/views/LeaderboardView.vue'),
      meta: { title: 'Leaderboard — KazukiStore' }
    },
    {
      path: '/kalkulator',
      name: 'calculator',
      component: () => import('@/views/CalculatorView.vue'),
      meta: { title: 'Kalkulator — KazukiStore' }
    },
    {
      path: '/artikel',
      name: 'articles',
      component: () => import('@/views/ArticlesView.vue'),
      meta: { title: 'Artikel & Berita — KazukiStore' }
    },
    {
      path: '/artikel/:slug',
      name: 'article-detail',
      component: () => import('@/views/ArticleDetailView.vue'),
      meta: { title: 'Artikel — KazukiStore' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Halaman Tidak Ditemukan — KazukiStore' }
    }
  ]
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ?? 'KazukiStore'
})

export default router
