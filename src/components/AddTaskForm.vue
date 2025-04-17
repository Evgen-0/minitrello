<script setup lang="ts">
import { ref } from 'vue'
import axios from '@/lib/axios'
import type { Task } from '@/types/board'

const props = defineProps<{
  listId: number
}>()

const emit = defineEmits<{
  (e: 'created', task: Task): void
}>()

const title = ref('')
const description = ref('')
const loading = ref(false)
const error = ref('')

const submit = async () => {
  if (!title.value.trim()) return

  loading.value = true
  error.value = ''

  try {
    const res = await axios.post('/api/tasks', {
      title: title.value,
      description: description.value,
      list_id: props.listId,
      order: 0,
    })

    emit('created', res.data.data) // нова задача
    title.value = ''
    description.value = ''
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Помилка при створенні задачі'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submit" class="space-y-2">
    <input
      v-model="title"
      type="text"
      placeholder="Нова задача"
      class="w-full p-2 border rounded text-sm"
    />
    <textarea
      v-model="description"
      placeholder="Опис (необов’язково)"
      class="w-full p-2 border rounded text-sm"
      rows="2"
    ></textarea>
    <button type="submit" class="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700" :disabled="loading">
      {{ loading ? 'Створення...' : 'Додати задачу' }}
    </button>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </form>
</template>
