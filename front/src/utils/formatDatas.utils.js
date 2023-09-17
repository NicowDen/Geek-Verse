export const formatMonth = (month) => {
  switch (month) {
    case 1:
      return "Janvier";
    case 2:
      return "Février";
    case 3:
      return "Mars";
    case 4:
      return "Avril";
    case 5:
      return "Mai";
    case 6:
      return "Juin";
    case 7:
      return "Juillet";
    case 8:
      return "Aout";
    case 9:
      return "Septembre";
    case 10:
      return "Octobre";
    case 11:
      return "Novembre";
    case 12:
      return "Décembre";
    default:
      return "error";
  }
};

export const formatDay = (day) => {
  return day === 1 ? (
    <span>
      1<sup>er</sup>
    </span>
  ) : (
    day
  );
};

export const formatArrayString = (array) => {
  return array
    .split(",")
    .map((el, i, arr) => (i === arr.length - 1 ? `${el}` : `${el}, `));
};

export const formatRelease = (release) => {
  return (release = {
    year: release.split("-")[0],
    month: release.split("-")[1],
    day: release.split("-")[2],
  });
};
