//fonction permettant d'envoyer tout les films de la BDD dans un tableau via un reducer.
const readAllCinema = async () => {
  const config = { method: "GET" };
  try {
    const response = await fetch(
      `http://localhost:7001/cinema/read-all`,
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

export const readAllCinemaThunk = async (dispatch, getState) => {
  const loading = getState().modificatorsReducer.loading;
  if (loading) return;

  dispatch({ type: "START_LOADING" });
  const result = await readAllCinema();
  dispatch({ type: "STOP_LOADING" });

  dispatch({ type: "CINEMA_FULL", payload: { films: result.films } });
};
