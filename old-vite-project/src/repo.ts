import { SupabaseClient } from "@supabase/supabase-js";
import { ITask } from './types'

export class Repo {
  constructor(private supabaseClient: SupabaseClient) {
  }

  async getTasks(): Promise<ITask[]> {
    const res = await this.supabaseClient.from('tasks').select()
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
}