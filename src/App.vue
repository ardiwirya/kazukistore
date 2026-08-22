<script setup lang="ts">
import { onMounted } from 'vue'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useAuthStore } from '@/stores/auth'
import { useTransactionStore } from '@/stores/transaction'

const auth = useAuthStore()
const transactions = useTransactionStore()

onMounted(() => {
  auth.hydrate()
  transactions.hydrate()
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-base-950">
    <AppNavbar />
    <main class="flex-1">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </router-view>
    </main>
    <AppFooter />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.18s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
