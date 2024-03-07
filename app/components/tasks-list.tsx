import { Card, Heading, IconButton } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { Task } from "~/types";
import { useFetcher } from "@remix-run/react";

interface TasksListProps {
  tasks: Task[];
}

export function TasksList({ tasks }: TasksListProps) {
  const fetcher = useFetcher()

  return tasks.map((task) => (
    <Card>
      <div className="row flex-space-between">
        <Heading size="4">{task.name}</Heading>
        <fetcher.Form method="delete" action={`/api/tasks/${task.id}`}>
          <IconButton color="red">
            <TrashIcon />
          </IconButton>
        </fetcher.Form>
      </div>
    </Card>
  ));
}
