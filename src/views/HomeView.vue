<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BoardList from '@/components/Board/BoardList.vue'
import type { Board } from '@/types/board'
import { getBoard } from '@/stores/board'

const board = ref<Board | null>(null)
const isLoading = ref(true)

onMounted(async () => {
  try {
    board.value = await getBoard()
  } catch (e) {
    console.error('Помилка при завантаженні дошки ' + e)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Моя дошка</h2>

    <div v-if="isLoading">Завантаження...</div>

    <div v-else-if="board" class="flex gap-4 overflow-x-auto">
      <BoardList
        v-for="list in board.lists"
        :key="list.id"
        :list-id="list.id"
        :title="list.title"
        :tasks="list.tasks"
      />
    </div>
  </div>
</template>
