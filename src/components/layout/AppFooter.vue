<script setup lang="ts">
const year = new Date().getFullYear()

const siteLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Semua Game', to: '/games' },
  { label: 'Cek Invoice', to: '/cek-invoice' },
  { label: 'Riwayat Transaksi', to: '/riwayat' }
]

const supportLinks = [
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Kalkulator', to: '/kalkulator' },
  { label: 'Artikel & Berita', to: '/artikel' }
]

const socials = [
  { label: 'Instagram', icon: '📷' },
  { label: 'TikTok', icon: '🎵' },
  { label: 'YouTube', icon: '▶️' },
  { label: 'WhatsApp', icon: '💬' }
]
</script>

<template>
  <footer class="border-t border-white/5 bg-base-900">
    <div class="container-kazuki grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <router-link to="/" class="flex items-center gap-2 font-display text-xl font-bold text-white">
          <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-kazuki-gradient shadow-glow">
            <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 4v16M7 12l9-8M7 12l9 8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          Kazuki<span class="gradient-text">Store</span>
        </router-link>
        <p class="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
          KazukiStore adalah platform top up game terpercaya dengan proses instan, harga transparan, dan dukungan pelanggan 24 jam setiap hari.
        </p>
        <div class="mt-5 flex gap-2">
          <button
            v-for="social in socials"
            :key="social.label"
            :aria-label="social.label"
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-base-800 text-sm transition-colors hover:bg-kazuki-500/20"
          >
            {{ social.icon }}
          </button>
        </div>
      </div>

      <div>
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">Peta Situs</h3>
        <ul class="space-y-2.5">
          <li v-for="link in siteLinks" :key="link.to">
            <router-link :to="link.to" class="text-sm text-slate-400 transition-colors hover:text-kazuki-300">{{ link.label }}</router-link>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">Layanan</h3>
        <ul class="space-y-2.5">
          <li v-for="link in supportLinks" :key="link.to">
            <router-link :to="link.to" class="text-sm text-slate-400 transition-colors hover:text-kazuki-300">{{ link.label }}</router-link>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-300">Legalitas</h3>
        <ul class="space-y-2.5">
          <li><span class="cursor-default text-sm text-slate-400">Kebijakan Privasi</span></li>
          <li><span class="cursor-default text-sm text-slate-400">Syarat & Ketentuan</span></li>
        </ul>
        <div class="mt-5 rounded-xl border border-white/5 bg-base-850 p-3 text-xs text-slate-500">
          Ini adalah proyek portfolio front-end. Seluruh transaksi bersifat simulasi dan tidak menggunakan uang sungguhan.
        </div>
      </div>
    </div>

    <div class="border-t border-white/5 py-6">
      <p class="container-kazuki text-center text-xs text-slate-500">
        © {{ year }} KazukiStore. Dibuat oleh Ardi Wirya sebagai project portfolio Front-End Developer.
      </p>
    </div>
  </footer>
</template>
