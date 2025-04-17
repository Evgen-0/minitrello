<script setup lang="ts">
import { useLoader } from '@/providers/LoaderProvider'
const { isLoading } = useLoader()
</script>

<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 bg-white/60 flex items-center justify-center z-50"
  >
    <div class="text-gray-700 text-lg animate-pulse">
      Завантаження...
    </div>
  </div>
</template>
