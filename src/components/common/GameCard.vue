<script setup lang="ts">
import type { Game } from '@/types'
import GameCover from './GameCover.vue'

defineProps<{ game: Game }>()
</script>

<template>
  <router-link
    :to="{ name: 'game-detail', params: { slug: game.slug } }"
    class="card group relative flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-kazuki-400/40 hover:shadow-glow"
  >
    <div class="relative">
      <GameCover :icon="game.icon" :from="game.gradientFrom" :to="game.gradientTo" :label="game.name" rounded="rounded-none" />
      <span
        v-if="game.isNew"
        class="badge absolute left-2 top-2 bg-neon-lime/90 text-base-950"
      >
        Baru
      </span>
      <span
        v-else-if="game.isPopular"
        class="badge absolute left-2 top-2 bg-neon-pink/90 text-white"
      >
        🔥 Populer
      </span>
    </div>
    <div class="flex flex-1 flex-col gap-1 p-3">
      <p class="line-clamp-1 text-sm font-semibold text-white group-hover:text-kazuki-300">{{ game.name }}</p>
      <p class="text-xs text-slate-400">{{ game.categoryLabel }}</p>
      <div class="mt-1 flex items-center gap-1 text-xs text-slate-400">
        <span class="text-neon-gold">★</span>
        <span>{{ game.rating.toFixed(1) }}</span>
      </div>
    </div>
  </router-link>
</template>
