import { getItem } from "../../utils/storage.utils";

//fonction permettant aux admins de supprimer un film dans la rubrique sélection.
//Avec vérfication du rôle en BDD.
const deleteOneCinema = async (form, token) => {
  const config = {
    method: "DELETE",
    body: JSON.stringify(form),
    headers: {
      Authorization: token,
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  try {
    const response = await fetch(
      `http://localhost:7001/cinema/delete-one`,
      config
    );
    const result = await response.json();
    const status = response.status;
    return !result || status >= 400 ? null : result;
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const deleteOneCinemaThunk = async (dispatch, getState, form) => {
  const token = getItem("token");
  const loading = getState().modificatorsReducer.loading;
  if (loading) return;
  dispatch({ type: "START_LOADING" });
  const result = await deleteOneCinema(form, token);
  dispatch({ type: "STOP_LOADING" });
  if (result.authorisation === false) {
    dispatch({
      type: "CINEMA_SELECTION_UPDATE_ERROR",
      payload: {
        error: "Vous n'avez pas les droits nécessaires",
        errorColor: "red",
      },
    });
    return;
  }
  if (result.authorisation === true) {
    dispatch({
      type: "CINEMA_SELECTION_UPDATE_ERROR",
      payload: { error: "Le film a bien été supprimé", errorColor: "green" },
    });
  }
};
