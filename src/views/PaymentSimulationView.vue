<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import { formatIDR } from '@/composables/useCurrency'
import GameCover from '@/components/common/GameCover.vue'

const route = useRoute()
const router = useRouter()
const transactionStore = useTransactionStore()

const invoiceId = computed(() => route.params.invoiceId as string)
const transaction = computed(() => transactionStore.invoiceBySlug(invoiceId.value))

const secondsLeft = ref(600)
let interval: ReturnType<typeof setInterval> | undefined

const formattedTimer = computed(() => {
  const m = Math.floor(secondsLeft.value / 60).toString().padStart(2, '0')
  const s = (secondsLeft.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

onMounted(() => {
  if (!transaction.value) {
    router.replace({ name: 'check-invoice' })
    return
  }
  interval = setInterval(() => {
    if (secondsLeft.value > 0) secondsLeft.value--
  }, 1000)
})
onUnmounted(() => {
  if (interval) clearInterval(interval)
})

function confirmPayment(success: boolean) {
  if (!transaction.value) return
  transactionStore.simulatePaymentResult(transaction.value.invoiceId, success ? 'success' : 'failed')
  transactionStore.resetDraft()
  router.push({ name: 'invoice-detail', params: { invoiceId: transaction.value.invoiceId } })
}
</script>

<template>
  <div v-if="transaction" class="container-kazuki flex flex-col items-center gap-6 py-10">
    <div class="w-full max-w-md">
      <div class="card overflow-hidden">
        <div class="bg-kazuki-gradient-soft p-6 text-center">
          <p class="text-xs uppercase tracking-wide text-slate-300">Menunggu Pembayaran</p>
          <p class="mt-1 font-display text-3xl font-bold text-white">{{ formatIDR(transaction.total) }}</p>
          <p class="mt-2 text-sm text-slate-400">Selesaikan dalam <span class="font-mono font-semibold text-neon-pink">{{ formattedTimer }}</span></p>
        </div>

        <div class="flex flex-col gap-4 p-6">
          <div class="flex items-center gap-3 rounded-xl bg-base-800 p-3">
            <GameCover :icon="transaction.gameIcon" :from="transaction.gameGradientFrom" :to="transaction.gameGradientTo" size="sm" rounded="rounded-lg" class="h-12 w-12 shrink-0" />
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-white">{{ transaction.gameName }}</p>
              <p class="truncate text-xs text-slate-400">{{ transaction.nominalLabel }}</p>
            </div>
          </div>

          <div class="flex flex-col items-center gap-3 rounded-xl border border-dashed border-white/15 p-6 text-center">
            <div class="flex h-36 w-36 items-center justify-center rounded-xl bg-white p-3">
              <svg viewBox="0 0 100 100" class="h-full w-full text-base-950">
                <rect x="4" y="4" width="24" height="24" fill="currentColor" />
                <rect x="72" y="4" width="24" height="24" fill="currentColor" />
                <rect x="4" y="72" width="24" height="24" fill="currentColor" />
                <rect x="34" y="10" width="8" height="8" fill="currentColor" />
                <rect x="50" y="10" width="8" height="8" fill="currentColor" />
                <rect x="34" y="34" width="8" height="8" fill="currentColor" />
                <rect x="50" y="34" width="8" height="8" fill="currentColor" />
                <rect x="66" y="34" width="8" height="8" fill="currentColor" />
                <rect x="82" y="50" width="8" height="8" fill="currentColor" />
                <rect x="34" y="50" width="8" height="8" fill="currentColor" />
                <rect x="50" y="66" width="8" height="8" fill="currentColor" />
                <rect x="66" y="66" width="8" height="8" fill="currentColor" />
                <rect x="34" y="82" width="8" height="8" fill="currentColor" />
                <rect x="66" y="82" width="8" height="8" fill="currentColor" />
                <rect x="82" y="82" width="8" height="8" fill="currentColor" />
              </svg>
            </div>
            <p class="text-sm font-medium text-slate-200">{{ transaction.paymentMethod }}</p>
            <p class="text-xs text-slate-500">Scan kode QR di atas menggunakan aplikasi pembayaranmu.</p>
          </div>

          <div class="rounded-xl bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-300">
            ⚠️ Ini adalah simulasi pembayaran untuk keperluan demo/portfolio. Tidak ada transaksi nyata yang terjadi.
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button class="btn-secondary w-full" @click="confirmPayment(false)">Simulasi Gagal</button>
            <button class="btn-primary w-full" @click="confirmPayment(true)">Simulasi Berhasil</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
