export function pluralize(
  number: number,
  variants: [string, string, string],
): string {
  const lastTwo = number % 100;
  const lastOne = number % 10;
  if (lastTwo >= 11 && lastTwo <= 14) {
    return `${number} ${variants[2]}`;
  }
  console.log(variants, number);
  switch (lastOne) {
    case 1:
      return `${number} ${variants[0]}`;
    case 2:
    case 3:
    case 4:
      return `${number} ${variants[1]}`;
    default:
      return `${number} ${variants[2]}`;
  }
}
