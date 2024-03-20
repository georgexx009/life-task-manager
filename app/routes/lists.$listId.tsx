import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { getTasks } from "~/repo";
import { TasksList } from "~/components/tasks-list";
import { BasicLayout } from "~/components/basic-layout";
import { TaskForm, action as taskFormAction } from "~/components/task-form";

import stylesHref from "./_index.css";
import { Switch } from "@radix-ui/themes";
import { useState } from "react";

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
  const [active, setActive] = useState(false)

  return (
    <BasicLayout>
      <div className="list-control">
        <Link to="/">
          Back
        </Link>
        <div className="list-control">
          Active:
          <Switch checked={active} onCheckedChange={val => setActive(val)} /> 
        </div>
        <TaskForm isUpdate={false} />
      </div>

      <div className="cards-list">
        <TasksList tasks={tasks} active={active} />
      </div>
    </BasicLayout>
  );
}
