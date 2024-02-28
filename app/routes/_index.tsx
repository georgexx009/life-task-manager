import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { TaskForm, action as taskFormAction } from "~/components/task-form";
import { Lists } from "~/components/lists";
import { BasicLayout } from "~/components/basic-layout";
import { getLists } from "~/repo";
import stylesHref from "./_index.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const lists = await getLists();
  return json({ lists });
};

export const action = taskFormAction;

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesHref },
];

export default function Index() {
  const { lists } = useLoaderData<typeof loader>();

  return (
    <BasicLayout>
      <div className="tasks-list-control">
        <TaskForm />
      </div>
      <div className="cards-list">
        <Lists lists={lists} />
      </div>
    </BasicLayout>
  );
}
