import { Form, useFetcher, useNavigation } from "@remix-run/react";
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
import { Loader } from "./loader";
import { ReactNode, useEffect, useRef } from "react";

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
  const navigation = useNavigation();

  return (
    <BaseForm title="Create Task" loading={navigation.state !== "idle"}>
      <Form method="post">
        <Box py="5">
          <Box py="2">
            <TextField.Input name="name" placeholder="Name" />
          </Box>
        </Box>
        <Button type="submit">Save Task</Button>
      </Form>
    </BaseForm>
  );
}

function UpdateTaskForm({ task }: { task: Task }) {
  const fetcher = useFetcher();

  return (
    <BaseForm title="Update Task" loading={fetcher.state !== "idle"} isUpdate>
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
    </BaseForm>
  );
}

function BaseForm({
  title,
  children,
  loading,
  isUpdate = false,
}: {
  title: string;
  children: ReactNode;
  loading: boolean;
  isUpdate?: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!loading) {
      closeRef.current?.click();
    }
  }, [loading]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        {isUpdate ? (
          <IconButton>
            <Pencil2Icon />
          </IconButton>
        ) : (
          <Button>New Task</Button>
        )}
      </Dialog.Trigger>

      <Dialog.Content>
        <Heading size="6">{title}</Heading>
        <p>{loading && <Loader />}</p>

        {children}

        <Dialog.Close ref={closeRef}>
          <Button>Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
