<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { articles, getArticleBySlug } from '@/data/articles'
import { formatDate } from '@/composables/useCurrency'
import ArticleCard from '@/components/common/ArticleCard.vue'

const route = useRoute()
const article = computed(() => getArticleBySlug(route.params.slug as string))
const relatedArticles = computed(() => {
  if (!article.value) return []
  return articles.filter((a) => a.slug !== article.value!.slug).slice(0, 3)
})
</script>

<template>
  <article v-if="article" class="container-kazuki flex flex-col gap-8 py-8">
    <nav class="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
      <router-link to="/" class="hover:text-slate-300">Beranda</router-link>
      <span>/</span>
      <router-link to="/artikel" class="hover:text-slate-300">Artikel</router-link>
      <span>/</span>
      <span class="text-slate-300">{{ article.title }}</span>
    </nav>

    <div class="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <span class="badge w-fit bg-kazuki-500/15 text-kazuki-300">{{ article.category }}</span>
      <h1 class="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">{{ article.title }}</h1>
      <div class="flex items-center gap-3 text-sm text-slate-400">
        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-kazuki-gradient text-xs font-bold text-white">
          {{ article.author.charAt(0) }}
        </span>
        <span>{{ article.author }}</span>
        <span>·</span>
        <span>{{ formatDate(article.publishedAt) }}</span>
        <span>·</span>
        <span>{{ article.readTime }} menit baca</span>
      </div>

      <div
        class="flex h-56 items-center justify-center rounded-2xl text-7xl sm:h-72"
        :style="{ background: `linear-gradient(135deg, ${article.gradientFrom}, ${article.gradientTo})` }"
      >
        {{ article.icon }}
      </div>

      <div class="flex flex-col gap-4 text-[15px] leading-relaxed text-slate-300">
        <p v-for="(paragraph, i) in article.content" :key="i">{{ paragraph }}</p>
      </div>
    </div>

    <section v-if="relatedArticles.length" class="mx-auto w-full max-w-5xl">
      <h2 class="section-title mb-5">Artikel Lainnya</h2>
      <div class="grid gap-4 sm:grid-cols-3">
        <ArticleCard v-for="related in relatedArticles" :key="related.slug" :article="related" />
      </div>
    </section>
  </article>

  <div v-else class="container-kazuki flex flex-col items-center gap-4 py-24 text-center">
    <span class="text-5xl">📰</span>
    <h1 class="font-display text-xl font-semibold text-white">Artikel Tidak Ditemukan</h1>
    <router-link to="/artikel" class="btn-primary">Lihat Semua Artikel</router-link>
  </div>
</template>
