import { Card, Heading, Text, Button } from '@radix-ui/themes'

interface ITask {
  // id: number
  name: string
  listId: string
  // rangeTimeToDo: string
  // repeatMonthly: string
}

export const Task = ({ name }: ITask) => {
  return (
    <Card>
      <Heading size="4">{name}</Heading>
      <Button>Delete</Button>
    </Card>
  )
}
