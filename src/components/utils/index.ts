export const splitAndJoinString = (string: string) => {
  return string.split(" ").join("");
};

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
