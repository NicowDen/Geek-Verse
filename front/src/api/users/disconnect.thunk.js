const disconnect = (dispatch, getState) => {
  dispatch({ type: "LOGG_IS_KO" });
  window.localStorage.clear();
  dispatch({ type: "IS_NOTHING" });
  dispatch({ type: "OPEN_CINEMA_SLIDERS" });
};

export default disconnect;
