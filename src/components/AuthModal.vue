<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const isLogin = ref(true)
const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const submit = async () => {
  error.value = ''
  try {
    if (isLogin.value) {
      await auth.login(email.value, password.value)
    } else {
      await auth.register(name.value, email.value, password.value)
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Помилка'
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
      <h2 class="text-2xl font-bold mb-4">
        {{ isLogin ? 'Вхід' : 'Реєстрація' }}
      </h2>

      <form @submit.prevent="submit" class="space-y-4">
        <div v-if="!isLogin">
          <label class="block text-sm font-medium">Ім'я</label>
          <input v-model="name" type="text" class="w-full border p-2 rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium">Email</label>
          <input v-model="email" type="email" class="w-full border p-2 rounded" />
        </div>

        <div>
          <label class="block text-sm font-medium">Пароль</label>
          <input v-model="password" type="password" class="w-full border p-2 rounded" />
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {{ isLogin ? 'Увійти' : 'Зареєструватись' }}
        </button>

        <div class="text-center text-sm mt-2">
          <span>
            {{ isLogin ? 'Немає акаунта?' : 'Вже є акаунт?' }}
          </span>
          <button
            type="button"
            class="text-blue-600 underline ml-1"
            @click="isLogin = !isLogin"
          >
            {{ isLogin ? 'Реєстрація' : 'Вхід' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
