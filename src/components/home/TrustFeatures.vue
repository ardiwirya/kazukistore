<script setup lang="ts">
const features = [
  { icon: '⚡', title: 'Proses Instan', desc: 'Rata-rata top up selesai dalam 1-3 detik setelah pembayaran dikonfirmasi.' },
  { icon: '🔒', title: 'Transaksi Aman', desc: 'Sistem terenkripsi dengan pemantauan transaksi selama 24 jam penuh.' },
  { icon: '💳', title: 'Metode Lengkap', desc: 'QRIS, e-wallet, virtual account, hingga retail tersedia untuk semua transaksi.' },
  { icon: '🎧', title: 'CS Siap Sedia', desc: 'Tim dukungan pelanggan siap membantu kendala top up kapan pun kamu butuh.' }
]
</script>

<template>
  <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
    <div v-for="feature in features" :key="feature.title" class="card flex flex-col gap-2 p-4 sm:p-5">
      <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-kazuki-gradient-soft text-xl">{{ feature.icon }}</span>
      <p class="text-sm font-semibold text-white">{{ feature.title }}</p>
      <p class="text-xs leading-relaxed text-slate-400">{{ feature.desc }}</p>
    </div>
  </div>
</template>
