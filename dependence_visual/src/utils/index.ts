export const genID = (): string => {
  return Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36);
};
