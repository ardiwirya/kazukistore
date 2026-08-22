<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Slide {
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaTo: string
  gradient: string
  icon: string
}

const slides: Slide[] = [
  {
    eyebrow: 'Promo Spesial',
    title: 'Top Up Diamond Diskon Hingga 15%',
    subtitle: 'Berlaku untuk semua game MOBA & Battle Royale favoritmu, minggu ini saja.',
    ctaLabel: 'Lihat Promo',
    ctaTo: '/games',
    gradient: 'from-kazuki-600 via-kazuki-500 to-neon-pink',
    icon: '💎'
  },
  {
    eyebrow: 'Fitur Baru',
    title: 'Cek Estimasi Diamond dengan Kalkulator Zodiac',
    subtitle: 'Rencanakan top up-mu lebih presisi sebelum mengejar skin impian.',
    ctaLabel: 'Coba Kalkulator',
    ctaTo: '/kalkulator',
    gradient: 'from-sky-600 via-kazuki-500 to-kazuki-700',
    icon: '🧮'
  },
  {
    eyebrow: 'Event Komunitas',
    title: 'Naik ke Puncak Leaderboard Bulan Ini',
    subtitle: 'Top up rutin dan menangkan posisi teratas di papan peringkat KazukiStore.',
    ctaLabel: 'Lihat Leaderboard',
    ctaTo: '/leaderboard',
    gradient: 'from-neon-pink via-kazuki-600 to-sky-600',
    icon: '🏆'
  }
]

const active = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

function next() {
  active.value = (active.value + 1) % slides.length
}
function prev() {
  active.value = (active.value - 1 + slides.length) % slides.length
}
function goTo(i: number) {
  active.value = i
}

onMounted(() => {
  timer = setInterval(next, 5500)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl border border-white/5 shadow-card">
    <transition name="slide" mode="out-in">
      <div
        :key="active"
        class="relative flex min-h-[260px] flex-col justify-center gap-4 bg-gradient-to-br p-8 sm:min-h-[320px] sm:p-12"
        :class="slides[active].gradient"
      >
        <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.25),transparent_45%)]" />
        <span class="absolute right-6 top-6 hidden text-8xl opacity-30 sm:block animate-float" aria-hidden="true">{{ slides[active].icon }}</span>
        <span class="relative w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
          {{ slides[active].eyebrow }}
        </span>
        <h2 class="relative max-w-lg font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
          {{ slides[active].title }}
        </h2>
        <p class="relative max-w-md text-sm text-white/85 sm:text-base">{{ slides[active].subtitle }}</p>
        <router-link :to="slides[active].ctaTo" class="btn-primary relative mt-2 w-fit !bg-white !text-kazuki-700 shadow-none hover:!bg-slate-100">
          {{ slides[active].ctaLabel }}
        </router-link>
      </div>
    </transition>

    <button
      class="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition hover:bg-black/40 sm:flex"
      aria-label="Sebelumnya"
      @click="prev"
    >
      ‹
    </button>
    <button
      class="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition hover:bg-black/40 sm:flex"
      aria-label="Berikutnya"
      @click="next"
    >
      ›
    </button>

    <div class="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
      <button
        v-for="(slide, i) in slides"
        :key="slide.title"
        class="h-1.5 rounded-full transition-all"
        :class="i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/40'"
        :aria-label="`Slide ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.35s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
