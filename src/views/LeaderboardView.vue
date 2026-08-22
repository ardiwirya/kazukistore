<script setup lang="ts">
import { ref, computed } from 'vue'
import { leaderboardToday, leaderboardWeekly, leaderboardMonthly } from '@/data/leaderboard'
import { formatIDR } from '@/composables/useCurrency'

type Tab = 'today' | 'weekly' | 'monthly'
const activeTab = ref<Tab>('today')

const tabs: { value: Tab; label: string }[] = [
  { value: 'today', label: 'Hari Ini' },
  { value: 'weekly', label: 'Minggu Ini' },
  { value: 'monthly', label: 'Bulan Ini' }
]

const boards = { today: leaderboardToday, weekly: leaderboardWeekly, monthly: leaderboardMonthly }
const activeBoard = computed(() => boards[activeTab.value])

const badgeStyle: Record<string, string> = {
  gold: 'bg-neon-gold/90 text-base-950',
  silver: 'bg-slate-300/90 text-base-950',
  bronze: 'bg-orange-400/90 text-base-950'
}
</script>

<template>
  <div class="container-kazuki flex flex-col gap-6 py-10">
    <div class="text-center">
      <span class="badge mx-auto mb-3 w-fit bg-kazuki-500/15 text-kazuki-300">Leaderboard</span>
      <h1 class="section-title">Top 10 Pembelian Terbanyak di KazukiStore</h1>
      <p class="mx-auto mt-2 max-w-xl text-sm text-slate-400">
        Daftar 10 pembelian terbanyak dari pelanggan kami. Data ini bersifat simulasi dan diperbarui secara berkala.
      </p>
    </div>

    <div class="mx-auto flex gap-2 rounded-xl bg-base-800 p-1">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        :class="activeTab === tab.value ? 'bg-kazuki-gradient text-white shadow-glow' : 'text-slate-400 hover:text-white'"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="mx-auto grid w-full max-w-3xl gap-3">
      <div
        v-for="entry in activeBoard"
        :key="entry.rank"
        class="card flex items-center gap-4 p-4"
        :class="entry.rank <= 3 ? 'border-kazuki-400/30' : ''"
      >
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          :class="entry.badge ? badgeStyle[entry.badge] : 'bg-base-800 text-slate-300'"
        >
          {{ entry.rank }}
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-white">{{ entry.maskedName }}</p>
          <p class="truncate text-xs text-slate-500">Favorit: {{ entry.favoriteGame }}</p>
        </div>
        <p class="shrink-0 text-sm font-bold gradient-text">{{ formatIDR(entry.totalSpent) }}</p>
      </div>
    </div>
  </div>
</template>
