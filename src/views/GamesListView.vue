<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { games } from '@/data/games'
import CategoryChips from '@/components/home/CategoryChips.vue'
import GameCard from '@/components/common/GameCard.vue'

const route = useRoute()
const activeCategory = ref('all')
const searchTerm = ref((route.query.q as string) || '')
const sortBy = ref<'popular' | 'name' | 'rating'>('popular')

watch(
  () => route.query.q,
  (q) => {
    if (typeof q === 'string') searchTerm.value = q
  }
)

const filteredGames = computed(() => {
  let result = games

  if (activeCategory.value !== 'all') {
    result = result.filter((g) => g.category === activeCategory.value)
  }

  if (searchTerm.value.trim()) {
    const query = searchTerm.value.trim().toLowerCase()
    result = result.filter((g) => g.name.toLowerCase().includes(query) || g.publisher.toLowerCase().includes(query))
  }

  const sorted = [...result]
  if (sortBy.value === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy.value === 'rating') sorted.sort((a, b) => b.rating - a.rating)
  if (sortBy.value === 'popular') sorted.sort((a, b) => Number(b.isPopular) - Number(a.isPopular) || b.soldCount - a.soldCount)

  return sorted
})
</script>

<template>
  <div class="container-kazuki flex flex-col gap-6 py-8">
    <div>
      <h1 class="section-title">Semua Game & Voucher</h1>
      <p class="mt-2 text-sm text-slate-400">Temukan game favoritmu dan top up dalam hitungan detik.</p>
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative w-full sm:max-w-sm">
        <svg class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input v-model="searchTerm" type="text" placeholder="Cari game atau voucher..." class="input-field pl-10" />
      </div>
      <select v-model="sortBy" class="input-field w-full sm:w-52">
        <option value="popular">Urutkan: Terpopuler</option>
        <option value="name">Urutkan: Nama A-Z</option>
        <option value="rating">Urutkan: Rating Tertinggi</option>
      </select>
    </div>

    <CategoryChips v-model="activeCategory" />

    <p class="text-sm text-slate-500">{{ filteredGames.length }} game ditemukan</p>

    <div v-if="filteredGames.length" class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
      <GameCard v-for="game in filteredGames" :key="game.slug" :game="game" />
    </div>
    <div v-else class="card flex flex-col items-center gap-3 py-16 text-center">
      <span class="text-4xl">🔍</span>
      <p class="text-sm text-slate-400">Tidak ada game yang cocok dengan pencarianmu.</p>
    </div>
  </div>
</template>
