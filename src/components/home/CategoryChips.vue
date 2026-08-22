<script setup lang="ts">
import { categories } from '@/data/games'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

function select(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="scrollbar-none flex gap-2 overflow-x-auto pb-1">
    <button
      v-for="cat in categories"
      :key="cat.value"
      class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
      :class="
        props.modelValue === cat.value
          ? 'border-transparent bg-kazuki-gradient text-white shadow-glow'
          : 'border-white/10 bg-base-800 text-slate-300 hover:border-kazuki-400/40 hover:text-white'
      "
      @click="select(cat.value)"
    >
      {{ cat.label }}
    </button>
  </div>
</template>
