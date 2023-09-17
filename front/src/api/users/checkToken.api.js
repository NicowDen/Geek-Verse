import disconnect from "./disconnect.thunk";
import { getItem } from "../../utils/storage.utils";

const checkTokenRequest = async (token) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  try {
    const response = await fetch(
      `http://localhost:7001/users/check-token`,
      config
    );
    const result = await response.json();
    const status = response.status;
    return !result || status >= 400 ? null : result;
  } catch (e) {
    console.error("checkToken request : ", e.message);
    return null;
  }
};

export const checkToken = async (dispatch, getState) => {
  const token = getItem("token");

  if (!token) return dispatch(disconnect);
  dispatch({ type: "START_LOADING" });
  const result = await checkTokenRequest(token);
  dispatch({ type: "STOP_LOADING" });

  if (!result || !result.user) return dispatch(disconnect);
  dispatch({ type: "LOGG_IS_OK" });

  const themeColor = result.user.theme;
  document.body.className = "";
  document.body.classList.add(themeColor);
  dispatch({ type: "SET_THEME", payload: { themeColor } });
  dispatch({ type: `IS_${result.user.role}` });
};
