<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { games } from '@/data/games'
import { useAuthStore } from '@/stores/auth'
import GameCover from '@/components/common/GameCover.vue'

const router = useRouter()
const auth = useAuthStore()

const searchQuery = ref('')
const isSearchFocused = ref(false)
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

const navLinks = [
  { label: 'Top Up', to: '/games' },
  { label: 'Cek Invoice', to: '/cek-invoice' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Artikel', to: '/artikel' },
  { label: 'Kalkulator', to: '/kalkulator' }
]

const searchResults = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return []
  return games.filter((g) => g.name.toLowerCase().includes(query) || g.publisher.toLowerCase().includes(query)).slice(0, 6)
})

function goToGame(slug: string) {
  isSearchFocused.value = false
  searchQuery.value = ''
  router.push({ name: 'game-detail', params: { slug } })
}

function blurSearchWithDelay() {
  window.setTimeout(() => (isSearchFocused.value = false), 150)
}

function submitSearch() {
  if (searchResults.value.length) {
    goToGame(searchResults.value[0].slug)
  } else {
    router.push({ name: 'games', query: { q: searchQuery.value } })
  }
}

function logout() {
  auth.logout()
  isUserMenuOpen.value = false
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/5 bg-base-950/80 backdrop-blur-xl">
    <div class="container-kazuki flex h-16 items-center gap-4">
      <router-link to="/" class="flex shrink-0 items-center gap-2 font-display text-xl font-bold tracking-tight text-white">
        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-kazuki-gradient shadow-glow">
          <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M7 4v16M7 12l9-8M7 12l9 8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="hidden sm:inline">Kazuki<span class="gradient-text">Store</span></span>
      </router-link>

      <!-- Search -->
      <div class="relative hidden flex-1 max-w-xl md:block">
        <form class="relative" @submit.prevent="submitSearch">
          <svg class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari game atau voucher favoritmu..."
            class="input-field pl-10"
            @focus="isSearchFocused = true"
            @blur="blurSearchWithDelay"
          />
        </form>
        <transition name="fade">
          <div
            v-if="isSearchFocused && searchResults.length"
            class="glass-panel absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-80 overflow-auto rounded-xl p-2 shadow-card"
          >
            <button
              v-for="game in searchResults"
              :key="game.slug"
              class="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-white/5"
              @mousedown.prevent="goToGame(game.slug)"
            >
              <GameCover :icon="game.icon" :from="game.gradientFrom" :to="game.gradientTo" size="sm" rounded="rounded-lg" class="h-10 w-10 shrink-0" />
              <span>
                <span class="block text-sm font-semibold text-white">{{ game.name }}</span>
                <span class="block text-xs text-slate-400">{{ game.categoryLabel }}</span>
              </span>
            </button>
          </div>
        </transition>
      </div>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-1 lg:flex">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
          active-class="!text-white bg-white/5"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <template v-if="auth.isAuthenticated && auth.user">
          <div class="relative">
            <button
              class="flex items-center gap-2 rounded-xl border border-white/10 bg-base-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-kazuki-400/50"
              @click="isUserMenuOpen = !isUserMenuOpen"
            >
              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-kazuki-gradient text-xs font-bold">
                {{ auth.user.fullName.charAt(0) }}
              </span>
              <span class="hidden sm:inline">{{ auth.user.username }}</span>
            </button>
            <transition name="fade">
              <div v-if="isUserMenuOpen" class="glass-panel absolute right-0 top-[calc(100%+8px)] w-48 rounded-xl p-1.5 shadow-card">
                <router-link to="/riwayat" class="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5" @click="isUserMenuOpen = false">
                  Riwayat Transaksi
                </router-link>
                <router-link to="/cek-invoice" class="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5" @click="isUserMenuOpen = false">
                  Cek Invoice
                </router-link>
                <button class="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10" @click="logout">
                  Keluar
                </button>
              </div>
            </transition>
          </div>
        </template>
        <template v-else>
          <router-link to="/login" class="btn-ghost hidden sm:inline-flex">Masuk</router-link>
          <router-link to="/register" class="btn-primary !px-4 !py-2 text-sm">Daftar</router-link>
        </template>

        <button class="rounded-lg p-2 text-slate-300 hover:bg-white/5 lg:hidden" @click="isMobileMenuOpen = !isMobileMenuOpen">
          <svg v-if="!isMobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="fade">
      <div v-if="isMobileMenuOpen" class="border-t border-white/5 bg-base-950 px-4 pb-4 pt-3 lg:hidden">
        <form class="relative mb-3" @submit.prevent="submitSearch">
          <svg class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Cari game..." class="input-field pl-10" />
        </form>
        <div class="flex flex-col gap-1">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </router-link>
          <hr class="my-2 border-white/5" />
          <template v-if="!auth.isAuthenticated">
            <router-link to="/login" class="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5" @click="isMobileMenuOpen = false">
              Masuk
            </router-link>
            <router-link to="/register" class="rounded-lg px-3 py-2.5 text-sm font-medium text-kazuki-300 hover:bg-white/5" @click="isMobileMenuOpen = false">
              Daftar Akun
            </router-link>
          </template>
          <template v-else>
            <router-link to="/riwayat" class="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5" @click="isMobileMenuOpen = false">
              Riwayat Transaksi
            </router-link>
            <button class="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-400 hover:bg-red-500/10" @click="logout">Keluar</button>
          </template>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
