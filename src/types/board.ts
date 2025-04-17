export interface Task {
  id: number
  title: string
  description?: string
  list_id: number
  priority?: 'low' | 'medium' | 'high'
  order?: number
}

export interface List {
  id: number
  title: string
  board_id?: number
  tasks: Task[]
  order?: number
}

export interface Board {
  id: number
  title: string
  user_id: number
  lists: List[]
}

