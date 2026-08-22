<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import { formatIDR, formatDateTime } from '@/composables/useCurrency'
import GameCover from '@/components/common/GameCover.vue'
import StatusBadge from '@/components/common/StatusBadge.vue'

const route = useRoute()
const transactionStore = useTransactionStore()

const invoiceId = computed(() => route.params.invoiceId as string)
const transaction = computed(() => transactionStore.invoiceBySlug(invoiceId.value))

function copyInvoiceId() {
  if (!transaction.value) return
  navigator.clipboard?.writeText(transaction.value.invoiceId)
}

function printInvoice() {
  window.print()
}
</script>

<template>
  <div v-if="transaction" class="container-kazuki flex flex-col items-center gap-6 py-10">
    <div class="w-full max-w-lg">
      <div class="card overflow-hidden">
        <div
          class="flex flex-col items-center gap-3 p-8 text-center"
          :class="transaction.status === 'success' ? 'bg-emerald-500/10' : transaction.status === 'failed' ? 'bg-red-500/10' : 'bg-amber-500/10'"
        >
          <span class="text-5xl">
            {{ transaction.status === 'success' ? '✅' : transaction.status === 'failed' ? '❌' : '⏳' }}
          </span>
          <h1 class="font-display text-xl font-bold text-white sm:text-2xl">
            {{
              transaction.status === 'success'
                ? 'Pembayaran Berhasil!'
                : transaction.status === 'failed'
                ? 'Pembayaran Gagal'
                : 'Menunggu Pembayaran'
            }}
          </h1>
          <p class="text-sm text-slate-400">Item akan otomatis dikirim ke akun game kamu.</p>
          <StatusBadge :status="transaction.status" />
        </div>

        <div class="flex flex-col gap-4 p-6">
          <div class="flex items-center justify-between rounded-xl bg-base-800 p-3">
            <span class="text-xs text-slate-400">No. Invoice</span>
            <button class="flex items-center gap-1.5 font-mono text-sm font-semibold text-kazuki-300" @click="copyInvoiceId">
              {{ transaction.invoiceId }}
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-3">
            <GameCover :icon="transaction.gameIcon" :from="transaction.gameGradientFrom" :to="transaction.gameGradientTo" size="sm" rounded="rounded-lg" class="h-14 w-14 shrink-0" />
            <div>
              <p class="text-sm font-semibold text-white">{{ transaction.gameName }}</p>
              <p class="text-xs text-slate-400">{{ transaction.nominalLabel }}</p>
            </div>
          </div>

          <dl class="flex flex-col gap-2.5 text-sm">
            <div class="flex justify-between"><dt class="text-slate-400">Player ID</dt><dd class="text-slate-200">{{ transaction.playerId }}</dd></div>
            <div v-if="transaction.serverId" class="flex justify-between"><dt class="text-slate-400">Server ID</dt><dd class="text-slate-200">{{ transaction.serverId }}</dd></div>
            <div class="flex justify-between"><dt class="text-slate-400">Metode Pembayaran</dt><dd class="text-slate-200">{{ transaction.paymentMethod }}</dd></div>
            <div class="flex justify-between"><dt class="text-slate-400">Waktu Transaksi</dt><dd class="text-slate-200">{{ formatDateTime(transaction.createdAt) }}</dd></div>
          </dl>

          <hr class="border-white/10" />

          <dl class="flex flex-col gap-2.5 text-sm">
            <div class="flex justify-between"><dt class="text-slate-400">Harga Item</dt><dd class="text-slate-200">{{ formatIDR(transaction.price) }}</dd></div>
            <div class="flex justify-between"><dt class="text-slate-400">Biaya Layanan</dt><dd class="text-slate-200">{{ formatIDR(transaction.fee) }}</dd></div>
            <div class="flex justify-between text-base font-semibold"><dt class="text-white">Total</dt><dd class="gradient-text">{{ formatIDR(transaction.total) }}</dd></div>
          </dl>

          <div class="grid grid-cols-2 gap-3 pt-2">
            <button class="btn-secondary w-full" @click="printInvoice">Cetak / Simpan</button>
            <router-link to="/games" class="btn-primary w-full">Top Up Lagi</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container-kazuki flex flex-col items-center gap-4 py-24 text-center">
    <span class="text-5xl">🧾</span>
    <h1 class="font-display text-xl font-semibold text-white">Invoice Tidak Ditemukan</h1>
    <p class="text-sm text-slate-400">Periksa kembali nomor invoice yang kamu masukkan.</p>
    <router-link to="/cek-invoice" class="btn-primary">Cek Invoice</router-link>
  </div>
</template>
