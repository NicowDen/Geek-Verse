import { CinemaDAO } from "../daos/cinema.dao.js";
import { FileUtils } from "../utils/file.utils.js";
import { MongoId } from "../models/mongoose.config.js";
import { UploadUtils } from "../utils/upload.utils.js";
import {
  formatArrayString,
  formatRelease,
} from "../utils/formatDatas.utils.js";
import { formatCinemas, formatCinema } from "../utils/cinema.utils.js";
import { sanitize } from "../middlewares/sanitize.middleware.js";
import { adminCheckByToken } from "./adminCheck.controller.js";
import { adminCheckByUserId } from "./adminCheck.controller.js";

const removeImageOndelete = async (path) => {
  await FileUtils.removeFile(path);
};

const sendNewCinema = async (req, res) => {
  //fonction permettant la sauvegarde du film en BDD
  //et l'enregistrement de l'image côté serveur (voir dossier Public)
  //Gère également la suppression du dossier en fonction de divers cas.

  // gestion du FormData
  const id = new MongoId();
  const fieldName = "image";
  const dest = `cinema/${id}/${fieldName}/`;
  const filter = UploadUtils.getImageFilter();
  const options = UploadUtils.getUploadOptions(fieldName, dest, 4, filter);
  const result = await UploadUtils.saveOneImage(req, res, options);
  if (!result) {
    return res.status(422).json({ message: `cannot save film` });
  }
  // recup des données que l'on sanitize pour échapper les caractères spéciaux.
  //ce qui va créer un problème avec le lien de la vidéo youtube qui va nécéssiter des opérations particulieres.
  const file = sanitize(result.file);
  const body = sanitize(result.body);

  const authorisation = await adminCheckByToken(body.token);
  if (authorisation === false) {
    await removeImageOndelete(`${process.cwd()}/public/uploads/cinema/${id}`);
    return res
      .status(401)
      .json({ message: "user is not authorized", authorisation });
  }

  //Le formdata renvoie un tableau avec un seul élément sous forme d'une chaine de caracteres.
  //On a besoin d'un tableau pour formater les el pour le front: "el1, el2, el3"
  body.actors = formatArrayString(body.actors);
  body.type = formatArrayString(body.type);
  body.directors = formatArrayString(body.directors);
  //même chose pour la date qu'on formate selon nos besoins.
  body.release = formatRelease(body.release);
  //on reconstruit le lien de la vidéo grâce à l'id récupérée dans le front.
  body.trailer = `https://www.youtube.com/embed/${body.trailer}/&origin=http://localhost:3000/`;

  const existingFilms = await CinemaDAO.searchByTitle(body.title);
  if (existingFilms) {
    await removeImageOndelete(`${process.cwd()}/public/uploads/cinema/${id}`);
    return res.status(401).json({ message: "film_already_exists" });
  }
  const fileName = file?.filename || null;
  const image = file ? `uploads/${dest}${fileName}` : undefined;
  // création du user dans bdd
  const film = await CinemaDAO.create({ ...body, id, image });
  if (!film || !file)
    await removeImageOndelete(`${process.cwd()}/public/uploads/cinema/${id}`);
  res.status(201).json({ message: "film_created", authorisation });
};

const readAll = async (req, res) => {
  //renvoie tout les films côté client.
  const films = await CinemaDAO.readAll();
  if (!films) return res.status(400).json({ message: "cant_get_films" });
  res.status(200).json({ message: "ok", films: formatCinemas(films) });
};

const readOne = async (req, res) => {
  //renvoie un film spécifique côté client en fonction de la sélection utilisateur.
  const filmId = req.params.filmId;
  const film = await CinemaDAO.readOne(filmId);
  if (!film) return res.status(400).json({ message: "cant_get_film" });
  res.status(200).json({ message: "ok", film: formatCinema(film) });
};

const deleteOne = async (req, res) => {
  //permet aux admins de supprimer un film.
  const authorisation = await adminCheckByUserId(req.body.userId);
  if (authorisation === false) {
    return res
      .status(401)
      .json({ message: "user is not authorized", authorisation });
  }
  const filmId = req.body.filmId;
  const film = await CinemaDAO.readOne(filmId);
  await removeImageOndelete(
    `${process.cwd()}/public/${film.image
      .split("/")
      .filter((el, i) => i <= 2)
      .join("/")}`
  );
  //film.image est au format 'uploads/cinema/6408f736d633a90f78fc0561/image/1678309174964-image.jpeg'
  //On reformate ce résultat pour supprimer le dossier racine "après /cinema/" et non juste le fichier
  const result = await CinemaDAO.deleteOne(filmId);
  console.log("result", result);
  console.log("film", film);
  if (!result) return res.status(400).json({ message: "cant_delete_film" });
  res.status(200).json({ message: "film deleted", authorisation });
};

export const CinemaController = {
  sendNewCinema,
  readAll,
  readOne,
  deleteOne,
};
