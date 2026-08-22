<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const identifier = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const isSubmitting = ref(false)

function submit() {
  error.value = ''
  if (!password.value || password.value.length < 4) {
    error.value = 'Kata sandi minimal 4 karakter.'
    return
  }
  isSubmitting.value = true
  setTimeout(() => {
    const result = auth.login(identifier.value)
    isSubmitting.value = false
    if (!result.success) {
      error.value = result.message
      return
    }
    router.push({ name: 'home' })
  }, 500)
}
</script>

<template>
  <div class="container-kazuki flex min-h-[70vh] items-center justify-center py-12">
    <div class="w-full max-w-md">
      <div class="card p-6 sm:p-8">
        <div class="mb-6 text-center">
          <span class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-kazuki-gradient shadow-glow">
            <svg viewBox="0 0 24 24" class="h-6 w-6 text-white" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 4v16M7 12l9-8M7 12l9 8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <h1 class="font-display text-xl font-bold text-white">Masuk ke KazukiStore</h1>
          <p class="mt-1 text-sm text-slate-400">Kelola transaksi top up-mu lebih mudah.</p>
        </div>

        <form class="flex flex-col gap-4" @submit.prevent="submit">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-300">Email atau Username</label>
            <input v-model="identifier" type="text" required class="input-field" placeholder="nama@email.com" />
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-300">Kata Sandi</label>
            <div class="relative">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" required class="input-field pr-11" placeholder="Masukkan kata sandi" />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300" @click="showPassword = !showPassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 text-slate-400">
              <input type="checkbox" class="rounded border-white/20 bg-base-800 text-kazuki-500 focus:ring-kazuki-400" />
              Ingat saya
            </label>
            <span class="cursor-default text-kazuki-300">Lupa kata sandi?</span>
          </div>
          <p v-if="error" class="rounded-lg bg-red-500/10 p-2.5 text-xs text-red-400">{{ error }}</p>
          <button type="submit" class="btn-primary w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Memproses...' : 'Masuk' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-slate-400">
          Belum memiliki akun? <router-link to="/register" class="font-semibold text-kazuki-300 hover:text-kazuki-200">Daftar sekarang</router-link>
        </p>
        <p class="mt-4 rounded-lg bg-base-800/70 p-3 text-center text-[11px] leading-relaxed text-slate-500">
          Demo login: masukkan email/username apa pun (min. 3 karakter) dan kata sandi apa pun (min. 4 karakter).
        </p>
      </div>
    </div>
  </div>
</template>
