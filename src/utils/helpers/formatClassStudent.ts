export const formatClassStudent = (
  number: number,
  weekDay: string,
  classTime: string,
) => {
  const date = new Date(`1970-01-01T${classTime}`);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padEnd(2, "0");
  return `${number} класс ${weekDay.toLowerCase()} ${hours}:${minutes}`;
};
