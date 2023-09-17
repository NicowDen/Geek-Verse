export const formatCinema = (film) => {
  return {
    id: film._id,
    actors: film.actors,
    directors: film.directors,
    image: film.image,
    release: film.release,
    synopsis: film.synopsis,
    title: film.title,
    trailer: film.trailer,
    type: film.type,
  };
};

export const formatCinemas = (film) => {
  return film.map(formatCinema);
};
