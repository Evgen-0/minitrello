<script setup lang="ts">
import type { Task } from '@/types/board'
const props = defineProps<{ task: Task }>()

const emit = defineEmits<{
  (e: 'deleted', id: number): void
}>()

import { ref } from 'vue'
import { deleteTask } from '@/stores/board'

const loading = ref(false)

const handleDelete = async () => {
  if (!confirm('Точно видалити цю задачу?')) return

  loading.value = true
  try {
    await deleteTask(props.task.id)
    emit('deleted', props.task.id)
  } catch (e) {
    alert('Помилка при видаленні')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="relative p-3 bg-gray-50 rounded shadow hover:shadow-md transition cursor-pointer border-l-4"
    :class="{
      'border-green-500': task.priority === 'low',
      'border-yellow-500': task.priority === 'medium',
      'border-red-500': task.priority === 'high',
      'border-gray-300': !task.priority
    }"
  >
    <button
      @click.stop="handleDelete"
      class="absolute top-1 right-1 text-red-500 text-sm"
      :disabled="loading"
      title="Видалити"
    >
      🗑️
    </button>

    <h4 class="font-semibold text-sm truncate">{{ task.title }}</h4>
    <p v-if="task.description" class="text-xs text-gray-500 truncate">
      {{ task.description }}
    </p>
  </div>
</template>
