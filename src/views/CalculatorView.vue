<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatIDR } from '@/composables/useCurrency'

type Mode = 'winrate' | 'wheel' | 'season'
const activeMode = ref<Mode>('winrate')

const modes: { value: Mode; icon: string; title: string; desc: string }[] = [
  { value: 'winrate', icon: '📈', title: 'Win Rate', desc: 'Hitung total match yang harus dimenangkan untuk mencapai target win rate.' },
  { value: 'wheel', icon: '🎡', title: 'Magic Wheel', desc: 'Estimasi total diamond maksimal untuk mendapatkan item incaran dari roda keberuntungan.' },
  { value: 'season', icon: '🏅', title: 'Season Pass', desc: 'Estimasi total poin yang dibutuhkan untuk mencapai tier tertinggi season pass.' }
]

// Win rate calculator
const currentWins = ref(40)
const currentTotal = ref(80)
const targetWinRate = ref(60)

const matchesNeeded = computed(() => {
  const w = currentWins.value
  const t = currentTotal.value
  const target = targetWinRate.value / 100
  if (target >= 1) return Infinity
  const needed = Math.ceil((target * t - w) / (1 - target))
  return Math.max(needed, 0)
})

const projectedWinRate = computed(() => {
  const totalAfter = currentTotal.value + Math.max(matchesNeeded.value, 0)
  const winsAfter = currentWins.value + Math.max(matchesNeeded.value, 0)
  return totalAfter > 0 ? ((winsAfter / totalAfter) * 100).toFixed(1) : '0.0'
})

// Magic wheel calculator
const wheelPoint = ref(50)
const diamondPerPoint = 100
const wheelDiamond = computed(() => wheelPoint.value * diamondPerPoint)
const wheelPrice = computed(() => Math.round((wheelDiamond.value / 700) * 149000))

// Season pass calculator
const currentTier = ref(20)
const targetTier = ref(50)
const pointsPerTier = 120
const pricePer1000 = 15000

const seasonPointsNeeded = computed(() => Math.max(targetTier.value - currentTier.value, 0) * pointsPerTier)
const seasonPrice = computed(() => Math.round((seasonPointsNeeded.value / 1000) * pricePer1000))
</script>

<template>
  <div class="container-kazuki flex flex-col gap-8 py-10">
    <div class="text-center">
      <span class="badge mx-auto mb-3 w-fit bg-kazuki-500/15 text-kazuki-300">Kazuki Estimator</span>
      <h1 class="section-title">Rencanakan Top Up-mu Lebih Presisi</h1>
      <p class="mx-auto mt-2 max-w-xl text-sm text-slate-400">
        Gunakan kalkulator berikut untuk memperkirakan kebutuhan diamond atau poin sebelum top up.
      </p>
    </div>

    <div class="mx-auto grid w-full max-w-3xl gap-3 sm:grid-cols-3">
      <button
        v-for="mode in modes"
        :key="mode.value"
        class="card flex flex-col items-start gap-2 p-4 text-left transition-colors"
        :class="activeMode === mode.value ? 'border-kazuki-400 bg-kazuki-500/10' : 'hover:border-kazuki-400/30'"
        @click="activeMode = mode.value"
      >
        <span class="text-2xl">{{ mode.icon }}</span>
        <p class="text-sm font-semibold text-white">{{ mode.title }}</p>
        <p class="text-xs text-slate-400">{{ mode.desc }}</p>
      </button>
    </div>

    <!-- Win Rate -->
    <div v-if="activeMode === 'winrate'" class="card mx-auto w-full max-w-2xl p-6 sm:p-8">
      <h2 class="mb-1 font-display text-lg font-semibold text-white">Kalkulator Win Rate</h2>
      <p class="mb-6 text-sm text-slate-400">Hitung berapa match kemenangan beruntun yang dibutuhkan untuk mencapai target win rate.</p>
      <div class="grid gap-4 sm:grid-cols-3">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-300">Total Kemenangan Saat Ini</label>
          <input v-model.number="currentWins" type="number" min="0" class="input-field" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-300">Total Match Saat Ini</label>
          <input v-model.number="currentTotal" type="number" min="0" class="input-field" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-300">Target Win Rate (%)</label>
          <input v-model.number="targetWinRate" type="number" min="1" max="99" class="input-field" />
        </div>
      </div>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="card bg-base-800 p-4 text-center">
          <p class="text-xs text-slate-400">Match Menang Beruntun Dibutuhkan</p>
          <p class="mt-1 font-display text-2xl font-bold gradient-text">
            {{ Number.isFinite(matchesNeeded) ? matchesNeeded : '∞' }}
          </p>
        </div>
        <div class="card bg-base-800 p-4 text-center">
          <p class="text-xs text-slate-400">Win Rate Setelahnya</p>
          <p class="mt-1 font-display text-2xl font-bold text-white">{{ projectedWinRate }}%</p>
        </div>
      </div>
    </div>

    <!-- Magic Wheel -->
    <div v-else-if="activeMode === 'wheel'" class="card mx-auto w-full max-w-2xl p-6 sm:p-8">
      <h2 class="mb-1 font-display text-lg font-semibold text-white">Kalkulator Magic Wheel</h2>
      <p class="mb-6 text-sm text-slate-400">Geser sesuai titik keberuntungan untuk melihat estimasi diamond maksimal yang dibutuhkan.</p>
      <input v-model.number="wheelPoint" type="range" min="0" max="100" class="w-full accent-kazuki-500" />
      <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-slate-400">Poin Keberuntungan Kamu</p>
          <p class="font-display text-2xl font-bold text-white">{{ wheelPoint }}</p>
        </div>
        <div class="text-left sm:text-right">
          <p class="text-sm text-slate-400">Estimasi Maksimal Diamond</p>
          <p class="font-display text-2xl font-bold gradient-text">{{ wheelDiamond.toLocaleString('id-ID') }} 💎</p>
        </div>
      </div>
      <div class="mt-5 rounded-xl bg-base-800 p-4 text-center">
        <p class="text-xs text-slate-400">Estimasi Biaya Top Up</p>
        <p class="mt-1 font-display text-xl font-bold text-white">{{ formatIDR(wheelPrice) }}</p>
      </div>
      <router-link to="/games" class="btn-primary mt-5 w-full">Top Up Diamond Sekarang</router-link>
    </div>

    <!-- Season Pass -->
    <div v-else class="card mx-auto w-full max-w-2xl p-6 sm:p-8">
      <h2 class="mb-1 font-display text-lg font-semibold text-white">Kalkulator Season Pass</h2>
      <p class="mb-6 text-sm text-slate-400">Estimasi poin dan biaya yang dibutuhkan untuk mencapai tier tertinggi season pass.</p>
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-300">Tier Saat Ini</label>
          <input v-model.number="currentTier" type="number" min="1" max="100" class="input-field" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-300">Target Tier</label>
          <input v-model.number="targetTier" type="number" min="1" max="100" class="input-field" />
        </div>
      </div>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="card bg-base-800 p-4 text-center">
          <p class="text-xs text-slate-400">Poin Dibutuhkan</p>
          <p class="mt-1 font-display text-2xl font-bold gradient-text">{{ seasonPointsNeeded.toLocaleString('id-ID') }}</p>
        </div>
        <div class="card bg-base-800 p-4 text-center">
          <p class="text-xs text-slate-400">Estimasi Biaya</p>
          <p class="mt-1 font-display text-2xl font-bold text-white">{{ formatIDR(seasonPrice) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
