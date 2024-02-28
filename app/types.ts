export interface List {
  id: number;
  label: string;
  name: string;
}

export interface Task {
  id: number
  name: string
  listId: string
  rangeTimeToDo: string
  repeatMonthly: string
}
