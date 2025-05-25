export const getStatusByStatistics = (percent: number) => {
  if (percent > 80) {
    return "Молодец!";
  } else if (percent > 50) {
    return "Хороший результат!";
  } else {
    return "Не сдавайся, у тебя все получится!";
  }
};
