# Life Task Manager
Being adult means to have a lot of things to remember to do.
If you forget about something there'll be consequences. There is no mon or dad saving you.
But having a list with all the things whe should do can be overwhelming.
Not all things are important at the same time. Through time (hrs, days, month) and places,
the important things may change. It's like bringing work problems home, you won't fully rest.

# Goal
An app to remember things without feeling overwelm.

# Feats
## Lists
Different ToDo lists.
- work
- payments
- adult/life
- birthdays

## Running out of - lists
- car gas
- cash
- clean clothes

## Task attributes
- range of time to do a task
- payments are repeated in a monthly basis
- to do some day(not sure when I'll be in the mood)
- to do this month
- to do as soon as possible
- chained tasks

## Reminders
- to do before work (1 day before)
- to do at work
- to do through day (2/3 reminders)
- you'll do it next week or in 2 days

## Special feats
- Automate round checking through important things in the morning
- Quick check before you go out
  - errands pending
  - carry with you dependending where are you going
- quick overview menu, so when you're in the run it's fast to know what to remember

---

# MVP
Lists names are static, no CRUD for lists. Tasks have CRUD operations.

## Lists
- Running out of
- payment
- adult/life
- birthdays

## Task attributes
- range of time to do a task
- repeat monthly basis

## Special feats
- quick overview menu

---

# Technical details
- one endpoint to return all the data

## Data schema
list
- name

task
- name
- list id owner
- range time to do task
- repeat montly (which day)

*In first steps using a csv, replace the list id owner can be the name from the list with -*

## UI
- starts with a list of the lists
- click a list and opens the tasks, back button at the bottom
- update and create task is a modal

## Endpoints
- / - GET - return an object { [list]: { ...tasks }}
- / - POST - creates task task
- /:taskID - PUT - updates task
- /:taskID - DELETE - deletes task

## Architecture
### Server
Two layers, controller+service and repo (persistance layer)

