import { getItem } from "../../utils/storage.utils";
import { stringIsFilled } from "../../utils/string.utils";

const updateTheme = async (form) => {
  const token = getItem("token");
  const config = {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token,
    },
  };
  try {
    const response = await fetch(
      `http://localhost:7001/users/updateTheme`,
      config
    );
    const result = await response.json();
    return result && result.theme ? result.theme : null;
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const updateThemeThunk = async (dispatch, getState, form) => {
  const loading = getState().modificatorsReducer.loading;
  if (loading) return;
  dispatch({ type: "START_LOADING" });
  const themeColor = await updateTheme(form);
  dispatch({ type: "STOP_LOADING" });
  if (!themeColor) {
    return dispatch({
      type: "SET_SIGNIN_ERROR",
      payload: { error: `Problème lors du changement de thème` },
    });
  }
  dispatch({ type: "SET_THEME", payload: { themeColor } });
  document.body.className = "";
  document.body.classList.add(themeColor);
};
