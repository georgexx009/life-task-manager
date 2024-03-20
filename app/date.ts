import { TaskDate } from "./types";

export function newTaskDate(dateStr: string): TaskDate {
  const dataElements = dateStr.split("-");
  return {
    year: dataElements[0],
    month: dataElements[1],
    day: dataElements[2],
  };
}

export function toDate(date: TaskDate) {
  return new Date(`${date.year}-${date.month}-${date.day}`);
}

export function toString(date: TaskDate) {
  return `${date.year}-${date.month}-${date.day}`;
}

export function getWeekDay(date: TaskDate) {
  const d = new Date(`${date.year}-${date.month}-${date.day}`);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[d.getDay()];
}

export function isActive(date1: TaskDate, date2: TaskDate) {
  const targetDate = toDate(getToday());
  const startDate = toDate(date1);
  const endDate = toDate(date2);

  return targetDate >= startDate && targetDate <= endDate;
}

export function getToday(): TaskDate {
  return newTaskDate("2024-03-12");
}
