import { months } from "@utils";

export function formatFinishDate(dateString: string) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Некорректный формат даты. Ожидается YYYY-MM-DD");
  }

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const monthName = months[monthIndex];

  return `до ${day} ${monthName}`;
}
