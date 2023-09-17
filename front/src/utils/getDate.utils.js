const date = new Date();

export const getCustomDate = (year, month, day) => {
  return new Date(year, month - 1, day);
};
