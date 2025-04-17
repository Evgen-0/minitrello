<script setup lang="ts">
import Sortable from 'sortablejs'
import { onMounted, ref } from 'vue'
import TaskCard from '@/components/Board/TaskCard.vue'
import type { Task } from '@/types/board'
import AddTaskForm from '@/components/AddTaskForm.vue'

const props = defineProps<{
  listId: number
  title: string
  tasks: Task[]
}>()

const emit = defineEmits<{
  (e: 'move', payload: {
    taskId: number
    fromListId: number
    toListId: number
    newIndex: number
  }): void
}>()

const listRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!listRef.value) return

  Sortable.create(listRef.value, {
    group: 'tasks',
    animation: 150,
    ghostClass: 'opacity-50',
    onEnd(evt) {
      const taskId = Number(evt.item?.dataset.id)
      if (!taskId) return

      emit('move', {
        taskId,
        fromListId: props.listId,
        toListId: Number(evt.to?.dataset.listId),
        newIndex: evt.newIndex
      })
    }
  })
})
</script>

<template>
  <div class="p-2 bg-white rounded-lg shadow-md w-[280px] max-h-[80vh] flex flex-col">
    <div class="p-2 font-bold text-lg">{{ title }}</div>

    <div
      ref="listRef"
      :data-list-id="listId"
      class="flex-1 overflow-y-auto space-y-2 p-1"
    >
      <div
        v-for="task in tasks"
        :key="task.id"
        :data-id="task.id"
      >
        <TaskCard
          :task="task"
          @created="onTaskCreated"
        />
      </div>
    </div>

    <div class="mt-2 border-t pt-2">
      <AddTaskForm :list-id="listId" @created="task => emit('move', { taskId: task.id, fromListId: listId, toListId: listId, newIndex: tasks.length })" />
    </div>
  </div>
</template>
