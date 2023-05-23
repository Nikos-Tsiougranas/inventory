
interface DaysOfWeek {
  [key: string]: number;
}

const daysOfWeek: DaysOfWeek = {
  "sunday": 0,
  "monday": 1,
  "tuesday": 2,
  "wednesday": 3,
  "thursday": 4,
  "friday": 5,
  "saturday": 6
};

export function resolveNumberOfDay(day: string): number {
  if (daysOfWeek[day.toLowerCase()] == undefined) throw new Error(`Not a valid day: ${day}`)
  return daysOfWeek[day.toLowerCase()]
}