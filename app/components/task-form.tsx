import { Form, useFetcher } from "@remix-run/react";
import {
  Box,
  Button,
  Dialog,
  Heading,
  IconButton,
  TextField,
} from "@radix-ui/themes";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getTasks, createTask } from "~/repo";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Task } from "~/types";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const body = await request.formData();

  await createTask({
    name: body.get("name")?.toString() || "",
    listId: params.listId!,
    repeatMonthly: "10",
    rangeTimeToDo: "10",
  });

  // TODO - do we need to get again tasks?
  const tasks = await getTasks();
  return json({ tasks });
};

type UpdateProps = {
  isUpdate: true;
  task: Task;
};

type CreateProps = {
  isUpdate: false;
};

type TaskFormProps = UpdateProps | CreateProps;

export function TaskForm(props: TaskFormProps = { isUpdate: false }) {
  if (props.isUpdate) {
    return <UpdateTaskForm task={props.task} />;
  }
  return <CreateTaskForm />;
}

function CreateTaskForm() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>New Task</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Heading size="6">Task Form</Heading>

        <Form method="post">
          <Box py="5">
            <Box py="2">
              <TextField.Input name="name" placeholder="Name" />
            </Box>
          </Box>
          <Button type="submit">Save Task</Button>
        </Form>

        <Dialog.Close>
          <Button>Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}

function UpdateTaskForm({ task }: { task: Task }) {
  const fetcher = useFetcher()

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton>
          <Pencil2Icon />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content>
        <Heading size="6">Task Form</Heading>

        <fetcher.Form method="put" action={`/api/tasks/${task.id}`}>
          <Box py="5">
            <Box py="2">
              <TextField.Input
                name="name"
                placeholder="Name"
                defaultValue={task.name}
              />
            </Box>
          </Box>
          <Button type="submit">Save Task</Button>
        </fetcher.Form>

        <Dialog.Close>
          <Button>Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
