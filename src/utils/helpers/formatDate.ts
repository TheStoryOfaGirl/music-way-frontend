import { months } from "@utils";

export function formatDate(date: string) {
  const parseDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      throw new Error(`Некорректная дата: ${dateStr}`);
    }
    return date;
  };

  const formatSingleDate = (date: Date) => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };

  const formatDate = parseDate(date);

  return `${formatSingleDate(formatDate)}`;
}
