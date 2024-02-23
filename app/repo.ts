import { createClient } from "@supabase/supabase-js";

import mockTasks from '../mock-data/tasks.json'
const isMock = () => process.env.ENV === ' local'

const supabase = createClient(process.env.SUPABASE_PROJECT_URL!, process.env.SUPABASE_ANON_KEY!);

interface ITask {
  id: number
  name: string
  listId: string
  rangeTimeToDo: string
  repeatMonthly: string
}

export const getTasks = async (): Promise<ITask[]> => {
  if (isMock()) return mockTasks as unknown as ITask[]

  const res = await supabase.from('tasks').select()
  if (!res.data) return []

  return res.data?.map<ITask>(task => {
    return {
      id: task.id,
      name: task.name,
      listId: task.list_id,
      rangeTimeToDo: task.range_time_to_do,
      repeatMonthly: task.repeat_monthly
    }
  })
}
