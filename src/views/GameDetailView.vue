<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getGameBySlug, games } from '@/data/games'
import { useTransactionStore } from '@/stores/transaction'
import { formatIDR } from '@/composables/useCurrency'
import GameCover from '@/components/common/GameCover.vue'
import GameCard from '@/components/common/GameCard.vue'
import type { TopUpNominal } from '@/types'

const route = useRoute()
const router = useRouter()
const transactionStore = useTransactionStore()

const game = computed(() => getGameBySlug(route.params.slug as string))

const playerId = ref('')
const serverId = ref('')
const selectedNominal = ref<TopUpNominal | null>(null)
const formError = ref('')

const relatedGames = computed(() => {
  if (!game.value) return []
  return games.filter((g) => g.category === game.value!.category && g.slug !== game.value!.slug).slice(0, 6)
})

const needsServerId = computed(() => game.value?.idFields.some((f) => f.key === 'serverId') ?? false)

function selectNominal(nominal: TopUpNominal) {
  selectedNominal.value = nominal
  formError.value = ''
}

function proceedToCheckout() {
  if (!game.value) return
  if (!playerId.value.trim()) {
    formError.value = `${game.value.idFields[0]?.label ?? 'ID'} wajib diisi.`
    return
  }
  if (needsServerId.value && !serverId.value.trim()) {
    formError.value = 'Server ID wajib diisi.'
    return
  }
  if (!selectedNominal.value) {
    formError.value = 'Pilih nominal top up terlebih dahulu.'
    return
  }
  transactionStore.setDraftGame(game.value)
  transactionStore.setDraftNominal(selectedNominal.value)
  transactionStore.setDraftIds(playerId.value.trim(), serverId.value.trim())
  router.push({ name: 'checkout' })
}
</script>

