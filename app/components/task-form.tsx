import { Form } from '@remix-run/react'
import { Box, Button, Dialog, Heading, TextField } from '@radix-ui/themes'
import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from '@remix-run/node'
import { getTasks, createTask } from '~/repo'

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData()

  await createTask({
    name: body.get('name')?.toString() || '',
    listId: body.get('listId')?.toString() || '',
    repeatMonthly: '10',
    rangeTimeToDo: '10'
  })

  const tasks = await getTasks()
  return json({ tasks })
}

export function TaskForm() {
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

