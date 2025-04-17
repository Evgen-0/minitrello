<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import router from '@/router'
import GlobalLoader from '@/components/GlobalLoader.vue'
import { createLoader } from '@/providers/LoaderProvider.ts'

createLoader()

const auth = useAuthStore()

onMounted(() => {
  // Тягнемо користувача, якщо вже залогінений (куки працюють)
  if (!auth.user) {
    auth.fetchUser().catch(() => {})
  }
})
const handleLogout = async () => {
  await auth.logout()
  await router.push('/login') // ⬅️ тут редірект
}
</script>

<template>
  <div v-if="auth.isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white">
    <span class="animate-pulse text-lg text-gray-500">Завантаження...</span>
  </div>

  <div v-else class="container mx-auto px-4">
    <header>
      <nav class="flex items-center justify-between py-4">
        <RouterLink to="/" class="text-2xl font-bold">Home</RouterLink>

        <!-- 🔁 Навігація -->
        <div class="flex items-center space-x-4">
          <template v-if="auth.user">
            <span class="text-sm text-gray-700">👤 {{ auth.user.name }}</span>
            <button @click="handleLogout" class="text-sm text-red-500 underline">Вийти</button>
          </template>

          <template v-else>
            <RouterLink to="/login" class="text-blue-600">Login</RouterLink>
            <RouterLink to="/register" class="text-blue-600">Register</RouterLink>
          </template>
        </div>
      </nav>
    </header>

    <GlobalLoader />
    <RouterView />
  </div>
</template>
