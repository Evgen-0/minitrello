import axios from '@/lib/axios'
import type { Board, Task } from '@/types/board'

export async function getBoard(): Promise<Board> {
  const res = await axios.get('/api/board')
  return res.data.data
}

export async function createTask(payload: {
  title: string
  description?: string
  list_id: number
  priority?: 'low' | 'medium' | 'high'
}): Promise<Task> {
  const res = await axios.post('/api/tasks', payload)
  return res.data.data
}

export async function deleteTask(taskId: number): Promise<void> {
  await axios.delete(`/api/tasks/${taskId}`)
}

export async function moveTask(taskId: number, payload: {
  list_id: number
  order?: number
}): Promise<void> {
  await axios.put(`/api/tasks/${taskId}`, payload)
}

export async function reorderTasks(tasks: { id: number; order: number }[]): Promise<void> {
  await axios.post('/api/tasks/reorder', { tasks })
}
