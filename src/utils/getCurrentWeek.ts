export const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function getCurrentWeek() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const firstDayOfWeek = new Date(today);
  const lastDayOfWeek = new Date(today);

  // Set the first day of the week (Monday)
  firstDayOfWeek.setDate(
    today.getDate() - currentDay + (currentDay === 0 ? -6 : 1),
  );

  // Set the last day of the week (Sunday)
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

  // Create an array to store all the days in the week
  const weekDays = [];

  // Iterate over each day and add it to the array
  for (let i = 0; i <= 6; i++) {
    const day = new Date(firstDayOfWeek);
    day.setDate(firstDayOfWeek.getDate() + i);
    weekDays.push(day);
  }

  return weekDays;
}
