<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string
    from: string
    to: string
    label?: string
    size?: 'sm' | 'md' | 'lg'
    rounded?: string
  }>(),
  { size: 'md', rounded: 'rounded-2xl', label: undefined }
)
</script>

<template>
  <div
    :class="[rounded, size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-6xl' : 'text-4xl']"
    class="relative flex aspect-square w-full items-center justify-center overflow-hidden"
    :style="{ background: `linear-gradient(135deg, ${from}, ${to})` }"
  >
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
    <div class="pointer-events-none absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-white/10 blur-xl" />
    <span class="drop-shadow-md" aria-hidden="true">{{ icon }}</span>
    <span v-if="label" class="sr-only">{{ label }}</span>
  </div>
</template>
