<script setup lang="ts">
import type { Article } from '@/types'
import { formatDate } from '@/composables/useCurrency'

defineProps<{ article: Article }>()
</script>

<template>
  <router-link
    :to="{ name: 'article-detail', params: { slug: article.slug } }"
    class="card group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-kazuki-400/40"
  >
    <div
      class="relative flex h-40 items-center justify-center text-5xl"
      :style="{ background: `linear-gradient(135deg, ${article.gradientFrom}, ${article.gradientTo})` }"
    >
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
      <span>{{ article.icon }}</span>
      <span class="badge absolute left-3 top-3 bg-base-950/70 text-white backdrop-blur">{{ article.category }}</span>
    </div>
    <div class="flex flex-1 flex-col gap-2 p-4">
      <p class="line-clamp-2 font-display text-base font-semibold text-white group-hover:text-kazuki-300">{{ article.title }}</p>
      <p class="line-clamp-2 text-sm text-slate-400">{{ article.excerpt }}</p>
      <div class="mt-auto flex items-center justify-between pt-2 text-xs text-slate-500">
        <span>{{ formatDate(article.publishedAt) }}</span>
        <span>{{ article.readTime }} menit baca</span>
      </div>
    </div>
  </router-link>
</template>
