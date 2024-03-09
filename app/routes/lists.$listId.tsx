import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getTasks } from "~/repo";
import { TasksList } from "~/components/tasks-list";
import { BasicLayout } from "~/components/basic-layout";
import { TaskForm, action as taskFormAction } from "~/components/task-form";

import stylesHref from "./_index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesHref },
];

export const action = taskFormAction;

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const tasks = await getTasks(params.listId);
  return json({ tasks });
};

export default function Index() {
  const { tasks } = useLoaderData<typeof loader>();

  return (
    <BasicLayout>
      <div className="list-control">
        <TaskForm isUpdate={false}/>
      </div>
      <div className="cards-list">
        <TasksList tasks={tasks} />
      </div>
    </BasicLayout>
  );
}
