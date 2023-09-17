export const firstLetterUpper = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const firstLettersUpper = (string) => {
  return string
    .split(" ")
    .filter((el) => el.length > 0)
    .map((el) => (el = firstLetterUpper(el)))
    .join(" ");
};
