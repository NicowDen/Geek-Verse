import { getItem } from "../../utils/storage.utils";

const updateAdmin = async (form, token) => {
  const config = {
    method: "POST",
    body: JSON.stringify(form),
    headers: {
      Authorization: token,
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  try {
    const response = await fetch(
      `http://localhost:7001/users/new-admin`,
      config
    );
    const result = await response.json();
    return result ? result : null;
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const updateAdminThunk = async (dispatch, getState, form) => {
  const token = getItem("token");
  const loading = getState().modificatorsReducer.loading;
  if (loading) return;
  dispatch({ type: "START_LOADING" });
  const result = await updateAdmin(form, token);
  dispatch({ type: "STOP_LOADING" });
  if (result.message === "this user does not exists") {
    dispatch({
      type: "META_ADMIN_UPDATE_ERROR",
      payload: { error: `${result.user} n'existe pas`, errorColor: "red" },
    });
  }
  if (result.message === "this user is already admin") {
    dispatch({
      type: "META_ADMIN_UPDATE_ERROR",
      payload: { error: `${result.user} est déjà admin`, errorColor: "red" },
    });
  }
  if (result.message === "user was successfully updated") {
    dispatch({
      type: "META_ADMIN_UPDATE_ERROR",
      payload: {
        error: `${result.user} est désormais admin`,
        errorColor: "green",
      },
    });
  }
};
