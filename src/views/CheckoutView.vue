<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { paymentMethods, paymentGroupLabels } from '@/data/paymentMethods'
import { useTransactionStore } from '@/stores/transaction'
import { formatIDR } from '@/composables/useCurrency'
import GameCover from '@/components/common/GameCover.vue'
import type { PaymentMethod } from '@/types'

const router = useRouter()
const transactionStore = useTransactionStore()

const selectedMethod = ref<PaymentMethod | null>(null)
const isSubmitting = ref(false)
const error = ref('')

onMounted(() => {
  if (!transactionStore.draft.game || !transactionStore.draft.nominal) {
    router.replace({ name: 'games' })
  }
})

const groupedMethods = computed(() => {
  const groups: Record<string, PaymentMethod[]> = {}
  for (const method of paymentMethods) {
    groups[method.group] = groups[method.group] || []
    groups[method.group].push(method)
  }
  return groups
})

const fee = computed(() => {
  if (!selectedMethod.value || !transactionStore.draft.nominal) return 0
  const price = transactionStore.draft.nominal.price
  return selectedMethod.value.feeType === 'percent'
    ? Math.round((price * selectedMethod.value.fee) / 100)
    : selectedMethod.value.fee
})

const total = computed(() => (transactionStore.draft.nominal?.price ?? 0) + fee.value)

function selectMethod(method: PaymentMethod) {
  selectedMethod.value = method
  error.value = ''
}

function submitOrder() {
  if (!selectedMethod.value) {
    error.value = 'Pilih metode pembayaran terlebih dahulu.'
    return
  }
  isSubmitting.value = true
  transactionStore.setDraftPayment(selectedMethod.value.id)
  const transaction = transactionStore.createTransaction(selectedMethod.value)
  setTimeout(() => {
    isSubmitting.value = false
    if (transaction) {
      router.push({ name: 'payment-simulation', params: { invoiceId: transaction.invoiceId } })
    }
  }, 500)
}
</script>

<template>
  <div v-if="transactionStore.draft.game && transactionStore.draft.nominal" class="container-kazuki flex flex-col gap-6 py-8">
    <h1 class="section-title">Checkout</h1>

    <div class="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div class="flex flex-col gap-6">
        <section class="card p-5 sm:p-6">
          <h2 class="mb-4 font-display text-lg font-semibold text-white">Detail Pesanan</h2>
          <div class="flex items-center gap-3 rounded-xl bg-base-800 p-3">
            <GameCover
              :icon="transactionStore.draft.game.icon"
              :from="transactionStore.draft.game.gradientFrom"
              :to="transactionStore.draft.game.gradientTo"
              size="sm"
              rounded="rounded-lg"
              class="h-14 w-14 shrink-0"
            />
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-white">{{ transactionStore.draft.game.name }}</p>
              <p class="text-xs text-slate-400">{{ transactionStore.draft.nominal.label }}</p>
              <p class="text-xs text-slate-500">
                ID: {{ transactionStore.draft.playerId }}
                <span v-if="transactionStore.draft.serverId"> ({{ transactionStore.draft.serverId }})</span>
              </p>
            </div>
          </div>
        </section>

        <section class="card p-5 sm:p-6">
          <h2 class="mb-4 font-display text-lg font-semibold text-white">Pilih Metode Pembayaran</h2>
          <div v-for="(methods, group) in groupedMethods" :key="group" class="mb-5 last:mb-0">
            <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{{ paymentGroupLabels[group as PaymentMethod['group']] }}</p>
            <div class="grid gap-2 sm:grid-cols-2">
              <button
                v-for="method in methods"
                :key="method.id"
                class="flex items-center justify-between gap-2 rounded-xl border px-4 py-3 text-left transition-colors"
                :class="
                  selectedMethod?.id === method.id
                    ? 'border-kazuki-400 bg-kazuki-500/10'
                    : 'border-white/10 bg-base-800 hover:border-kazuki-400/40'
                "
                @click="selectMethod(method)"
              >
                <span class="flex items-center gap-2 text-sm text-slate-100">
                  <span class="text-lg">{{ method.icon }}</span>
                  {{ method.name }}
                </span>
                <span v-if="method.isPopular" class="badge shrink-0 bg-neon-pink/90 text-white">Populer</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <aside class="h-fit lg:sticky lg:top-24">
        <div class="card flex flex-col gap-4 p-5 sm:p-6">
          <h3 class="font-display text-lg font-semibold text-white">Ringkasan Pembayaran</h3>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">Harga Item</span>
            <span class="text-white">{{ formatIDR(transactionStore.draft.nominal.price) }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">Biaya Layanan</span>
            <span class="text-white">{{ selectedMethod ? formatIDR(fee) : '—' }}</span>
          </div>
          <hr class="border-white/10" />
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-300">Total Bayar</span>
            <span class="font-display text-lg font-bold gradient-text">{{ formatIDR(total) }}</span>
          </div>
          <p v-if="error" class="rounded-lg bg-red-500/10 p-2.5 text-xs text-red-400">{{ error }}</p>
          <button class="btn-primary w-full" :disabled="isSubmitting" @click="submitOrder">
            {{ isSubmitting ? 'Memproses...' : 'Bayar Sekarang' }}
          </button>
          <router-link :to="{ name: 'game-detail', params: { slug: transactionStore.draft.game.slug } }" class="text-center text-xs text-slate-500 hover:text-slate-300">
            ← Ubah Pesanan
          </router-link>
        </div>
      </aside>
    </div>
  </div>
</template>
