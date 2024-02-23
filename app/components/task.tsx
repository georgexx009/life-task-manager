import { Card, Heading, Text } from '@radix-ui/themes'

interface ITask {
  // id: number
  name: string
  listId: string
  // rangeTimeToDo: string
  // repeatMonthly: string
}

export const Task = ({ name, listId }: ITask) => {
  return (
    <Card>
      <Heading size="4">{name}</Heading>
      <Text>{listId}</Text>
    </Card>
  )
}
