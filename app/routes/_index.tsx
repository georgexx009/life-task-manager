import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Task } from '~/components/task'
import { getTasks } from '~/repo'
import stylesHref from './_index.css'

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const tasks = await getTasks()
  console.log(tasks)
  return json({ tasks })
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesHref }
]

export default function Index() {
  const { tasks } = useLoaderData<typeof loader>()

  return (
    <div className='page-container'>
      <div className='content'>
        <h1>Welcome to Remix</h1>
        <div className='tasks-list'>
          {tasks.map(task => (
            <Task name={task.name} listId={task.listId} />
          ))}
        </div>
      </div>
    </div>
  );
}
