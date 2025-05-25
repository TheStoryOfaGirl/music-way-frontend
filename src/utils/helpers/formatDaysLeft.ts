export function formatDaysLeft(deadline: string): string {
  const deadlineDate =
    typeof deadline === "string"
      ? new Date(deadline + "T00:00:00")
      : new Date(deadline);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffMs = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Остался последний день";
  }

  const remainWord = getRemainWord(diffDays);
  const dayWord = getDayWord(diffDays);

  return `${remainWord} ${diffDays} ${dayWord}`;
}

function getDayWord(days: number): string {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "дней";
  }

  switch (lastDigit) {
    case 1:
      return "день";
    case 2:
    case 3:
    case 4:
      return "дня";
    default:
      return "дней";
  }
}

function getRemainWord(days: number): string {
  if (days === 1) {
    return "Остался";
  } else {
    return "Осталось";
  }
}
