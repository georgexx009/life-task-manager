import { Card, Heading, IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { Task } from "~/types";
import { useFetcher } from "@remix-run/react";
import { TaskForm } from "./task-form";
import { isActive } from "~/date";

interface TasksListProps {
  tasks: Task[];
  active: boolean
}

export function TasksList({ tasks, active }: TasksListProps) {
  const fetcher = useFetcher();

  const renderActiveTasks = () => {
    return tasks.filter((task) => {
      if (task.start && task.end) {
        return isActive(task.start, task.end)
      }
      return false
    })
  }

  const tasksToRender = active
    ? renderActiveTasks()
    : tasks;

  return tasksToRender.map((task) => (
    <Card>
      <div className="row flex-space-between">
        <Heading size="4">{task.name}</Heading>
        <div className="row horizontal-items-space">
          <TaskForm isUpdate task={task} />

          <fetcher.Form method="delete" action={`/api/tasks/${task.id}`}>
            <IconButton color="red">
              <TrashIcon />
            </IconButton>
          </fetcher.Form>
        </div>
      </div>
    </Card>
  ));
}
