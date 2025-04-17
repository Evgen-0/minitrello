import { defineStore } from 'pinia'
import axios from '@/lib/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: number
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User|null>(null)
  const isLoading = ref(false)

  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie')
  }

  const login = async (email: string, password: string) => {
    await csrf()
    await axios.post('/api/login', { email, password })
    await fetchUser()
  }

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    await csrf()
    await axios.post('/api/register', { name, email, password, password_confirmation })
    await fetchUser()
  }

  const fetchUser = async () => {
    isLoading.value = true
    try {
      const res = await axios.get('/api/user')
      user.value = res.data
    } catch (e) {
      user.value = null
      console.error('Error fetching user:', e)
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    await axios.post('/api/logout')
    user.value = null

    const router = useRouter()
    await router.push('/login')
  }

  return { user, isLoading, login, register, fetchUser, logout }
})
