import { createClient } from "@supabase/supabase-js";
import { List, Task } from "./types";

import mockTasks from '../mock-data/tasks.json'
import mockLists from '../mock-data/lists.json'
const isMock = () => process.env.ENV === ' local'

const supabase = createClient(process.env.SUPABASE_PROJECT_URL!, process.env.SUPABASE_ANON_KEY!);

export const getLists = async (): Promise<List[]> => {
  if (isMock()) return mockLists as unknown as List[]

  const res = await supabase.from('lists').select()
  if (!res.data) return []  
  return res.data
}

export const getTasks = async (listId?: string): Promise<Task[]> => {
  if (isMock()) return mockTasks as unknown as Task[]

  let res
  if (listId) {
    const list = await supabase.from('lists').select().eq('name', listId)
    if (!list.data) return []
    res = await supabase.from('tasks').select().eq('list_id', list.data[0].id)
  } else {
    res = await supabase.from('tasks').select()
  }
  if (!res.data) return []

  return res.data?.map<Task>(task => {
    return {
      id: task.id,
      name: task.name,
      listId: task.list_id,
      rangeTimeToDo: task.range_time_to_do,
      repeatMonthly: task.repeat_monthly
    }
  })
}

export const createTask = async (task: Omit<Task, 'id'>): Promise<boolean> => {
  const taskMapped = {
    name: task.name,
    list_id: task.listId,
    range_time_to_do: task.rangeTimeToDo,
    repeat_monthly: task.repeatMonthly
  }
  const { error } = await supabase.from('tasks').insert(taskMapped)
  if (error) {
    console.log('error', error)
    return false
  }
  return true
}
