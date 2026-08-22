import { defineStore } from 'pinia'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

const STORAGE_KEY = 'kazukistore_user'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    hydrate() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try {
          this.user = JSON.parse(raw) as User
          this.isAuthenticated = true
        } catch {
          this.user = null
        }
      }
    },
    login(identifier: string): { success: boolean; message: string } {
      // Simulated authentication — no backend involved.
      if (!identifier || identifier.trim().length < 3) {
        return { success: false, message: 'Masukkan email/username yang valid.' }
      }
      const mockUser: User = {
        id: 'usr-' + Date.now(),
        fullName: 'Ardi Wirya',
        username: identifier.includes('@') ? identifier.split('@')[0] : identifier,
        email: identifier.includes('@') ? identifier : `${identifier}@kazukistore.demo`,
        phone: '+62 812-0000-0000',
        joinedAt: new Date().toISOString(),
        totalTransactions: 0
      }
      this.user = mockUser
      this.isAuthenticated = true
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
      return { success: true, message: 'Berhasil masuk.' }
    },
    register(payload: { fullName: string; username: string; email: string; phone: string }) {
      const newUser: User = {
        id: 'usr-' + Date.now(),
        fullName: payload.fullName,
        username: payload.username,
        email: payload.email,
        phone: payload.phone,
        joinedAt: new Date().toISOString(),
        totalTransactions: 0
      }
      this.user = newUser
      this.isAuthenticated = true
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
      return { success: true, message: 'Akun berhasil dibuat.' }
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem(STORAGE_KEY)
    }
  }
})
