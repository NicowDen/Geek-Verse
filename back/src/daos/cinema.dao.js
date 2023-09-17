import { logError } from "../utils/logger.utils.js";
import { getErrors } from "../utils/errors.utils.js";
import { getCurrentDate } from "../utils/date.utils.js";
import Cinema from "../models/cinema.model.js";

const create = async ({
  title,
  release,
  directors,
  actors,
  image,
  type,
  synopsis,
  trailer,
}) => {
  try {
    const film = new Cinema({
      title,
      release,
      directors,
      actors,
      image,
      type,
      synopsis,
      trailer,
    });
    const createdFilm = await film.save();
    return createdFilm ? createdFilm : null;
  } catch (e) {
    logError(`cinema.dao - create : ${e.message}`);
    return null;
  }
};

const searchByTitle = async (title) => {
  try {
    const film = await Cinema.findOne({ title: title });
    return film ? film : null;
  } catch (e) {
    logError(`cinema.dao - searchByTitle : ${e.message}`);
    return null;
  }
};

const readAll = async () => {
  try {
    const films = await Cinema.find();
    return films ? films : null;
  } catch (e) {
    logError(`cinema.dao - readAll : ${e.message}`);
    return null;
  }
};

const readOne = async (filmId) => {
  try {
    const film = await Cinema.findById(filmId).exec();
    return film ? film : null;
  } catch (e) {
    logError(`cinema.dao - readOne : ${e.message}`);
    return null;
  }
};

const deleteOne = async (filmId) => {
  try {
    const filmToDelete = await Cinema.deleteOne({ _id: filmId }).exec();
    return filmToDelete ? filmToDelete : null;
  } catch (e) {
    logError(`cinema.dao - deleteOne : ${e.message}`);
    return null;
  }
};

export const CinemaDAO = {
  create,
  readAll,
  readOne,
  deleteOne,
  searchByTitle,
};
