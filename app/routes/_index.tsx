import { useState } from 'react'
import type { MetaFunction, LinksFunction, ActionFunctionArgs } from "@remix-run/node";
import { json } from '@remix-run/node'
import { useLoaderData, Form } from '@remix-run/react'
import { Box, Button, Dialog, Heading, TextField } from '@radix-ui/themes'

import { Task } from '~/components/task'
import { getTasks, createTask } from '~/repo'
import stylesHref from './_index.css'

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const tasks = await getTasks()
  return json({ tasks })
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesHref }
]

function TaskForm() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>New Task</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Heading size='6'>Task Form</Heading>

        <Form method='post'>
          <Box py='5'>
            <Box py='2'>
              <TextField.Input name='name' placeholder='Name' />
            </Box>
            <Box py='2'>
              <TextField.Input name='listId' placeholder='List ID' />
            </Box>
          </Box>
          <Button type='submit'>Save Task</Button>
        </Form>

        <Dialog.Close>
          <Button>Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default function Index() {
  const { tasks } = useLoaderData<typeof loader>()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className='page-container'>
      <div className='content'>
        <h1>Welcome to Remix</h1>
        <div className='tasks-list-control'>
          <TaskForm />
        </div>
        <div className='tasks-list'>
          {tasks.map(task => (
            <Task key={task.id} name={task.name} listId={task.listId} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData()

  const success = await createTask({
    name: body.get('name')?.toString() || '',
    listId: body.get('listId')?.toString() || '',
    repeatMonthly: '10',
    rangeTimeToDo: '10'
  })

  const tasks = await getTasks()
  return json({ tasks })
}
