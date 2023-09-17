export const formatObjectCinema = (prop) => {
  if (prop === "title") return "Titre";
  if (prop === "release") return "Sortie";
  if (prop === "directors") return "Réalisateur(s)";
  if (prop === "actors") return "Acteur(s)";
  if (prop === "type") return "Type";
  if (prop === "synopsis") return "Synopsis";
  if (prop === "trailer") return "Trailer";
  if (prop === "image") return "Image";
};

export const formatUser = (user) => {
  return {
    id: user._id,
    email: user.email,
    pseudo: user.pseudo,
    password: user.password,
    role: user.role,
    theme: user.theme,
  };
};
