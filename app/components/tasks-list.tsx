import { Card, Heading } from "@radix-ui/themes";
import { Task } from "~/types";

export function TasksList({ tasks }: { tasks: Task[] }) {
  return tasks.map((task) => (
    <Card>
      <Heading size="4">{task.name}</Heading>
    </Card>
  ));
}
