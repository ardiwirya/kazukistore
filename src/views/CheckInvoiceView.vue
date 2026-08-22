<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'

const router = useRouter()
const transactionStore = useTransactionStore()

const invoiceInput = ref('')
const error = ref('')

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText()
    invoiceInput.value = text
  } catch {
    error.value = 'Tidak dapat mengakses clipboard. Silakan tempel manual.'
  }
}

function search() {
  const query = invoiceInput.value.trim().toUpperCase()
  if (!query) {
    error.value = 'Masukkan nomor invoice terlebih dahulu.'
    return
  }
  const found = transactionStore.invoiceBySlug(query)
  if (!found) {
    error.value = 'Invoice tidak ditemukan. Periksa kembali nomor invoice kamu.'
    return
  }
  error.value = ''
  router.push({ name: 'invoice-detail', params: { invoiceId: found.invoiceId } })
}
</script>

<template>
  <div class="container-kazuki flex flex-col items-center gap-8 py-14">
    <div class="max-w-lg text-center">
      <h1 class="font-display text-2xl font-bold text-white sm:text-3xl">Cek Invoice Kamu dengan Mudah</h1>
      <p class="mt-3 text-sm text-slate-400 sm:text-base">Lihat status dan detail transaksi kamu menggunakan nomor invoice.</p>
    </div>

    <div class="card w-full max-w-lg p-6 sm:p-8">
      <label class="mb-1.5 block text-sm font-medium text-slate-300">Nomor Invoice</label>
      <div class="relative">
        <input
          v-model="invoiceInput"
          type="text"
          placeholder="Contoh: KZ260818ABCDEF"
          class="input-field pr-12"
          @keyup.enter="search"
        />
        <button class="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 hover:bg-white/5 hover:text-slate-300" @click="pasteFromClipboard">
          📋
        </button>
      </div>
      <p v-if="error" class="mt-2 rounded-lg bg-red-500/10 p-2.5 text-xs text-red-400">{{ error }}</p>
      <button class="btn-primary mt-4 w-full" @click="search">Cari Invoice</button>

      <div v-if="transactionStore.history.length" class="mt-6 border-t border-white/5 pt-5">
        <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Transaksi Terakhir</p>
        <button
          v-for="tx in transactionStore.history.slice(0, 3)"
          :key="tx.invoiceId"
          class="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm text-slate-300 hover:bg-white/5"
          @click="router.push({ name: 'invoice-detail', params: { invoiceId: tx.invoiceId } })"
        >
          <span class="font-mono text-xs">{{ tx.invoiceId }}</span>
          <span class="text-xs text-slate-500">{{ tx.gameName }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
