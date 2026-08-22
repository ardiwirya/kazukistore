<script setup lang="ts">
import { computed, ref } from 'vue'
import { games, popularGames } from '@/data/games'
import { articles } from '@/data/articles'
import HeroBanner from '@/components/home/HeroBanner.vue'
import TrustFeatures from '@/components/home/TrustFeatures.vue'
import CategoryChips from '@/components/home/CategoryChips.vue'
import GameCard from '@/components/common/GameCard.vue'
import ArticleCard from '@/components/common/ArticleCard.vue'
import { formatCompact } from '@/composables/useCurrency'

const activeCategory = ref('all')

const filteredGames = computed(() => {
  if (activeCategory.value === 'all') return games
  return games.filter((g) => g.category === activeCategory.value)
})

const stats = [
  { label: 'Transaksi Sukses', value: '2.1jt+' },
  { label: 'Game & Voucher', value: `${games.length}+` },
  { label: 'Pengguna Aktif', value: formatCompact(184300) },
  { label: 'Rating Pengguna', value: '4.9/5' }
]
</script>

<template>
  <div class="container-kazuki flex flex-col gap-12 py-6 sm:gap-16 sm:py-10">
    <HeroBanner />

    <section class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
      <div v-for="stat in stats" :key="stat.label" class="card px-4 py-5 text-center sm:py-6">
        <p class="font-display text-xl font-bold text-white sm:text-2xl">{{ stat.value }}</p>
        <p class="mt-1 text-xs text-slate-400 sm:text-sm">{{ stat.label }}</p>
      </div>
    </section>

    <TrustFeatures />

    <section>
      <div class="mb-5 flex items-center justify-between">
        <h2 class="section-title">🔥 Paling Dicari</h2>
        <router-link to="/games" class="text-sm font-semibold text-kazuki-300 hover:text-kazuki-200">Lihat Semua →</router-link>
      </div>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
        <GameCard v-for="game in popularGames" :key="game.slug" :game="game" />
      </div>
    </section>

    <section>
      <div class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="section-title">Jelajahi Semua Game</h2>
      </div>
      <CategoryChips v-model="activeCategory" class="mb-5" />
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
        <GameCard v-for="game in filteredGames" :key="game.slug" :game="game" />
      </div>
      <p v-if="!filteredGames.length" class="py-10 text-center text-sm text-slate-500">Belum ada game di kategori ini.</p>
    </section>

    <section class="card relative overflow-hidden bg-kazuki-gradient-soft p-8 sm:p-12">
      <div class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-kazuki-500/20 blur-3xl" />
      <div class="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="section-title mb-2">Belum Punya Akun KazukiStore?</h2>
          <p class="max-w-lg text-sm text-slate-300 sm:text-base">
            Daftar sekarang untuk menyimpan riwayat transaksi, klaim promo eksklusif, dan naik ke papan Leaderboard.
          </p>
        </div>
        <router-link to="/register" class="btn-primary shrink-0">Daftar Gratis</router-link>
      </div>
    </section>

    <section>
      <div class="mb-5 flex items-center justify-between">
        <h2 class="section-title">📰 Berita & Update Terbaru</h2>
        <router-link to="/artikel" class="text-sm font-semibold text-kazuki-300 hover:text-kazuki-200">Lihat Semua →</router-link>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
      </div>
    </section>
  </div>
</template>
