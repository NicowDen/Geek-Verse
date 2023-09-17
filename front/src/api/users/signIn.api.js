import { setItem } from "../../utils/storage.utils";

const signIn = async (form) => {
  const config = {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  };
  try {
    const response = await fetch(`http://localhost:7001/users/sign-in`, config);
    const result = await response.json();
    const status = response.status;
    return !result || status >= 400 ? null : result;
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const signInThunk = async (dispatch, getState, form) => {
  const loading = getState().modificatorsReducer.loading;
  if (loading) return;
  dispatch({ type: "START_LOADING" });
  const result = await signIn(form);
  dispatch({ type: "STOP_LOADING" });
  if (!result || !result.token) {
    return dispatch({
      type: "SET_SIGNIN_ERROR",
      payload: { error: `Email ou mot de passe incorrect` },
    });
  }
  console.log(result);
  const themeColor = result.user.theme;
  document.body.className = "";
  document.body.classList.add(themeColor);
  dispatch({ type: "SET_THEME", payload: { themeColor } });
  //Le theme du joueur est chargé des la connexion.
  dispatch({ type: `IS_${result.user.role}` });
  setItem("token", result.token);
  dispatch({ type: "LOGG_IS_OK" });
  dispatch({ type: "CLEAN_SIGNIN_INPUTS" });
  dispatch({ type: "CLOSE_LOGIN" });
};
