export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}