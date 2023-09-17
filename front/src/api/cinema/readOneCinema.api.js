//fonction permettant d'envoyer le film sélectionner dans un tableau via un reducer.
const readOneCinema = async (filmId) => {
  const config = { method: "GET" };
  try {
    const response = await fetch(
      `http://localhost:7001/cinema/read-one/${filmId}`,
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

export const readOneCinemaThunk = async (dispatch, getState, filmId) => {
  const loading = getState().modificatorsReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });
  const result = await readOneCinema(filmId);
  dispatch({ type: "STOP_LOADING" });
  dispatch({
    type: "CINEMA_SELECTION",
    payload: { film: result.film },
  });
  dispatch({
    type: "OPEN_CINEMA_SELECTION",
  });
};
