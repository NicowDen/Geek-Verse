const sizeMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === "SELECT_WORD") {
    next({ type: "TOGGLE" });
  }

  return next(action);
};

export default sizeMiddleware;
