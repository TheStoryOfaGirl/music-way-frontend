import { months } from "@utils";

export function formatDateRange(startDate: string, endDate?: string) {
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
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const start = parseDate(startDate);
  const end = endDate ? parseDate(endDate) : start;

  return `${formatSingleDate(start)} - ${formatSingleDate(end)}`;
}
