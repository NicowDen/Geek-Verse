import { isString } from "../../utils/string.utils";
import { formatObjectCinema } from "../../utils/formatObjectProps.utils";
import { getItem } from "../../utils/storage.utils";

//fonction maitresse du site, permettant aux admins via l'accès du bouton parametres,
//d'envoyer un nouveau film en BDD.

const buildFormData = (form) => {
  const keys = Object.keys(form);
  return keys.reduce((fd, key) => {
    const value = form[key];
    if (isString(value) && !value.length) return fd;
    fd.append(key, value);
    return fd;
  }, new FormData());
};

const sendNewCinema = async (body) => {
  const config = {
    method: "POST",
    body,
  };
  try {
    const response = await fetch(
      `http://localhost:7001/cinema/add-new`,
      config
    );
    const result = await response.json();
    const status = response.status;
    return result || status === 401 ? result : null;
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

const buildNewFilmForm = (form) => ({
  token: form.token,
  title: form.title,
  release: form.release,
  directors: form.directors,
  actors: form.actors,
  image: form.image,
  type: form.type,
  synopsis: form.synopsis,
  trailer: form.trailer,
});

export const sendNewCinemaThunk = async (dispatch, getState, form) => {
  const loading = getState().modificatorsReducer.loading;
  if (loading) return;

  let errors = "";

  for (const prop in form) {
    if (
      (prop !== "image" && form[prop].length <= 0) ||
      (prop === "image" && !form[prop])
    ) {
      errors += `${formatObjectCinema(prop)}, `;
      const errorMessage = `Les champs suivants ne sont pas renseignés: ${errors}`;
      dispatch({
        type: "SET_ADMIN_CINEMA_ERROR",
        payload: { error: errorMessage, errorColor: "red" },
      });
    }
  }

  if (errors) return;

  const formData = buildFormData(buildNewFilmForm(form));

  dispatch({ type: "START_LOADING" });
  const result = await sendNewCinema(formData);
  dispatch({ type: "STOP_LOADING" });

  console.log(result);
  if (result.authorisation === false) {
    dispatch({
      type: "SET_ADMIN_CINEMA_ERROR",
      payload: {
        error: "Vous n'avez pas les droits nécessaires",
        errorColor: "red",
      },
    });
    return;
  }
  if (result.message === "film_already_exists") {
    dispatch({
      type: "SET_ADMIN_CINEMA_ERROR",
      payload: { error: "Ce film existe Déjà", errorColor: "red" },
    });
    return;
  }

  if (result.message === "film_created") {
    dispatch({
      type: "SET_ADMIN_CINEMA_ERROR",
      payload: { error: "Le film a bien été enregistré", errorColor: "green" },
    });
    return;
  }
};
