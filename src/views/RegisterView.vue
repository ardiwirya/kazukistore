<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  fullName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const error = ref('')
const isSubmitting = ref(false)

function validate(): string | null {
  if (!form.fullName.trim()) return 'Nama lengkap wajib diisi.'
  if (!form.username.trim()) return 'Username wajib diisi.'
  if (!form.email.includes('@')) return 'Masukkan alamat email yang valid.'
  if (form.phone.replace(/\D/g, '').length < 9) return 'Nomor WhatsApp tidak valid.'
  if (form.password.length < 6) return 'Kata sandi minimal 6 karakter.'
  if (form.password !== form.confirmPassword) return 'Konfirmasi kata sandi tidak cocok.'
  if (!form.agree) return 'Kamu harus menyetujui Syarat dan Ketentuan.'
  return null
}

function submit() {
  const validationError = validate()
  if (validationError) {
    error.value = validationError
    return
  }
  error.value = ''
  isSubmitting.value = true
  setTimeout(() => {
    auth.register({
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      phone: `+62${form.phone.replace(/\D/g, '').replace(/^0/, '')}`
    })
    isSubmitting.value = false
    router.push({ name: 'home' })
  }, 500)
}
</script>

<template>
  <div class="container-kazuki flex min-h-[70vh] items-center justify-center py-12">
    <div class="w-full max-w-lg">
      <div class="card p-6 sm:p-8">
        <div class="mb-6 text-center">
          <span class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-kazuki-gradient shadow-glow">
            <svg viewBox="0 0 24 24" class="h-6 w-6 text-white" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 4v16M7 12l9-8M7 12l9 8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <h1 class="font-display text-xl font-bold text-white">Daftar Akun KazukiStore</h1>
          <p class="mt-1 text-sm text-slate-400">Gratis dan hanya butuh waktu kurang dari 1 menit.</p>
        </div>

        <form class="flex flex-col gap-4" @submit.prevent="submit">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-300">Nama Lengkap</label>
              <input v-model="form.fullName" type="text" class="input-field" placeholder="Nama lengkap" />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-300">Username</label>
              <input v-model="form.username" type="text" class="input-field" placeholder="Username" />
            </div>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-300">Alamat Email</label>
            <input v-model="form.email" type="email" class="input-field" placeholder="nama@email.com" />
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-300">Nomor WhatsApp</label>
            <div class="flex gap-2">
              <span class="input-field flex w-20 shrink-0 items-center justify-center !px-2 text-sm">🇮🇩 +62</span>
              <input v-model="form.phone" type="tel" class="input-field" placeholder="8123456789" />
            </div>
          </div>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-300">Kata Sandi</label>
              <div class="relative">
                <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="input-field pr-11" placeholder="Kata sandi" />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300" @click="showPassword = !showPassword">
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-300">Konfirmasi Kata Sandi</label>
              <div class="relative">
                <input v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="input-field pr-11" placeholder="Ulangi kata sandi" />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300" @click="showConfirmPassword = !showConfirmPassword">
                  {{ showConfirmPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>
          </div>
          <label class="flex items-start gap-2 text-sm text-slate-400">
            <input v-model="form.agree" type="checkbox" class="mt-0.5 rounded border-white/20 bg-base-800 text-kazuki-500 focus:ring-kazuki-400" />
            Saya setuju dengan <span class="text-kazuki-300">Syarat dan Ketentuan</span> dan <span class="text-kazuki-300">Kebijakan Privasi</span> KazukiStore.
          </label>
          <p v-if="error" class="rounded-lg bg-red-500/10 p-2.5 text-xs text-red-400">{{ error }}</p>
          <button type="submit" class="btn-primary w-full" :disabled="isSubmitting">
            {{ isSubmitting ? 'Membuat akun...' : 'Daftar Sekarang' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-slate-400">
          Sudah memiliki akun? <router-link to="/login" class="font-semibold text-kazuki-300 hover:text-kazuki-200">Masuk di sini</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
