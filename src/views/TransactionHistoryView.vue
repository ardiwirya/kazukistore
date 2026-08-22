<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import { formatIDR, formatDateTime } from '@/composables/useCurrency'
import GameCover from '@/components/common/GameCover.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'
import type { TransactionStatus } from '@/types'

const router = useRouter()
const transactionStore = useTransactionStore()

const statusFilter = ref<TransactionStatus | 'all'>('all')

const filters: { value: TransactionStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'success', label: 'Berhasil' },
  { value: 'pending', label: 'Menunggu' },
  { value: 'failed', label: 'Gagal' }
]

const filteredHistory = computed(() => {
  if (statusFilter.value === 'all') return transactionStore.history
  return transactionStore.history.filter((tx) => tx.status === statusFilter.value)
})
</script>

<template>
  <div class="container-kazuki flex flex-col gap-6 py-8">
    <div>
      <h1 class="section-title">Riwayat Transaksi</h1>
      <p class="mt-2 text-sm text-slate-400">Semua transaksi top up kamu tersimpan di sini.</p>
    </div>

    <div class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="filter in filters"
        :key="filter.value"
        class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
        :class="
          statusFilter === filter.value
            ? 'border-transparent bg-kazuki-gradient text-white'
            : 'border-white/10 bg-base-800 text-slate-300 hover:border-kazuki-400/40'
        "
        @click="statusFilter = filter.value"
      >
        {{ filter.label }}
      </button>
    </div>

    <div v-if="filteredHistory.length" class="flex flex-col gap-3">
      <button
        v-for="tx in filteredHistory"
        :key="tx.invoiceId"
        class="card flex items-center gap-4 p-4 text-left transition-colors hover:border-kazuki-400/40"
        @click="router.push({ name: 'invoice-detail', params: { invoiceId: tx.invoiceId } })"
      >
        <GameCover :icon="tx.gameIcon" :from="tx.gameGradientFrom" :to="tx.gameGradientTo" size="sm" rounded="rounded-lg" class="h-14 w-14 shrink-0" />
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <p class="truncate text-sm font-semibold text-white">{{ tx.gameName }}</p>
            <StatusBadge :status="tx.status" />
          </div>
          <p class="mt-0.5 truncate text-xs text-slate-400">{{ tx.nominalLabel }} · {{ tx.paymentMethod }}</p>
          <p class="mt-0.5 font-mono text-[11px] text-slate-500">{{ tx.invoiceId }} · {{ formatDateTime(tx.createdAt) }}</p>
        </div>
        <div class="shrink-0 text-right">
          <p class="text-sm font-semibold text-white">{{ formatIDR(tx.total) }}</p>
        </div>
      </button>
    </div>

    <div v-else class="card flex flex-col items-center gap-3 py-16 text-center">
      <span class="text-4xl">🧾</span>
      <p class="text-sm text-slate-400">Belum ada transaksi{{ statusFilter !== 'all' ? ' dengan status ini' : '' }}.</p>
      <router-link to="/games" class="btn-primary">Mulai Top Up</router-link>
    </div>
  </div>
</template>
