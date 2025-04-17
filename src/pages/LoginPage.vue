<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const submit = async () => {
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    await router.push('/')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Невірні дані'
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4">Вхід</h2>
    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" />
      <input v-model="password" type="password" placeholder="Пароль" class="w-full p-2 border rounded" />

      <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

      <button type="submit" class="bg-blue-600 text-white w-full py-2 rounded">Увійти</button>

      <p class="text-sm mt-2 text-center">
        Ще не маєш акаунту?
        <router-link to="/register" class="text-blue-600 underline">Реєстрація</router-link>
      </p>
    </form>
  </div>
</template>
