<script setup lang="ts">
import { computed } from 'vue'
import type { TransactionStatus } from '@/types'

const props = defineProps<{ status: TransactionStatus }>()

const config = computed(() => {
  switch (props.status) {
    case 'success':
      return { label: 'Berhasil', class: 'bg-emerald-500/15 text-emerald-400' }
    case 'pending':
      return { label: 'Menunggu Pembayaran', class: 'bg-amber-500/15 text-amber-400' }
    case 'processing':
      return { label: 'Diproses', class: 'bg-sky-500/15 text-sky-400' }
    case 'failed':
      return { label: 'Gagal', class: 'bg-red-500/15 text-red-400' }
    default:
      return { label: props.status, class: 'bg-slate-500/15 text-slate-300' }
  }
})
</script>

<template>
  <span class="badge" :class="config.class">{{ config.label }}</span>
</template>
