export const formatArrayString = (array) => {
  return array
    .split(",")
    .map((el, i, arr) => (i === arr.length - 1 ? `${el}` : `${el}, `));
};

export const formatRelease = (release) => {
  if (release) {
    return (release = {
      year: release.split("-")[0],
      month: release.split("-")[1],
      day: release.split("-")[2],
    });
  }
};