<template>
  <div v-if="game" class="container-kazuki flex flex-col gap-8 py-8">
    <!-- Breadcrumb -->
    <nav class="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
      <router-link to="/" class="hover:text-slate-300">Beranda</router-link>
      <span>/</span>
      <router-link to="/games" class="hover:text-slate-300">Game</router-link>
      <span>/</span>
      <span class="text-slate-300">{{ game.name }}</span>
    </nav>

    <!-- Header -->
    <div class="flex flex-col gap-6 sm:flex-row">
      <GameCover
        :icon="game.icon"
        :from="game.gradientFrom"
        :to="game.gradientTo"
        :label="game.name"
        size="lg"
        class="h-32 w-32 shrink-0 sm:h-40 sm:w-40"
      />
      <div class="flex flex-1 flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <span class="badge bg-kazuki-500/15 text-kazuki-300">{{ game.categoryLabel }}</span>
          <span v-if="game.isNew" class="badge bg-neon-lime/90 text-base-950">Baru</span>
          <span v-if="game.isPopular" class="badge bg-neon-pink/90 text-white">🔥 Populer</span>
        </div>
        <h1 class="font-display text-2xl font-bold text-white sm:text-3xl">{{ game.name }}</h1>
        <p class="text-sm text-slate-400">Publisher: {{ game.publisher }}</p>
        <div class="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <span class="flex items-center gap-1"><span class="text-neon-gold">★</span> {{ game.rating.toFixed(1) }} ({{ game.reviewCount.toLocaleString('id-ID') }} ulasan)</span>
          <span>{{ game.soldCount.toLocaleString('id-ID') }}+ terjual</span>
        </div>
        <p class="max-w-2xl text-sm leading-relaxed text-slate-400">{{ game.description }}</p>
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div class="flex flex-col gap-8">
        <!-- Step 1: ID -->
        <section class="card p-5 sm:p-6">
          <div class="mb-4 flex items-center gap-2">
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-kazuki-gradient text-xs font-bold text-white">1</span>
            <h2 class="font-display text-lg font-semibold text-white">Masukkan Data Akun</h2>
          </div>
          <div class="grid gap-4" :class="needsServerId ? 'sm:grid-cols-2' : ''">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-300">{{ game.idFields[0]?.label }}</label>
              <input v-model="playerId" type="text" class="input-field" :placeholder="game.idFields[0]?.placeholder" />
            </div>
            <div v-if="needsServerId">
              <label class="mb-1.5 block text-sm font-medium text-slate-300">{{ game.idFields[1]?.label }}</label>
              <input v-model="serverId" type="text" class="input-field" :placeholder="game.idFields[1]?.placeholder" />
            </div>
          </div>
          <p class="mt-3 rounded-lg bg-base-800/70 p-3 text-xs leading-relaxed text-slate-400">💡 {{ game.helpText }}</p>
        </section>

        <!-- Step 2: Nominal -->
        <section class="card p-5 sm:p-6">
          <div class="mb-4 flex items-center gap-2">
            <span class="flex h-7 w-7 items-center justify-center rounded-full bg-kazuki-gradient text-xs font-bold text-white">2</span>
            <h2 class="font-display text-lg font-semibold text-white">Pilih Nominal Top Up</h2>
          </div>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <button
              v-for="nominal in game.nominals"
              :key="nominal.id"
              class="relative flex flex-col items-start gap-1 rounded-xl border p-3.5 text-left transition-all"
              :class="
                selectedNominal?.id === nominal.id
                  ? 'border-kazuki-400 bg-kazuki-500/10 shadow-glow'
                  : 'border-white/10 bg-base-800 hover:border-kazuki-400/40'
              "
              @click="selectNominal(nominal)"
            >
              <span v-if="nominal.isBestValue" class="badge absolute -top-2 right-2 bg-neon-lime text-base-950">Terlaris</span>
              <span v-else-if="nominal.isPopular" class="badge absolute -top-2 right-2 bg-neon-pink text-white">Favorit</span>
              <span class="text-sm font-semibold text-white">{{ nominal.label }}</span>
              <span v-if="nominal.bonus" class="text-[11px] font-medium text-neon-lime">{{ nominal.bonus }}</span>
              <span class="mt-1 text-sm font-bold text-kazuki-300">{{ formatIDR(nominal.price) }}</span>
              <span v-if="nominal.originalPrice" class="text-xs text-slate-500 line-through">{{ formatIDR(nominal.originalPrice) }}</span>
            </button>
          </div>
        </section>
      </div>

      <!-- Summary -->
      <aside class="h-fit lg:sticky lg:top-24">
        <div class="card flex flex-col gap-4 p-5 sm:p-6">
          <h3 class="font-display text-lg font-semibold text-white">Ringkasan Pesanan</h3>
          <div class="flex items-center gap-3 rounded-xl bg-base-800 p-3">
            <GameCover :icon="game.icon" :from="game.gradientFrom" :to="game.gradientTo" size="sm" rounded="rounded-lg" class="h-12 w-12 shrink-0" />
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold text-white">{{ game.name }}</p>
              <p class="truncate text-xs text-slate-400">{{ playerId || 'Player ID belum diisi' }} <span v-if="serverId">({{ serverId }})</span></p>
            </div>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">Item</span>
            <span class="font-medium text-white">{{ selectedNominal?.label ?? '—' }}</span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-slate-400">Harga</span>
            <span class="font-semibold text-white">{{ selectedNominal ? formatIDR(selectedNominal.price) : '—' }}</span>
          </div>
          <p v-if="formError" class="rounded-lg bg-red-500/10 p-2.5 text-xs text-red-400">{{ formError }}</p>
          <button class="btn-primary w-full" @click="proceedToCheckout">Lanjut ke Pembayaran</button>
          <p class="text-center text-[11px] text-slate-500">Dengan melanjutkan, kamu menyetujui Syarat & Ketentuan KazukiStore.</p>
        </div>
      </aside>
    </div>

    <section v-if="relatedGames.length">
      <h2 class="section-title mb-5">Game Serupa</h2>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
        <GameCard v-for="related in relatedGames" :key="related.slug" :game="related" />
      </div>
    </section>
  </div>

  <div v-else class="container-kazuki flex flex-col items-center gap-4 py-24 text-center">
    <span class="text-5xl">🕹️</span>
    <h1 class="font-display text-xl font-semibold text-white">Game Tidak Ditemukan</h1>
    <p class="text-sm text-slate-400">Game yang kamu cari mungkin sudah tidak tersedia.</p>
    <router-link to="/games" class="btn-primary">Lihat Semua Game</router-link>
  </div>
</template>
