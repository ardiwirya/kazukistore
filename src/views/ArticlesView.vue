<script setup lang="ts">
import { computed, ref } from 'vue'
import { articles } from '@/data/articles'
import ArticleCard from '@/components/common/ArticleCard.vue'

const searchTerm = ref('')

const categoryList = computed(() => ['Semua', ...new Set(articles.map((a) => a.category))])
const activeCategory = ref('Semua')

const filteredArticles = computed(() => {
  let result = articles
  if (activeCategory.value !== 'Semua') {
    result = result.filter((a) => a.category === activeCategory.value)
  }
  if (searchTerm.value.trim()) {
    const q = searchTerm.value.trim().toLowerCase()
    result = result.filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
  }
  return result
})
</script>

<template>
  <div class="container-kazuki flex flex-col gap-6 py-10">
    <div class="text-center">
      <h1 class="section-title">Artikel & Berita Gaming</h1>
      <p class="mx-auto mt-2 max-w-xl text-sm text-slate-400">
        Update terbaru seputar esports, tips top up, dan panduan bermain dari tim KazukiStore.
      </p>
    </div>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex gap-2 overflow-x-auto pb-1">
        <button
          v-for="cat in categoryList"
          :key="cat"
          class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
          :class="
            activeCategory === cat
              ? 'border-transparent bg-kazuki-gradient text-white'
              : 'border-white/10 bg-base-800 text-slate-300 hover:border-kazuki-400/40'
          "
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
      <input v-model="searchTerm" type="text" placeholder="Cari artikel..." class="input-field sm:max-w-xs" />
    </div>

    <div v-if="filteredArticles.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard v-for="article in filteredArticles" :key="article.slug" :article="article" />
    </div>
    <div v-else class="card flex flex-col items-center gap-3 py-16 text-center">
      <span class="text-4xl">📰</span>
      <p class="text-sm text-slate-400">Belum ada artikel yang cocok.</p>
    </div>
  </div>
</template>
