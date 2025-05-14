export function formatScoreCompletedHomework(
  received: number,
  total: number,
): string[] {
  const receivedWord = received === 1 ? "Получен" : "Получено";

  const pointsWord = getPointsWord(received);

  return [
    `${receivedWord}`,
    `${received}`,
    `${pointsWord} из ${total} возможных`,
  ];
}

function getPointsWord(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return "баллов";
  }

  switch (lastDigit) {
    case 1:
      return "балл";
    case 2:
    case 3:
    case 4:
      return "балла";
    default:
      return "баллов";
  }
}
