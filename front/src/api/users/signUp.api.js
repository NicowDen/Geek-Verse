import { setItem } from "../../utils/storage.utils";

const signUp = async (form) => {
  const config = {
    method: "POST",
    body: JSON.stringify(form),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  try {
    const response = await fetch(`http://localhost:7001/users/sign-up`, config);
    const result = await response.json();
    return result ? result : null;
  } catch (e) {
    console.error("Problem with request : ", e.message);
    return null;
  }
};

export const signUpThunk = async (dispatch, getState, form) => {
  const loading = getState().modificatorsReducer.loading;
  const { pseudo, email, confirmEmail, password, confirmPassword } =
    getState().signUpReducer;
  if (loading) return;
  if (email.length === 0 || password.length === 0 || pseudo.length === 0) {
    return dispatch({
      type: "SET_SIGNUP_ERROR",
      payload: { error: `Tout les champs doivent être remplis` },
    });
  }
  if (email.value !== confirmEmail.value) {
    return dispatch({
      type: "SET_SIGNUP_ERROR",
      payload: { error: `L'email et sa confirmation ne correspondent pas` },
    });
  }
  if (password.value.trim().length < 6) {
    return dispatch({
      type: "SET_SIGNUP_ERROR",
      payload: {
        error: `Le mot de passe doit contenir au moins 6 caractères`,
      },
    });
  }
  if (password.value !== confirmPassword.value) {
    return dispatch({
      type: "SET_SIGNUP_ERROR",
      payload: {
        error: `Le mot de passe et sa confirmation ne correspondent pas`,
      },
    });
  }

  dispatch({ type: "START_LOADING" });
  const result = await signUp(form);
  dispatch({ type: "STOP_LOADING" });
  console.log(result);
  if (result.message === "email_already_exist") {
    return dispatch({
      type: "SET_SIGNUP_ERROR",
      payload: { error: `Email déjà existant` },
    });
  }

  document.body.className = "";
  document.body.classList.add("pinkBlue");
  //Le theme par défaut est la version officielle; le PINKBLUE. Voir dans le dossier "style" le fichier variable.scss
  dispatch({ type: `IS_${result.user.role}` });
  //l'enregistrement du rôle en BDD est fait en sorte qu'il corresponde avec le case du dispatch pour concaténation.
  setItem("token", result.token);
  dispatch({ type: "LOGG_IS_OK" });
  dispatch({ type: "CLEAN_SIGNUP_INPUTS" });
  dispatch({ type: "CLOSE_LOGIN" });
};
